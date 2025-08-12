'use client';

import { useEffect, useMemo, useState } from 'react';

const KEY = 'favorites:characters';
const NOTES_KEY = 'notes:characters';

function read<T>(k: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(k);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

export function useFavorites() {
  const [ids, setIds] = useState<number[]>(() => read<number[]>(KEY, []));

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch {}
  }, [ids]);

  const isFavorite = (id: number) => ids.includes(id);

  const toggle = (id: number) => {
    // optimistic toggle
    setIds(curr => curr.includes(id) ? curr.filter(x => x !== id) : [...curr, id]);
  };

  return useMemo(() => ({ ids, isFavorite, toggle }), [ids]);
}

export function useNotes() {
  const [notes, setNotes] = useState<Record<number,string>>(() => read<Record<number,string>>(NOTES_KEY, {}));
  useEffect(() => { try { localStorage.setItem(NOTES_KEY, JSON.stringify(notes)); } catch {} }, [notes]);
  const setNote = (id: number, text: string) => setNotes(n => ({ ...n, [id]: text }));
  const getNote = (id: number) => notes[id] ?? '';
  return { notes, setNote, getNote };
}
