'use client'
import { useFavorites } from '@/lib/useFavorites';

export default function FavoriteButton({ id, size='sm' }: { id: number; size?: 'sm'|'md' }){
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(id);
  return (
    <button
      aria-pressed={fav}
      onClick={(e)=>{ e.preventDefault(); toggle(id); }}
      className={`inline-flex items-center gap-1 rounded-lg border px-2 ${size==='md'?'py-2':'py-1'} text-sm hover:bg-black/5 dark:hover:bg-white/10`}
    >
      <span aria-hidden>{fav ? '★' : '☆'}</span> {fav ? 'Favorited' : 'Favorite'}
    </button>
  )
}
