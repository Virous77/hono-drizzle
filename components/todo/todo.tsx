import { Suspense } from "react";
import AddTodo from "./add-todo";
import AllTodo from "./all-todo";
import { ErrorBoundary } from "react-error-boundary";

const Todo = () => {
  return (
    <main className=" flex items-center justify-center w-screen mt-4">
      <section className=" w-full md:w-[500px] h-fit bg-accent border rounded p-2">
        <h1 className=" text-2xl font-bold">Drizzle Todo</h1>
        <AddTodo />

        <ErrorBoundary fallback={<p>An error occurred </p>}>
          <Suspense fallback={<p>Loading....</p>}>
            <AllTodo />
          </Suspense>
        </ErrorBoundary>
      </section>
    </main>
  );
};

export default Todo;
