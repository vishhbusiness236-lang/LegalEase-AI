export type FlowState = 'LOGIN' | 'HOME' | 'PROCESSING' | 'WORKSPACE';

export interface ReportData {
  classification: string;
  summary: {
    outstandingBalance: string;
    deadline: string;
    nextAction: string;
  };
  problemExplanation: string;
  amountDue: string;
  availableOptions: string[];
  universityResources: {
    name: string;
    contact?: string;
  }[];
  externalResources: {
    name: string;
    type: string;
    description: string;
    website: string;
  }[];
  deadlines: string[];
  stepsToResolve: {
    action: string;
    completed: boolean;
  }[];
  importantWarnings: string[];
  officialContact: {
    emails: string[];
    phones: string[];
    websites: string[];
    portals: string[];
  };
  bottomLine: {
    whatHappened: string;
    whatToDo: string;
    nextPriority: string;
  };
  clarifications?: string[];
}
