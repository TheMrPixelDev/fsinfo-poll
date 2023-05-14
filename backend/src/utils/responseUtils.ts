import { Response } from "https://deno.land/x/oak/mod.ts";

export type ResponseBody = {
  success: boolean;
  message: string;
};

export const errorResponse = (response: Response, message: string) => {
  response.status = 500;
  response.body = { success: false, message };
};

export const successResponse = <T>(response: Response, content: T) => {
  response.status = 200;
  response.headers.append("Content-Type", "application/json");
  response.body = JSON.stringify(content);
};
