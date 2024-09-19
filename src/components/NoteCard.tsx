import { useEffect, useState } from "react";
import { NoteProps, NoteStatus } from "../types/types";
import ChangeStatusButon from "../assets/icons/ChangeStatusButton";
import EditNoteButton from "../assets/icons/EditNoteButton";
import DeleteNoteButton from "../assets/icons/DeleteNoteButton";

interface NoteCardProps extends NoteProps {
  initialStatus: NoteStatus;
  onStatusChange: (id: string, newStatus: string) => void;
  onEdit: (
    id: string,
    title: string,
    details: string,
    status: NoteStatus,
    createDate: string
  ) => void;
  onDelete: (id: string) => void;
  createDate: string;
}

export default function NoteCard({
  id,
  title,
  details,
  initialStatus,
  onStatusChange,
  onEdit,
  onDelete,
  createDate,
}: NoteCardProps) {
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
    <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-[200px] h-55 text-white">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 break-words">{title}</h2>
        <p className="text-gray-300 mb-1 break-words">{details}</p>

        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Estado:</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor()}`}
            >
              {status}
            </span>
          </div>
          <span className="text-[10px] font-xs text-gray-600 px-2 ">
            {new Date(createDate).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
      <div className="bg-gray-700 px-4 py-3 sm:px-6 flex justify-between gap-2">
        <button
          onClick={handleStatusChange}
          className="rounded-full p-2 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-label="Cambiar Estado"
        >
          <ChangeStatusButon />
        </button>
        <button
          onClick={() => onEdit(id, title, details, status, createDate)}
          className="rounded-full p-2 bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          aria-label="Editar"
        >
          <EditNoteButton />
        </button>
        <button
          onClick={() => onDelete(id)}
          className="rounded-full p-2 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          aria-label="Eliminar"
        >
          <DeleteNoteButton />
        </button>
      </div>
    </div>
  );
}
