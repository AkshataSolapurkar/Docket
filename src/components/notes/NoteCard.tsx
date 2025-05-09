// src/components/notes/NoteCard.tsx
import { Note } from '@/lib/Types/NoteTypes';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  
  // Map color values to Tailwind classes
  const colorMap: Record<string, string> = {
    'default': 'bg-white',
    'red': 'bg-red-200',
    'orange': 'bg-orange-200',
    'yellow': 'bg-yellow-200',
    'green': 'bg-green-200',
    'blue': 'bg-blue-200',
    'purple': 'bg-purple-200',
    'pink': 'bg-pink-200',
  };

  const bgColor = colorMap[note.color] || note.color;
  
  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowPopup(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Store the summary in a ref to avoid re-renders
  const summaryRef = useRef<string | null>(null);
  
  const handleSummarize = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop event propagation
    
    console.log('Summarize button clicked'); // Debug log
    
    if (isSummarizing || !note.content || note.content.length < 50) {
      if (note.content.length < 50) {
        toast.error('Note is too short to summarize');
      }
      return;
    }
    
    try {
      setIsSummarizing(true);
      toast.info('Starting summarization...'); // Feedback to user
      
      if (summaryRef.current) {
        // If we already have a summary, just show the popup
        console.log('Using cached summary');
        setSummary(summaryRef.current);
        setShowPopup(true);
        setIsSummarizing(false);
        return;
      }
      
      console.log('Fetching summary from API');
      // Updated API path to match Next.js App Router convention
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: note.content,
        }),
      });
      
      console.log('API response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error response:', errorData);
        throw new Error(errorData.error || 'Failed to summarize text');
      }
      
      const data = await response.json();
      console.log('API response data:', data);
      
      summaryRef.current = data.summary;
      setSummary(data.summary);
      setShowPopup(true);
      toast.success('Note summarized with Gemini AI');
    } catch (error: any) {
      console.error('Failed to summarize note:', error);
      toast.error(`Summarization failed: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSummarizing(false);
    }
  };
  
  return (
    <div className="relative">
      <Link href={`/dashboard/${note.id}`} onClick={(e) => e.stopPropagation()}>
        <div className={`${bgColor} p-6 rounded-lg shadow-sm h-full flex flex-col transition-shadow hover:shadow-md`}>
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-medium text-lg line-clamp-2">{note.title}</h3>
            {note.is_pinned && (
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
              </svg>
            )}
          </div>
          
          <div className="mb-4 flex-1">
            <p className="text-gray-700 line-clamp-3">{note.content}</p>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              {formatDistanceToNow(new Date(note.updated_at), { addSuffix: true })}
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSummarize}
                className={`text-xs px-2 py-1 rounded ${isSummarizing ? 'bg-gray-200 text-gray-500' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                type="button" // Explicitly set button type
              >
                {isSummarizing ? 'Summarizing...' : 'Gemini Summary'}
              </button>
              
              <div className="flex items-center">
                {note.type === 'image' && (
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                )}
                {note.type === 'drawing' && (
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                )}
                {note.tags && note.tags.length > 0 && (
                  <span className="ml-2">{note.tags.length} tags</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Summary Popup - Show even when loading */}
      {showPopup && (
        <div 
          className="absolute top-0 left-0 right-0 z-10 p-4 bg-white rounded-lg shadow-xl border border-gray-200"
          ref={popupRef}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium text-sm text-gray-700">AI Summary</h4>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowPopup(false);
              }}
              className="text-gray-500 hover:text-gray-700"
              type="button"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          {isSummarizing ? (
            <div className="flex items-center justify-center py-2">
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500 mr-2"></div>
              <p className="text-sm text-gray-600">Generating summary...</p>
            </div>
          ) : (
            <p className="text-sm text-gray-600">{summary || "No summary available"}</p>
          )}
        </div>
      )}
    </div>
  );
}