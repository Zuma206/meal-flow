import Alert from "@/components/Alert";
import ErrorMessage from "@/components/ErrorMessage";
import FormButton from "@/components/FormButton";
import Ingredient from "@/components/Ingredient";
import InputField from "@/components/InputField";
import Loader from "@/components/Loader";
import MutationForm from "@/components/MutationForm";
import Title from "@/components/Title";
import db from "@/lib";
import { onNumberChange, onStringChange } from "@/lib/binding";
import { useStock } from "@/lib/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FiInbox, FiPlus } from "react-icons/fi";
import { ZodError } from "zod";

export default function StockPage() {
  const [stockName, setStockName] = useState("");
  const [stockCount, setStockCount] = useState<number | string>("");
  const [stockUnits, setStockUnits] = useState("");

  const queryClient = useQueryClient();

  const stock = useStock();

  const addStock = useMutation({
    async mutationFn() {
      await db.ingredients.put({
        name: stockName,
        count: typeof stockCount == "string" ? 0 : stockCount,
        units: stockUnits === "" ? "Unit(s)" : stockUnits,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["stock"] });
      setStockName("");
      setStockCount("");
      setStockUnits("");
    },
    useErrorBoundary: (err) => !(err instanceof ZodError),
  });

  return (
    <>
      <Title>Stock</Title>
      <div className="grid h-full grid-rows-[min-content,1fr] gap-5">
        <MutationForm
          className="flex flex-col items-start gap-2"
          action={addStock}
        >
          <div className="flex flex-col items-start gap-1">
            <InputField
              placeholder="Ingredient name"
              value={stockName}
              onChange={onStringChange(setStockName)}
            />
            <InputField
              placeholder="Amount in stock"
              type="number"
              value={stockCount}
              onChange={onNumberChange(setStockCount)}
              step={0.1}
            />
            <InputField
              placeholder="Unit(s)"
              value={stockUnits}
              onChange={onStringChange(setStockUnits)}
            />
          </div>
          {addStock.isError && (
            <ErrorMessage>
              Please make sure all required fields are present
            </ErrorMessage>
          )}
          <FormButton icon={<FiPlus />}>Add New Item</FormButton>
        </MutationForm>
        {stock.isLoading && <Loader />}
        {stock.isSuccess && stock.data.count > 0 ? (
          <div className="overflow-y-scroll">
            <table className="w-full">
              <tbody>
                {stock.data.items.map((ingredient) => (
                  <Ingredient key={ingredient.key} ingredient={ingredient} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Alert message="No ingredients here yet" icon={FiInbox} />
        )}
      </div>
    </>
  );
}
