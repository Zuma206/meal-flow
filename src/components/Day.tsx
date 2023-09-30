import { select, type Day, type Recipe } from "@/lib";
import { OutputRecord } from "base-safe/dist/types";
import { FiCheck } from "react-icons/fi";
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
      to={`/recipes/${props.day?.foreignKey}?day=${props.name}`}
      className="flex items-center justify-between gap-2 rounded-md bg-gray-100 p-2 shadow-md transition hover:brightness-90 active:brightness-75"
    >
      <span className="text-2xl font-bold">{props.name}</span>
      <span className="relative flex items-center gap-1 overflow-x-hidden whitespace-nowrap text-xl opacity-50 before:absolute before:h-full before:w-full before:bg-gradient-to-r before:from-transparent before:from-85% before:to-gray-100 sm:before:hidden">
        {props.day?.completed && <FiCheck />}
        {recipe?.name}
      </span>
    </Link>
  );
}
