import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  padded?: boolean;
};

export default function Card(props: Props) {
  return (
    <div
      className={`overflow-y-scroll rounded-lg bg-white shadow-lg ${
        props.padded ? "px-5 py-12" : ""
      }`}
    >
      {props.children}
    </div>
  );
}
