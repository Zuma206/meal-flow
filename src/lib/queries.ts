import { useQuery } from "@tanstack/react-query";
import db from ".";

export function useStock() {
  return useQuery({
    queryKey: ["stock"],
    queryFn() {
      return db.ingredients.fetch(undefined, { autoPaginate: true });
    },
  });
}
