import { UserProfile } from '@clerk/nextjs'

export default function ProfilePage() {
  return (
    <>
      <div className="mx-auto max-w-4xl">
        <h1 className="font-heading mb-8 text-4xl font-bold md:text-5xl">
          Mijn Profiel
        </h1>

        <UserProfile />
      </div>
    </>
  )
}
