import { Question } from "./../types/supabaseTypes";

export function isMultipleChoiceQuestion(question: Question) {
  return question.question_type === "multiple_choice";
}

export function isSingleChoiceQuestion(question: Question) {
  return question.question_type === "single_choice";
}

export function isPlainTextQuestion(question: Question) {
  return question.question_type === "plain_text";
}
