import { useState } from "react";

interface Props {
  onSubmit: (values: { name: string; description: string }) => void;
  onClose: () => void;
}

export default function AddBoardModal({ onSubmit, onClose }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Descripción:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button type="submit">Guardar</button>
      <button type="button" onClick={onClose}>
        Cancelar
      </button>
    </form>
  );
}
