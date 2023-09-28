import { Ingredient, RecipeRequirement } from "@/lib";
import { OutputRecord } from "base-safe/dist/types";
import Button from "./Button";
import { FiPlus } from "react-icons/fi";
import { Dispatch, SetStateAction } from "react";

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
    props.stock
      .filter(
        (ingredient) =>
          ingredient.name
            .toLowerCase()
            .startsWith(props.ingredientSearch.toLowerCase()) &&
          !props.recipeReqs.find((req) => req.foreignKey == ingredient.key),
      )
      .map((ingredient) => (
        <Button key={ingredient.key} onClick={addIngredient(ingredient.key)}>
          <FiPlus /> {props.ingredientCount || 0} {ingredient.units} of{" "}
          {ingredient.name}
        </Button>
      ))
  );
}
