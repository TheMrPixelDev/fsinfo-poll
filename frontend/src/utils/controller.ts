import { UnionQuestionType } from "../types/types";

const BASE_URL = "http://127.0.0.1:8080";

export const getQuestions = async (): Promise<
  UnionQuestionType[] | undefined
> => {
  const response = await fetch(`${BASE_URL}/questions`);
  if (response.ok) {
    const questions = await response.json();
    return questions as UnionQuestionType[];
  } else undefined;
};
