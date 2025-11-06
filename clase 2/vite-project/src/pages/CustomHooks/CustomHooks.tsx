import Comments from "@/pages/CustomHooks/components/Comments"
import Notifications from "@/pages/CustomHooks/components/Notifications"

export default function CustomHooks() {
  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-3xl font-bold mb-6">🎯 Hooks en React</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Comments />
        <Notifications />
      </div>
    </div>
  )
}

