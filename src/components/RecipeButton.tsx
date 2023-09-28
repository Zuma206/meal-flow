import { Link } from "react-router-dom";

export default function RecipeButton() {
  return (
    <Link className="rounded-md bg-gray-100 p-2 shadow-md" to="#">
      <h1 className="text-2xl font-bold">Curry</h1>
      <p className="relative overflow-x-hidden whitespace-nowrap opacity-50 before:absolute before:h-full before:w-full before:bg-gradient-to-r before:from-transparent before:from-80% before:to-gray-100">
        Onion, Peppers, Garlic, Tofu
      </p>
    </Link>
  );
}
