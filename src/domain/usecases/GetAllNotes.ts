import { NoteRepository } from "../repositories/NoteRepository";
import { Note } from "../entities/Note";

export class GetAllNotes {
  constructor(private noteRepo: NoteRepository) {}

  async execute(): Promise<Note[]> {
    return this.noteRepo.getAll();
  }
}
