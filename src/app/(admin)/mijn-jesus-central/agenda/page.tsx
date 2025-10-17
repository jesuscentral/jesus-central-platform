import Button from "@/components/ui/atoms/Button";
import { CreateEventForm } from "@/features/storyblok-management";
import { SignOutButton } from "@clerk/nextjs";
import { CalendarIcon, FileIcon, GiftIcon, LogOutIcon } from "lucide-react";

export default function NewEventPage() {
  return (
    <>
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 font-heading text-4xl font-bold md:text-5xl">
          Activiteit aanmaken
        </h1>

        <div className="container mx-auto flex justify-end space-x-4">
          <Button
            size="small"
            variant="outline"
            type="strategy-red"
            href="/mijn-jesus-central/agenda"
          >
            <CalendarIcon className="w-4 h-4" />
            Agenda
          </Button>
          <Button
            disabled={true}
            size="small"
            variant="outline"
            type="strategy-red"
            href="/mijn-jesus-central/documenten"
          >
            <FileIcon className="w-4 h-4" />
            Documenten
          </Button>
          <Button
            size="small"
            variant="outline"
            type="strategy-red"
            href="/mijn-jesus-central/geven"
          >
            <GiftIcon className="w-4 h-4" />
            Geven
          </Button>
          <SignOutButton>
            <Button size="small" variant="outline" type="strategy-red">
              <LogOutIcon className="w-4 h-4" />
              Uitloggen
            </Button>
          </SignOutButton>
        </div>

        <div className="rounded-lg  p-4  md:p-8">
          <CreateEventForm />
        </div>
      </div>
    </>
  );
}
