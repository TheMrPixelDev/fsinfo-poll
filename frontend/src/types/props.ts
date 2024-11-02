import { Answer, Question } from "../../../backend/src/model/Interfaces";

export type QuestionComponentProps = {
  onAnswerChange?: (answer: Answer) => void;
  readonly?: boolean;
  question: Question;
};
