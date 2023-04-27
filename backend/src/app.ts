import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import { router } from "./controller.ts";
const app = new Application();

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080, hostname: "127.0.0.1" });
