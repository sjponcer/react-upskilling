import { useState, useEffect, useRef } from "react";
import { useAddCard } from "../hooks/useAddCard";

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  columnId: number;
}

export const AddCardModal = ({ isOpen, onClose, columnId }: AddCardModalProps) => {
  const [taskName, setTaskName] = useState("");
  const { addCard, isLoading, error, clearError } = useAddCard();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim() || isLoading) return;

    await addCard(columnId, taskName);
    if (!error) {
      setTaskName("");
      onClose();
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setTaskName("");
      clearError();
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && !isLoading) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClose}
      onKeyDown={handleKeyDown}
    >
      <div
        className="bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Agregar Nueva Tarea</h2>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="task-name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Nombre de la tarea
            </label>
            <input
              ref={inputRef}
              id="task-name"
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Escribe el nombre de la tarea..."
              disabled={isLoading}
              className="w-full bg-gray-800 border border-gray-600 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {error && (
              <p className="mt-2 text-sm text-red-400">{error}</p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading || !taskName.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <i className="fas fa-spinner fa-spin"></i>
                  Guardando...
                </span>
              ) : (
                "Guardar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

