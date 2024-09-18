//import { useEffect } from "react";
import "./App.css";
import NoteCard from "./components/NoteCard";
import TaskAdder from "./components/task-adder";
import useNotes from "./hooks/useNotes";

type NoteStatus = "Iniciado" | "Pendiente" | "Realizado";

function App() {
  const { notes, addNote, deleteNote, updateNote } = useNotes();

  // Agrega una nueva nota al setState
  // useEffect(() => {
  //   //addNote("Nueva nota1", "Detalles de la nueva nota1", "Pendiente");
  //   console.log("Notas actuales en el APP:", notes);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [notes]);

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
            onEdit={() => console.log("Edit")}
            onDelete={() => deleteNote(note.id)}
          />
        ))}
      </div>

      {/* Agrega una nueva nota al estado */}
      <TaskAdder onAddNote={addNote} />
    </>
  );
}

export default App;
