import { Mutation } from "@/lib/form-context";
import MutationForm from "./MutationForm";
import FormButton from "./FormButton";
import { FiCheck, FiX } from "react-icons/fi";
import Button from "./Button";
import { MouseEvent, ReactNode, useCallback, useEffect, useState } from "react";

type Options = {
  action?: Mutation;
  prompt?: ReactNode;
  yes?: string;
  no?: string;
};

export function useModal(options: Options) {
  const [showModal, setShowModal] = useState(false);

  function handleCancel(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowModal(false);
  }

  useEffect(() => {
    if (options.action?.isSuccess === true) {
      setShowModal(false);
    }
  }, [options.action?.isSuccess]);

  return {
    Modal: useCallback(() => {
      return (
        showModal && (
          <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-20">
            <MutationForm
              className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white px-20 py-10 outline outline-1 outline-gray-400"
              action={options.action}
            >
              {!options.prompt || typeof options.prompt == "string" ? (
                <h1 className="max-w-sm text-center text-3xl font-black">
                  {options.prompt ?? "Are you sure?"}
                </h1>
              ) : (
                options.prompt
              )}
              <div className="flex gap-2">
                <FormButton icon={<FiCheck />}>
                  {options.yes ?? "Yes"}
                </FormButton>
                <Button onClick={handleCancel}>
                  <FiX /> {options.no ?? "No"}
                </Button>
              </div>
            </MutationForm>
          </div>
        )
      );
    }, [options, showModal]),

    open() {
      setShowModal(true);
    },

    close() {
      setShowModal(false);
    },
  };
}
