// src/components/notes/CreateNoteButton.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createNote } from '@/api/noteservices';

interface CreateNoteButtonProps {
  className?: string;
}

export function CreateNoteButton({ className = '' }: CreateNoteButtonProps) {
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const handleCreateNote = async () => {
    if (isCreating) return;
    
    try {
      setIsCreating(true);
      const newNote = await createNote({
        title: 'Untitled Note',
        content: '',
        color: 'default',
        is_pinned: false,
        type: 'text'
      });
      
      router.push(`/dashboard/${newNote.id}`);
    } catch (error) {
      console.error('Failed to create note:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <button
      onClick={handleCreateNote}
      disabled={isCreating}
      className={`px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center ${className} ${isCreating ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {isCreating ? (
        <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
      ) : (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      )}
      New Note
    </button>
  );
}