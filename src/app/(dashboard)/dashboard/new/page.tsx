// src/app/(dashboard)/dashboard/new/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { NoteForm } from '@/components/notes/NoteForm';
import { useNotes } from '@/hooks/useNotes';
import { NoteFormData } from '@/lib/Types/NoteTypes';
import { toast } from 'sonner';

export default function NewNotePage() {
  const router = useRouter();
  const { createNote } = useNotes();

  const initialData: NoteFormData = {
    title: '',
    content: '',
    color: 'bg-orange-200',
    type: 'text',
    is_pinned: false
  };

  const handleSubmit = (data: NoteFormData) => {
    createNote(data, {
      onSuccess: () => {
        toast.success('Note created successfully');
        router.push('/dashboard');
      },
      onError: (error) => {
        toast.error('Failed to create note');
        console.error(error);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Note</h1>
      <NoteForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}