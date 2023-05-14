import { Question } from "../../../backend/src/model/Interfaces";

export function isSingleChoiceQuestion(question: Question): boolean {
  return question.type === "SINGLE_CHOICE";
}

export function isMultipleChoiceQuestion(question: Question): boolean {
  return question.type === "MULTIPLE_CHOICE";
}

export function isTextAnswerQuestion(question: Question): boolean {
  return question.type === "TEXT";
}
