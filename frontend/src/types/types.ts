/**
 * Question Types which are being sent from the backend.
 */

export interface AbstractQuestionType {
  questionUUID: string;
  question: string;
}

export interface SingleChoiceQuestionType extends AbstractQuestionType {
  options: OptionType[];
}

export interface MultipleChoiceQuestionType extends AbstractQuestionType {
  options: OptionType[];
}

export interface TextAnswerQuestionType extends AbstractQuestionType {
}

export type UnionQuestionType =
  | SingleChoiceQuestionType
  | MultipleChoiceQuestionType
  | TextAnswerQuestionType;

/**
 * Answer Types which are being sent to the backend.
 */
export interface AbstractAnswerType {
  answerUUID: string;
  questionUUID: string;
}

export interface SingleChoiceAnswerType extends AbstractAnswerType {
  selectedOption: OptionType;
}

export interface MultipleChoiceAnswerType extends AbstractAnswerType {
  selectedOptions: OptionType[];
}

export interface TextAnswerType extends AbstractAnswerType {
  answer: string;
}

export type UnionAnswerType =
  | SingleChoiceAnswerType
  | MultipleChoiceAnswerType
  | TextAnswerType;

/**
 * General Types are share between frontend and backend.
 */
export interface OptionType {
  label: string;
  value: string | number;
}

export type QuestionType = "single_choice" | "multi_choice" | "text";

export type ContentType = "question" | "answer";

export type RequestState = "idle" | "pending" | "success" | "error";

export interface MessageContainer {
  readonly questionType: QuestionType;
  readonly contentType: ContentType;
  readonly question: UnionQuestionType | UnionAnswerType;
}
