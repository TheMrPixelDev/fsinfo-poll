import { createContext } from "react";
import { Answer, Question } from "../../../backend/src/model/Interfaces";
import { Notification } from "../types/types";
import { ApplicationMode } from "../types/enums";

export const AnswerContext = createContext<
  { answers: Answer[]; setAnswers: (answers: Answer[]) => void }
>({ answers: [], setAnswers: () => {} });

export const QuestionContext = createContext<
  { questions: Question[]; setQuestions: (questions: Question[]) => void }
>({ questions: [], setQuestions: () => {} });

export const PollStatusContext = createContext<
  { status: ApplicationMode; setPollStatus: (status: ApplicationMode) => void }
>({ status: ApplicationMode.IDLE, setPollStatus: () => {} });

export const NotificationContext = createContext<
  {
    notification?: Notification;
    setNotification: (notification?: Notification) => void;
  }
>({ notification: undefined, setNotification: () => {} });
