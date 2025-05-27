import { LayoutDashboardIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, SignOutButton } from '@clerk/clerk-react';
import SignInOAuthButtons from './SignInOAuthButtons';

const Topbar = () => {
    let isAdmin = false;
  return (
    <div className='flex justify-between items-center bg-zinc-900 p-4 text-white'>
        <div className="flex items-center justify-center gap-2">
            Spotify
        </div>

        <div className="flex items-center gap-4">
            {isAdmin && (
                <Link to={'/admin'}>
                    <LayoutDashboardIcon className='size-4 mr-2' />
                    Admin DashBoard
                </Link>
            )}

            <SignedIn>
                <SignOutButton />
            </SignedIn>

            <SignedOut>
                <SignInOAuthButtons />
            </SignedOut>
        </div>
      
    </div>
  )
}

export default Topbar
