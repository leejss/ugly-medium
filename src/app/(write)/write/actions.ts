"use server";

import { ContentNode } from "@/app/types";

export async function publish(nodes: ContentNode[]) {
  // TODO: insert into database
  return { status: "published", nodes };
}

// user table and post table
