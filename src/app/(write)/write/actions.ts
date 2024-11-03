"use server";

export type ParagraphNode = {
  lineNumber: number;
  type: "paragraph";
  text: string;
};

export async function publish(nodes: ParagraphNode[]) {
  return { status: "published", nodes };
}
