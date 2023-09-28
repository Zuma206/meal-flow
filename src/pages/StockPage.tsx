import Button from "@/components/Button";
import Ingredient from "@/components/Ingredient";
import InputField from "@/components/InputField";
import Title from "@/components/Title";
import db from "@/lib";
import { onNumberChange, onStringChange } from "@/lib/binding";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function getStock() {
  return db.ingredients.fetch(undefined, { autoPaginate: true });
}

export default function StockPage() {
  const [stockName, setStockName] = useState("");
  const [stockCount, setStockCount] = useState<number | string>("");
  const [stockUnits, setStockUnits] = useState("");

  const stock = useQuery({
    queryKey: ["stock"],
    queryFn: getStock,
  });

  return (
    <>
      <Title>Stock</Title>
      <div className="grid h-full grid-rows-[min-content,1fr] gap-5">
        <form className="flex flex-col items-start gap-2">
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
            />
            <InputField
              placeholder="Unit(s)"
              value={stockUnits}
              onChange={onStringChange(setStockUnits)}
            />
          </div>
          <Button>Add New Item</Button>
        </form>
        {stock.isLoading && "Loading..."}
        {stock.isSuccess && (
          <div className="overflow-y-scroll">
            <table className="w-full">
              <tbody>
                {stock.data.items.map((ingredient) => (
                  <Ingredient ingredient={ingredient} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
