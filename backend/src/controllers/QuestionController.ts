import { Router } from "https://deno.land/x/oak/mod.ts";
import Database from "../model/Database.ts";
import { getJsonRequestBody, hasJsonHeader } from "../utils/requestUtils.ts";
import { Question } from "../model/Interfaces.ts";
import { errorResponse, successResponse } from "../utils/responseUtils.ts";
import { load } from "https://deno.land/std/dotenv/mod.ts";

export const router = new Router();

const password = Deno.env.get("MONGO_PASSWORD");
const username = Deno.env.get("MONGO_USERNAME");
const mongoUrl = Deno.env.get("MONGO_URL");

const env = await load();
const localEnvPassword = env["MONGO_PASSWORD"];
const localEnvUsername = env["MONGO_USERNAME"];
const localMongoUrl = env["MONGO_URL"];

const database = new Database(
  username !== undefined ? username : localEnvUsername,
  password !== undefined ? password : localEnvPassword,
  mongoUrl !== undefined ? mongoUrl : localMongoUrl,
);

router.get("/questions", async (ctx) => {
  const { response } = ctx;
  response.headers.append("content-type", "application/json");
  response.body = JSON.stringify(await database.getQuestions());
});

router.post("/question", async (ctx) => {
  const { request, response } = ctx;

  if (hasJsonHeader(request)) {
    const question = await getJsonRequestBody<Question>(request);

    if (question !== undefined) {
      let databaseResponse = undefined;
      try {
        databaseResponse = await database.addQuestion(question);
      } catch (e: unknown) {
        errorResponse(response, e as string);
        return;
      }

      if (databaseResponse.acknowledged) {
        const mutatedQuestions = await database.getQuestions();
        return successResponse<Question[]>(response, mutatedQuestions);
      } else {
        errorResponse(
          response,
          "Something went wrong during refetching mutated Questions.",
        );
      }
    }
  } else {
    return errorResponse(
      response,
      "Something is wrong with your request body.",
    );
  }
});

router.delete("/question/:questionId", async (ctx) => {
  const { params, response } = ctx;

  if (params.questionId !== undefined) {
    let databaseResponse = undefined;
    try {
      databaseResponse = await database.deleteQuestion(params.questionId);
    } catch (e: unknown) {
      errorResponse(response, e as string);
      return;
    }

    successResponse(response, databaseResponse as unknown as string);
  }
});

router.patch("/question", async (ctx) => {
  const { request, response } = ctx;

  if (hasJsonHeader(request)) {
    const question = await getJsonRequestBody<Question>(request);

    if (question !== undefined) {
      let databaseResponse = undefined;
      try {
        databaseResponse = await database.updateQuestion(question);
      } catch (e: unknown) {
        errorResponse(response, e as string);
        return;
      }

      if (databaseResponse.acknowledged) {
        const updatedQuestions = await database.getQuestions();
        return successResponse<Question[]>(response, updatedQuestions);
      } else {
        errorResponse(
          response,
          "Something went wrong when updating the given question",
        );
      }
    }
  }
});
