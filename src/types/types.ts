
export type NoteStatus = 'Iniciado' | 'Pendiente' | 'Realizado';

export interface NoteProps {
  id: string;
  title: string;
  details: string;
  status: NoteStatus;
}

export type EditingNote = NoteProps | null;