// src/hooks/useNotes.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotes, getNoteById, createNote, updateNote, deleteNote, summarizeText } from '@/api/noteservices';
import { NoteFormData } from '@/lib/Types/NoteTypes';

export function useNotes() {
  const queryClient = useQueryClient();

  const notesQuery = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  });

  const createNoteMutation = useMutation({
    mutationFn: (note: NoteFormData) => createNote(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const updateNoteMutation = useMutation({
    mutationFn: ({ id, note }: { id: string; note: Partial<NoteFormData> }) => updateNote(id, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const summarizeMutation = useMutation({
    mutationFn: (text: string) => summarizeText(text),
  });

  return {
    notes: notesQuery.data || [],
    isLoading: notesQuery.isLoading,
    error: notesQuery.error,
    createNote: createNoteMutation.mutate,
    updateNote: updateNoteMutation.mutate,
    deleteNote: deleteNoteMutation.mutate,
    summarizeText: summarizeMutation.mutate,
  };
}

export function useNote(id: string) {
  const query = useQuery({
    queryKey: ['notes', id],
    queryFn: () => getNoteById(id),
    enabled: !!id,
  });

  return {
    note: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
}