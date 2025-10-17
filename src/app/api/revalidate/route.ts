import { revalidatePath } from "next/cache";

export const GET = async (request: Request) => {
  await Promise.all([
    revalidatePath("/", "page"),
    revalidatePath("/[...slug]", "page"),
    revalidatePath("/activiteiten/[slug]", "page"),
  ]);
  return new Response("Revalidated", { status: 200 });
};
