import { FiEdit, FiTrash } from "react-icons/fi";
import Button from "./Button";
import { OutputRecord } from "base-safe/dist/types";
import db, { Ingredient } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModal } from "./Modal";

type Props = {
  ingredient: OutputRecord<Ingredient>;
};

export default function IngredientOpts(props: Props) {
  const queryClient = useQueryClient();

  const deleteIngredient = useMutation({
    async mutationFn() {
      console.log("Deleting...");
      await db.ingredients.delete(props.ingredient.key);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["stock"] });
    },
  });

  const deleteModal = useModal({
    action: deleteIngredient,
    prompt: `Are you sure you want to permenantly delete '${props.ingredient.name}'?`,
  });

  return (
    <>
      <deleteModal.Modal />
      <Button>
        <FiEdit />
      </Button>
      <Button onClick={deleteModal.open}>
        <FiTrash />
      </Button>
    </>
  );
}
