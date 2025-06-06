import { NoteRepository } from "../repositories/NoteRepository";

export class DeleteAllNotes {
  constructor(private noteRepo: NoteRepository) {}

  async execute(): Promise<void> {
    return this.noteRepo.deleteAll();
  }
}
