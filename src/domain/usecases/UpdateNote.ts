import { NoteRepository } from "../repositories/NoteRepository";
import { Note } from "../entities/Note";

export class UpdateNote {
  constructor(private noteRepo: NoteRepository) {}

  async execute(note: Note): Promise<void> {
    return this.noteRepo.update(note);
  }
}
