interface Question {
  id: number;
  heading: string;
  question: string;
  options?: { label: string; goTo?: number; explanation?: string, response?: string, complete?: boolean }[];
}

export type { Question };
