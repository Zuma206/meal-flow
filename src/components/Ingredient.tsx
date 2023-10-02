import { PropsWithChildren } from "react";
import IngredientOpts from "./IngredientOpts";
import { OutputRecord } from "base-safe/dist/types";
import type { Ingredient } from "@/lib";

type Props = {
  ingredient: OutputRecord<Ingredient>;
  name: string;
};

export default function Ingredient(props: Props) {
  return (
    <tr className="border-b-2 border-b-gray-400">
      <TableData>
        <span className="flex">
          {props.name
            .split("$$$")
            .map((part, index) =>
              index % 2 === 1 ? <b key={index}>{part}</b> : part,
            )}
        </span>
      </TableData>
      <TableData>{props.ingredient.count}</TableData>
      <TableData>{props.ingredient.units}</TableData>
      <TableData>
        <IngredientOpts ingredient={props.ingredient} />
      </TableData>
    </tr>
  );
}

function TableData(props: PropsWithChildren) {
  return (
    <td>
      <span className="flex justify-center gap-2 py-1">{props.children}</span>
    </td>
  );
}
