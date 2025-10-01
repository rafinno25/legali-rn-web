import Ionicons from '@expo/vector-icons/Ionicons';

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  gradientColors: [string, string];
  content: TopicSection[];
}

export interface TopicSection {
  title?: string;
  content: string;
  level?: 'h1' | 'h2' | 'h3';
}

export const topics: Topic[] = [
  {
    id: 'stages',
    title: 'Stages of Litigation',
    description: 'Learn about the key phases of a civil lawsuit from filing to appeal',
    icon: 'list-outline',
    gradientColors: ['#3FA7CC', '#5BB8D9'],
    content: [
      {
        title: 'Overview',
        content: 'Any litigant in a civil law case typically goes through several key stages: pre-filing, filing the complaint, discovery, motions and requests, settlement discussions, trial, and potential post-trial appeals.',
      },
      {
        title: 'Pre-Filing',
        content: 'Parties usually attempt informal resolution, such as negotiation or mediation.',
      },
      {
        title: 'Filing the Complaint',
        content: 'The lawsuit officially begins when the plaintiff files a complaint in court, followed by service of process to notify the defendant.',
      },
      {
        title: 'Discovery',
        content: 'Both sides exchange evidence, conduct depositions, submit interrogatories, and procure relevant documents.',
      },
      {
        title: 'Motions and Requests',
        content: 'Critical legal issues are addressed before trial through motions, such as requests for summary judgment or procedural changes.',
      },
      {
        title: 'Settlement Discussions',
        content: 'Courts often encourage parties to resolve disputes through mediation or negotiation, potentially avoiding trial.',
      },
      {
        title: 'Trial',
        content: 'Parties present their arguments, evidence, and witness testimony to a judge (or jury), after which the court issues a ruling.',
      },
      {
        title: 'Post-Trial Motions and Appeals',
        content: 'Parties may request post-trial relief or appeal the judgment if legal errors occurred.',
      },
    ],
  },
  {
    id: 'should-you-sue',
    title: 'Should You Sue?',
    description: 'Key questions to ask before filing a lawsuit',
    icon: 'help-circle-outline',
    gradientColors: ['#6366F1', '#8B5CF6'],
    content: [
      {
        title: 'Introduction',
        content: 'Are you facing a dispute and wondering if legal action is the right step? Before moving forward, it\'s important to know whether litigation is worth your time, money, and energy. Here\'s what you need to consider before filing a case.',
      },
      {
        title: '1. Is There a Valid Claim?',
        content: 'Make sure your dispute involves a recognized legal wrong—such as breach of contract, negligence, or fraud. If you aren\'t sure, use our tools to review your situation.',
      },
      {
        title: '2. Do You Have Strong Evidence?',
        content: 'Successful cases rely on clear evidence—think documents, emails, contracts, or witness statements. The stronger your evidence, the better your chances in court.',
      },
      {
        title: '3. Are You Within Legal Deadlines?',
        content: 'Most claims have strict filing limits known as statute of limitations. If too much time has passed, your case may not be allowed—no matter how strong it is.',
      },
      {
        title: '4. Is the Case Worth the Cost?',
        content: 'Litigation can be expensive and time-consuming. Weigh the money or relief you hope to recover against expected legal fees, lost time, and stress. This is also why we are building Legali.',
      },
      {
        title: '5. Can the Other Side Pay?',
        content: 'Even if you win, you\'ll need to collect what the court awards. Check if the other party has the means or assets to actually pay a judgment.',
      },
      {
        title: '6. Could This Harm Key Relationships?',
        content: 'Lawsuits can damage business or personal connections. Consider whether a court battle may cause long-term fallout you want to avoid.',
      },
      {
        title: '7. Have You Tried Other Solutions?',
        content: 'Alternatives like demand letters, negotiation, or mediation can resolve conflicts quickly and cost-effectively. They might help you reach a fair outcome—without ever stepping into court.',
      },
    ],
  },
  {
    id: 'self-representation',
    title: 'Self-Representation Guide',
    description: 'What you need to know as a pro se litigant',
    icon: 'person-outline',
    gradientColors: ['#F59E0B', '#F97316'],
    content: [
      {
        title: 'What is a Self-Represented Litigant?',
        content: 'If an individual appears in court for a legal dispute—filing papers, responding to a lawsuit, or attending hearings—without an attorney representing them, they are a self-represented litigant (also called pro se litigant).',
      },
      {
        title: 'How To Assess If You\'re Self-Represented',
        content: '● If no attorney is helping with filings, arguments, or court appearances, you are self-representing.\n● You sign court documents yourself (rather than through an attorney).\n● Court communications and notices come directly to you, not to a lawyer.\n● If you fill out official forms and act in your own name in court proceedings, you are a self-represented litigant.',
      },
      {
        title: 'What to Do',
        content: '● Learn and follow all court rules: This includes deadlines, format requirements, and evidence rules—courts hold you to the same standards as attorneys.\n● Use self-help resources: Courts have online guides, self-help centers, and standardized forms to support self-represented litigants.\n● Keep organized records: Retain copies of every document filed or received, and track all deadlines carefully.\n● Communicate professionally: Judges expect respectful, clear presentations in filings and in-person.\n● Don\'t expect special help: Judges and staff cannot provide legal advice or act as your advocate.\n● Consider complexity: If your case involves difficult legal issues, seek legal advice as early as possible.',
      },
      {
        title: 'Common Pitfalls',
        content: '● Missing deadlines or ignoring procedural rules can result in dismissal or loss of rights.\n● Emotional attachment to the case may cause overconfidence or errors under pressure.\n● Failure to understand legal terms, evidence rules, and courtroom procedures can lead to costly mistakes.\n● Sometimes the other side is represented by an attorney, creating an asymmetry in negotiation and litigation strategy.',
      },
    ],
  },
  {
    id: 'language-access',
    title: 'Language Access & Interpreters',
    description: 'Rights and resources for non-English speakers',
    icon: 'language-outline',
    gradientColors: ['#10B981', '#14B8A6'],
    content: [
      {
        title: 'Your Rights',
        content: 'For parties who do not speak English, a court-certified interpreter needs to be hired—the court system in many US jurisdictions provides interpreters for limited English proficient litigants, often at no cost, though the specifics may vary depending on the state and funding availability.',
      },
      {
        title: 'Key Points',
        content: '● Parties with limited English proficiency (LEP) have a right to a court-appointed interpreter for all meaningful participation in judicial proceedings.\n● In California and many other states, court interpreters are generally provided at no cost to parties regardless of their income, although availability may depend on court funding or specific language needs.\n● Key evidence, declarations, or witness statements from non-English speakers must be officially translated—often requiring certified translations for admissibility.',
      },
      {
        title: 'Typical Costs',
        content: '● Court-Provided: In state courts with language access funding, interpreters are generally free for parties in civil litigation.\n● Private Services: Where court-funded interpreters are unavailable, commercial interpreter rates typically range from $50–$150 per hour, with certified legal translators charging additional fees for document translation.',
      },
    ],
  },
];

export function getTopicById(id: string): Topic | undefined {
  return topics.find(topic => topic.id === id);
}
