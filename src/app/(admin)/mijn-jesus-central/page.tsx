import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <>
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 font-heading text-4xl font-bold md:text-5xl">
          Mijn Profiel
        </h1>

        <UserProfile />
      </div>
    </>
  );
}
