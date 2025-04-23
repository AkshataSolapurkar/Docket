// src/types/index.ts
export type Note = {
    id: string;
    user_id: string;
    title: string;
    content: string;
    color: string;
    type: 'text' | 'image' | 'drawing';
    is_pinned: boolean;
    created_at: string;
    updated_at: string;
    tags?: string[]; // Added tags as an optional string array
  };
  
  export type NoteFormData = Omit<Note, 'id' | 'user_id' | 'created_at' | 'updated_at'>;
  
  export type User = {
    id: string;
    email: string;
    avatar_url?: string;
  };