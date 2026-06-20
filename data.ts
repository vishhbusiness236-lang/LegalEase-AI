import { ReportData } from './types.ts';

export const mockReport: ReportData = {
  classification: "Registration Hold",
  summary: {
    outstandingBalance: "$2,450",
    deadline: "August 15, 2026",
    nextAction: "Submit Payment"
  },
  problemExplanation: "A financial hold has been placed on your account because of an unpaid balance for the Spring 2026 semester. This hold currently prevents you from registering for Fall 2026 classes, requesting official transcripts, or receiving your diploma.",
  amountDue: "$2,450",
  availableOptions: [
    "Installment Payment Plan (IPP)",
    "Short-Term Emergency Loan",
    "Financial Aid Appeal"
  ],
  universityResources: [
    { name: "Student Accounts Office", contact: "studentaccounts@university.edu" },
    { name: "Office of Financial Aid", contact: "finaid@university.edu" },
    { name: "Office of the Registrar", contact: "registrar@university.edu" }
  ],
  externalResources: [
    {
      name: "Federal Student Aid (FAFSA)",
      type: "Government Program",
      description: "Submit or update your FAFSA application to determine eligibility for additional Pell Grants or federal loans.",
      website: "studentaid.gov"
    },
    {
      name: "State Higher Education Grant",
      type: "Official Government Program",
      description: "State-funded grants for resident students experiencing unexpected financial hardship.",
      website: "state.gov/higher-education/grants"
    }
  ],
  deadlines: [
    "August 15, 2026 - Final tuition payment deadline",
    "August 20, 2026 - Fall registration closure"
  ],
  stepsToResolve: [
    { action: "Review account balance via the Student Portal", completed: false },
    { action: "Submit payment or enroll in the IPP", completed: false },
    { action: "Contact Student Accounts to confirm receipt", completed: false },
    { action: "Confirm the hold removal on your profile", completed: false }
  ],
  importantWarnings: [
    "Registration for Fall 2026 will remain blocked until the balance is resolved.",
    "Previously registered courses may be automatically dropped after August 15.",
    "A late fee of $50 will be applied if unpaid by the deadline."
  ],
  officialContact: {
    emails: ["studentaccounts@university.edu", "finaid@university.edu"],
    phones: ["1-800-555-0198 (Billing)", "1-800-555-0200 (Financial Aid)"],
    websites: ["university.edu/billing", "university.edu/finaid"],
    portals: ["Student Gateway Portal (gateway.university.edu)"]
  },
  bottomLine: {
    whatHappened: "You have an unpaid balance from Spring 2026.",
    whatToDo: "Pay the $2,450 balance or set up an Installment Payment Plan.",
    nextPriority: "Resolve this by August 15 to lift the registration block and secure your Fall classes."
  },
  clarifications: [
    "Are there any late fees already included in this $2,450 balance?",
    "Can my financial aid package be reassessed for additional coverage?",
    "If I enroll in the IPP, will the hold be lifted immediately upon the first payment?"
  ]
};
