import { FiTrash } from "react-icons/fi";
import Button from "./Button";

export default function IngredientItem() {
  return (
    <li className="mb-1">
      <span className="flex justify-between">
        10 Unit(s) of Garlic
        <Button>
          <FiTrash />
        </Button>
      </span>
    </li>
  );
}
