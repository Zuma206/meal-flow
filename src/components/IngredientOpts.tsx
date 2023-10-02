import { FiEdit, FiTrash } from "react-icons/fi";
import Button from "./Button";
import { OutputRecord } from "base-safe/dist/types";
import db, { Ingredient } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "./Modal";
import { useState } from "react";
import InputField from "./InputField";
import { onNumberChange, onStringChange } from "@/lib/binding";

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

  const editCount = useMutation({
    async mutationFn() {
      if (typeof count == "string") return;
      await db.ingredients.update(
        {
          count: count,
          units,
        },
        props.ingredient.key,
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes("stock"),
      });
    },
  });

  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [count, setCount] = useState<string | number>(props.ingredient.count);
  const [units, setUnits] = useState<string>(props.ingredient.units);

  return (
    <>
      <Modal
        action={deleteIngredient}
        prompt={`Are you sure you want to permenantly delete '${props.ingredient.name}'?`}
        show={deleteModal}
        setShow={setDeleteModal}
      />
      <Modal
        action={editCount}
        prompt={
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-black">
              Editing &apos;{props.ingredient.name}&apos;
            </h3>
            <InputField
              type="number"
              step={0.1}
              value={count}
              onChange={onNumberChange(setCount)}
            />
            <InputField value={units} onChange={onStringChange(setUnits)} />
          </div>
        }
        show={editModal}
        setShow={setEditModal}
      />
      <Button onClick={() => setEditModal(true)}>
        <FiEdit />
      </Button>
      <Button onClick={() => setDeleteModal(true)}>
        <FiTrash />
      </Button>
    </>
  );
}
