"use server";

import { PostService } from "./service";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  await PostService.createPost({ title, content });
}
