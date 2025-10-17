import { revalidatePath } from "next/cache";

export const GET = async (request: Request) => {
  await revalidatePath("/[...slug]", "page");
  await revalidatePath("/activiteiten/[slug]", "page");
  return new Response("Revalidated", { status: 200 });
};
