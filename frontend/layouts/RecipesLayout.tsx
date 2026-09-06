import Title from "@/components/Title";
import { Outlet } from "react-router-dom";

export default function RecipesLayout() {
  return (
    <>
      <Title>Recipes</Title>
      <Outlet />
    </>
  );
}
