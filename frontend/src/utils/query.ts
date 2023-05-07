import { RequestState, UnionQuestionType } from "../types/types";

const BASE_URL = "http://127.0.0.1:8080";

export const getQuestions = async (): Promise<
  UnionQuestionType[] | undefined
> => {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}/questions`);
  } catch (e: unknown) {
    return undefined;
  }
  if (res.ok) {
    const questions = await res.json();
    return questions as UnionQuestionType[];
  } else {
    return undefined;
  }
};

export const postQuestions = async (
  questions: UnionQuestionType[],
): Promise<RequestState> => {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}/questions`, {
      method: "POST",
      headers: [
        ["Content-Type", "application/json"],
      ],
      body: JSON.stringify(questions),
    });
  } catch (e: unknown) {
    return "error";
  }

  if (res.ok) {
    return "success";
  } else {
    return "error";
  }
};
