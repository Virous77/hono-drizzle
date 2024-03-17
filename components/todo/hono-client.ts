import { Hono } from "hono";
import { hc } from "hono/client";

export const honoClient = <T extends Hono<any, any, any>>() => {
  return hc<T>("http://localhost:3000");
};
