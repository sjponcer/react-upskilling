import { useQuery } from "@tanstack/react-query";
import { fetchMockPosts } from "../api/mockPosts";
import { usePostMutations } from "../hooks/usePostMutations";
import { useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function PostsWithMutation() {
  const [newPostTitle, setNewPostTitle] = useState("");

  // Query to fetch posts
  const { data, isLoading, error } = useQuery<Post[]>({
    queryKey: ["posts-with-mutation"],
    queryFn: fetchMockPosts,
  });

  // Mutations from custom hook
  const { createMutation, createFailMutation, deleteMutation } = usePostMutations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPostTitle.trim()) {
      createMutation.mutate(
        {
          title: newPostTitle,
          body: "This is a demo post created via mutation",
          userId: 1,
        },
        {
          onSuccess: () => {
            setNewPostTitle(""); // Clear input on success
          },
        }
      );
    }
  };
  
  const handleFailingSubmit = () => {
    if (newPostTitle.trim()) {
      createFailMutation.mutate({
        title: newPostTitle,
        body: "This post will fail to create",
        userId: 1,
      });
    }
  };

  if (isLoading) return <p>⏳ Cargando...</p>;
  if (error) return <p>❌ Error al obtener los posts</p>;

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-3 space-y-2">
        <input
          type="text"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          placeholder="New post title..."
          className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-600 text-white text-sm"
        />
        
        {/* Success Mutation Button */}
        <button
          type="submit"
          disabled={createMutation.isPending || createFailMutation.isPending || !newPostTitle.trim()}
          className="w-full px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white text-sm font-medium transition-all"
        >
          {createMutation.isPending ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span> Creating... (Loading State)
            </span>
          ) : (
            "✅ Add Post (Success)"
          )}
        </button>

        {/* Success Feedback */}
        {createMutation.isSuccess && (
          <div className="px-3 py-2 bg-green-900/30 border border-green-700 rounded text-green-400 text-xs">
            ✅ Post created successfully!
          </div>
        )}

        {/* Failing Mutation Button */}
        <button
          type="button"
          onClick={handleFailingSubmit}
          disabled={createMutation.isPending || createFailMutation.isPending || !newPostTitle.trim()}
          className="w-full px-3 py-2 rounded bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white text-sm font-medium transition-all"
        >
          {createFailMutation.isPending ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span> Attempting... (Loading State)
            </span>
          ) : (
            "💥 Add Post (Will Fail)"
          )}
        </button>

        {/* Error Feedback */}
        {createFailMutation.isError && (
          <div className="px-3 py-2 bg-red-900/30 border border-red-700 rounded text-red-400 text-xs">
            ❌ Error: {createFailMutation.error?.message || "Failed to create post"}
          </div>
        )}
      </form>

      <ul className="space-y-2">
        {data?.map((post: Post) => (
          <li key={post.id} className="p-2 rounded border border-blue-700 bg-blue-900/20 flex justify-between items-center">
            <h4 className="font-semibold text-blue-400 text-sm flex-1">{post.title}</h4>
            <button
              onClick={() => deleteMutation.mutate(post.id)}
              disabled={deleteMutation.isPending}
              className="ml-2 px-2 py-1 text-xs rounded bg-red-600 hover:bg-red-700 disabled:bg-gray-600 transition-all"
            >
              {deleteMutation.isPending && deleteMutation.variables === post.id ? (
                <span className="animate-spin">⏳</span>
              ) : (
                "🗑️"
              )}
            </button>
          </li>
        ))}
      </ul>
      
      {data && data.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-4">
          No posts yet. Add one above!
        </p>
      )}
      
      <div className="mt-3 p-2 bg-slate-800/50 rounded text-xs text-gray-400">
        <p className="font-semibold mb-1">💡 Demo States:</p>
        <ul className="space-y-1 ml-2">
          <li>✅ Success: Creates post & invalidates cache</li>
          <li>💥 Fail: Shows error after 1 second delay</li>
          <li>⏳ Loading: Both buttons show loading state</li>
        </ul>
      </div>
    </div>
  );
}

