import React, { useEffect, useState } from "react";
import { NoteStatus } from "../types/types";

interface TaskAdderProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onAddNote: (title: string, details: string, status: string) => void;
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
  }, [editingNote]);

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
      <button
        className="fixed bottom-4 right-4 rounded-full w-20 h-20 bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 flex items-center justify-center"
        onClick={onOpen}
        aria-label="Agregar nueva tarea"
      >
        <svg
          fill="#ffffff"
          width="800px"
          height="800px"
          viewBox="0 0 1920 1920"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill-rule="evenodd">
            <path d="M106.667 267H320v213.333h853.33V267h213.34v160h106.66V160.333h-329.1C1142.26 98.19 1083 53.667 1013.33 53.667H480c-69.665 0-128.931 44.523-150.896 106.666H0V1867h1493.33v-320h-106.66v213.33H106.667V267Zm320 106.667v-160c0-29.456 23.878-53.334 53.333-53.334h533.33c29.46 0 53.34 23.878 53.34 53.334v160H426.667Z" />
            <path d="m1677.57 528.309 225.88 225.883c22.02 22.023 22.02 57.713 0 79.849L1225.8 1511.69c-10.62 10.5-24.96 16.49-39.98 16.49H959.937c-31.171 0-56.47-25.3-56.47-56.47v-225.89c0-15.02 5.986-29.36 16.489-39.86L1597.6 528.309c22.14-22.136 57.83-22.136 79.97 0Zm-155.41 235.144 146.03 146.033 115.43-115.426-146.04-146.033-115.42 115.426Zm-505.75 651.787h146.03l425.9-425.9-146.03-146.038-425.9 425.898v146.04Z" />
          </g>
        </svg>
      </button>

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
