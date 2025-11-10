# 🧠 React Query Demo Guide

This demo showcases three different React Query patterns side by side for educational purposes.

## 📁 Files Created

### Components
- `src/components/PostsNoRefetch.tsx` - Posts that load once and never refetch
- `src/components/PostsAlwaysRefetch.tsx` - Posts that refetch on every mount and window focus
- `src/components/PostsWithMutation.tsx` - Posts with CREATE and DELETE mutations

### Hooks
- `src/hooks/usePostMutations.tsx` - Custom hook containing all mutation logic (create, createFail, delete)

### Pages
- `src/pages/ReactQueryDemo.tsx` - Main demo page displaying all three patterns

### API
- `src/api/posts.ts` - Real API functions for the first two examples
- `src/api/mockPosts.ts` - **Mock API with Zustand** for mutations demo (simulates real API behavior)

### Store
- `src/store/usePostsStore.tsx` - Zustand store to persist mock data across mutations

## 🎯 Three Patterns Demonstrated

### 1️⃣ No Refetch (Green Section)
**Configuration:**
```typescript
{
  staleTime: Infinity,           // Data never becomes stale
  refetchOnWindowFocus: false,   // Don't refetch when window regains focus
  refetchOnMount: false,         // Don't refetch when component remounts
}
```

**Use Case:** Static data that rarely changes (e.g., country lists, app configuration)

**How to Test:**
- Navigate to "RQ Demo" page
- Check console - you'll see one fetch
- Navigate to another page and back
- Check console - NO new fetch (data is cached)

---

### 2️⃣ Always Refetch (Yellow Section)
**Configuration:**
```typescript
{
  staleTime: 0,                  // Data immediately becomes stale
  refetchOnWindowFocus: true,    // Refetch when window regains focus
  refetchOnMount: true,          // Refetch when component remounts
}
```

**Use Case:** Real-time or frequently changing data (e.g., notifications, stock prices, live feeds)

**How to Test:**
- Navigate to "RQ Demo" page
- Check console - you'll see a fetch
- Navigate away and back
- Check console - NEW fetch every time!
- Click outside the browser window and back - it refetches again!

---

### 3️⃣ With Mutations (Blue Section)
**Configuration:**
```typescript
// Custom Hook (src/hooks/usePostMutations.tsx)
export function usePostMutations() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createMockPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts-with-mutation"] });
    },
  });

  const createFailMutation = useMutation({
    mutationFn: createMockPostThatFails,
    onError: (error) => console.error(error),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMockPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts-with-mutation"] });
    },
  });

  return { createMutation, createFailMutation, deleteMutation };
}

// Component (src/components/PostsWithMutation.tsx)
const { data } = useQuery({
  queryKey: ["posts-with-mutation"],
  queryFn: fetchMockPosts,
});

const { createMutation, createFailMutation, deleteMutation } = usePostMutations();
```

**Use Case:** Data that users can modify (e.g., CRUD operations)

**⚡ Mock API Implementation:**
This example uses a **mock API with Zustand** to simulate real server behavior:
- Data persists in Zustand store (in-memory)
- Promises with delays simulate network latency (500-800ms)
- Console logs show API activity
- Mutations actually work (unlike JSONPlaceholder which doesn't persist)

**How to Test:**
- Type a post title in the input field
- Click **"✅ Add Post (Success)"** button
  - Watch the loading state: button shows spinning ⏳
  - See success message appear
  - Watch the console - you'll see:
    - ✍️ Creating post via MOCK API...
    - ✅ Post created: {...}
    - 🔍 Fetching posts from MOCK API... (auto-refetch after mutation)
  - **The new post appears in the list!** ✨
- Click **"💥 Add Post (Will Fail)"** button
  - Watch the loading state: button shows spinning ⏳
  - After 1 second, see error message appear
  - Watch the console - you'll see:
    - 💥 Attempting to create post via MOCK API...
    - ❌ API Error: Server returned 500
- Click the 🗑️ button on any post
  - Button shows loading spinner while deleting
  - Watch the console - you'll see:
    - 🗑️ Deleting post via MOCK API...
    - ✅ Post deleted: {id}
    - 🔍 Fetching posts from MOCK API... (auto-refetch after mutation)
  - **The post disappears from the list!** 🎉

## 🎭 Mock API Architecture

The mutations demo uses a **realistic mock setup**:

```typescript
// Zustand Store (in-memory database)
const usePostsStore = create((set) => ({
  posts: [],
  addPost: (post) => { /* adds to array */ },
  deletePost: (id) => { /* removes from array */ },
}));

// Mock API with Promises
async function createMockPost(post) {
  await delay(600); // Simulate network
  const newPost = usePostsStore.getState().addPost(post);
  return newPost;
}
```

**Why Mock?**
- JSONPlaceholder doesn't persist data (returns 200 but doesn't save)
- Zustand + Promises = realistic API behavior
- Students see mutations actually working
- Network delays make it feel like a real API

## 🏗️ Architecture Patterns

### Custom Hooks for Mutations
Mutations are extracted into a custom hook (`usePostMutations`) for:
- **Reusability** - Use the same mutations in multiple components
- **Separation of Concerns** - Components focus on UI, hooks handle data logic
- **Testability** - Easier to test hooks independently
- **Maintainability** - All mutation logic in one place

```typescript
// ✅ Good: Separated logic
const { createMutation, deleteMutation } = usePostMutations();

// ❌ Avoid: Inline mutations in every component
const mutation = useMutation({ mutationFn: createPost, ... });
```

## 🔑 Key Concepts

### Stale Time
- **`staleTime: 0`** → Data immediately stale, refetches often
- **`staleTime: 5 * 60 * 1000`** → Fresh for 5 minutes
- **`staleTime: Infinity`** → Never stale, loads once forever

### Refetch Triggers
- **`refetchOnMount`** → Refetch when component mounts
- **`refetchOnWindowFocus`** → Refetch when user returns to browser tab
- **`refetchInterval`** → Auto-refetch every X milliseconds

### Mutations
- **`useMutation`** → For POST, PUT, DELETE operations
- **`invalidateQueries`** → Marks cache as stale, triggers refetch
- **`onSuccess`** → Callback after successful mutation
- **`onError`** → Callback after failed mutation
- **`isPending`** → Loading state indicator
- **`isSuccess`** → Success state indicator
- **`isError`** → Error state indicator

## 🎓 Demo Presentation Tips

1. **Open Browser Console** - Show API calls happening in real-time
2. **Navigate Between Pages** - Show different refetch behaviors
3. **Switch Browser Tabs** - Show refetchOnWindowFocus behavior
4. **Use Mutations** - Show automatic cache invalidation
5. **Check Timestamps** - Show "Last fetched" times to prove no refetching

## 🚀 Access the Demo

Navigate to: `http://localhost:5173/react-query-demo`

Or click **"RQ Demo"** in the navigation bar.

---

Happy demoing! 🎉

