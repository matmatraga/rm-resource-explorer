export type Character = {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: string;
  image: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  episode: string[];
  url: string;
  created: string;
};

export type ApiList<T> = {
  info: { count: number; pages: number; next: string | null; prev: string | null };
  results: T[];
};
