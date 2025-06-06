"use client";

import { useEffect, useState } from "react";
import { Note } from "@/domain/entities/Note";
import { noteService } from "@/interfaces/controllers/NoteController";
import { MarkdownEditor } from "./MarkdownEditor";
import { Preview } from "./Preview";
import { NoteList } from "./NoteList";

export const NoteApp = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    noteService.getAllNotes().then(setNotes);
  }, []);

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
    setEditorContent(note.content);
  };

  const handleCreateNote = async () => {
    const newNote = await noteService.createNote("Untitled", "");
    setNotes([ ...notes, newNote]);
    handleSelectNote(newNote);
  };

  const handleDeleteNote = async (id: string) => {
    await noteService.deleteNote(id);
    const remaining = notes.filter((note) => note.id !== id);
    setNotes(remaining);
    if (selectedNote?.id === id) {
      setSelectedNote(null);
      setEditorContent("");
    }
  };

  const handleDeleteAllNotes = async () => {
    await noteService.deleteAllNotes();
    setNotes([]);
    setSelectedNote(null);
    setEditorContent("");
  }

  const handleTitleChange = async (newTitle: string) => {
    if (!selectedNote) return;
    const updatedNote: Note = {
        ...selectedNote,
        title: newTitle,
        updatedAt: new Date(),
    };
    setSelectedNote(updatedNote);
    setNotes(notes.map((n) => (n.id === updatedNote.id ? updatedNote : n)));
    await noteService.updateNote(updatedNote);
  };

  const handleContentChange = async (newContent: string) => {
    if (!selectedNote) return;
    setEditorContent(newContent);
    const updatedNote: Note = {
      ...selectedNote,
      content: newContent,
      updatedAt: new Date(),
    };
    setSelectedNote(updatedNote);
    setNotes(notes.map((n) => (n.id === updatedNote.id ? updatedNote : n)));
    await noteService.updateNote(updatedNote);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 font-handwriting">
      <div className="col-span-1">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">Your Notes</h2>
          <button className={notes.length != 0 ? `block bg-red-500 hover:bg-red-400 p-1 rounded text-white cursor-pointer` : `hidden`} onClick={handleDeleteAllNotes}>Delete All</button>
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 cursor-pointer"
            onClick={handleCreateNote}
          >
            + New
          </button>
        </div>
        <NoteList
          notes={notes}
          selectedNoteId={selectedNote?.id || null}
          onSelect={handleSelectNote}
          onDelete={handleDeleteNote}
        />
      </div>
      {notes.length > 0 && selectedNote && (
        <div className="col-span-2 space-y-4">
            <input
                type="text"
                className="w-full p-2 text-xl font-semibold border-b border-black focus:outline-none"
                value={selectedNote?.title || ""}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Note title..."
            />
            <div className="flex flex-col md:flex-row gap-4">
              <MarkdownEditor content={editorContent} onChange={handleContentChange} />
              <Preview content={editorContent} />
            </div>
            <p>Created on {selectedNote.createdAt.toLocaleDateString()}</p>
        </div>
        )}
    </div>
  );
};
