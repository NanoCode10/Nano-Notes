//import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import NoteCard from "./components/NoteCard";
import TaskAdder from "./components/TaskAdder";
import useNotes from "./hooks/useNotes";
import { NoteProps, NoteStatus } from "./types/types";

function App() {
  const { notes, addNote, deleteNote, updateNote } = useNotes();
  const [isTaskAdderOpen, setIsTaskAdderOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<NoteProps | null>(null);

  // Función para validar el estado
  const getValidStatus = (status: string): NoteStatus => {
    const validStatuses: NoteStatus[] = ["Iniciado", "Pendiente", "Realizado"];
    return validStatuses.includes(status as NoteStatus)
      ? (status as NoteStatus)
      : "Pendiente";
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    const validStatus = getValidStatus(newStatus);
    updateNote(id, { status: validStatus });
  };

  const handleEdit = (
    id: string,
    title: string,
    details: string,
    status: NoteStatus,
    createDate: string
  ) => {
    setEditingNote({ id, title, details, status, createDate });
    setIsTaskAdderOpen(true);
  };

  const handleEditNote = (
    id: string,
    title: string,
    details: string,
    status: NoteStatus,
    createDate: string
  ) => {
    updateNote(id, {
      title,
      details,
      status,
      createDate,
    });

    setEditingNote(null);
  };
  const onOpen = () => {
    setEditingNote(null); // Reseteamos editingNote para que los campos estén vacíos
    setIsTaskAdderOpen(true);
  };

  return (
    <>
      <h1 className="text-5xl font-bold underline  pb-12">NoteApp</h1>
      {/* Muestra las notas guardadas en el estado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id.toString()}
            title={note.title}
            details={note.details}
            status={getValidStatus(note.status)}
            initialStatus={getValidStatus(note.status)}
            onStatusChange={(id, newStatus) =>
              handleStatusChange(id, newStatus)
            }
            onEdit={handleEdit}
            onDelete={() => deleteNote(note.id)}
            createDate={note.createDate}
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
