// src/app/(dashboard)/dashboard/[id]/page.tsx
import EditNoteForm from "./editnoteform";

// Define the params type that matches Next.js expectations
interface PageParams {
  params: Promise<{ id: string }>;
}

export default async function EditNotePage({ params }: PageParams) {
  // Await the params promise to get the id
  const resolvedParams = await params;
  return <EditNoteForm noteId={resolvedParams.id} />;
}