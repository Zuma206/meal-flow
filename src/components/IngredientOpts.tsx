import { FiEdit, FiTrash } from "react-icons/fi";
import Button from "./Button";
import { OutputRecord } from "base-safe/dist/types";
import db, { Ingredient } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "./Modal";
import { useState } from "react";

type Props = {
  ingredient: OutputRecord<Ingredient>;
};

export default function IngredientOpts(props: Props) {
  const queryClient = useQueryClient();

  const deleteIngredient = useMutation({
    async mutationFn() {
      await db.ingredients.delete(props.ingredient.key);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes("stock"),
      });
    },
  });

  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <>
      <Modal
        action={deleteIngredient}
        prompt={`Are you sure you want to permenantly delete '${props.ingredient.name}'?`}
        show={deleteModal}
        setShow={setDeleteModal}
      />
      <Button>
        <FiEdit />
      </Button>
      <Button onClick={() => setDeleteModal(true)}>
        <FiTrash />
      </Button>
    </>
  );
}
