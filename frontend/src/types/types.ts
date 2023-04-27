export interface AbstractQuestionType {
  question: string;
}

export interface SingleChoiceQuestionType extends AbstractQuestionType {
  options: OptionType[];
  selectedOption: OptionType | undefined;
}

export interface MultipleChoiceQuestionType extends AbstractQuestionType {
  options: OptionType[];
  selectedOptions: OptionType[];
}

export interface TextAnswerQuestionType extends AbstractQuestionType {
  answer?: string;
}

export interface OptionType {
  label: string;
  value: string | number;
}

export type RequestState = "idle" | "pending" | "success" | "error";

export type UnionQuestionType =
  | SingleChoiceQuestionType
  | MultipleChoiceQuestionType
  | TextAnswerQuestionType;
