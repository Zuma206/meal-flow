import Alert from "@/components/Alert";
import Title from "@/components/Title";
import { FiAlertTriangle } from "react-icons/fi";

export default function ErrorPage() {
  return (
    <>
      <Title>Error</Title>
      <Alert
        message="Something went really, really wrong"
        icon={FiAlertTriangle}
      />
    </>
  );
}
