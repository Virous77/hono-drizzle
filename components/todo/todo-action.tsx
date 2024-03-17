"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { deleteTodo } from "./action";
import { useState } from "react";
import EditTodo from "./edit-todo";
import { deleteTodoApi } from "@/api/api";
import { invalidatePath } from "./revalidate";
import { TTodoHonoDelete } from "@/app/api/[[...route]]/route";
import { honoClient } from "./hono-client";

const TodoAction = ({ id, text }: { id: string; text: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteTodo = async () => {
    try {
      setIsLoading(true);
      // server action
      // const res = await deleteTodo(id);

      // rest api
      // const res = await deleteTodoApi(id);

      // hono direct
      const res = await honoClient<TTodoHonoDelete>().api.todo[":id"].$delete({
        param: { id },
      });
      const data = await res.json();
      invalidatePath("/");
      setIsLoading(false);
      toast.success(data.message);
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred");
    }
  };
  return (
    <div className=" flex items-center gap-3">
      <EditTodo id={id} text={text} />
      <Button variant="destructive" onClick={handleDeleteTodo}>
        {isLoading ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
};

export default TodoAction;
