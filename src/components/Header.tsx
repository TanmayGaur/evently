import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full px-6 py-4 flex justify-between items-center bg-transparent backdrop-blur-sm">
      <Link href="/">
        <h2 className="text-2xl font-bold text-gradient-brand cursor-pointer">
          Evently
        </h2>
      </Link>

      <nav className="flex items-center space-x-6">
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
                userButtonPopoverCard: "bg-brand-dark border-white/20",
                userButtonPopoverActionButton: "text-white hover:bg-white/10",
                userButtonPopoverActionButtonText: "text-white",
                userButtonPopoverFooter: "hidden",
              },
            }}
          />
        </SignedIn>

        <SignedOut>
          <SignInButton mode="redirect">
            <button className="bg-gradient-brand px-4 py-2 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </nav>
    </header>
  );
}
