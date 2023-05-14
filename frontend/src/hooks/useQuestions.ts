import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Question } from "../../../backend/src/model/Interfaces";
import {
  addQuestion,
  deleteQuestion,
  getQuestions,
  updateQuestion,
} from "../utils/endpoints";

export function useQuestions() {
  const querieClient = useQueryClient();

  const questions = useQuery<Question[] | undefined>({
    queryKey: ["questions"],
    queryFn: getQuestions,
  });

  const deleteQuestionMutation = useMutation({
    mutationFn: async (questionId: string) => {
      return await deleteQuestion(questionId);
    },
    onSuccess: () =>
      querieClient.invalidateQueries({ queryKey: ["questions"] }),
  });

  const addQuestionMutation = useMutation({
    mutationFn: async (questionState: Question) => {
      switch (questionState.type) {
        case "MULTIPLE_CHOICE":
          return await addQuestion({
            type: questionState.type,
            text: questionState.text,
            options: questionState.options,
          });
        case "SINGLE_CHOICE":
          return await addQuestion({
            type: questionState.type,
            text: questionState.text,
            options: questionState.options,
          });
        case "TEXT":
          return await addQuestion({
            type: questionState.type,
            text: questionState.text,
          });
      }
    },
    onSuccess: () =>
      querieClient.invalidateQueries({ queryKey: ["questions"] }),
  });

  const updateQuestionMutation = useMutation({
    mutationFn: async (updatedQuestion: Question) => {
      return await updateQuestion(updatedQuestion);
    },
  });

  return {
    questions,
    addQuestionMutation,
    deleteQuestionMutation,
    updateQuestionMutation,
  };
}
