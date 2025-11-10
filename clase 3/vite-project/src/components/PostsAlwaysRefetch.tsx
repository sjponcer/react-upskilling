import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/posts";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function PostsAlwaysRefetch() {
  const { data, isLoading, error, dataUpdatedAt, isFetching } = useQuery<Post[]>({
    queryKey: ["posts-always-refetch"],
    queryFn: fetchPosts,
    staleTime: 0, // Data immediately becomes stale
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnMount: true, // Refetch when component remounts
    refetchInterval: 2000, // Don't auto-refetch on interval (optional)
  });

  if (isLoading) return <p>⏳ Cargando...</p>;
  if (error) return <p>❌ Error al obtener los posts</p>;

  return (
    <div>
      <div className="mb-3 text-sm text-gray-400">
        📅 Last fetched: {new Date(dataUpdatedAt).toLocaleTimeString()}
        {isFetching && <span className="ml-2 text-yellow-400">🔄 Refetching...</span>}
      </div>
      <ul className="space-y-2">
        {data?.slice(0, 3)?.map((post: Post) => (
          <li key={post.id} className="p-2 rounded border border-yellow-700 bg-yellow-900/20">
            <h4 className="font-semibold text-yellow-400 text-sm">{post.title}</h4>
          </li>
        ))}
      </ul>
      <p className="text-xs text-gray-500 mt-2">
        🔄 Refetches on mount and window focus
      </p>
    </div>
  );
}

