export async function fetchPosts() {
  console.log("🔍 Fetching posts from API...");
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  return res.json();
}

export async function createPost(newPost: { title: string; body: string; userId: number }) {
  console.log("✍️ Creating post via API...");
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });
  if (!res.ok) throw new Error("Error creating post");
  return res.json();
}

export async function deletePost(id: number) {
  console.log("🗑️ Deleting post via API...");
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error deleting post");
  return res.json();
}
