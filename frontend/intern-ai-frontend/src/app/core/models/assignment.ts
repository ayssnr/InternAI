export interface Assignment {
  id: string;
  studentId?: string;
  topicId: string;
  studentName?: string;
  topicName: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  createdAt: string;
}

export interface CreateAssignment {
  studentId: string;
  topicId: string;
  title: string;
  description: string;
  dueDate: string;
}