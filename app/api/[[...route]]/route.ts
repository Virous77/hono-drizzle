import { Hono } from "hono";
import { handle } from "hono/vercel";
import db from "@/db/drizzle";
import { todo } from "@/db/schema";
import { asc } from "drizzle-orm";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.get("/todo", async (c) => {
  const data = await db.select().from(todo).orderBy(asc(todo.id));
  return c.json({ data });
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
