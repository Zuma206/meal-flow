import { PropsWithChildren } from "react";

export default function ErrorMessage(props: PropsWithChildren) {
  return <p className="text-red-500">{props.children}</p>;
}
