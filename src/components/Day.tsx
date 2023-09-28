import { select, type Day, type Recipe } from "@/lib";
import { OutputRecord } from "base-safe/dist/types";
import { Link } from "react-router-dom";

type Props = {
  name: string;
  day: Day | undefined;
  recipes: OutputRecord<Recipe>[];
};

export default function Day(props: Props) {
  const recipe = props.day?.foreignKey
    ? select(props.day.foreignKey, props.recipes)
    : undefined;

  return (
    <Link
      to="#"
      className="flex items-center justify-between gap-2 rounded-md bg-gray-100 p-2 shadow-md"
    >
      <span className="text-2xl font-bold">{props.name}</span>
      <span className="relative overflow-x-hidden whitespace-nowrap text-xl opacity-50 before:absolute before:h-full before:w-full before:bg-gradient-to-r before:from-transparent before:from-85% before:to-gray-100 sm:before:hidden">
        {recipe?.name}
      </span>
    </Link>
  );
}
