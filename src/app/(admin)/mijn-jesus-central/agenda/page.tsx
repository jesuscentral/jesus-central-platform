import { CreateEventForm } from '@/features/storyblok-management'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function NewEventPage() {
  const clerkUser = await currentUser()

  if (clerkUser?.publicMetadata?.canEditEvents !== true) {
    redirect('/mijn-jesus-central')
  }

  return (
    <>
      <div className="mx-auto max-w-4xl">
        <h1 className="font-heading mb-8 text-4xl font-bold md:text-5xl">
          Activiteit aanmaken
        </h1>

        <CreateEventForm />
      </div>
    </>
  )
}
