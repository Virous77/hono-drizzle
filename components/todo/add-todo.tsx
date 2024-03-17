"use client";

import { toast } from "sonner";
import { Input } from "../ui/input";
import { addNewTodo } from "./action";
import { useRef } from "react";
import ButtonComp from "./button-comp";
import { addNewTodoApi } from "@/api/api";
import { invalidatePath } from "./revalidate";
import { TTodoHonoPost } from "@/app/api/[[...route]]/route";
import { honoClient } from "./hono-client";

const AddTodo = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddTodo = async (formData: FormData) => {
    try {
      // server action
      // await addNewTodo(formData);

      // rest api
      // await addNewTodoApi(formData);

      // hono direct
      honoClient<TTodoHonoPost>().api.todo.$post({
        form: { todo: formData.get("todo") as File },
      });
      invalidatePath("/");
      inputRef!.current!.value = "";
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <form className=" mt-4 flex items-center gap-2" action={handleAddTodo}>
      <Input
        type="text"
        className=" w-full rounded border p-2"
        name="todo"
        placeholder="Add a new todo"
        ref={inputRef}
      />

      <ButtonComp name="Add Todo" />
    </form>
  );
};

export default AddTodo;
