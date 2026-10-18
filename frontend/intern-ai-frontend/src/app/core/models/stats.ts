export interface StudentProgress {
  id: string;
  studentId: string;

  quizId: string;
  quizTitle: string;

  topicId: string;

  score: number;
  totalQuestions: number;

  lastQuizDate: string;
  elapsedSeconds?: number;
}

export interface StudentStats {
  totalQuizzes: number;
  totalQuestions: number;
  totalCorrect: number;
  successRate: number;
  progress: StudentProgress[];
}