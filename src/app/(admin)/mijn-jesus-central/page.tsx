import Section from "@/components/ui/atoms/Section";
import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <>
      <Section backgroundColor="freedom" color="boldness">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 font-heading text-4xl font-bold md:text-5xl">
            Mijn Profiel
          </h1>

          <div className="rounded-lg  p-4  md:p-8">
            <UserProfile />
          </div>
        </div>
      </Section>
    </>
  );
}
