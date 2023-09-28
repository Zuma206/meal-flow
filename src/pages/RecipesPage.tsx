import Button from "@/components/Button";
import Loader from "@/components/Loader";
import RecipeButton from "@/components/RecipeButton";
import db from "@/lib";
import { useStock } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { FiPlus } from "react-icons/fi";

export default function RecipesPage() {
  const stock = useStock();

  const recipes = useQuery({
    queryKey: ["recipes"],
    queryFn() {
      return db.recipes.fetch(undefined, { autoPaginate: true });
    },
  });

  return (
    <>
      <div className="grid h-full grid-rows-[min-content,1fr] gap-3">
        <div>
          <Button to="./new">
            <FiPlus />
            Add Recipe
          </Button>
        </div>
        {(recipes.isLoading || stock.isLoading) && <Loader />}
        {recipes.isSuccess && stock.isSuccess && (
          <div className="flex items-start justify-center overflow-x-scroll">
            <div className="grid w-full max-w-lg grid-cols-1 gap-3 sm:grid-cols-2">
              {recipes.data.items.map((recipe) => (
                <RecipeButton
                  key={recipe.key}
                  recipe={recipe}
                  stock={stock.data.items}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
