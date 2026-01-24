"use server";

import { revalidatePath, revalidateTag } from "next/cache";

async function createBlogPost(prdContent: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prd_content: prdContent }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to generate blog post");
  }

  const data = await response.json();
  revalidateTag("posts", "default");
  revalidatePath("/dashboard");
  return data;
}

export { createBlogPost };
