import PostForm from "./component/post-form";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Simple CRUD Blog</h1>
      <PostForm />
      {/* <PostList /> */}
    </div>
  );
}
