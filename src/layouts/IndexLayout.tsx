import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import Navbutton from "@/components/Navbutton";
import { Outlet } from "react-router-dom";
import { FiCalendar, FiList, FiBookOpen, FiBox } from "react-icons/fi";

export default function IndexLayout() {
  return (
    <div className="flex h-screen w-full justify-center bg-gray-300 p-4">
      <main className="grid h-full w-full max-w-2xl grid-rows-[1fr,5rem] gap-4">
        <Card padded>
          <Outlet />
        </Card>
        <Card>
          <Navbar>
            <Navbutton name="Flow" icon={<FiCalendar />} href="/" />
            <Navbutton name="List" icon={<FiList />} href="/list" />
            <Navbutton name="Recipes" icon={<FiBookOpen />} href="/recipes" />
            <Navbutton name="Stock" icon={<FiBox />} href="/stock" />
          </Navbar>
        </Card>
      </main>
    </div>
  );
}
