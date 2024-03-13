"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { addNewTodo } from "./action";
import { useFormStatus } from "react-dom";

const AddTodo = () => {
  const { pending } = useFormStatus();
  const handleAddTodo = async (formData: FormData) => {
    try {
      const res = await addNewTodo(formData);
      console.log(res);
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };
  return (
    <form className=" mt-4 flex items-center gap-2" action={handleAddTodo}>
      <Input
        type="text"
        className=" w-full p-2 border rounded"
        name="todo"
        placeholder="Add a new todo"
      />
      <Button>{pending ? "Adding..." : "Add Todo"}</Button>
    </form>
  );
};

export default AddTodo;
