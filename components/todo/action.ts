"use server";

import db from "@/db/drizzle";
import { todo } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

export const addNewTodo = async (formData: FormData) => {
  try {
    const newTodo = formData.get("todo");
    if (!newTodo || String(newTodo).trim() === "") {
      throw new Error("Todo cannot be empty");
    }
    await db.insert(todo).values({
      id: uuidv4(),
      text: String(newTodo),
    });
    revalidatePath("/");
    return { message: "Todo created successfully" };
  } catch (error) {
    throw new Error("An error occurred");
  }
};

export const deleteTodo = async (id: string) => {
  try {
    await db.delete(todo).where(eq(todo.id, id));
    revalidatePath("/");
    return { message: "Todo deleted successfully" };
  } catch (error) {
    throw new Error("An error occurred");
  }
};

export const updateTodo = async ({
  formData,
  id,
}: {
  formData: FormData;
  id: string;
}) => {
  try {
    const text = formData.get("todo")?.toString();
    if (!text || String(text).trim() === "") {
      throw new Error("Todo cannot be empty");
    }

    await db.update(todo).set({ text }).where(eq(todo.id, id));
    revalidatePath("/");
    return { message: "Todo updated successfully" };
  } catch (error) {
    throw new Error("An error occurred");
  }
};
