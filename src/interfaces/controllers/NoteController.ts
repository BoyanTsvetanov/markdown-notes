import { NoteService } from "@/application/NoteService";
import { LocalStorageNoteRepository } from "@/infrastructure/persistence/LocalStorageNoteRepository";

export const noteService = new NoteService(new LocalStorageNoteRepository());
