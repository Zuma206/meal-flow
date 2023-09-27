import { PropsWithChildren } from "react";

export default function Navbar(props: PropsWithChildren) {
  return (
    <nav className="flex h-full items-center justify-evenly">
      {props.children}
    </nav>
  );
}
