import { FiEdit } from "react-icons/fi";
import Button from "./Button";
import { Dispatch, SetStateAction, useState } from "react";
import Modal from "./Modal";
import { useMutation } from "@tanstack/react-query";
import InputField from "./InputField";
import { onNumberChange } from "@/lib/binding";

export type ShoppingListReq = {
  name: string;
  key: string;
  count: number;
  units: string;
};

type Props = {
  item: ShoppingListReq;
  setListState: Dispatch<SetStateAction<ShoppingListReq[] | null>>;
};

export default function ShoppingListItem(props: Props) {
  const [count, setCount] = useState(props.item.count);
  const [editedCount, setEditedCount] = useState<string | number>(
    props.item.count,
  );
  const [modal, setModal] = useState(false);

  const editMutation = useMutation({
    async mutationFn() {
      if (typeof editedCount == "string") return;
      setCount(editedCount);
    },
  });

  return (
    <li>
      <Modal
        action={editMutation}
        prompt={
          <InputField
            value={editedCount}
            onChange={onNumberChange(setEditedCount)}
            step={0.1}
            type="number"
          />
        }
        yes="Save"
        show={modal}
        setShow={setModal}
      />
      <span className="flex gap-2 text-lg">
        {count} {props.item.units} of {props.item.name}
        <Button onClick={() => setModal(true)}>
          <FiEdit />
        </Button>
      </span>
    </li>
  );
}
