import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-dark flex flex-col">
      <Header />
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-gradient-brand-animated mb-6">
          Evently
        </h1>
        <p className="mt-4 text-sm sm:text-md md:text-lg text-brand-gray max-w-2xl">
          Tier-based event showcases tailored just for you.
        </p>
        <p className="text-sm sm:text-md md:text-lg text-brand-gray mt-2 mb-8">
          Access exclusive events based on your subscription tier.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <SignedIn>
            <Link href="/events">
              <button className="bg-gradient-brand px-8 py-3 rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                View Events
              </button>
            </Link>
          </SignedIn>

          <SignedOut>
            <Link href="/sign-up">
              <button className="bg-gradient-brand px-8 py-3 rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Get Started
              </button>
            </Link>
          </SignedOut>
        </div>
      </section>
      <section id="plans" className="py-16 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8">
          Plans & Pricing
        </h2>
      </section>
      <Footer />
    </main>
  );
}
