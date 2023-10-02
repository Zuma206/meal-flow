import Alert from "@/components/Alert";
import Title from "@/components/Title";
import { FiAlertTriangle } from "react-icons/fi";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const err = useRouteError() as any;
  console.error(err);

  return (
    <>
      <Title>Error</Title>
      <Alert
        message={
          err?.status === 404
            ? "Page Not Found"
            : "Something went really, really wrong"
        }
        icon={FiAlertTriangle}
      />
    </>
  );
}
