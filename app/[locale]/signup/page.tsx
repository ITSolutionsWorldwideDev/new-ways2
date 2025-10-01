// import { AuthLayout } from "@/components/layout/auth-layout";
import SignupSection from "@/components/sections/auth/signup/signup-section";

export default function SignupPage() {
  return (
    <div>
      <main className="min-h-screen">
        <div className="container mx-auto flex flex-col gap-6">
          <div className="flex items-center">
            <div className="w-full mx-auto px-4 xl:px-0">
              <section className="mb-11">
                <SignupSection />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

{
  /* <AuthLayout>
          <SignupSection />
        </AuthLayout> */
}
