export default function NotificationsSolved({ comments, clearComments }: { comments: string[], clearComments: () => void }) {
  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-md flex flex-col items-center w-full">
      <h2 className="text-xl font-semibold mb-3">🔔 Notificaciones</h2>

      <div className="text-5xl font-bold mb-4">{comments?.length}</div>

      {comments?.length > 0 ? (
        <ul className="w-full text-sm mb-4 max-h-40 overflow-y-auto bg-slate-700 rounded-lg p-3">
          {comments.slice(-5).reverse().map((c, i) => (
            <li
              key={i}
              className="border-b border-slate-600 py-1 last:border-none"
            >
              Nuevo comentario: <span className="text-blue-300">{c}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 text-sm mb-4">No hay notificaciones nuevas</p>
      )}

      <button
        onClick={clearComments}
        className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-500"
      >
        Limpiar notificaciones
      </button>
    </div>
  )
}
