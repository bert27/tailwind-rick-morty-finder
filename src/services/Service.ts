import { ApiResponse } from '../models/interfaces';

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
