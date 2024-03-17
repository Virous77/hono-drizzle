import { Suspense } from "react";
import AddTodo from "./add-todo";
import AllTodo from "./all-todo";
import { ErrorBoundary } from "react-error-boundary";

const Todo = () => {
  return (
    <main className=" mt-4 flex w-screen items-center justify-center">
      <section className=" bg-accent h-fit w-full rounded border p-2 md:w-[500px]">
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
