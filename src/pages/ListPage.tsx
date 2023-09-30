import Alert from "@/components/Alert";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import ShoppingListItem, {
  type ShoppingListReq,
} from "@/components/ShoppingListItem";
import Title from "@/components/Title";
import db, { select } from "@/lib";
import { useDays, useRecipies, useStock } from "@/lib/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FiShoppingCart, FiSmile } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ListPage() {
  const stock = useStock();
  const days = useDays();
  const recipes = useRecipies();
  const isSuccess = stock.isSuccess && days.isSuccess && recipes.isSuccess;

  const shoppingList = useQuery({
    queryKey: ["stock", "days", "recipes"],
    queryFn() {
      if (!isSuccess) throw new Error();
      let shoppingList: ShoppingListReq[] = [];
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
              count: -ingredient.count,
              name: ingredient.name,
              units: ingredient.units,
            };
            shoppingList.push(listReq);
          }
          listReq.count += recipeReq.count;
        });
      });
      shoppingList = shoppingList.filter((item) => item.count > 0);
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

  const addToStock = useMutation({
    async mutationFn() {
      if (!listState) return;
      for (let i = 0; i < listState.length; i++) {
        const listItem = listState[i];
        await db.ingredients.update(
          {
            count: db.ingredients.util.increment(listItem.count),
          },
          listItem.key,
        );
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["stock"] });
      navigate("/stock");
    },
  });

  const [modal, setModal] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return (
    <>
      <Modal
        action={addToStock}
        prompt="Are you sure you want to add this shopping list to your stock?"
        show={modal}
        setShow={setModal}
      />
      <Title>List</Title>
      <div className="grid h-full w-full grid-rows-[min-content,1fr] gap-5">
        <div>
          <Button
            disabled={!(listState && listState.length > 0)}
            onClick={() => setModal(true)}
          >
            <FiShoppingCart />
            Add to stock
          </Button>
        </div>
        {isLoading && <Loader />}
        {shoppingList.isSuccess &&
          listState &&
          (listState.length > 0 ? (
            <ul className="flex h-full w-full list-disc flex-col gap-2 overflow-y-scroll px-5 py-1">
              {listState.map((requirement) => (
                <ShoppingListItem
                  key={requirement.key}
                  item={requirement}
                  setListState={setListState}
                />
              ))}
            </ul>
          ) : (
            <Alert icon={FiSmile} message="You don't need to buy anything" />
          ))}
      </div>
    </>
  );
}
