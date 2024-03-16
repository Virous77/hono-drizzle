"use server";

import { revalidatePath } from "next/cache";

export const invalidatePath = (path: string) => {
  revalidatePath(path);
};
