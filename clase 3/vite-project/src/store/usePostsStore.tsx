import { create } from 'zustand';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostsStore {
  posts: Post[];
  initializePosts: (posts: Post[]) => void;
  addPost: (post: Omit<Post, 'id'>) => Post;
  deletePost: (id: number) => void;
}

export const usePostsStore = create<PostsStore>((set, get) => ({
  posts: [],
  
  initializePosts: (posts) => {
    set({ posts });
  },
  
  addPost: (post) => {
    const newPost = {
      ...post,
      id: Date.now(), // Generate unique ID
    };
    set((state) => ({
      posts: [newPost, ...state.posts],
    }));
    return newPost;
  },
  
  deletePost: (id) => {
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    }));
  },
}));

