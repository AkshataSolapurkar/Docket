// src/components/Sidebar.tsx
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Sidebar() {
  const { user, signOut } = useAuth();
  
  // Get initials from email for avatar fallback
  const getInitials = (email: string) => {
    return email.slice(0, 2).toUpperCase();
  };

  return (
    <aside className="w-16 md:w-64 h-screen bg-orange-50 flex flex-col border-r">
      <div className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-xl font-bold hidden md:block">Notes</span>
        </Link>
      </div>
      
      <nav className="flex-1 px-2 py-4 space-y-2">
        <Link href="/dashboard" className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-orange-100">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <span className="ml-3 hidden md:block">Home</span>
        </Link>
        
        <Link href="/dashboard/all" className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-orange-100">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          <span className="ml-3 hidden md:block">All Notes</span>
        </Link>
        
        <Button variant="ghost" className="w-full justify-start" onClick={() => signOut()}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          <span className="ml-3 hidden md:block">Logout</span>
        </Button>
      </nav>
      
      <div className="p-4 mt-auto border-t">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback>{user?.email ? getInitials(user.email) : 'UN'}</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium">{user?.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}