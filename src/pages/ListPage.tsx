import Button from "@/components/Button";
import Loader from "@/components/Loader";
import ShoppingListItem, {
  type ShoppingListReq,
} from "@/components/ShoppingListItem";
import Title from "@/components/Title";
import { select } from "@/lib";
import { useDays, useRecipies, useStock } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";

export default function ListPage() {
  const stock = useStock();
  const days = useDays();
  const recipes = useRecipies();
  const isSuccess = stock.isSuccess && days.isSuccess && recipes.isSuccess;

  const shoppingList = useQuery({
    queryKey: ["stock", "days", "recipes"],
    queryFn() {
      if (!isSuccess) throw new Error();
      const shoppingList: ShoppingListReq[] = [];
      days.data.items.forEach((day) => {
        const recipe = select(day.foreignKey, recipes.data.items);
        if (!recipe) return;
        recipe.requirements.forEach((recipeReq) => {
          const ingredient = select(recipeReq.foreignKey, stock.data.items);
          if (!ingredient) return;
          let listReq = shoppingList.find((req) => req.key == ingredient.key);
          if (!listReq) {
            listReq = {
              key: ingredient.key,
              count: 0,
              name: ingredient.name,
              units: ingredient.units,
            };
            shoppingList.push(listReq);
          }
          listReq.count += recipeReq.count;
        });
      });
      setListState(shoppingList);
      return shoppingList;
    },
    enabled: isSuccess,
  });

  const isLoading =
    stock.isLoading ||
    recipes.isLoading ||
    days.isLoading ||
    shoppingList.isLoading;

  const [listState, setListState] = useState<ShoppingListReq[] | null>(null);

  return (
    <>
      <Title>List</Title>
      <div className="grid h-full w-full grid-rows-[min-content,1fr] gap-5">
        <div>
          <Button>
            <FiShoppingCart />
            Add to stock
          </Button>
        </div>
        {isLoading && <Loader />}
        {shoppingList.isSuccess && listState && (
          <ul className="flex h-full w-full list-disc flex-col gap-2 overflow-y-scroll px-5 py-1">
            {listState.map((requirement) => (
              <ShoppingListItem
                key={requirement.key}
                item={requirement}
                setListState={setListState}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
