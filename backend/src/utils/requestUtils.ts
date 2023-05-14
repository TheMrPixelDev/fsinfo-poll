import { Request } from "https://deno.land/x/oak@v12.1.0/mod.ts";

export function hasJsonHeader(request: Request): boolean {
  return request.headers.get("content-type") === "application/json";
}

export async function getJsonRequestBody<BodyType>(
  request: Request,
): Promise<BodyType | undefined> {
  let body: BodyType;
  try {
    body = (await request.body({ type: "json" }).value) as BodyType;
    console.log(body);
  } catch (_e: unknown) {
    return undefined;
  }

  return body;
}
