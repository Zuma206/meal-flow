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

export function useRecipies() {
  return useQuery({
    queryKey: ["recipes"],
    queryFn() {
      return db.recipes.fetch(undefined, { autoPaginate: true });
    },
  });
}
