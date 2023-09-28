import Button from "@/components/Button";
import RecipeButton from "@/components/RecipeButton";
import { FiPlus } from "react-icons/fi";

export default function RecipesPage() {
  return (
    <>
      <div className="grid h-full grid-rows-[min-content,1fr] gap-3">
        <div>
          <Button>
            <FiPlus />
            Add Recipe
          </Button>
        </div>
        <div className="flex items-start justify-center overflow-x-scroll">
          <div className="grid w-full max-w-lg grid-cols-1 gap-3 sm:grid-cols-2">
            <RecipeButton />
            <RecipeButton />
            <RecipeButton />
            <RecipeButton />
          </div>
        </div>
      </div>
    </>
  );
}
