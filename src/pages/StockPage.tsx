import Button from "@/components/Button";
import Ingredient from "@/components/Ingredient";
import InputField from "@/components/InputField";
import Title from "@/components/Title";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

export default function StockPage() {
  const [stockName, setStockName] = useState("");
  const [stockCount, setStockCount] = useState<number | string>("");
  const [stockUnits, setStockUnits] = useState("");

  function getStringHandler(setter: Dispatch<SetStateAction<string>>) {
    return function stringChangeHandler(e: ChangeEvent<HTMLInputElement>) {
      setter(e.target.value);
    };
  }

  function getNumberHandler(setter: Dispatch<SetStateAction<number | string>>) {
    return function numberChangeHandler(e: ChangeEvent<HTMLInputElement>) {
      const parsedFloat = parseFloat(e.target.value);
      if (isNaN(parsedFloat)) setter("");
      else setter(parsedFloat);
    };
  }

  return (
    <>
      <Title>Stock</Title>
      <div className="grid h-full grid-rows-[min-content,1fr] gap-5">
        <form className="flex flex-col items-start gap-2">
          <div className="flex flex-col items-start gap-1">
            <InputField
              placeholder="Ingredient name"
              value={stockName}
              onChange={getStringHandler(setStockName)}
            />
            <InputField
              placeholder="Amount in stock"
              type="number"
              value={stockCount}
              onChange={getNumberHandler(setStockCount)}
            />
            <InputField
              placeholder="Unit(s)"
              value={stockUnits}
              onChange={getStringHandler(setStockUnits)}
            />
          </div>
          <Button>Add New Item</Button>
        </form>
        <div className="overflow-y-scroll">
          <table className="w-full">
            <tbody>
              <Ingredient />
              <Ingredient />
              <Ingredient />
              <Ingredient />
              <Ingredient />
              <Ingredient />
              <Ingredient />
              <Ingredient />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
