import { ButtonHTMLAttributes, ReactNode } from "react";
import Button from "./Button";
import { useFormMutation } from "@/lib/form-context";
import { FiLoader } from "react-icons/fi";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
};

export default function FormButton(props: Props) {
  const mutation = useFormMutation();

  return (
    <Button {...props}>
      {mutation?.isLoading ? <FiLoader className="animate-spin" /> : props.icon}{" "}
      {props.children}
    </Button>
  );
}
