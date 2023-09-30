import ContentBox from "@/components/ContentBox";
import ErrorMessage from "@/components/ErrorMessage";
import FormButton from "@/components/FormButton";
import IngredientItem from "@/components/IngredientItem";
import IngredientResults from "@/components/IngredientResults";
import InputField from "@/components/InputField";
import Loader from "@/components/Loader";
import MutationForm from "@/components/MutationForm";
import db, { RecipeRequirement, select } from "@/lib";
import { onNumberChange, onStringChange } from "@/lib/binding";
import { useStock } from "@/lib/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ZodError } from "zod";

export default function NewRecipePage() {
  const stock = useStock();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [recipeName, setRecipeName] = useState("");
  const [recipeReqs, setRecipeReqs] = useState<RecipeRequirement[]>([]);
  const [recipeNotes, setRecipeNotes] = useState("");

  const [ingredientSearch, setIngredientSearch] = useState("");
  const [ingredientCount, setIngredientCount] = useState<string | number>("");

  const addRecipe = useMutation({
    async mutationFn() {
      await db.recipes.put({
        name: recipeName,
        requirements: recipeReqs,
        notes: recipeNotes,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes("recipes"),
      });
      navigate("../");
    },
    useErrorBoundary: (err) => !(err instanceof ZodError),
  });

  return (
    <MutationForm action={addRecipe} className="flex flex-col gap-2">
      <div className="mb-2">
        <FormButton icon={<FiSave />}>Save Recipe</FormButton>
        {addRecipe.isError && <ErrorMessage />}
      </div>
      <InputField
        placeholder="Recipe Title"
        value={recipeName}
        onChange={onStringChange(setRecipeName)}
      />
      {stock.isLoading && <Loader />}
      {stock.isSuccess && (
        <>
          <ul className="list-disc px-5">
            {recipeReqs.map((requirement) => {
              const ingredient = select(
                requirement.foreignKey,
                stock.data.items,
              );
              return (
                ingredient && (
                  <IngredientItem
                    key={requirement.foreignKey}
                    ingredient={ingredient}
                    requirement={requirement}
                    setRecipeReqs={setRecipeReqs}
                  />
                )
              );
            })}
          </ul>
          <IngredientResults
            stock={stock.data.items}
            recipeReqs={recipeReqs}
            ingredientSearch={ingredientSearch}
            ingredientCount={ingredientCount}
            setIngredientSearch={setIngredientSearch}
            setIngredientCount={setIngredientCount}
            setRecipeReqs={setRecipeReqs}
          />
          <div className="grid grid-cols-2 gap-1">
            <InputField
              placeholder="New Ingredient"
              value={ingredientSearch}
              onChange={onStringChange(setIngredientSearch)}
            />
            <InputField
              placeholder="Amount"
              type="number"
              step={0.1}
              value={ingredientCount}
              onChange={onNumberChange(setIngredientCount)}
            />
          </div>
        </>
      )}
      <ContentBox
        placeholder="Notes"
        rows={5}
        value={recipeNotes}
        onChange={onStringChange(setRecipeNotes)}
      />
    </MutationForm>
  );
}
