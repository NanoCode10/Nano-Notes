
export type NoteStatus = 'Iniciado' | 'Pendiente' | 'Realizado';

export interface NoteProps {
  id: string;
  title: string;
  details: string;
  status: NoteStatus;
  createDate: string;
}

export type EditingNote = NoteProps | null;