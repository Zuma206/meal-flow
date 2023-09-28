import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import Navbutton from "@/components/Navbutton";
import { Outlet } from "react-router-dom";
import { FiCalendar, FiList, FiBookOpen, FiBox } from "react-icons/fi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Modal from "@/components/Modal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
    },
  },
});

export default function IndexLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Modal>
        <div className="flex h-screen w-full justify-center bg-gray-300 p-4">
          <main className="grid h-full w-full max-w-2xl grid-rows-[1fr,5rem] gap-4">
            <Card padded>
              <Outlet />
            </Card>
            <Card>
              <Navbar>
                <Navbutton name="Flow" icon={<FiCalendar />} href="/flow" />
                <Navbutton name="List" icon={<FiList />} href="/list" />
                <Navbutton
                  name="Recipes"
                  icon={<FiBookOpen />}
                  href="/recipes"
                />
                <Navbutton name="Stock" icon={<FiBox />} href="/stock" />
              </Navbar>
            </Card>
          </main>
        </div>
      </Modal>
    </QueryClientProvider>
  );
}
