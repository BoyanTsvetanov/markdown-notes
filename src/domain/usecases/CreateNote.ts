import { NoteRepository } from "../repositories/NoteRepository";
import { Note } from "../entities/Note";

export class CreateNote {
  constructor(private noteRepo: NoteRepository) {}

  async execute(note: Note): Promise<void> {
    return this.noteRepo.create(note);
  }
}
