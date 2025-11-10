import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMockPost, deleteMockPost, createMockPostThatFails } from "../api/mockPosts";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export function usePostMutations() {
  const queryClient = useQueryClient();

  // Mutation to create a new post (SUCCESS)
  const createMutation = useMutation({
    mutationFn: createMockPost,
    onSuccess: () => {
      // Invalidate and refetch posts after successful creation
      queryClient.invalidateQueries({ queryKey: ["posts-with-mutation"] });
    },
    onError: (error) => {
      console.error("Create mutation failed:", error);
    },
  });

  // Mutation to create a post that will FAIL (for demo)
  const createFailMutation = useMutation({
    mutationFn: createMockPostThatFails,
    onError: (error) => {
      console.error("Create mutation failed (expected):", error);
    },
  });

  // Mutation to delete a post
  const deleteMutation = useMutation({
    mutationFn: deleteMockPost,
    onSuccess: () => {
      // Invalidate and refetch posts after successful deletion
      queryClient.invalidateQueries({ queryKey: ["posts-with-mutation"] });
    },
  });

  return {
    createMutation,
    createFailMutation,
    deleteMutation,
    isLoading: createMutation.isPending || createFailMutation.isPending || deleteMutation.isPending,
  };
}

