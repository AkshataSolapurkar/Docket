// src/components/notes/NoteGrid.tsx
import { Note } from '@/lib/Types/NoteTypes';
import { NoteCard } from './NoteCard';

interface NoteGridProps {
  notes: Note[];
}

export function NoteGrid({ notes }: NoteGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
      {notes.map((note) => (
        <div key={note.id} className="h-full">
          <NoteCard note={note} />
        </div>
      ))}
    </div>
  );
}