import Alert from "@/components/Alert";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import RecipeButton from "@/components/RecipeButton";
import { useRecipies, useStock } from "@/lib/queries";
import { FiInbox, FiPlus } from "react-icons/fi";

export default function RecipesPage() {
  const stock = useStock();

  const recipes = useRecipies();

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
        {recipes.isSuccess &&
          stock.isSuccess &&
          (recipes.data.count > 0 ? (
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
          ) : (
            <Alert icon={FiInbox} message="No recipes here yet" />
          ))}
      </div>
    </>
  );
}
