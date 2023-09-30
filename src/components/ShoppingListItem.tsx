import { FiEdit } from "react-icons/fi";
import Button from "./Button";

export type ShoppingListReq = {
  name: string;
  key: string;
  count: number;
  units: string;
};

type Props = {
  item: ShoppingListReq;
};

export default function ShoppingListItem(props: Props) {
  return (
    <li>
      <span className="flex gap-2 text-lg">
        {props.item.count} {props.item.units} of {props.item.name}
        <Button>
          <FiEdit />
        </Button>
      </span>
    </li>
  );
}
