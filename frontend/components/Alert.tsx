import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  message: string;
};

export default function Alert(props: Props) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 opacity-50">
      <props.icon className="text-5xl" />
      <h1 className="max-w-xs text-center text-3xl font-semibold">
        {props.message}
      </h1>
    </div>
  );
}
