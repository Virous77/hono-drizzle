import { Hono } from "hono";
import { handle } from "hono/vercel";
import db from "@/db/drizzle";
import { todo } from "@/db/schema";
import { asc } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import z from "zod";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.get("/todo", async (c) => {
  const data = await db.select().from(todo).orderBy(asc(todo.id));
  return c.json({ data });
});

app.post(
  "/todo",
  zValidator(
    "json",
    z.object({
      text: z.string(),
      id: z.number().min(1, { message: "id must be greater than 0" }),
    })
  ),
  async (c) => {
    const { text, id } = c.req.valid("json");
    await db.insert(todo).values({
      id: id,
      text: text,
    });
    return c.json({ message: "Todo created successfully" });
  }
);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
