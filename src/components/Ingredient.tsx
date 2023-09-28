import { PropsWithChildren } from "react";
import IngredientOpts from "./IngredientOpts";

export default function Ingredient() {
  return (
    <tr className="border-b-2 border-b-gray-400">
      <TableData>Onion</TableData>
      <TableData>0</TableData>
      <TableData>Unit(s)</TableData>
      <TableData>
        <IngredientOpts />
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
