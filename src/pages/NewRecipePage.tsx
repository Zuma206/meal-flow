import Button from "@/components/Button";
import ContentBox from "@/components/ContentBox";
import IngredientItem from "@/components/IngredientItem";
import InputField from "@/components/InputField";
import { FiPlus, FiSave } from "react-icons/fi";

export default function NewRecipePage() {
  return (
    <form className="flex flex-col gap-2">
      <div className="mb-2">
        <Button>
          <FiSave /> Save Recipe
        </Button>
      </div>
      <InputField placeholder="Recipe Title" />
      <ul className="list-disc px-5">
        <IngredientItem />
        <IngredientItem />
        <IngredientItem />
        <IngredientItem />
      </ul>
      <Button>
        <FiPlus /> 2 Units(s) of Onion
      </Button>
      <div className="grid grid-cols-2 gap-1">
        <InputField placeholder="New Ingredient" />
        <InputField placeholder="Amount" type="number" step={0.001} />
      </div>
      <ContentBox placeholder="Notes" rows={5} />
    </form>
  );
}
