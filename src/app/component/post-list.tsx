import { fetchPosts } from "../service/post"

export default async function PostList() {
  const posts = await fetchPosts()
  console.log("posts", posts)
  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>{post.title}</div>
      ))}
    </div>
  )
}
