import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.string().email("Debe ser un email válido"),
});

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data: z.infer<typeof schema>) => {
    alert(`✅ Enviado:\n${JSON.stringify(data, null, 2)}`);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md">
      <div>
        <label className="block text-sm mb-1">Nombre</label>
        <input
          {...register("name")}
          className="w-full p-2 rounded bg-slate-800 border border-slate-700"
        />
        {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm mb-1">Email</label>
        <input
          {...register("email")}
          className="w-full p-2 rounded bg-slate-800 border border-slate-700"
        />
        {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
      </div>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg text-white"
      >
        Enviar
      </button>
    </form>
  );
}
