// src/app/(dashboard)/dashboard/[id]/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useNote, useNotes } from '@/hooks/useNotes';
import { NoteForm } from '@/components/notes/NoteForm';
import { toast } from 'sonner';
import { NoteFormData } from '@/lib/Types/NoteTypes';
import { useEffect, useState } from 'react';

export default function EditNotePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { note, isLoading, error } = useNote(params.id);
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
    updateNote({ id: params.id, note: data }, {
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
    deleteNote(params.id, {
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
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500">Error loading note. Please try again.</div>
      </div>
    );
  }

  if (!initialData) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Note</h1>
      <NoteForm 
        initialData={initialData} 
        onSubmit={handleSubmit} 
        onDelete={handleDelete}
      />
    </div>
  );
}