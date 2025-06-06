import { NoteRepository } from "../repositories/NoteRepository";
import { Note, NoteId } from "../entities/Note";

export class GetNote {
  constructor(private noteRepo: NoteRepository) {}

  async execute(id: NoteId): Promise<Note | null> {
    return this.noteRepo.getById(id);
  }
}
