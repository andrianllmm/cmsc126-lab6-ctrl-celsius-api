import { cn } from '@/lib/utils';
import { Link } from 'react-router';

interface HeaderProps {
  className?: string;
}

const navItems = [{ href: '/', label: 'Pokedex' }];

export function SiteHeader({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex h-18 shrink-0 items-center gap-2 bg-pokedex-red shadow-[inset_0_-6px_0_rgba(0,0,0,0.25),0_6px_12px_rgba(0,0,0,0.1)]',
        className
      )}
    >
      <div className='flex h-full w-full max-w-300 items-center justify-start gap-2 border-l-2 border-r-2 border-dashed border-pokedex-dark-red px-2 md:mx-auto md:justify-between md:gap-5 md:px-6'>
        {/* Big blue main light */}
        <div className='relative'>
          <div className='h-10 w-10 rounded-full bg-blue-400 shadow-inner border-4 border-gray-200/40' />

          {/* inner highlight */}
          <div className='absolute inset-2 rounded-full bg-blue-300 opacity-60 blur-[1px]' />
        </div>

        {/* small indicator lights */}
        <div className='flex items-center gap-2'>
          <div className='h-3 w-3 rounded-full bg-red-400 ring-2 ring-black/20' />
          <div className='h-3 w-3 rounded-full bg-yellow-400 ing-2 ring-black/20' />
          <div className='h-3 w-3 rounded-full bg-green-400 ring-2 ring-black/20' />
        </div>

        {/* nav */}
        <nav className='retro flex items-center gap-4 text-sm'>
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className='text-foreground transition-colors hover:text-foreground/80'
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className='ml-auto flex min-w-0 items-center gap-2 md:ml-auto' />
      </div>
    </header>
  );
}
