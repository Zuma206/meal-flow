import Button from "@/components/Button";
import Day from "@/components/Day";
import Loader from "@/components/Loader";
import Title from "@/components/Title";
import db, { select } from "@/lib";
import { useRecipies } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { FiFilePlus } from "react-icons/fi";

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

  return (
    <>
      <Title>Flow</Title>
      {(days.isLoading || recipes.isLoading) && <Loader />}
      {days.isSuccess && recipes.isSuccess && (
        <>
          <Button>
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
