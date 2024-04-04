interface FormState {
  Title?: string;
  Comments?: string;
  DueDate?: string;
  Category?: string;
  Assignee?: string;
  Description?: string;
  TicketStatus?: string;
  IssueType?: string;
}

type AccountFormType = {
  Username: string;
  Password: string;
}

export type {
  FormState,
  AccountFormType
}