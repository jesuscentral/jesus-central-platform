import { CreateEventForm } from "@/features/storyblok-management";

export default function NewEventPage() {
  return (
    <>
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 font-heading text-4xl font-bold md:text-5xl">
          Activiteit aanmaken
        </h1>

        <CreateEventForm />
      </div>
    </>
  );
}
