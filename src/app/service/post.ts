// import { createBrowserClient } from "../lib/supabase/client";
import { createServerClient } from "../../lib/supabase/server";

export type Post = {
  title: string;
  content: string;
};

export async function fetchPosts() {
  const supabase = createServerClient();
  const { data, error } = await supabase.from("posts").select();
  if (error) {
    throw error;
  }
  return data as Post[];
}

export async function createPost(post: Post) {
  const supabase = createServerClient();
  const { data, error } = await supabase.from("posts").insert(post);
  if (error) {
    throw error;
  }
  return data;
}

export async function updatePost(id: string, post: Post) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("posts")
    .update(post)
    .eq("id", id);
  if (error) {
    throw error;
  }
  return data;
}

export async function deletePost(id: string) {
  const supabase = createServerClient();
  const { data, error } = await supabase.from("posts").delete().eq("id", id);
  if (error) {
    throw error;
  }
  return data;
}
