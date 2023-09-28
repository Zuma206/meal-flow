import { Link } from "react-router-dom";

export default function Day() {
  return (
    <Link
      to="#"
      className="flex items-center justify-between gap-2 rounded-md bg-gray-100 p-2 shadow-md"
    >
      <span className="text-2xl font-bold">Monday</span>
      <span className="relative overflow-x-hidden whitespace-nowrap text-xl opacity-50 before:absolute before:h-full before:w-full before:bg-gradient-to-r before:from-transparent before:from-85% before:to-gray-100 sm:before:hidden">
        Curry
      </span>
    </Link>
  );
}
