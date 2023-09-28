import { useFormMutation } from "@/lib/form-context";
import { ButtonHTMLAttributes, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  to?: string;
};

export default function Button(props: Props) {
  const mutation = useFormMutation();
  const navigate = useNavigate();

  function onClick(e: MouseEvent<HTMLButtonElement>) {
    if (props.to) navigate(props.to);
    else if (props.onClick) props.onClick(e);
  }

  return (
    <button
      {...props}
      className="flex items-center justify-center gap-1 rounded-md bg-gradient-to-b from-gray-50 to-gray-200 px-2 py-1 font-bold shadow-md outline outline-1 outline-gray-400 transition hover:brightness-110 active:brightness-90 disabled:brightness-75"
      disabled={mutation?.isLoading || props.disabled}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
}
