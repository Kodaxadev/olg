import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {photos,image,imageCredit} from '../src/imagery.mjs';
import {routes} from '../src/routes.mjs';
const htmlFor = path => readFile(`dist/${path === '/404.html' ? '404.html' : path.slice(1) + 'index.html'}`, 'utf8');

test('four new scenes match their manifest hashes, dimensions, and byte budgets', async () => {
  const manifest = JSON.parse(await readFile('design/assets.json', 'utf8'));
  assert.equal(Object.keys(photos).length, 4);
  let total = 0;
  for (const p of Object.values(photos)) {
    const data = await readFile('dist' + p.src);
    const entry = manifest.repoAssets[p.src.split('/').at(-1)];
    assert.ok(data.subarray(0,48).includes(Buffer.from('avif')));
    assert.equal(createHash('sha256').update(data).digest('hex'), entry.sha256);
    assert.deepEqual([p.width,p.height], entry.dimensions);
    assert.equal(data.length, entry.bytes);
    assert.ok(data.length < 25_000, `${p.src} exceeds the scene budget`);
    assert.match(p.alt, /AI-generated/);
    total += data.length;
  }
  assert.ok(total < 80_000);
});

test('home hero is discoverable HTML, eager, dimensioned, and high priority', async () => {
  const html = await htmlFor('/');
  const hero = html.match(/<img class="hero-image"[^>]*>/)?.[0];
  assert.ok(hero);
  assert.match(hero, /src="\/images\/home-office.avif"/);
  assert.match(hero, /width="1440" height="810"/);
  assert.match(hero, /loading="eager"/);
  assert.match(hero, /fetchpriority="high"/);
  assert.doesNotMatch(html, /office-study.avif/);
  assert.match(html, /Conceptual office · AI-generated/);
});

test('inner pages use the appropriate scene while review and 404 stay text-only', async () => {
  const assignments = {
    '/attorneys/': 'civic', '/attorneys/jr-oviedo/': 'civic',
    '/attorneys/bradley-stevens/': 'civic', '/about/': 'civic',
    '/contact/': 'consultation', '/practice-areas/': 'civic',
    '/practice-areas/peace-officer-representation/': 'civic',
    '/practice-areas/administrative-hearings/': 'civic',
    '/practice-areas/workers-compensation/': 'consultation',
    '/practice-areas/civil-litigation/': 'consultation',
  };
  for (const [path,key] of Object.entries(assignments)) {
    const html = await htmlFor(path);
    const hero = html.match(/<img class="subhero-image"[^>]*>/)?.[0];
    assert.ok(hero?.includes(photos[key].src), path);
    assert.match(hero, /fetchpriority="high"/);
    assert.ok(html.includes(imageCredit(key)), path);
  }
  for (const path of ['/design-review/','/404.html']) {
    assert.doesNotMatch(await htmlFor(path), /class="subhero-image"/);
  }
});

test('secondary scenes load lazily and decorative imagery is hidden from assistive technology', async () => {
  for (const path of ['/','/about/']) {
    const html = await htmlFor(path);
    const landscape = html.match(/<img class="section-media"[^>]*>/)?.[0];
    assert.match(landscape, /src="\/images\/valley-dusk.avif"/);
    assert.match(landscape, /alt="" aria-hidden="true" loading="lazy"/);
    assert.ok(html.includes(imageCredit('valley')));
  }
  const about = await htmlFor('/about/');
  assert.match(about, /<figure class="editorial-scene"><img[^>]+consultation-room.avif[^>]+loading="lazy"/);
});

test('image semantics and priority stay consistent on every route', async () => {
  for (const route of routes) {
    const html = await htmlFor(route.path);
    assert.match(html, /href="\/styles\/imagery.css"/);
    assert.ok((html.match(/fetchpriority="high"/g) || []).length <= 1, route.path);
    for (const match of html.matchAll(/<img\b[^>]*>/g)) {
      const tag = match[0];
      assert.match(tag, /\bwidth="\d+"/);
      assert.match(tag, /\bheight="\d+"/);
      if (tag.includes('alt=""')) assert.match(tag, /aria-hidden="true"/);
    }
  }
});

test('the imagery helper rejects unknown assets and escapes attributes', () => {
  assert.throws(() => image('unknown'), /Unknown concept photo/);
  assert.throws(() => imageCredit('__proto__'), /Unknown concept photo/);
  assert.match(image('office', {className: '"<>&'}), /class="&quot;&lt;&gt;&amp;"/);
  assert.match(image('office'), /loading="lazy"/);
});
