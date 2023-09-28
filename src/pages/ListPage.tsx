import Button from "@/components/Button";
import ShoppingListItem from "@/components/ShoppingListItem";
import Title from "@/components/Title";
import { FiShoppingCart } from "react-icons/fi";

export default function ListPage() {
  return (
    <>
      <Title>List</Title>
      <div className="flex flex-col gap-5">
        <div>
          <Button>
            <FiShoppingCart />
            Add to stock
          </Button>
        </div>
        <ul className="flex list-disc flex-col gap-2 px-5">
          <ShoppingListItem />
          <ShoppingListItem />
          <ShoppingListItem />
          <ShoppingListItem />
          <ShoppingListItem />
        </ul>
      </div>
    </>
  );
}
