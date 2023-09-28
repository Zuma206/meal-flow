import { FiLoader } from "react-icons/fi";

export default function Loader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <FiLoader className="animate-spin text-5xl opacity-60" />
    </div>
  );
}
