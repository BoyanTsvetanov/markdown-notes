import { Note, NoteId } from "@/domain/entities/Note";
import { NoteRepository } from "@/domain/repositories/NoteRepository";


const STORAGE_KEY = "markdown_notes";

export class LocalStorageNoteRepository implements NoteRepository {
  async create(note: Note): Promise<void> {
    const notes = await this.getAll();
    notes.push(note);
    this.save(notes);
  }

  async getAll(): Promise<Note[]> {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw) as Note[];
      return parsed.map(note => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }));
    } catch {
      return [];
    }
  }

  async getById(id: NoteId): Promise<Note | null> {
    const notes = await this.getAll();
    return notes.find(note => note.id === id) || null;
  }

  async update(note: Note): Promise<void> {
    const notes = await this.getAll();
    const index = notes.findIndex(n => n.id === note.id);
    if (index !== -1) {
      notes[index] = note;
      this.save(notes);
    }
  }

  async delete(id: NoteId): Promise<void> {
    const notes = await this.getAll();
    const filtered = notes.filter(note => note.id !== id);
    this.save(filtered);
  }
  async deleteAll(): Promise<void> {
    localStorage.clear();    
  }

  private save(notes: Note[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }
}
