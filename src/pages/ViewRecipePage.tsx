import Alert from "@/components/Alert";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import db, { select } from "@/lib";
import { useStock } from "@/lib/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FiInbox, FiMinus, FiTrash } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewRecipePage() {
  const { key } = useParams();

  const stock = useStock();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const recipe = useQuery({
    queryKey: [key],
    queryFn() {
      return key ? db.recipes.get(key) : null;
    },
  });

  const deleteRecipe = useMutation({
    async mutationFn() {
      if (!key) throw new Error();
      await db.recipes.delete(key);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      navigate("../");
    },
  });

  const [modal, setModal] = useState(false);

  return (
    <>
      <Modal
        action={deleteRecipe}
        prompt={`Are you sure you want to permanently delete '${recipe.data?.name}'?`}
        show={modal}
        setShow={setModal}
      />
      {(recipe.isLoading || stock.isLoading) && <Loader />}
      {recipe.data && stock.isSuccess && (
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-black">{recipe.data.name}</h1>
          <ul className="list-disc px-4">
            {recipe.data.requirements.map((requirement) => {
              const ingredient = select(
                requirement.foreignKey,
                stock.data.items,
              );
              return ingredient ? (
                <li>
                  {requirement.count} {ingredient.units} of {ingredient.name}
                </li>
              ) : null;
            })}
          </ul>
          <p>{recipe.data.notes}</p>
          <div className="flex flex-col items-start gap-2 py-2">
            <Button>
              <FiMinus /> Subtract from Stock
            </Button>
            <Button onClick={() => setModal(true)}>
              <FiTrash /> Delete Recipe
            </Button>
          </div>
        </div>
      )}
      {stock.isSuccess && recipe.isSuccess && !recipe.data && (
        <Alert icon={FiInbox} message="Recipe not found" />
      )}
    </>
  );
}
