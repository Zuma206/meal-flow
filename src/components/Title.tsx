import { PropsWithChildren } from "react";

export default function Title(props: PropsWithChildren) {
  return (
    <div className="absolute left-0 top-1 flex h-0 w-full justify-center">
      <div>
        <h1 className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-2xl font-black shadow-xl outline outline-1 outline-gray-300">
          {props.children}
        </h1>
      </div>
    </div>
  );
}
