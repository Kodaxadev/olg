import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {photos,image,imageCredit,scene} from '../src/imagery.mjs';
import {routes} from '../src/routes.mjs';
const htmlFor = path => readFile(`dist/${path === '/404.html' ? '404.html' : path.slice(1) + 'index.html'}`, 'utf8');

test('the four original scenes match their manifest hashes, dimensions, and byte budgets', async () => {
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
    assert.ok(p.alt.length > 20);
    assert.doesNotMatch(p.alt, /AI[-\s]*generated|generated\s+by\s+AI/i);
    total += data.length;
  }
  assert.ok(total < 80_000);
});

test('home hero keeps its original placement, dimensions, and loading priority', async () => {
  const html = await htmlFor('/');
  const hero = html.match(/<img class="hero-image"[^>]*>/)?.[0];
  assert.ok(hero);
  assert.match(hero, /src="\/images\/home-office.avif"/);
  assert.match(hero, /width="1440" height="810"/);
  assert.match(hero, /loading="eager"/);
  assert.match(hero, /fetchpriority="high"/);
  assert.doesNotMatch(html, /office-study.avif/);
});

test('inner pages keep their original scene assignments', async () => {
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
    const hero = (await htmlFor(path)).match(/<img class="subhero-image"[^>]*>/)?.[0];
    assert.ok(hero?.includes(photos[key].src), path);
    assert.match(hero, /fetchpriority="high"/);
  }
  for (const path of ['/design-review/','/404.html']) {
    assert.doesNotMatch(await htmlFor(path), /class="subhero-image"/);
  }
});

test('secondary scenes stay lazy and decorative imagery remains hidden from assistive technology', async () => {
  for (const path of ['/','/about/']) {
    const landscape = (await htmlFor(path)).match(/<img class="section-media"[^>]*>/)?.[0];
    assert.match(landscape, /src="\/images\/valley-dusk.avif"/);
    assert.match(landscape, /alt="" aria-hidden="true" loading="lazy"/);
  }
  assert.match(await htmlFor('/about/'), /<figure class="editorial-scene"><img[^>]+consultation-room.avif[^>]+loading="lazy"/);
});

test('no route emits generation labels, image badges, or inaccessible image markup', async () => {
  for (const route of routes) {
    const html = await htmlFor(route.path);
    assert.doesNotMatch(html, /AI[-\s]*generated|generated\s+by\s+AI|class="(?:media-credit|image-credit)"/i, route.path);
    assert.match(html, /DESIGN CONCEPT/);
    assert.match(html, /href="\/styles\/imagery.css"/);
    assert.ok((html.match(/fetchpriority="high"/g) || []).length <= 1, route.path);
    for (const match of html.matchAll(/<img\b[^>]*>/g)) {
      const tag = match[0];
      assert.match(tag, /\bwidth="\d+"/);
      assert.match(tag, /\bheight="\d+"/);
      assert.match(tag, /\balt="[^"]*"/);
      if (tag.includes('alt=""')) assert.match(tag, /aria-hidden="true"/);
    }
  }
});

test('image helpers emit no caption or empty badge and continue validating asset keys', () => {
  for (const key of Object.keys(photos)) {
    assert.equal(imageCredit(key), '');
    assert.doesNotMatch(scene(key), /figcaption|media-credit|AI-generated/i);
  }
  assert.throws(() => image('unknown'), /Unknown concept photo/);
  assert.throws(() => imageCredit('__proto__'), /Unknown concept photo/);
  assert.throws(() => scene('unknown'), /Unknown concept photo/);
  assert.match(image('office', {className: '"<>&'}), /class="&quot;&lt;&gt;&amp;"/);
  assert.match(image('office'), /loading="lazy"/);
});
