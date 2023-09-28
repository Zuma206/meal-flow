import { FiEdit, FiTrash } from "react-icons/fi";
import Button from "./Button";

export default function IngredientOpts() {
  return (
    <>
      <Button>
        <FiEdit />
      </Button>
      <Button>
        <FiTrash />
      </Button>
    </>
  );
}
