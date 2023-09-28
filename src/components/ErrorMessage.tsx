type Props = {
  text?: string;
};

export default function ErrorMessage(props: Props) {
  return (
    <p className="text-red-500">
      {props.text ?? "Please make sure all required fields are present"}
    </p>
  );
}
