import { useState } from "react"

export default function Notifications() {
  const [notifications, setNotifications] = useState(0)

  const triggerNotification = () => setNotifications(n => n + 1)
  const clearNotifications = () => setNotifications(0)

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-md flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-3">🔔 Notificaciones</h2>

      <div className="text-5xl font-bold mb-4">{notifications}</div>

      <div className="flex gap-3">
        <button
          onClick={triggerNotification}
          className="bg-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-500"
        >
          Nueva
        </button>
        <button
          onClick={clearNotifications}
          className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-500"
        >
          Limpiar
        </button>
      </div>
    </div>
  )
}
