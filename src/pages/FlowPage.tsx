import Button from "@/components/Button";
import Day from "@/components/Day";
import Loader from "@/components/Loader";
import Title from "@/components/Title";
import db, { select } from "@/lib";
import { useDays, useRecipies } from "@/lib/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FiFilePlus } from "react-icons/fi";
import { shuffle } from "d3-array";
import Modal from "@/components/Modal";
import { useState } from "react";

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
  const days = useDays();

  const recipes = useRecipies();
  const queryClient = useQueryClient();

  const generateDays = useMutation({
    async mutationFn() {
      if (!recipes.isSuccess) throw new Error();
      if (recipes.data.count == 0) return;
      const shuffled = shuffle(recipes.data.items);
      for (let i = 0; i < dayKeys.length; i++) {
        const recipe = shuffled[i % shuffled.length];
        await db.days.put(
          {
            foreignKey: recipe.key,
            completed: false,
          },
          dayKeys[i],
        );
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["days"] });
    },
  });

  const [modal, setModal] = useState(false);

  return (
    <>
      <Modal
        action={generateDays}
        prompt="Are you sure you want to overwrite the current flow with a new one?"
        show={modal}
        setShow={setModal}
      />
      <Title>Flow</Title>
      {(days.isLoading || recipes.isLoading) && <Loader />}
      {days.isSuccess && recipes.isSuccess && (
        <>
          <Button onClick={() => setModal(true)}>
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
