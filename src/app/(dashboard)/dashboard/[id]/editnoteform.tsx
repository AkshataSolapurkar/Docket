// src/components/notes/EditNoteForm.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useNote, useNotes } from '@/hooks/useNotes';
import { NoteForm } from '@/components/notes/NoteForm';
import { toast } from 'sonner';
import { NoteFormData } from '@/lib/Types/NoteTypes';
import { useEffect, useState } from 'react';

interface EditNoteFormProps {
  noteId: string;
}

export default function EditNoteForm({ noteId }: EditNoteFormProps) {
  const router = useRouter();
  const { note, isLoading, error } = useNote(noteId);
  const { updateNote, deleteNote } = useNotes();
  const [initialData, setInitialData] = useState<NoteFormData | null>(null);

  useEffect(() => {
    if (note) {
      setInitialData({
        title: note.title,
        content: note.content,
        color: note.color,
        type: note.type,
        is_pinned: note.is_pinned
      });
    }
  }, [note]);

  const handleSubmit = (data: NoteFormData) => {
    updateNote({ id: noteId, note: data }, {
      onSuccess: () => {
        toast.success('Note updated successfully');
        router.push('/dashboard');
      },
      onError: (error) => {
        toast.error('Failed to update note');
        console.error(error);
      }
    });
  };

  const handleDelete = () => {
    deleteNote(noteId, {
      onSuccess: () => {
        toast.success('Note deleted successfully');
        router.push('/dashboard');
      },
      onError: (error) => {
        toast.error('Failed to delete note');
        console.error(error);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">Error loading note. Please try again.</p>
      </div>
    );
  }

  if (!initialData) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Note</h1>
      <NoteForm 
        initialData={initialData} 
        onSubmit={handleSubmit} 
        onDelete={handleDelete} 
      />
    </div>
  );
}