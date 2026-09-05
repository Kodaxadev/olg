import asyncio,json,re,base64,os,shutil
from urllib.request import urlopen
from urllib.error import HTTPError
from pathlib import Path
from playwright.async_api import async_playwright
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'artifacts';OUT.mkdir(exist_ok=True)
BASE_URL=os.environ.get('OLG_BASE_URL','http://127.0.0.1:4173')
paths=['/','/attorneys/','/attorneys/jr-oviedo/','/attorneys/bradley-stevens/','/practice-areas/','/practice-areas/peace-officer-representation/','/practice-areas/administrative-hearings/','/practice-areas/workers-compensation/','/practice-areas/civil-litigation/','/about/','/contact/','/design-review/']
async def load(page,path):
 # Browser network navigation is restricted here. Render exact build output offline.
 file=ROOT/'dist'/('404.html' if path=='/does-not-exist/' else path.lstrip('/')+'index.html')
 html=file.read_text()
 styles='\n'.join((ROOT/'dist/styles'/f'{x}.css').read_text() for x in ['base','components','pages','responsive'])
 def data(path):
  content=(ROOT/'dist'/path.lstrip('/')).read_bytes()
  return 'data:image/avif;base64,'+base64.b64encode(content).decode()
 styles=re.sub(r"url\('(/images/[^']+)'\)",lambda m:"url('"+data(m[1])+"')",styles)
 html=re.sub(r'<link[^>]+>', '', html)
 html=re.sub(r'<script[^>]*>.*?</script>', '', html)
 html=html.replace('</head>','<style>'+styles+'</style></head>')
 html=re.sub(r'src="(/images/[^"]+)"',lambda m:'src="'+data(m[1])+'"',html)
 await page.set_content(html,wait_until='load')
 await page.add_script_tag(content='(()=>{'+(ROOT/'public/app.js').read_text()+'})();')
 # Test the actual local HTTP server separately from the offline browser renderer.
 try:
  with urlopen(BASE_URL+path) as res:
   status=res.status
   assert 'noindex' in res.headers.get('X-Robots-Tag','')
 except HTTPError as err: status=err.code
 return status
async def main():
 report={'mode':'Offline Chromium rendering of built HTML/CSS/JS plus separate local HTTP checks','viewports':[],'errors':[],'screenshots':[]}
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH') or shutil.which('chromium'),headless=True,args=['--no-sandbox'])
  for width in [375,390,768,1440]:
   page=await browser.new_page(viewport={'width':width,'height':900},device_scale_factor=1)
   page.on('pageerror',lambda error: report['errors'].append(str(error)))
   page.on('console',lambda msg: report['errors'].append(msg.text) if msg.type=='error' else None)
   for path in paths:
    status=await load(page,path)
    assert status==200,(path,status)
    overflow=await page.evaluate('document.documentElement.scrollWidth > innerWidth')
    assert not overflow,(width,path,'horizontal overflow')
    for img in await page.locator('img').all():
     await img.scroll_into_view_if_needed()
     await page.wait_for_timeout(70)
     assert await img.evaluate('(e)=>e.complete&&e.naturalWidth>0'),(path,'broken image')
    await page.evaluate('scrollTo(0,0)')
    report['viewports'].append({'width':width,'path':path,'status':status,'overflow':overflow})
    if (width in [390,1440] and path in ['/','/attorneys/','/contact/']):
     name=f'{"home" if path=="/" else path.strip("/")}-{width}.png'
     await page.screenshot(path=str(OUT/name),full_page=True)
     report['screenshots'].append(name)
   if width<901:
    await load(page,'/')
    button=page.get_by_role('button',name='Menu',exact=True)
    await button.click()
    assert await button.get_attribute('aria-expanded')=='true'
    assert await page.locator('#mobile-menu').is_visible()
    await page.keyboard.press('Escape')
    assert await button.get_attribute('aria-expanded')=='false'
    assert not await page.locator('#mobile-menu').is_visible()
    assert await button.evaluate('(e)=>e===document.activeElement')
   await load(page,'/contact/')
   assert await page.locator('#name').is_disabled()
   assert await page.locator('button[type=submit]').is_disabled()
   await page.close()
  page=await browser.new_page(viewport={'width':390,'height':844},reduced_motion='reduce')
  await load(page,'/')
  assert await page.evaluate('getComputedStyle(document.documentElement).scrollBehavior')=='auto'
  status=await load(page,'/does-not-exist/')
  assert status==404
  assert await page.locator('h1').inner_text()=='Let’s find\nthe right page.'
  await browser.close()
 # A deliberate missing route logs a 404; all page-render paths must otherwise be clean.
 assert not report['errors'],report['errors']
 report['checks']={'pageViewportPairs':len(report['viewports']),'mobileMenus':3,'reducedMotion':True,'custom404':True,'disabledIntake':True}
 (OUT/'browser-report.json').write_text(json.dumps(report,indent=2))
 print(json.dumps(report['checks'],indent=2))
asyncio.run(main())
