import { useFormMutation } from "@/lib/form-context";
import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function InputField(props: Props) {
  const mutation = useFormMutation();

  return (
    <input
      {...props}
      className="rounded-md bg-gray-100 px-3 py-1 outline outline-1 outline-gray-400 disabled:brightness-75"
      disabled={mutation?.isLoading || props.disabled}
    />
  );
}
