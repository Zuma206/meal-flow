import Ingredient from "@/components/Ingredient";
import Title from "@/components/Title";

export default function StockPage() {
  return (
    <>
      <Title>Stock</Title>
      <div className="grid h-full grid-rows-[min-content,1fr]">
        <div></div>
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
