import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/posts";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function PostList() {
  const { data, isLoading, error } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: Infinity, // Data never becomes stale, loads only once
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch when component remounts
  });

  if (isLoading) return <p>⏳ Cargando...</p>;
  if (error) return <p>❌ Error al obtener los posts</p>;

  return (
    <ul className="space-y-3">
      {data?.map((post: any) => (
        <li key={post.id} className="p-3 rounded-lg border border-slate-700 bg-slate-800">
          <h3 className="font-semibold text-sky-400">{post.title}</h3>
          <p className="text-gray-300 text-sm">{post.body}</p>
        </li>
      ))}
    </ul>
  );
}
