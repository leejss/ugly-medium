import { ContentNode } from "@/app/types";

interface PageProps {
  params: {
    user: string;
    slug: string;
  };
}

async function getContentsBySlug(slug: string): Promise<ContentNode[]> {
  // fetch contents from API
  console.log("fetching contents by slug", slug);
  return [
    {
      content: "Title",
      lineNumber: 1,
      type: "heading",
    },
    {
      content: "hello world",
      lineNumber: 2,
      type: "p",
    },
    {
      content: "hello world2",
      lineNumber: 3,
      type: "p",
    },
  ];
}

export default async function Page({ params }: PageProps) {
  // get contens using slug
  const slug = params.slug;
  // TODO: sort contents by lineNumber
  const contents = await getContentsBySlug(slug);
  const renderContent = (contentNode: ContentNode) => {
    const { content, type } = contentNode;
    if (type === "heading") {
      return <h1 className="text-4xl font-bold">{content}</h1>;
    }
    if (type === "p") {
      return <p className="text-2xl mt-3">{content}</p>;
    }
  };
  return (
    <main className="container mx-auto py-9">
      {contents.map(renderContent)}
    </main>
  );
}
