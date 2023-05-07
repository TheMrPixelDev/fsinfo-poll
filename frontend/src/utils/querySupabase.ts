import { Question } from "../types/supabaseTypes";

const SUPABASE_BASE_URL = "https://ysrpfpqlnditvrghhgfv.supabase.co/rest/v1";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzcnBmcHFsbmRpdHZyZ2hoZ2Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMxMzk5ODksImV4cCI6MTk5ODcxNTk4OX0.-Rhfl54rhChMV162NBxm69-O4HyDYcQpmgzQ5QOWx94";

export const getQuestions = async (): Promise<Question[]> => {
  const result = await fetch(
    SUPABASE_BASE_URL +
      "/question?select=id,question_text,created_at,multiple_answers,option(id, created_at, option_text)",
    {
      headers: [
        ["apikey", SUPABASE_API_KEY],
      ],
    },
  );
  return await result.json() as ChoiceQuestion[];
};
