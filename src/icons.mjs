const paths = {
 arrow:'<path d="M5 12h14m-5-5 5 5-5 5"/>',
 diagonal:'<path d="M6 18 18 6M6 6h12v12"/>',
 phone:'<path d="m7 3 3 5-2 2c1.4 2.7 3.3 4.6 6 6l2-2 5 3c0 3-2 4-4 4C10 21 3 14 3 7c0-2 1-4 4-4Z"/>',
 pin:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/>',
 shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"/><path d="m8 12 3 3 5-6"/>',
 document:'<path d="M6 3h8l4 4v14H6V3Zm8 0v5h4M9 12h6M9 16h6"/>',
 briefcase:'<rect x="3" y="7" width="18" height="14" rx="1"/><path d="M8 7V3h8v4M3 12c5 3 13 3 18 0M12 12v5"/>',
 balance:'<path d="M12 3v18M5 21h14M4 7h16M7 7l-4 8h8L7 7Zm10 0-4 8h8l-4-8Z"/>',
 people:'<circle cx="12" cy="7" r="3"/><path d="M6 21v-3a6 6 0 0 1 12 0v3H6ZM3 6a3 3 0 0 1 0 6m18-6a3 3 0 0 1 0 6M3 15a4 4 0 0 0-2 4m20-4a4 4 0 0 1 2 4"/>',
 compass:'<circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6 6-2ZM12 1v2m0 18v2M1 12h2m18 0h2"/>',
 handshake:'<path d="m2 9 4-5 4 1 4-1 8 6-5 9-5 2-8-7-2-5Z"/><path d="m10 5-4 5 3 2 3-3 6 6m-7 1 4 3m-6-1 3 3"/>',
 chevron:'<path d="m6 9 6 6 6-6"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 check:'<path d="m5 12 4 4L19 6"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
};
export const icon=(name,cls='')=>`<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.arrow}</svg>`;
