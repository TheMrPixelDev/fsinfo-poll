import {
  MultipleChoiceQuestionType,
  SingleChoiceQuestionType,
  TextAnswerQuestionType,
  UnionQuestionType,
} from "../types/types";

export function isSingleChoiceQuestion(
  question: UnionQuestionType,
): question is SingleChoiceQuestionType {
  return "selectedOption" in question;
}

export function isMultipleChoiceQuestion(
  question: UnionQuestionType,
): question is MultipleChoiceQuestionType {
  return "selectedOptions" in question;
}

export function isTextAnswerQuestion(
  question: UnionQuestionType,
): question is TextAnswerQuestionType {
  return "answer" in question;
}
