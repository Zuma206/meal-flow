import Button from "@/components/Button";
import Day from "@/components/Day";
import Title from "@/components/Title";
import { FiFilePlus } from "react-icons/fi";

export default function FlowPage() {
  return (
    <>
      <Title>Flow</Title>
      <Button>
        <FiFilePlus /> Generate Flow
      </Button>
      <div className="flex justify-center">
        <div className="my-4 flex w-full max-w-md flex-col gap-4">
          <Day />
          <Day />
          <Day />
          <Day />
          <Day />
          <Day />
        </div>
      </div>
    </>
  );
}
