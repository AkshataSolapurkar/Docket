// src/components/notes/NoteForm.tsx
'use client';

import { useState } from 'react';
import { NoteFormData } from '@/lib/Types/NoteTypes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface NoteFormProps {
  initialData: NoteFormData;
  onSubmit: (data: NoteFormData) => void;
  onDelete?: () => void;
  isSubmitting?: boolean;
}

export function NoteForm({ initialData, onSubmit, onDelete, isSubmitting = false }: NoteFormProps) {
  const [formData, setFormData] = useState<NoteFormData>(initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, is_pinned: checked }));
  };

  const handleColorChange = (color: string) => {
    setFormData((prev) => ({ ...prev, color }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Available colors with their Tailwind classes
  const colorOptions = [
    { name: 'Default', value: 'bg-white' },
    { name: 'Red', value: 'bg-red-200' },
    { name: 'Orange', value: 'bg-orange-200' },
    { name: 'Yellow', value: 'bg-yellow-200' },
    { name: 'Green', value: 'bg-green-200' },
    { name: 'Blue', value: 'bg-blue-200' },
    { name: 'Purple', value: 'bg-purple-200' },
    { name: 'Pink', value: 'bg-pink-200' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Note title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Write your note here..."
          className="min-h-[200px]"
        />
      </div>

      <div className="space-y-2">
        <Label>Color</Label>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => handleColorChange(color.value)}
              className={`w-8 h-8 rounded-full ${color.value} ${
                formData.color === color.value
                  ? 'ring-2 ring-offset-2 ring-orange-500'
                  : ''
              }`}
              title={color.name}
              aria-label={`Select ${color.name} color`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="is_pinned"
          checked={formData.is_pinned}
          onCheckedChange={handleSwitchChange}
        />
        <Label htmlFor="is_pinned">Pin this note</Label>
      </div>

      <div className="flex justify-between">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Note'}
        </Button>
        
        {onDelete && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Note</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your note.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </form>
  );
}