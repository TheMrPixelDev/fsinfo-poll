import { Answer, Question } from "../../../backend/src/model/Interfaces";

const endpointUrl = "http://localhost:7695";

export async function getQuestions() {
  const res = await fetch(endpointUrl + "/questions");

  if (res.ok) {
    const questions = await res.json() as Question[];
    return questions;
  }
}

export async function addQuestion(question: Question) {
  const res = await fetch(endpointUrl + "/question", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(question),
  });

  if (res.ok) {
    const successResponse = await res.json() as Question[];
    return successResponse;
  } else {
    return Promise.reject();
  }
}

export async function deleteQuestion(questionId: string) {
  const res = await fetch(endpointUrl + "/question/" + questionId, {
    method: "DELETE",
  });

  if (res.ok) {
    const successResponse = await res.json();
    return successResponse;
  }
}

export async function postAnswers(answers: Answer[]) {
  const res = await fetch(endpointUrl + "/answers", {
    body: JSON.stringify(answers),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const successResponse = await res.json();
    return successResponse;
  }
}

export async function updateQuestion(updatedQuestion: Question) {
  const res = await fetch(endpointUrl + "/question", {
    method: "PATCH",
    body: JSON.stringify(updatedQuestion),
  });

  if (res.ok) {
    const successResponse = await res.json();
    return successResponse;
  }
}
