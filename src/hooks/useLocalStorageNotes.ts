import { useState, useEffect } from "react";
import { NoteProps } from "../types/types"; // Asegúrate de ajustar la importación del tipo Note según tu proyecto

// Hook personalizado para manejar el estado sincronizado con localStorage
function useLocalStorageNotes(key: string, initialNotes: NoteProps[]) {
  const [notes, setNotes] = useState<NoteProps[]>(() => {
    try {
      // Obtén los datos de localStorage si existen
      const storedNotes = localStorage.getItem(key);
      return storedNotes ? JSON.parse(storedNotes) : initialNotes;
    } catch (error) {
      console.error("Error leyendo de localStorage", error);
      return initialNotes;
    }
  });

  useEffect(() => {
    try {
      // Guarda las notas en localStorage cada vez que cambien
      localStorage.setItem(key, JSON.stringify(notes));
    } catch (error) {
      console.error("Error guardando en localStorage", error);
    }
  }, [key, notes]);

  return [notes, setNotes] as const;
}

export default useLocalStorageNotes;