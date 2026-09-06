import { Mutation, mutationFormContext } from "@/lib/form-context";
import { FormEvent, FormHTMLAttributes } from "react";

type Props = Omit<FormHTMLAttributes<HTMLFormElement>, "action"> & {
  action?: Mutation;
  onSubmit?: never;
};

export default function MutationForm(props: Props) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (!props.action) return;
    e.preventDefault();
    props.action.mutate();
  }

  return (
    <mutationFormContext.Provider value={props.action}>
      <form {...props} onSubmit={handleSubmit} action="" />
    </mutationFormContext.Provider>
  );
}
