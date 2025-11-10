import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMessages, postMessage } from "../api/messages";
import MessageForm from "./MessageForm";

export default function Messages() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
  });

  const mutation = useMutation({
    mutationFn: postMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  if (isLoading) return <p>⏳ Cargando mensajes...</p>;
  if (error) return <p>❌ Error al cargar mensajes</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-3">💬 Mensajes</h2>

      <MessageForm onSend={(data) => mutation.mutate(data)} isPosting={mutation.isPending} />

      {mutation.isError && <p className="text-red-400">Error al enviar mensaje</p>}
      {mutation.isSuccess && <p className="text-green-400">✅ Mensaje enviado!</p>}

      <ul className="space-y-3">
        {data.map((msg) => (
          <li
            key={msg.id}
            className="p-3 border border-slate-700 bg-slate-800 rounded-lg shadow-sm"
          >
            <p className="font-semibold text-sky-400">{msg.author}</p>
            <p className="text-gray-200 text-sm">{msg.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
