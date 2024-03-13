"use server";

import axios from "axios";

const API_URL = "http://localhost:3000/api/todo";

type TTodo = {
  id: number;
  text: string;
};

const addTodo = async (data: TTodo) => {
  try {
    const res = await axios.post(API_URL, data);
    return res.data;
  } catch (error: any) {
    throw new Error("An error occurred");
  }
};

export const addNewTodo = async (formData: FormData) => {
  const todo = formData.get("todo");
  if (!todo || String(todo).trim() === "") {
    throw new Error("Todo cannot be empty");
  }
  const data = { text: String(todo), id: Math.floor(Math.random() * 1000) };
  return addTodo(data);
};
