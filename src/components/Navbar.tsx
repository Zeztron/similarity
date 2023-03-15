import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import { buttonVariants } from './ui/Button';

const Navbar = async () => {
  const session = await getServerSession();

  return (
    <div className='fixed backgrop-blur-sm bg-white/75 dark:bg-slate-900 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between'>
      <div className='container max-w-7xl mx-auto w-full flex justify-between items-center'>
        <Link href='/' className={buttonVariants({ variant: 'link' })}>
          Text Similarity 1.0
        </Link>

        <div className='md:hiddem'>ThemeToggle</div>

        <div className='hidden md:flex gap-4'>
          Theme ThemeToggle
          <Link
            href='/documentation'
            className={buttonVariants({ variant: 'ghost' })}
          >
            Documentation
          </Link>
          {session ? (
            <>
              <Link
                className={buttonVariants({ variant: 'ghost' })}
                href='/dashboard'
              >
                Dashboard
              </Link>
              <div>Sign out button</div>
            </>
          ) : (
            <div>SignIn Button</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
