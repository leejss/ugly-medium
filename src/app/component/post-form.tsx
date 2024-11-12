import { createPost } from "../actions";

export default function PostForm() {
  return (
    <form action={createPost} className="mb-8">
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <textarea
        name="content"
        placeholder="Content"
        className="w-full p-2 mb-2 border rounded"
        required
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Post
      </button>
    </form>
  );
}
