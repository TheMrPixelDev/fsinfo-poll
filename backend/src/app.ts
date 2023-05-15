import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import { router as questionsRouter } from "./controllers/QuestionController.ts";
import { router as answersRouter } from "./controllers/AnswerController.ts";
const app = new Application();

app.use(oakCors());

app.use(questionsRouter.routes());
app.use(questionsRouter.allowedMethods());

app.use(answersRouter.routes());
app.use(questionsRouter.allowedMethods());

app.listen({ port: 8000, hostname: "127.0.0.1" });
