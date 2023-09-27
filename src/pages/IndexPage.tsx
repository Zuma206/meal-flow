import Card from "@/components/Card";

export default function IndexPage() {
  return (
    <div className="flex h-screen w-full justify-center bg-gray-300 p-4">
      <main className="grid h-full w-full max-w-2xl grid-rows-[1fr,5rem] gap-4">
        <Card />
        <Card />
      </main>
    </div>
  );
}
