import { usePostsStore } from "../store/usePostsStore";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Simulates network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch posts (with mock data)
export async function fetchMockPosts(): Promise<Post[]> {
  console.log("🔍 Fetching posts from MOCK API...");
  await delay(800); // Simulate network delay
  
  const store = usePostsStore.getState();
  
  // If store is empty, initialize with mock data
  if (store.posts.length === 0) {
    const mockPosts: Post[] = [
      {
        id: 1,
        title: "Getting Started with React Query",
        body: "React Query makes data fetching a breeze",
        userId: 1,
      },
      {
        id: 2,
        title: "Understanding Mutations",
        body: "Mutations help you modify data on the server",
        userId: 1,
      },
      {
        id: 3,
        title: "Cache Invalidation Strategies",
        body: "Learn when to invalidate your cache",
        userId: 1,
      },
    ];
    store.initializePosts(mockPosts);
    return mockPosts;
  }
  
  return store.posts;
}

// Create a new post
export async function createMockPost(newPost: Omit<Post, 'id'>): Promise<Post> {
  console.log("✍️ Creating post via MOCK API...");
  await delay(600); // Simulate network delay
  
  const store = usePostsStore.getState();
  const createdPost = store.addPost(newPost);
  
  console.log("✅ Post created:", createdPost);
  return createdPost;
}

// Delete a post
export async function deleteMockPost(id: number): Promise<void> {
  console.log("🗑️ Deleting post via MOCK API...");
  await delay(500); // Simulate network delay
  
  const store = usePostsStore.getState();
  store.deletePost(id);
  
  console.log("✅ Post deleted:", id);
}

// Create a post that will fail (for demo purposes)
export async function createMockPostThatFails(newPost: Omit<Post, 'id'>): Promise<Post> {
  console.log("💥 Attempting to create post via MOCK API...");
  await delay(1000); // Simulate network delay
  
  console.error("❌ API Error: Server returned 500 - Internal Server Error");
  throw new Error("Failed to create post: Server error");
}

