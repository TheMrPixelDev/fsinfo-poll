import { errorResponse, successResponse } from "./responseBuilders.ts";
import { Router } from "https://deno.land/x/oak/mod.ts";
import { UnionQuestionType } from "../../frontend/src/types/types.ts";
import { questions, writeToDatabase } from "./model.ts";

export const router = new Router();

router.get("/questions", (ctx) => {
  const { response } = ctx;
  response.headers.append("content-type", "application/json");
  response.body = JSON.stringify(questions);
});

router.post("/questions", async (ctx) => {
  const { request, response } = ctx;
  if (
    request.headers.get("content-type") === "application/json"
  ) {
    let answers: UnionQuestionType[] = [];
    try {
      answers =
        (await request.body({ type: "json" }).value) as UnionQuestionType[];
    } catch (e: unknown) {
      errorResponse(response, e as string);
      return;
    }

    try {
      writeToDatabase(answers);
    } catch (e: unknown) {
      errorResponse(response, e as string);
      return;
    }

    successResponse(response, "Successfully saved answers to file.");
  }
});
