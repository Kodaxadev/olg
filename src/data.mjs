// Review-only content. Do not treat a published old website as current approval.
export const firm = Object.freeze({
  name: 'Oviedo Law Group', phone: '559-226-6200', tel: '+15592266200',
  street: '401 Clovis Avenue, Suite 208', city: 'Clovis, CA 93612',
  officialSite: 'https://www.oviedolawgroup.com/',
  preview: true, reviewedAt: '2026-09-04',
});
export const practices = [
  {slug:'peace-officer-representation', number:'01', icon:'shield', title:'Peace officer representation',
   short:'Representation when your profession, reputation, and future are at stake.',
   description:'A proposed home for the firm’s law-enforcement practice, with clear paths for officers seeking representation in departmental matters.',
   matters:['Internal investigations','Disciplinary proceedings','Administrative appeals'],
   note:'These categories reflect the existing website’s public positioning. Current scope and new-matter acceptance require firm approval.'},
  {slug:'administrative-hearings', number:'02', icon:'document', title:'Administrative hearings',
   short:'A clear, considered approach to proceedings before public agencies.',
   description:'A dedicated space for the firm to explain its administrative practice and the proceedings it currently handles.',
   matters:['Agency proceedings','Disciplinary hearings','Review and appeals'],
   note:'Proposed navigation category, not a confirmed expansion of the firm’s services. Agency coverage and appeal types must be confirmed.'},
  {slug:'workers-compensation', number:'03', icon:'briefcase', title:'Workers’ compensation',
   short:'Support for the people whose work serves our communities.',
   description:'A focused introduction to the firm’s published workers’ compensation practice, with room for approved information about the people it represents.',
   matters:['Work-related injuries','Benefits-related disputes','Public-safety matters'],
   note:'The current site advertises workers’ compensation. Eligibility guidance, specific benefits, and current case acceptance are intentionally not supplied in this concept.'},
  {slug:'civil-litigation', number:'04', icon:'balance', title:'Civil litigation',
   short:'Strategic representation for matters that demand a thoughtful response.',
   description:'A proposed overview of the firm’s civil practice. The final page should name only the matters the firm actively accepts today.',
   matters:['Civil disputes','Case evaluation','Litigation and resolution'],
   note:'The existing biography lists civil litigation. Business litigation, personal injury, auto accidents, and wrongful death need individual confirmation before publication.'},
];
export const attorneys = [
  {slug:'jr-oviedo', name:'J.R. Oviedo', initials:'JO', role:'Attorney at law',
   intro:'Counsel grounded in a longstanding California practice.',
   bio:'J.R. Oviedo’s published attorney biography lists admission to the California bar in 2000 and a J.D. from the University of the Pacific, McGeorge School of Law. This profile is ready for an updated, firm-approved biography.',
   credentials:[['California admission','2000 — as published by the firm'],['Legal education','University of the Pacific, McGeorge School of Law, J.D., 1999'],['Undergraduate education','California State University, Fresno, B.A., 1995']],
   source:'https://www.oviedolawgroup.com/attorneys/', sourceLabel:'Published firm biography',
   review:'Firm approval of current biography, admissions, professional affiliations, and portrait is still required.'},
  {slug:'bradley-stevens', name:'Bradley Stevens', initials:'BS', role:'Attorney profile',
   intro:'A fuller picture of the people behind the firm.',
   bio:'This concept includes a dedicated profile for Bradley Stevens rather than repeating the old website’s single-attorney structure. His biography, current role, education, and practice focus are reserved for firm-approved information.',
   credentials:[['Profile status','Biography and credentials awaiting firm confirmation'],['Reference for review','California State Bar record no. 203893']],
   source:'https://apps.calbar.ca.gov/attorney/Licensee/Detail/203893', sourceLabel:'State Bar record for verification',
   review:'The State Bar reference is a verification lead supplied in the project discussion; this build does not assert a current license status or independently confirmed employment.'},
];
export const values = [
 {icon:'people', title:'People, before paperwork.', copy:'The person behind the matter deserves to be heard. A direct conversation is where the relationship begins.'},
 {icon:'compass', title:'Clarity, at every step.', copy:'A considered approach. An understandable plan. Communication that makes the next step clear.'},
 {icon:'handshake', title:'A grounded perspective.', copy:'A Clovis identity with a California outlook, presented with the care the firm’s work deserves.'},
];
