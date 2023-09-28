import { Ingredient, Recipe, select } from "@/lib";
import { OutputRecord } from "base-safe/dist/types";
import { useMemo } from "react";
import { Link } from "react-router-dom";

type Props = {
  recipe: OutputRecord<Recipe>;
  stock: OutputRecord<Ingredient>[];
};

export default function RecipeButton(props: Props) {
  const summary = useMemo(
    () =>
      props.recipe.requirements
        .map((requirement) => select(requirement.foreignKey, props.stock)?.name)
        .filter((ingredient) => ingredient)
        .reduce((acc, requirement, index) => {
          return (
            (typeof acc == "string" ? acc : "") +
            (index != 0 ? ", " : "") +
            requirement
          );
        }),
    [props.recipe, props.stock],
  );

  return (
    <Link
      className="rounded-md bg-gray-100 p-2 shadow-md"
      to={props.recipe.key}
    >
      <h1 className="text-2xl font-bold">{props.recipe.name}</h1>
      <p className="relative overflow-x-hidden whitespace-nowrap opacity-50 before:absolute before:h-full before:w-full before:bg-gradient-to-r before:from-transparent before:from-80% before:to-gray-100">
        {summary}
      </p>
    </Link>
  );
}
