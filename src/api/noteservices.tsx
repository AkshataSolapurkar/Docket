// src/services/notesService.ts
import supabase from '@/lib/supabase';
import { Note, NoteFormData } from '@/lib/Types/NoteTypes';

export async function getNotes(): Promise<Note[]> {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('is_pinned', { ascending: false })
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }

  return data || [];
}

export async function getNoteById(id: string): Promise<Note> {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching note with id ${id}:`, error);
    throw error;
  }

  return data;
}

export async function createNote(note: NoteFormData): Promise<Note> {
  // Get the current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be logged in to create notes');
  }
  
  const { data, error } = await supabase
    .from('notes')
    .insert([{ 
      ...note,
      user_id: user.id // Add the user_id from the authenticated user
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating note:', error);
    throw error;
  }

  return data;
}

export async function updateNote(id: string, note: Partial<NoteFormData>): Promise<Note> {
  const { data, error } = await supabase
    .from('notes')
    .update({ ...note, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating note with id ${id}:`, error);
    throw error;
  }

  return data;
}

export async function deleteNote(id: string): Promise<void> {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting note with id ${id}:`, error);
    throw error;
  }
}

// AI summarization service
export async function summarizeText(text: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY;
  
  try {
    const response = await fetch('https://api.deepseek.com/v1/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        text,
        max_length: 100,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to summarize text');
    }

    const data = await response.json();
    return data.summary;
  } catch (error) {
    console.error('Error summarizing text:', error);
    throw error;
  }
}