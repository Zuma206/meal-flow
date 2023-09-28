import { MouseEvent, PropsWithChildren, useState } from "react";
import { modalContext, ModalOptions } from "@/lib/modal-context";
import MutationForm from "./MutationForm";
import FormButton from "./FormButton";
import { FiCheck, FiX } from "react-icons/fi";
import Button from "./Button";

export default function Modal(props: PropsWithChildren) {
  const [modal, setModal] = useState<ModalOptions | undefined>(undefined);

  function handleCancel(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setModal(undefined);
  }

  return (
    <modalContext.Provider value={setModal}>
      {modal != undefined && (
        <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-20">
          <MutationForm
            className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white px-20 py-10 outline outline-1 outline-gray-400"
            action={modal?.action}
          >
            {!modal.prompt || typeof modal.prompt == "string" ? (
              <h1 className="max-w-sm text-center text-3xl font-black">
                {modal.prompt ?? "Are you sure?"}
              </h1>
            ) : (
              modal.prompt
            )}
            <div className="flex gap-2">
              <FormButton icon={<FiCheck />}>
                {modal.confirmPrompt ?? "Yes"}
              </FormButton>
              <Button onClick={handleCancel}>
                <FiX /> {modal.cancelPrompt ?? "No"}
              </Button>
            </div>
          </MutationForm>
        </div>
      )}

      {props.children}
    </modalContext.Provider>
  );
}
