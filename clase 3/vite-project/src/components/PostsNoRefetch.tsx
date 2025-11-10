import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/posts";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function PostsNoRefetch() {
  const { data, isLoading, error, dataUpdatedAt } = useQuery<Post[]>({
    queryKey: ["posts-no-refetch"],
    queryFn: fetchPosts,
    staleTime: Infinity, // Data never becomes stale
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch when component remounts
  });

  if (isLoading) return <p>⏳ Cargando...</p>;
  if (error) return <p>❌ Error al obtener los posts</p>;

  return (
    <div>
      <div className="mb-3 text-sm text-gray-400">
        📅 Last fetched: {new Date(dataUpdatedAt).toLocaleTimeString()}
      </div>
      <ul className="space-y-2">
        {data?.slice(0, 3)?.map((post: Post) => (
          <li key={post.id} className="p-2 rounded border border-green-700 bg-green-900/20">
            <h4 className="font-semibold text-green-400 text-sm">{post.title}</h4>
          </li>
        ))}
      </ul>
      <p className="text-xs text-gray-500 mt-2">
        ✅ Loaded once - Navigate away and back to see it doesn't refetch
      </p>
    </div>
  );
}

