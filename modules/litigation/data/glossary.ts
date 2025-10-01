export interface GlossaryEntry {
  term: string;
  definition: string;
  category?: 'procedure' | 'role' | 'document' | 'general';
}

export const glossaryTerms: Record<string, GlossaryEntry> = {
  'plaintiff': {
    term: 'Plaintiff',
    definition: 'The person or party who initiates a lawsuit by filing a complaint in court.',
    category: 'role',
  },
  'defendant': {
    term: 'Defendant',
    definition: 'The person or party against whom a lawsuit is filed.',
    category: 'role',
  },
  'complaint': {
    term: 'Complaint',
    definition: 'The initial legal document filed by the plaintiff that starts a lawsuit, outlining the claims and relief sought.',
    category: 'document',
  },
  'service of process': {
    term: 'Service of Process',
    definition: 'The formal procedure of delivering legal documents to notify a party of a lawsuit.',
    category: 'procedure',
  },
  'discovery': {
    term: 'Discovery',
    definition: 'The pre-trial phase where both parties exchange evidence, documents, and information through depositions, interrogatories, and requests for production.',
    category: 'procedure',
  },
  'deposition': {
    term: 'Deposition',
    definition: 'A formal proceeding where a witness provides sworn testimony outside of court, usually in an attorney\'s office.',
    category: 'procedure',
  },
  'interrogatories': {
    term: 'Interrogatories',
    definition: 'Written questions that one party sends to another, which must be answered under oath as part of discovery.',
    category: 'procedure',
  },
  'summary judgment': {
    term: 'Summary Judgment',
    definition: 'A court decision made without a full trial, when the judge determines there are no genuine disputes of material fact.',
    category: 'procedure',
  },
  'mediation': {
    term: 'Mediation',
    definition: 'A form of alternative dispute resolution where a neutral third party helps the parties reach a voluntary settlement.',
    category: 'procedure',
  },
  'statute of limitations': {
    term: 'Statute of Limitations',
    definition: 'The legal deadline by which a lawsuit must be filed. Missing this deadline typically bars the claim permanently.',
    category: 'general',
  },
  'pro se': {
    term: 'Pro Se',
    definition: 'Latin term meaning "for oneself." A pro se litigant represents themselves in court without an attorney.',
    category: 'role',
  },
  'self-represented litigant': {
    term: 'Self-Represented Litigant',
    definition: 'A person who represents themselves in court without hiring an attorney. Also called a pro se litigant.',
    category: 'role',
  },
  'breach of contract': {
    term: 'Breach of Contract',
    definition: 'A violation of the terms of a binding agreement, which can be grounds for a lawsuit.',
    category: 'general',
  },
  'negligence': {
    term: 'Negligence',
    definition: 'Failure to exercise reasonable care, resulting in damage or injury to another party.',
    category: 'general',
  },
  'fraud': {
    term: 'Fraud',
    definition: 'Intentional deception or misrepresentation made for personal gain or to damage another party.',
    category: 'general',
  },
  'lep': {
    term: 'LEP',
    definition: 'Limited English Proficiency. Refers to individuals who do not speak English as their primary language and have limited ability to read, write, speak, or understand English.',
    category: 'general',
  },
  'judgment': {
    term: 'Judgment',
    definition: 'The final decision issued by a court in a lawsuit.',
    category: 'general',
  },
  'appeal': {
    term: 'Appeal',
    definition: 'A request to a higher court to review and change the decision of a lower court.',
    category: 'procedure',
  },
  'civil litigation': {
    term: 'Civil Litigation',
    definition: 'Legal disputes between individuals or organizations where one party seeks compensation or other remedies, as opposed to criminal prosecution.',
    category: 'general',
  },
  'small claims': {
    term: 'Small Claims',
    definition: 'A simplified court process for resolving disputes involving smaller amounts of money, typically without attorneys.',
    category: 'general',
  },
};

export function findGlossaryTerm(text: string): GlossaryEntry | undefined {
  const lowerText = text.toLowerCase();
  return glossaryTerms[lowerText];
}

export function getAllGlossaryTerms(): GlossaryEntry[] {
  return Object.values(glossaryTerms);
}
