import { useCallback, useState } from 'react';

interface Note {
  id: number;
  titulo: string;
  detalles: string;
  estado: string; // puedes cambiarlo por un tipo específico como 'completado', 'pendiente', etc.
}

const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  // Agregar una nota
  const addNote = useCallback((titulo: string, detalles: string, estado: string) => {
    const newNote: Note = {
      id: Date.now(), // Generar un id único
      titulo,
      detalles,
      estado,
    };
    setNotes(prevNotes => [...prevNotes, newNote]);
  }, []);

  

  // Eliminar una nota
  const deleteNote = (id: number) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  // Actualizar una nota
  const updateNote = (id: number, updatedNote: Partial<Note>) => {
    setNotes(prevNotes =>
      prevNotes.map(note => (note.id === id ? { ...note, ...updatedNote } : note))
    );
  };

  // Obtener una nota por su id
  const getNoteById = (id: number): Note | undefined => {
    return notes.find(note => note.id === id);
  };

  // Devolver el array de notas y las funciones
  return {
    notes,
    addNote,
    deleteNote,
    updateNote,
    getNoteById,
  };
};

export default useNotes;
