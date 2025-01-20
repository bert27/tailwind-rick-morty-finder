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
  someEndpoint: `${BASE_URL}/some-endpoint`,
  otherSomeEndpoint: `${BASE_URL}/other-some-endpoint`,
} as const;

export type EndpointResponseMap = {
  [endpoints.characters]: {
    response: ApiResponse;
  };
  [endpoints.someEndpoint]: {
    body: { key: string };
    response: ApiResponse;
  };
  [endpoints.otherSomeEndpoint]: {
    body: { name: 21 };
    response: ApiResponse;
  };
};
