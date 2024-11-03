interface PageProps {
  params: {
    user: string;
  };
}

export default async function Page({ params: { user } }: PageProps) {
  // get contens using slug
  // TODO: sort contents by lineNumber
  return <main className="container mx-auto py-9">{user}</main>;
}
