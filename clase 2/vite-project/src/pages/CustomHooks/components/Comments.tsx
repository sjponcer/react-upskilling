import { useState } from "react"

export default function Comments() {
  const [comments, setComments] = useState(["soy un commentario"])
  const [text, setText] = useState("")

  const addComment = () => {
    if (text.trim() === "") return
    setComments([...comments, text])
    setText("")
  }

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-md flex flex-col items-center w-full">
      <h2 className="text-xl font-semibold mb-3">💬 Comentarios</h2>

      <div className="flex w-full gap-2 mb-3">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg text-black"
          placeholder="Escribí un comentario..."
        />
        <button
          onClick={addComment}
          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500"
        >
          ➕
        </button>
      </div>

      <ul className="w-full text-sm max-h-40 overflow-y-auto">
        {comments.map((c, i) => (
          <li key={i} className="border-b border-slate-700 py-1">{c}</li>
        ))}
      </ul>
    </div>
  )
}
