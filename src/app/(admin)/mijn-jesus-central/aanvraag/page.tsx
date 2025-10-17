import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { FilloutForm } from "@/features/storyblok/components";

export default async function AanvraagPage() {
  const clerkUser = await currentUser();

  if (clerkUser?.publicMetadata?.canRequestAnnouncement !== true) {
    redirect("/mijn-jesus-central");
  }

  return (
    <>
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 font-heading text-4xl font-bold md:text-5xl">
          Aanvraag
        </h1>
        <FilloutForm
          blok={{
            id: "af4jERsfWXus",
            component: "filloutForm",
            type: "standard",
            _uid: "af4jERsfWXus",
          }}
        />
      </div>
    </>
  );
}
