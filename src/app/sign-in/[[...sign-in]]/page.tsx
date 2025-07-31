import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-gradient-dark flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient-brand mb-4">
            Welcome Back
          </h1>
          <p className="text-brand-gray">
            Sign in to access your events and manage your subscription
          </p>
        </div>

        <SignIn
          appearance={{
            baseTheme: undefined,
            elements: {
              formButtonPrimary:
                "bg-gradient-brand hover:shadow-lg transition-all duration-300 transform hover:scale-105",
              card: "bg-transparent shadow-none",
              headerTitle: "text-white",
              headerSubtitle: "text-brand-gray",
              socialButtonsBlockButton:
                "bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-200",
              socialButtonsBlockButtonText: "text-white",
              formFieldLabel: "text-white",
              formFieldInput:
                "bg-white/10 border-white/20 text-white placeholder:text-brand-gray focus:border-brand-purple",
              footerActionLink: "text-brand-purple hover:text-brand-pink",
              identityPreviewText: "text-white",
              identityPreviewEditButton:
                "text-brand-purple hover:text-brand-pink",
            },
          }}
        />
      </div>
    </main>
  );
}
