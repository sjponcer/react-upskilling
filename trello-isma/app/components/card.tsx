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
    removeSubTask,
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
      className="group/card bg-gray-700 rounded-lg shadow-md p-3 mb-4 select-none hover:bg-gray-650 transition-transform duration-150 ease-out"
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
        {/* 
         //TODO ver pq esto aveces hace fallar el card.createdAt
         */}
        {/* {card?.createdAt?.toLocaleDateString()}{" "}
        {card?.createdAt?.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })} */}
      </span>

      <div className="text-md">
        {card.subTasks.map((subtask) => (
          <div
            key={subtask.id}
            className="group/subtask flex items-center mt-2 min-h-[30px] w-full"
          >
            <input
              type="checkbox"
              checked={subtask.completed}
              onChange={() => toggleSubtaskCompleted(card.id, subtask.id)}
              className={`
        appearance-none relative h-5 w-5 mr-2 cursor-pointer rounded-sm
        border-2 border-gray-400 hover:border-lime-500 bg-gray-600
        transition-all duration-200 ease-in-out
        checked:bg-lime-400 checked:border-lime-500 checked:scale-110
        before:content-[''] before:absolute before:top-[1px] before:left-[5px]
        before:w-[6px] before:h-[12px] before:border-r-2 before:border-b-2
        before:border-gray-600 before:rotate-45 before:opacity-0
        checked:before:opacity-100 checked:before:transition-opacity
      `}
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
              <>
                <span
                  className={`w-4/5 ${
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

                <button
                  onClick={() => removeSubTask(card.id, subtask.id)}
                  className="
            text-red-400 hover:text-red-500 cursor-pointer ml-2
            opacity-0 transition-opacity duration-200
            group-hover/subtask:opacity-100
          "
                >
                  <i className="fas fa-trash text-xs"></i>
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="card-footer-actions opacity-0 group-hover/card:opacity-100 transition flex justify-between items-center mt-3">
        <button
          className=" text-white cursor-pointer"
          onClick={newSubTaskHandler}
        >
          <i className="fa fa-plus"></i> Nueva subtarea
        </button>

        <button
          onClick={handleDelete}
          className=" text-red-400 hover:text-red-500 cursor-pointer"
        >
          <i className="fas fa-trash text-xs"></i>
        </button>
      </div>
    </div>
  );
});
