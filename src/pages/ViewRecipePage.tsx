import Button from "@/components/Button";
import { FiMinus, FiTrash } from "react-icons/fi";

export default function ViewRecipePage() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-black">Tofu Curry</h1>
        <ul className="list-disc px-4">
          <li>0 Unit(s) of Onion</li>
        </ul>
        <p>Test Recipe Notes</p>
        <div className="flex flex-col items-start gap-2 py-2">
          <Button>
            <FiMinus /> Subtract from Stock
          </Button>
          <Button>
            <FiTrash /> Delete Recipe
          </Button>
        </div>
      </div>
    </>
  );
}
