import { Link } from 'react-router';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/8bit/button';

import '@/components/ui/8bit/styles/retro.css';

interface NotFoundProps {
  className?: string;
  cta?: string;
  description?: string;
  href?: string;
  imageSrc?: string;
  title?: string;
}

export default function NotFound({
  title = 'Psyduck is confused...',
  description = "It can't remember how you got here. Neither can we.",
  cta = 'Head back safely',
  href = '/',
  imageSrc = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/54.gif',
  className,
}: NotFoundProps) {
  return (
    <div
      className={cn(
        'retro grid w-full place-content-center gap-5 px-4 py-16 text-center md:py-24',
        className
      )}
    >
      <div className='retro font-bold text-6xl tracking-tight sm:text-8xl'>
        404
      </div>

      {imageSrc && (
        <div className='flex justify-center -mt-10'>
          <img
            alt='404'
            className='pixelated'
            height={200}
            src={imageSrc}
            width={200}
          />
        </div>
      )}

      <h1 className='retro font-bold text-2xl tracking-tight sm:text-4xl'>
        {title}
      </h1>

      <p className='retro text-muted-foreground text-xs'>{description}</p>

      <div className='flex justify-center'>
        <Link to={href}>
          <Button>{cta}</Button>
        </Link>
      </div>
    </div>
  );
}
