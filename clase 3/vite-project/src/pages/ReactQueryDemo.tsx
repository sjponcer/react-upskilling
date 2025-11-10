import PostsNoRefetch from "../components/PostsNoRefetch";
import PostsAlwaysRefetch from "../components/PostsAlwaysRefetch";
import PostsWithMutation from "../components/PostsWithMutation";

export default function ReactQueryDemo() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-2">🧠 React Query Demo</h2>
      <p className="text-gray-400 mb-6">
        Open the browser console to see API calls. Navigate away and back to see different behaviors.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pattern 1: No Refetch */}
        <div className="border border-green-700 rounded-lg p-4 bg-green-950/10">
          <h3 className="text-xl font-bold mb-3 text-green-400">
            🔒 No Refetch
          </h3>
          <PostsNoRefetch />
        </div>

        {/* Pattern 2: Always Refetch */}
        <div className="border border-yellow-700 rounded-lg p-4 bg-yellow-950/10">
          <h3 className="text-xl font-bold mb-3 text-yellow-400">
            🔄 Always Refetch
          </h3>
          <PostsAlwaysRefetch />
        </div>

        {/* Pattern 3: With Mutations */}
        <div className="border border-blue-700 rounded-lg p-4 bg-blue-950/10">
          <h3 className="text-xl font-bold mb-3 text-blue-400">
            ⚡ With Mutations
          </h3>
          <div className="mb-2 px-2 py-1 bg-blue-900/40 rounded text-xs text-blue-300">
            🎭 Uses mock API (Zustand + Promises)
          </div>
          <PostsWithMutation />
        </div>
      </div>

      <div className="mt-8 p-4 bg-slate-800 rounded-lg">
        <h3 className="text-lg font-bold mb-2">📚 How to Test:</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>✅ <strong>No Refetch:</strong> Navigate to another page and back. Notice it doesn't refetch (check console).</li>
          <li>🔄 <strong>Always Refetch:</strong> Navigate away and back. It refetches every time on mount.</li>
          <li>⚡ <strong>With Mutations:</strong> Add/delete posts and watch them actually persist! The cache is invalidated and data refetches automatically.</li>
          <li>👁️ <strong>Window Focus:</strong> Click away from the browser and back. "Always Refetch" will refetch.</li>
          <li>🎭 <strong>Mock API:</strong> The mutations section uses Zustand + Promises to simulate real API behavior (with network delays).</li>
        </ul>
      </div>
    </section>
  );
}

