import { ObjectId } from "npm:mongodb@latest";

export type QuestionAnswerType = "TEXT" | "MULTIPLE_CHOICE" | "SINGLE_CHOICE";

export interface Question {
  _id?: ObjectId;
  type: QuestionAnswerType;
  text: string;
  options?: Option[];
}

export interface Answer {
  _id?: ObjectId;
  ofQuestion: ObjectId | Question;
  type: QuestionAnswerType;
  text?: string;
  options?: Option[];
}

export interface Option {
  _id?: ObjectId;
  value: string | number;
}
