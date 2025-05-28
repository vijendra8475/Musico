import { LayoutDashboardIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SignedOut, UserButton } from '@clerk/clerk-react';
import SignInOAuthButtons from './SignInOAuthButtons';
import { useAuthStore } from '@/Store/useAuthStore';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

const Topbar = () => {
    let { isAdmin } = useAuthStore();
  return (
    <div className='flex justify-between items-center bg-zinc-900 p-4 text-white'>
        <div className="flex items-center justify-center gap-2">
            <img src='icon.png' className='size-10' />
            Musico
        </div>

        <div className="flex items-center gap-4">
            {isAdmin && (
                <Link to={'/admin'} className={cn(
                    buttonVariants({ variant : 'outline' })
                )} >
                    <LayoutDashboardIcon className='size-4 mr-2' />
                    Admin DashBoard
                </Link>
            )}

            <SignedOut>
                <SignInOAuthButtons />
            </SignedOut>

            <UserButton />
        </div>
      
    </div>
  )
}

export default Topbar
