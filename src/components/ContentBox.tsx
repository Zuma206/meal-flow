import { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function ContentBox(props: Props) {
  return (
    <textarea
      {...props}
      className="rounded-md bg-gray-100 px-3 py-1 outline outline-1 outline-gray-400 disabled:brightness-75"
    />
  );
}
