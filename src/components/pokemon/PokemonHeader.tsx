import { Link } from 'react-router';
import { Button } from '@/components/ui/8bit/button';

type Props = {
  id: number;
};

export function PokemonHeader({ id }: Props) {
  return (
    <div className='flex justify-between items-center'>
      <Button asChild variant='outline' size='sm'>
        <Link to='/'>&lt; Pokedex</Link>
      </Button>

      <div className='flex gap-2'>
        <Button asChild variant='outline' size='icon' disabled={id <= 1}>
          <Link to={`/pokemon/${id - 1}`} className='text-center'>
            &lt;
          </Link>
        </Button>

        <Button asChild variant='outline' size='icon'>
          <Link to={`/pokemon/${id + 1}`} className='text-center'>
            &gt;
          </Link>
        </Button>
      </div>
    </div>
  );
}
