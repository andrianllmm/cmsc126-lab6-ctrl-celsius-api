import { Link } from 'react-router';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/8bit/button';
import '@/components/ui/8bit/styles/retro.css';

interface FooterLink {
  href: string;
  label: string;
}

interface FooterColumn {
  links: FooterLink[];
  title: string;
}

interface FooterProps {
  className?: string;
  columns?: FooterColumn[];
  copyright?: string;
  description?: string;
  title?: string;
}

const defaultColumns: FooterColumn[] = [
  {
    title: 'Features',
    links: [{ label: 'Pokedex', href: '/' }],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'GitHub', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
    ],
  },
];

export default function SiteFooter({
  title = 'Pokedex',
  description = 'A Pokedex application',
  columns = defaultColumns,
  copyright = '2026 Pokedex. All rights reserved.',
  className,
}: FooterProps) {
  return (
    <footer
      className={cn(
        'relative w-full bg-pokedex-red px-4 py-12',
        // 3D device base effect (inset top + outer lift)
        'shadow-[inset_0_6px_0_rgba(0,0,0,0.25),0_-8px_18px_rgba(0,0,0,0.1)]',
        className
      )}
    >
      <div className='mx-auto max-w-5xl'>
        <div className='grid gap-8 md:grid-cols-4'>
          {/* Brand column */}
          <div>
            <h3 className='retro mb-2 font-bold text-sm'>{title}</h3>
            <p className='retro mb-4 text-[8px] leading-relaxed'>
              {description}
            </p>

            <Button className='text-[9px]' asChild>
              <Link to='/'>GET STARTED</Link>
            </Button>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className='retro mb-3 font-bold text-[10px] uppercase tracking-widest'>
                {col.title}
              </h4>
              <ul className='space-y-2'>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      className='retro text-[10px] transition-colors hover:text-foreground'
                      to={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className='mt-10 border-t-2 border-dashed border-pokedex-dark-red pt-6'>
          <p className='retro text-center text-[8px]'>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
