import { useCallback } from 'react';
import { NoteProps, NoteStatus } from '../types/types';
import useLocalStorageNotes from './useLocalStorageNotes';
import { generateUniqueId } from '../utils/generateUniqueId';



const useNotes = () => {
  const [notes, setNotes] = useLocalStorageNotes("notes", []);

  // Agregar una nota
  const addNote = useCallback((titulo: string, detalles: string, estado: NoteStatus) => {
    const newNote: NoteProps = {
      id: generateUniqueId(), // Generar un id único
      title: titulo,
      details: detalles,
      status: estado,
    };
    setNotes(prevNotes => [...prevNotes, newNote]);
  }, [setNotes]);

  

  // Eliminar una nota
  const deleteNote = (id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  // Actualizar una nota
  const updateNote = (id: number, updatedNote: Partial<NoteProps>) => {
    setNotes(prevNotes =>
      prevNotes.map(note => (note.id === id.toString() ? { ...note, ...updatedNote } : note))
    );
  };

  // Obtener una nota por su id
  const getNoteById = (id: number): NoteProps | undefined => {
    return notes.find(note => note.id === id.toString());
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
