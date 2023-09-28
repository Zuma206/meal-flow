import { FiTrash } from "react-icons/fi";
import Button from "./Button";
import { OutputRecord } from "base-safe/dist/types";
import { Ingredient, RecipeRequirement } from "@/lib";
import { Dispatch, SetStateAction } from "react";

type Props = {
  ingredient: OutputRecord<Ingredient>;
  requirement: RecipeRequirement;
  setRecipeReqs: Dispatch<SetStateAction<RecipeRequirement[]>>;
};

export default function IngredientItem(props: Props) {
  function removeRequirement() {
    props.setRecipeReqs((previousReqs) =>
      previousReqs.filter((req) => req.foreignKey != props.ingredient.key),
    );
  }

  return (
    <li className="mb-1">
      <span className="flex justify-between">
        {props.requirement.count} {props.ingredient.units} of{" "}
        {props.ingredient.name}
        <Button onClick={removeRequirement}>
          <FiTrash />
        </Button>
      </span>
    </li>
  );
}
