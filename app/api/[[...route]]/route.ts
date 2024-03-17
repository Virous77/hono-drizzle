import { Hono } from "hono";
import { handle } from "hono/vercel";
import db from "@/db/drizzle";
import { todo } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import z from "zod";
import { v4 as uuidv4 } from "uuid";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const getRoute = app.get("/todo", async (c) => {
  try {
    const data = await db.select().from(todo).orderBy(desc(todo.created_at));
    return c.json({ data, message: "Todos fetched successfully" });
  } catch (error) {
    return c.json({ message: "An error occurred", data: null }, 400);
  }
});

const todoSchema = z.object({
  todo: z.string().min(1, { message: "Todo text is required" }),
});

const postRoute = app.post(
  "/todo",
  zValidator("form", todoSchema, (result, c) => {
    if (!result.success) {
      return c.json({ message: result.error.errors[0].message }, 400);
    }
  }),
  async (c) => {
    try {
      const { todo: text } = c.req.valid("form");
      await db.insert(todo).values({
        id: uuidv4(),
        text: text,
      });
      return c.json({ message: "Todo created successfully" });
    } catch (error) {
      return c.json({ message: "An error occurred" }, 400);
    }
  },
);

const putRoute = app.put(
  "/todo/:id",
  zValidator("form", todoSchema, (result, c) => {
    if (!result.success) {
      return c.json({ message: result.error.errors[0].message }, 400);
    }
  }),
  async (c) => {
    try {
      const id = c.req.param("id");
      const { todo: text } = c.req.valid("form");
      await db.update(todo).set({ text }).where(eq(todo.id, id));
      return c.json({ message: "Todo updated successfully" });
    } catch (error) {
      return c.json({ message: "An error occurred" }, 400);
    }
  },
);

const deleteRoute = app.delete("/todo/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await db.delete(todo).where(eq(todo.id, id));
    return c.json({ message: "Todo deleted successfully" });
  } catch (error) {
    return c.json({ message: "An error occurred" }, 400);
  }
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type TTodoHonoGet = typeof getRoute;
export type TTodoHonoPost = typeof postRoute;
export type TTodoHonoPut = typeof putRoute;
export type TTodoHonoDelete = typeof deleteRoute;
