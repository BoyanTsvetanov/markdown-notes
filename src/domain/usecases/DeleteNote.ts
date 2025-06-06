import { NoteRepository } from "../repositories/NoteRepository";
import { NoteId } from "../entities/Note";

export class DeleteNote {
  constructor(private noteRepo: NoteRepository) {}

  async execute(id: NoteId): Promise<void> {
    return this.noteRepo.delete(id);
  }
}
