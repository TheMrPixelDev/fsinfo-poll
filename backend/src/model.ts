import { UnionQuestionType } from "../../frontend/src/types/types.ts";

export function writeToDatabase(answers: UnionQuestionType[]) {
  const uuid = crypto.randomUUID();
  Deno.writeTextFileSync(
    `./database/answers/answer_${uuid}.json`,
    JSON.stringify(answers),
    {
      create: true,
    },
  );
}

export const questions: UnionQuestionType[] = [
  {
    question: "Frage 1",
    answer: "",
  },
  {
    question: "Frage 2",
    selectedOption: {
      label: "option 1",
      value: 1,
    },
    options: [
      {
        label: "option 1",
        value: 1,
      },
      {
        label: "option 2",
        value: 2,
      },
    ],
  },
  {
    question: "Frage 3",
    selectedOptions: [],
    options: [
      {
        label: "option 1",
        value: 1,
      },
      {
        label: "option 2",
        value: 2,
      },
    ],
  },
];
