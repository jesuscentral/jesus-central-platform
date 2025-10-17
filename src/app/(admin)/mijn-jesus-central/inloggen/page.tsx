import Section from "@/components/ui/atoms/Section";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      <Section backgroundColor="boldness" color="freedom">
        <></>
      </Section>
      <Section backgroundColor="freedom" color="boldness">
        <div className="mx-auto flex max-w-md flex-col items-center justify-center">
          <h1 className="mb-8 text-center font-heading text-4xl font-bold md:text-5xl">
            Inloggen
          </h1>

          <div className="w-full">
            <SignIn
              signUpUrl="/mijn-jesus-central/inloggen"
              redirectUrl="/mijn-jesus-central"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
