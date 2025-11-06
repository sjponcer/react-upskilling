import { useState } from "react"

export default function useComments() {
  const [comments, setComments] = useState(["soy un comentario"])

  const addComment = (text: string) => {
    if (!text.trim()) return
    setComments([...comments, text])
  }

  const clearComments = () => setComments([])

  return { comments, addComment, clearComments }
}