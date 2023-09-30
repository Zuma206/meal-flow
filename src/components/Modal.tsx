import { Mutation } from "@/lib/form-context";
import MutationForm from "./MutationForm";
import FormButton from "./FormButton";
import { FiCheck, FiX } from "react-icons/fi";
import Button from "./Button";
import {
  Dispatch,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useEffect,
} from "react";

type Props = {
  action?: Mutation;
  prompt?: ReactNode;
  yes?: string;
  no?: string;
  show?: boolean;
  setShow?: Dispatch<SetStateAction<boolean>>;
};

export default function Modal(props: Props) {
  useEffect(() => {
    if (!props.action?.isSuccess || !props.setShow) return;
    props.setShow(false);
    props.action.reset();
  }, [props]);

  function handleCancel(e: MouseEvent) {
    e.preventDefault();
    if (!props.setShow) return;
    props.setShow(false);
  }

  return (
    props.show && (
      <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-20">
        <MutationForm
          className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white px-20 py-10 outline outline-1 outline-gray-400"
          action={props.action}
        >
          {!props.prompt || typeof props.prompt == "string" ? (
            <h1 className="max-w-sm text-center text-3xl font-black">
              {props.prompt ?? "Are you sure?"}
            </h1>
          ) : (
            props.prompt
          )}
          <div className="flex gap-2">
            <FormButton icon={<FiCheck />}>{props.yes ?? "Yes"}</FormButton>
            <Button onClick={handleCancel}>
              <FiX /> {props.no ?? "No"}
            </Button>
          </div>
        </MutationForm>
      </div>
    )
  );
}
