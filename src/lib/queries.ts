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

export function useDays() {
  return useQuery({
    queryKey: ["days"],
    queryFn() {
      return db.days.fetch(undefined, { autoPaginate: true });
    },
  });
}
