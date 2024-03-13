import AddTodo from "./add-todo";

const Todo = () => {
  return (
    <main className=" flex items-center justify-center w-screen mt-4">
      <section className=" w-full md:w-[500px] h-fit bg-accent border rounded p-2">
        <div>
          <h1 className=" text-2xl font-bold">Hono Drizzle Todo</h1>
          <AddTodo />
        </div>
      </section>
    </main>
  );
};

export default Todo;
