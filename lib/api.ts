import { Character, ApiList } from './types';

const BASE = 'https://rickandmortyapi.com/api';

export type CharacterQuery = {
  page?: number;
  name?: string;
  status?: 'alive'|'dead'|'unknown'|'';
  species?: string;
  sort?: 'name-asc'|'name-desc'|'episodes-asc'|'episodes-desc';
};

/**
 * Fetch wrapper that respects AbortSignal passed in by React Query.
 */
export async function fetchCharacters(q: CharacterQuery, signal?: AbortSignal): Promise<ApiList<Character>> {
  const params = new URLSearchParams();
  if (q.page) params.set('page', String(q.page));
  if (q.name) params.set('name', q.name);
  if (q.status) params.set('status', q.status);
  if (q.species) params.set('species', q.species);

  const res = await fetch(`${BASE}/character/?${params.toString()}`, { signal });
  if (!res.ok) {
    // API returns 404 for empty results; normalize to an empty list with 0 pages.
    if (res.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    }
    throw new Error(`Request failed: ${res.status}`);
  }
  const data = await res.json() as ApiList<Character>;

  // client-side sort (API doesn't support arbitrary sorts)
  const results = [...data.results];
  switch (q.sort) {
    case 'name-asc': results.sort((a, b) => a.name.localeCompare(b.name)); break;
    case 'name-desc': results.sort((a, b) => b.name.localeCompare(a.name)); break;
    case 'episodes-asc': results.sort((a, b) => a.episode.length - b.episode.length); break;
    case 'episodes-desc': results.sort((a, b) => b.episode.length - a.episode.length); break;
  }
  return { ...data, results };
}

export async function fetchCharacter(id: string, signal?: AbortSignal): Promise<Character> {
  const res = await fetch(`${BASE}/character/${id}`, { signal });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}
