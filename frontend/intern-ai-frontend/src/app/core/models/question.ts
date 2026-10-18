
export interface Question {
  id: string;
  topicId: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface CreateQuestion {
  topicId: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

