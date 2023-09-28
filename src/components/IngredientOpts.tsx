import { FiEdit, FiTrash } from "react-icons/fi";
import Button from "./Button";
import { OutputRecord } from "base-safe/dist/types";
import db, { Ingredient } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModal } from "@/lib/modal-context";

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
      deleteModal.close();
    },
  });
  const deleteModal = useModal(deleteIngredient);

  return (
    <>
      <Button>
        <FiEdit />
      </Button>
      <Button onClick={deleteModal.open}>
        <FiTrash />
      </Button>
    </>
  );
}
