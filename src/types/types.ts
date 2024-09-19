// src/types.ts

export type NoteStatus = 'Iniciado' | 'Pendiente' | 'Realizado';

export interface Task {
  id: string;
  title: string;
  details: string;
  status: NoteStatus;
}

export type EditingTask = Task | null;