import { currentUser } from "@clerk/nextjs/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventsClient from "@/components/EventsClient";

export default async function EventsPage() {
  const user = await currentUser();

  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-dark flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gradient-brand mb-4">
            Please Sign In
          </h1>
          <p className="text-gray-300 mb-8">
            You need to be signed in to view events.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-dark flex flex-col">
      <Header />
      <section className="flex-1 px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gradient-brand mb-4">
              Welcome to Events, {user?.firstName || "User"}!
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover amazing events tailored to your subscription plan.
              Upgrade to access more exclusive experiences!
            </p>
          </div>

          {/* Events List */}
          <EventsClient />
        </div>
      </section>
      <Footer />
    </main>
  );
}
