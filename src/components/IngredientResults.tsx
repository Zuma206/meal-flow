import { Ingredient, RecipeRequirement } from "@/lib";
import { OutputRecord } from "base-safe/dist/types";
import Button from "./Button";
import { FiPlus } from "react-icons/fi";
import { Dispatch, SetStateAction } from "react";
import { filter } from "fuzzy";

type Props = {
  stock: OutputRecord<Ingredient>[];
  ingredientSearch: string;
  recipeReqs: RecipeRequirement[];
  ingredientCount: string | number;
  setRecipeReqs: Dispatch<SetStateAction<RecipeRequirement[]>>;
  setIngredientSearch: Dispatch<SetStateAction<string>>;
  setIngredientCount: Dispatch<SetStateAction<string | number>>;
};

export default function IngredientResults(props: Props) {
  function addIngredient(key: string) {
    return function () {
      props.setRecipeReqs((previousReqs) => [
        ...previousReqs,
        {
          foreignKey: key,
          count:
            typeof props.ingredientCount == "string"
              ? 0
              : props.ingredientCount,
        },
      ]);
      props.setIngredientCount("");
      props.setIngredientSearch("");
    };
  }

  return (
    props.ingredientSearch.length > 0 &&
    filter(props.ingredientSearch, props.stock, {
      extract: (stock) => stock.name,
      pre: "$$$",
      post: "$$$",
    }).map(({ original: ingredient, string }) => (
      <Button key={ingredient.key} onClick={addIngredient(ingredient.key)}>
        <FiPlus /> {props.ingredientCount || 0} {ingredient.units} of{" "}
        <span className="flex">
          {string
            .split("$$$")
            .map((part, index) =>
              index % 2 === 1 ? <b key={index}>{part}</b> : part,
            )}
        </span>
      </Button>
    ))
  );
}
