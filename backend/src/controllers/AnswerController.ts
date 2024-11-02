import { Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import Database from "../model/Database.ts";
import { getJsonRequestBody, hasJsonHeader } from "../utils/requestUtils.ts";
import { Answer } from "../model/Interfaces.ts";
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

router.get("/answers", (ctx) => {
  const { response } = ctx;
  const questions = JSON.stringify(database.getQuestions());
  response.headers.append("content-type", "application/json");
  response.body = questions;
});

router.post("/answers", async (ctx) => {
  const { request, response } = ctx;

  if (hasJsonHeader(request)) {
    const answers = await getJsonRequestBody<Array<Answer>>(request);

    if (answers !== undefined) {
      let databaseResponse = undefined;
      try {
        databaseResponse = await database.addAnswers(answers);
      } catch (e: unknown) {
        errorResponse(response, e as string);
        return;
      }

      if (database) {
        successResponse(response, databaseResponse as unknown as string);
      }
    } else {
      successResponse(response, "Something was wrong with your request body.");
    }
  }
});
