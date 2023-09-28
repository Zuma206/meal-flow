import { Mutation } from "./form-context";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
} from "react";

export type ModalOptions = {
  action: Mutation;
  prompt?: string | ReactNode;
  confirmPrompt?: string;
  cancelPrompt?: string;
};

type UseModalOptions = Omit<ModalOptions, "action">;

type SetModal = Dispatch<SetStateAction<ModalOptions | undefined>>;

export const modalContext = createContext<SetModal | undefined>(undefined);

export function useModal(action: Mutation, options?: UseModalOptions) {
  const setModal = useContext(modalContext);

  return {
    open() {
      if (!setModal) return;
      setModal({ ...options, action });
    },

    close() {
      if (!setModal) return;
      setModal(undefined);
    },
  };
}
