// Define las interfaces como ya las tienes
export interface Origin {
  name: string;
  url: string;
}

export interface Location {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface ApiResponse {
  info: Info;
  results: Character[];
}

export const BASE_URL = 'https://rickandmortyapi.com/api';

export const endpoints = {
  characters: `${BASE_URL}/character`,
  locations: `${BASE_URL}/location`,
  episodes: `${BASE_URL}/episode`,
} as const;

export type EndpointResponseMap = {
  [endpoints.characters]: ApiResponse;
  [endpoints.locations]: any;
  [endpoints.episodes]: any;
};
