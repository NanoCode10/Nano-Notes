import React, { useEffect, useState } from "react";
import { NoteStatus } from "../types/types";
import { FloatingButton } from "../assets/icons/FloatingButton";

interface TaskAdderProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onAddNote: (title: string, details: string, status: NoteStatus) => void;
  onEditNote?: (
    id: string,
    title: string,
    details: string,
    status: NoteStatus
  ) => void;
  editingNote?: {
    id: string;
    title: string;
    details: string;
    status: NoteStatus;
  };
}

export default function TaskAdder({
  isOpen,
  onOpen,
  onClose,
  onAddNote,
  onEditNote,
  editingNote,
}: TaskAdderProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<NoteStatus>("Iniciado");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setDescription(editingNote.details);
      setStatus(editingNote.status as NoteStatus);
    } else {
      setTitle("");
      setDescription("");
      setStatus("Iniciado");
    }
  }, [editingNote, onOpen, onClose]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editingNote && onEditNote) {
      onEditNote(editingNote.id, title, description, status);
    } else {
      onAddNote(title, description, status);
    }

    onClose();
  };

  return (
    <>
      <FloatingButton onOpen={onOpen} />

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4 text-white">
              {editingNote ? "Editar tarea" : "Agregar nueva tarea"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Título
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                  required
                  placeholder="Ingrese el título de la tarea"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Descripción
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                  rows={3}
                  placeholder="Ingrese la descripción de la tarea"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Estado
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as NoteStatus)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white"
                  required
                >
                  <option value="Iniciado">Iniciado</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Realizado">Realizado</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => onClose()}
                  className="px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {editingNote ? <>Guardar cambios</> : <>Agregar nota</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
