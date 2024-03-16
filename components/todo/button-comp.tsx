import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

const ButtonComp = ({ name }: { name: string }) => {
  const { pending } = useFormStatus();
  return <Button>{pending ? "Loading.." : name}</Button>;
};

export default ButtonComp;
