import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

const commonError = (error: unknown) => {
  if (error instanceof AxiosError) {
    throw new Error(
      error.response?.data.message || error.message || "An error occurred"
    );
  }
  throw new Error("An error occurred");
};

export const getTodos = async <T>() => {
  try {
    const res = await fetch("http://localhost:3000/api/todo");
    const data = await res.json();
    return data.data as T;
  } catch (error) {
    throw new Error("An error occurred");
  }
};

export const addNewTodoApi = async (formData: FormData) => {
  try {
    const res = await api.post("/todo", formData);
    return res.data;
  } catch (error: unknown) {
    commonError(error);
  }
};

export const deleteTodoApi = async (id: string) => {
  try {
    const res = await api.delete(`/todo/${id}`);
    return res.data;
  } catch (error) {
    commonError(error);
  }
};

export const editTodo = async ({
  formData,
  id,
}: {
  formData: FormData;
  id: string;
}) => {
  try {
    const res = await api.put(`/todo/${id}`, formData);
    return res.data;
  } catch (error) {
    commonError(error);
  }
};
