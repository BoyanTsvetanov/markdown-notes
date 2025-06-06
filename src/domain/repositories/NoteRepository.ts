import { Note, NoteId } from "../entities/Note";

export interface NoteRepository {
  create(note: Note): Promise<void>;
  getAll(): Promise<Note[]>;
  getById(id: NoteId): Promise<Note | null>;
  update(note: Note): Promise<void>;
  delete(id: NoteId): Promise<void>;
  deleteAll(): Promise<void>;
}
