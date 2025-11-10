import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  author: z.string().min(2, "El nombre es obligatorio"),
  content: z.string().min(3, "El mensaje debe tener al menos 3 caracteres"),
});

export default function MessageForm({ onSend, isPosting }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    onSend(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 rounded-lg bg-slate-900 border border-slate-700 space-y-3"
    >
      <div>
        <label className="block text-sm mb-1">Autor</label>
        <input
          {...register("author")}
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
          placeholder="Tu nombre"
        />
        {errors.author && <p className="text-red-400 text-xs">{errors.author.message}</p>}
      </div>

      <div>
        <label className="block text-sm mb-1">Mensaje</label>
        <textarea
          {...register("content")}
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
          placeholder="Escribí un mensaje..."
          rows={3}
        />
        {errors.content && <p className="text-red-400 text-xs">{errors.content.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isPosting}
        className="px-4 py-2 rounded bg-sky-600 hover:bg-sky-500 text-white disabled:bg-sky-800"
      >
        {isPosting ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}
