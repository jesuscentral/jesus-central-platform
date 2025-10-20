import { revalidatePath } from 'next/cache'

export const GET = async () => {
  await Promise.all([
    revalidatePath('/', 'page'),
    revalidatePath('/[...slug]', 'page'),
    revalidatePath('/activiteiten/[slug]', 'page'),
  ])
  return new Response('Revalidated', { status: 200 })
}
