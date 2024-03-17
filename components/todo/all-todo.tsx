import db from "@/db/drizzle";
import { todo } from "@/db/schema";
import { desc } from "drizzle-orm";
import TodoAction from "./todo-action";
import { getTodos } from "@/api/api";
import { TTodoHonoGet } from "@/app/api/[[...route]]/route";
import { honoClient } from "./hono-client";

const getAllTodo = async () => {
  const todoList = await db.select().from(todo).orderBy(desc(todo.created_at));
  return todoList;
};

export type TTodo = {
  id: string;
  text: string;
  done: boolean;
  created_at: string | null;
  updated_at: string | null;
};

const AllTodo = async () => {
  // rest api using hono
  // const todos = await getTodos<TTodo[]>();

  // drizzle direct
  // const todos = await getAllTodo();

  // hono direct
  const res = await honoClient<TTodoHonoGet>().api.todo.$get();
  const { data: todos, message } = await res.json();

  if (!todos && message) {
    throw new Error(message);
  }

  return (
    <div className=" mt-4">
      <h1 className=" text-2xl font-bold underline underline-offset-4">
        All Todo
      </h1>
      {todos && todos.length > 0 ? (
        <ul className=" mt-3 max-h-[500px] overflow-y-scroll">
          {todos.map((todo) => {
            return (
              <li
                key={todo.id}
                className="flex items-center justify-between border-b p-2"
              >
                <p>{todo.text}</p>
                <TodoAction id={todo.id} text={todo.text} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No todo found</p>
      )}
    </div>
  );
};

export default AllTodo;
