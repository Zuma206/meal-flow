import Button from "@/components/Button";
import Day from "@/components/Day";
import Loader from "@/components/Loader";
import Title from "@/components/Title";
import db, { select } from "@/lib";
import { useModal } from "@/lib/modal-context";
import { useRecipies } from "@/lib/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FiFilePlus } from "react-icons/fi";
import { shuffle } from "d3-array";

const dayKeys = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export default function FlowPage() {
  const days = useQuery({
    queryKey: ["days"],
    queryFn() {
      return db.days.fetch(undefined, { autoPaginate: true });
    },
  });

  const recipes = useRecipies();
  const queryClient = useQueryClient();

  const generateDays = useMutation({
    async mutationFn() {
      if (!recipes.isSuccess) throw new Error();
      const shuffled = shuffle(recipes.data.items);
      for (let i = 0; i < dayKeys.length; i++) {
        const recipe = shuffled[i];
        await db.days.put(
          {
            foreignKey: recipe.key,
            completed: false,
          },
          dayKeys[i],
        );
        shuffled.push(recipe);
      }
    },
    onSuccess() {
      generateDaysModal.close();
      queryClient.invalidateQueries({ queryKey: ["days"] });
    },
  });
  const generateDaysModal = useModal(generateDays, {
    prompt:
      "Are you sure you want to generate a new flow and overwrite the old one?",
  });

  return (
    <>
      <Title>Flow</Title>
      {(days.isLoading || recipes.isLoading) && <Loader />}
      {days.isSuccess && recipes.isSuccess && (
        <>
          <Button onClick={generateDaysModal.open}>
            <FiFilePlus /> Generate Flow
          </Button>
          <div className="flex justify-center">
            <div className="my-4 flex w-full max-w-md flex-col gap-4">
              {dayKeys.map((key) => {
                const day = select(key, days.data.items);
                return (
                  <Day
                    key={key}
                    name={key}
                    day={day}
                    recipes={recipes.data.items}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
