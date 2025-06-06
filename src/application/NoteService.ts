import { Note } from "@/domain/entities/Note";
import { NoteRepository } from "@/domain/repositories/NoteRepository";
import { v4 as uuidv4 } from "uuid";

export class NoteService {
  constructor(private readonly noteRepo: NoteRepository) {}

  async createNote(title: string, content: string): Promise<Note> {
    const now = new Date();
    const note: Note = {
      id: uuidv4(),
      title,
      content,
      createdAt: now,
      updatedAt: now,
    };
    await this.noteRepo.create(note);
    return note;
  }

  async getAllNotes(): Promise<Note[]> {
    return await this.noteRepo.getAll();
  }

  async deleteAllNotes(): Promise<void> {
    await this.noteRepo.deleteAll(); 
  }

  async getNote(id: string): Promise<Note | null> {
    return await this.noteRepo.getById(id);
  }

  async updateNote(note: Note): Promise<void> {
    note.updatedAt = new Date();
    await this.noteRepo.update(note);
  }

  async deleteNote(id: string): Promise<void> {
    await this.noteRepo.delete(id);
  }
}
