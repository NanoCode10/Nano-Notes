import { useEffect, useState } from "react";

interface NoteProps {
  id: string;
  title: string;
  details: string;
  initialStatus: NoteStatus;
  onStatusChange: (id: string, newStatus: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

type NoteStatus = "Iniciado" | "Pendiente" | "Realizado";

export default function NoteCard({
  id,
  title,
  details,
  initialStatus,
  onStatusChange,
  onEdit,
  onDelete,
}: NoteProps) {
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  const handleStatusChange = () => {
    const newStatus =
      status === "Iniciado"
        ? "Pendiente"
        : status === "Pendiente"
        ? "Realizado"
        : "Iniciado";
    setStatus(newStatus);
    onStatusChange(id, newStatus);
  };

  const getStatusColor = () => {
    switch (status) {
      case "Iniciado":
        return "bg-blue-600";
      case "Pendiente":
        return "bg-yellow-600";
      case "Realizado":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden w-full max-w-md text-white">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-300 mb-4">{details}</p>
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm font-medium">Estado:</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor()}`}
          >
            {status}
          </span>
        </div>
      </div>
      <div className="bg-gray-700 px-4 py-3 sm:px-6 flex justify-between">
        <button
          onClick={handleStatusChange}
          className="rounded-full p-2 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-label="Cambiar Estado"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
        <button
          onClick={() => onEdit(id)}
          className="rounded-full p-2 bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          aria-label="Editar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          onClick={() => onDelete(id)}
          className="rounded-full p-2 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          aria-label="Eliminar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
