import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { updateTodo } from "./action";
import ButtonComp from "./button-comp";
import { editTodo } from "@/api/api";
import { invalidatePath } from "./revalidate";
import { TTodoHonoPut } from "@/app/api/[[...route]]/route";
import { honoClient } from "./hono-client";

const EditTodo = ({ text, id }: { text: string; id: string }) => {
  const [formData, setFormData] = useState({
    text: text,
    isLoading: false,
  });
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditTodo = async (e: FormData) => {
    try {
      setFormData({ ...formData, isLoading: true });

      // server action
      // await updateTodo({
      //   formData: e,
      //   id,
      // });

      // rest api
      // await editTodo({
      //   formData: e,
      //   id,
      // });

      // hono direct
      await honoClient<TTodoHonoPut>().api.todo[":id"].$put({
        param: { id },
        form: { todo: e.get("todo") as File },
      });

      invalidatePath("/");
      setOpen(false);
      setFormData({ ...formData, isLoading: false });
      toast.success("Todo updated successfully");
    } catch (error) {
      setFormData({ ...formData, isLoading: false });
      toast.error("An error occurred");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>

        <form action={handleEditTodo} className=" flex items-center gap-3">
          <Input
            className=" w-full"
            name="todo"
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          />

          <ButtonComp name="Save" />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodo;
