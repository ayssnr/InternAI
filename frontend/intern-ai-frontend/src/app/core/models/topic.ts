export interface Topic {
  id: string;
  name: string;
  description: string;
  isAiGenerated: boolean;
  studentId?: string;
}