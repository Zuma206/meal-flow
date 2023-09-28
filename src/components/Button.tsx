import { useFormMutation } from "@/lib/form-context";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: Props) {
  const mutation = useFormMutation();

  return (
    <button
      {...props}
      className="flex items-center justify-center gap-1 rounded-md bg-gradient-to-b from-gray-50 to-gray-200 px-2 py-1 font-bold shadow-md outline outline-1 outline-gray-400 transition hover:brightness-110 active:brightness-90 disabled:brightness-75"
      disabled={mutation?.isLoading || props.disabled}
    >
      {props.children}
    </button>
  );
}
