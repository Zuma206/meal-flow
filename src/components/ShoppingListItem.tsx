import { FiEdit } from "react-icons/fi";
import Button from "./Button";

export default function ShoppingListItem() {
  return (
    <li>
      <span className="flex gap-2 text-lg">
        0 Unit(s) of Onion
        <Button>
          <FiEdit />
        </Button>
      </span>
    </li>
  );
}
