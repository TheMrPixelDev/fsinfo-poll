import { Response } from "https://deno.land/x/oak/mod.ts";

export type ResponseBody = {
  success: boolean;
  message: string;
};

export const errorResponse = (response: Response, message: string) => {
  response.status = 500;
  response.body = { success: false, message };
};

export const successResponse = (response: Response, message: string) => {
  response.status = 200;
  response.body = { success: true, message };
};
