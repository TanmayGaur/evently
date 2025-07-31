import { currentUser } from "@clerk/nextjs/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function EventsPage() {
  const user = await currentUser();

  return (
    <main className="min-h-screen bg-gradient-dark flex flex-col">
      <Header />

      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-gradient-brand mb-6">
            Welcome to Events, {user?.firstName || "User"}!
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {/* Event cards will go here */}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
