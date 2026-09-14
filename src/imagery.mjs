// Concept artwork, not documentary photographs of firm premises.
// Source provenance is retained in design/assets.json, not overlaid on imagery.
export const photos = Object.freeze({
  office: {
    src: '/images/home-office.avif', width: 1440, height: 810,
    alt: 'Walnut desk, leather chair, and sunlit foothills beyond a navy-paneled office',
  },
  civic: {
    src: '/images/civic-architecture.avif', width: 1440, height: 810,
    alt: 'Stone steps and classical columns overlooking tree-lined foothills',
  },
  valley: {
    src: '/images/valley-dusk.avif', width: 1440, height: 617,
    alt: 'Layered foothills and a tree-lined valley beneath a dusk sky',
  },
  consultation: {
    src: '/images/consultation-room.avif', width: 1440, height: 810,
    alt: 'Walnut meeting table, leather chairs, and framed map beside a sunlit window',
  },
});
const attr = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const getPhoto = key => {
  if (!Object.hasOwn(photos, key)) throw new Error(`Unknown concept photo: ${key}`);
  return photos[key];
};
export function image(key, {className = '', priority = false, decorative = false} = {}) {
  const p = getPhoto(key);
  return `<img class="${attr(className)}" src="${p.src}" width="${p.width}" height="${p.height}" alt="${decorative ? '' : attr(p.alt)}"${decorative ? ' aria-hidden="true"' : ''} loading="${priority ? 'eager' : 'lazy'}" decoding="async"${priority ? ' fetchpriority="high"' : ''}>`;
}
// Keep existing page call sites stable without emitting a badge or empty element.
export const imageCredit = key => { getPhoto(key); return ''; };
export const scene = key => `<figure class="editorial-scene">${image(key)}</figure>`;
