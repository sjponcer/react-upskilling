import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { memo, useState } from "react";
import Swal from "sweetalert2";
import { useBoardContext } from "../context/board";

export const Card = memo(function Card({ card }: { card: Card }) {
  const {
    setCardName,
    deleteCard,
    editingCardId,
    setEditingCardId,
    addSubtask,
    toggleSubtaskCompleted,
    updateSubtaskTitle,
  } = useBoardContext();

  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: card.id,
  });
  const style = { transform: CSS.Transform.toString(transform) };

  const [isEditing, setIsEditing] = useState(card.id === editingCardId);
  const [title, setTitle] = useState(card.title);

  const [editingSubtaskId, setEditingSubtaskId] = useState<string | null>(null);
  const [subtaskTitle, setSubtaskTitle] = useState<string>("");

  const setCardNameHandler = () => {
    const trimmed = title.trim() || "Título del card";
    setCardName(card.id, trimmed);
    setIsEditing(false);
    setEditingCardId(null);
  };

  const setSubTaskHandler = () => {
    const trimmed = subtaskTitle.trim() || "Nueva Subtarea";
    updateSubtaskTitle(card.id, editingSubtaskId!, trimmed);
    setEditingSubtaskId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") setCardNameHandler();
    if (e.key === "Escape") {
      setTitle(card.title);
      setIsEditing(false);
      setEditingCardId(null);
    }
  };

  const newSubTaskHandler = () => {
    addSubtask(card.id, "Nueva Subtarea");
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Eliminar card?",
      text: "Estas seguro que deseas eliminar este card incluyendo subtasks, esto no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      background: "#1e2939",
      color: "#f9fafb",
    });

    if (result.isConfirmed) {
      deleteCard(card.id);
      Swal.fire({
        title: "Eliminado",
        text: "El card fue eliminado correctamente.",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
        background: "#1e2939",
        color: "#f9fafb",
      });
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group bg-gray-700 rounded-lg shadow-md p-3 mb-4 select-none hover:bg-gray-650 transition-transform duration-150 ease-out"
    >
      <div className="flex justify-between items-center mb-2">
        {isEditing ? (
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={setCardNameHandler}
            className="w-full bg-gray-800 border text-md font-medium border-gray-600 text-gray-100 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        ) : (
          <h3
            className="text-lg font-semibold text-gray-100 cursor-text"
            onClick={() => {
              setIsEditing(true);
              setEditingCardId(card.id);
            }}
          >
            {card.title}
          </h3>
        )}

        <span
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 text-xl px-2"
        >
          <i className="fas fa-grip-lines"></i>
        </span>
      </div>

      <span className="text-xs text-gray-400 block">
        {card.createdAt.toLocaleDateString()}{" "}
        {card.createdAt.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>

      <div className="text-md">
        {card.subTasks.map((subtask) => (
          <div key={subtask.id} className="flex items-center mt-2 min-h-[30px]">
            <input
              type="checkbox"
              checked={subtask.completed}
              onChange={() => toggleSubtaskCompleted(card.id, subtask.id)}
              className="mr-2"
            />
            {editingSubtaskId === subtask.id ? (
              <input
                autoFocus
                value={subtaskTitle}
                onChange={(e) => setSubtaskTitle(e.target.value)}
                onBlur={setSubTaskHandler}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setSubTaskHandler();
                }}
                className="bg-gray-800 border font-medium max-h-[30px] border-gray-600 text-gray-100 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            ) : (
              <span
                className={`${
                  subtask.completed
                    ? "line-through text-gray-400"
                    : "text-gray-100"
                } cursor-text`}
                onClick={() => {
                  setEditingSubtaskId(subtask.id);
                  setSubtaskTitle(subtask.title);
                }}
              >
                {subtask.title}
              </span>
            )}
          </div>
        ))}
      </div>

      <button
        className="opacity-0 group-hover:opacity-100 text-white cursor-pointer"
        onClick={newSubTaskHandler}
      >
        <i className="fa fa-plus"></i> Nueva subtarea
      </button>

      <button
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 transition rounded-full p-1 w-6 h-6 flex items-center cursor-pointer"
      >
        <i className="fas fa-trash text-xs"></i>
      </button>
    </div>
  );
});
