import db from "@/db/drizzle";
import { todo } from "@/db/schema";
import { desc } from "drizzle-orm";
import TodoAction from "./todo-action";
import { getTodos } from "@/api/api";

const getAllTodo = async () => {
  const todoList = await db.select().from(todo).orderBy(desc(todo.created_at));
  return todoList;
};

type TTodo = {
  id: string;
  text: string;
  done: boolean;
  created_at: string;
  updated_at: string;
};

const AllTodo = async () => {
  // rest api using hono
  const todos: TTodo[] = await getTodos();

  // server action
  // const todos = await getAllTodo();

  return (
    <div className=" mt-4">
      <h1 className=" text-2xl font-bold underline underline-offset-4">
        All Todo
      </h1>
      {todos.length > 0 ? (
        <ul className=" max-h-[500px] overflow-y-scroll mt-3">
          {todos.map((todo) => {
            return (
              <li
                key={todo.id}
                className="flex justify-between items-center p-2 border-b"
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
