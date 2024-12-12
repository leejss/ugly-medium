import { createPost } from "../actions"

export default function PostForm() {
  return (
    <form action={createPost} className="mb-8">
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="mb-2 w-full rounded border p-2"
        required
      />
      <textarea
        name="content"
        placeholder="Content"
        className="mb-2 w-full rounded border p-2"
        required
      ></textarea>
      <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
        Create Post
      </button>
    </form>
  )
}
