export interface Option {
  id: number;
  created_at: string;
  option_text: string;
}

export interface Category {
  id: number;
  created_at: string;
  name: string;
}

export interface Question {
  id: number;
  category: Category;
  created_at: string;
  question_text: string;
  question_type: QuestionType;
  option?: Option[];
}

export type QuestionType = "multiple_choice" | "single_choice" | "plain_text";

export interface Submission {
  id: number;
  user_pseudonym: string;
  created_at: string;
}

export interface Answer {
  id: number;
  created_at: string;
  question: Question;
  answer_text?: string;
  option?: Option[] | Option;
}
