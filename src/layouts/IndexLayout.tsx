import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import Navbutton from "@/components/Navbutton";
import { Outlet } from "react-router-dom";
import { FiCalendar, FiList, FiBookOpen, FiBox } from "react-icons/fi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { useErrorBoundary: true },
    mutations: { useErrorBoundary: true },
  },
});

export default function IndexLayout(props: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen w-full justify-center bg-gray-300 p-4">
        <main className="grid h-full w-full max-w-2xl grid-rows-[1fr,5rem] gap-4">
          <Card padded>{props.children ? props.children : <Outlet />}</Card>
          <Card>
            <Navbar>
              <Navbutton name="Flow" icon={<FiCalendar />} href="/flow" />
              <Navbutton name="List" icon={<FiList />} href="/list" />
              <Navbutton name="Recipes" icon={<FiBookOpen />} href="/recipes" />
              <Navbutton name="Stock" icon={<FiBox />} href="/stock" />
            </Navbar>
          </Card>
        </main>
      </div>
    </QueryClientProvider>
  );
}
