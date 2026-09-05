// Approved concept artwork. These scenes do not document actual firm premises.
export const photos = Object.freeze({
  office: {
    src: '/images/home-office.avif', width: 1440, height: 810,
    alt: 'AI-generated conceptual office with a walnut desk and sunlit foothills; not the firm’s office',
    credit: 'Conceptual office · AI-generated',
  },
  civic: {
    src: '/images/civic-architecture.avif', width: 1440, height: 810,
    alt: 'AI-generated civic architecture with stone steps and columns; not a verified courthouse or location',
    credit: 'Conceptual civic architecture · AI-generated',
  },
  valley: {
    src: '/images/valley-dusk.avif', width: 1440, height: 617,
    alt: 'AI-generated California-inspired foothills at dusk; not a photograph of a specific location',
    credit: 'California-inspired landscape · AI-generated',
  },
  consultation: {
    src: '/images/consultation-room.avif', width: 1440, height: 810,
    alt: 'AI-generated conceptual meeting room with a walnut table and leather chairs; not the firm’s office',
    credit: 'Conceptual meeting room · AI-generated',
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
export const imageCredit = key => `<p class="media-credit">${attr(getPhoto(key).credit)}</p>`;
export const scene = key => `<figure class="editorial-scene">${image(key)}<figcaption>${attr(getPhoto(key).credit)}</figcaption></figure>`;
