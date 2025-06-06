import React from "react";
import { Note } from "@/domain/entities/Note";
import { Eye, EyeClosed, Trash } from "lucide-react";

type Props = {
  notes: Note[];
  selectedNoteId: string | null;
  onSelect: (note: Note) => void;
  onDelete: (id: string) => void;
};

export const NoteList: React.FC<Props> = ({ notes, selectedNoteId, onSelect, onDelete }) => {
  return (
    <ul className="space-y-2 max-h-[75dvh] overflow-y-auto">
      {notes.map((note) => (
        <li
          key={note.id}
          className={`p-2 rounded cursor-pointer ${note.id === selectedNoteId ? "bg-blue-100" : "bg-gray-100"}`}
          onClick={() => onSelect(note)}
        >
          <div className="flex justify-between items-center">
            <span className="line-clamp-2 break-all">{note.title || "Note"}</span>
            <div className="flex space-x-2">
              <button>
                {note.id === selectedNoteId ? (<Eye></Eye>) : (<EyeClosed></EyeClosed>)}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(note.id);
                }}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                <Trash></Trash>
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
