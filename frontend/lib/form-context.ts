import { UseMutationResult } from "@tanstack/react-query";
import { createContext, useContext } from "react";

export type Mutation = UseMutationResult<void, unknown, void>;

export const mutationFormContext = createContext<Mutation | undefined>(
  undefined,
);

export function useFormMutation() {
  return useContext(mutationFormContext);
}
