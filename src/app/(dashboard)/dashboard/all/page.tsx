// src/app/(dashboard)/dashboard/all/page.tsx
'use client';

import { useNotes } from '@/hooks/useNotes';
import { NoteGrid } from '@/components/notes/NoteGrid';
import { SearchBar } from '@/components/Searchbar';
import { CreateNoteButton } from '@/components/notes/CreateNoteButton';
import { useState, useEffect } from 'react';

export default function AllNotesPage() {
  const { notes, isLoading, error } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotes, setFilteredNotes] = useState(notes);

  useEffect(() => {
    if (notes) {
      setFilteredNotes(
        notes.filter(note => 
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          note.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [notes, searchQuery]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500">Error loading notes. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Notes <span className="text-gray-500 text-sm ml-2">{filteredNotes.length} notes</span></h1>
        <div className="flex items-center gap-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <CreateNoteButton />
        </div>
      </div>
      
      {filteredNotes?.length > 0 ? (
        <NoteGrid notes={filteredNotes} />
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p className="text-xl">No notes found</p>
          {searchQuery ? (
            <p className="mt-2">Try a different search term</p>
          ) : (
            <>
              <p className="mt-2">Create your first note to get started</p>
              <CreateNoteButton className="mt-4" />
            </>
          )}
        </div>
      )}
    </div>
  );
}