//import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import NoteCard from "./components/NoteCard";
import TaskAdder from "./components/task-adder";
import useNotes from "./hooks/useNotes";
import { NoteStatus } from "./types/types";

function App() {
  const { notes, addNote, deleteNote, updateNote } = useNotes();
  const [isTaskAdderOpen, setIsTaskAdderOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<{
    id: string;
    title: string;
    details: string;
    status: NoteStatus;
  } | null>(null);

  // Función para validar el estado
  const getValidStatus = (status: string): NoteStatus => {
    const validStatuses: NoteStatus[] = ["Iniciado", "Pendiente", "Realizado"];
    return validStatuses.includes(status as NoteStatus)
      ? (status as NoteStatus)
      : "Pendiente";
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    updateNote(id, { estado: newStatus });
  };

  const handleEdit = (
    id: string,
    title: string,
    details: string,
    status: NoteStatus
  ) => {
    setEditingNote({ id, title, details, status });
    setIsTaskAdderOpen(true);
  };

  const handleEditNote = (
    id: string,
    title: string,
    details: string,
    status: string
  ) => {
    updateNote(parseInt(id), {
      titulo: title,
      detalles: details,
      estado: status,
    });
    setEditingNote(null);
  };
  const onOpen = () => {
    setEditingNote(null); // Reseteamos editingNote para que los campos estén vacíos
    setIsTaskAdderOpen(true);
  };

  return (
    <>
      <h1 className="text-5xl font-bold underline pb-24">NoteApp</h1>
      {/* Muestra las notas guardadas en el estado */}
      <div className="grid grid-cols-3 gap-4">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id.toString()}
            title={note.titulo}
            details={note.detalles}
            initialStatus={getValidStatus(note.estado)}
            onStatusChange={(id, newStatus) =>
              handleStatusChange(parseInt(id), newStatus)
            }
            onEdit={handleEdit}
            onDelete={() => deleteNote(note.id)}
          />
        ))}
      </div>

      {/* Agrega una nueva nota al estado */}
      <TaskAdder
        isOpen={isTaskAdderOpen}
        onOpen={onOpen}
        onClose={() => {
          setIsTaskAdderOpen(false);
          setEditingNote(null);
        }}
        onAddNote={addNote}
        onEditNote={handleEditNote}
        editingNote={editingNote || undefined}
      />
    </>
  );
}

export default App;
