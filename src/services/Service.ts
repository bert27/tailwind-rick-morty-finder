import { ApiResponse } from 'models/Interfaces';

export const BASE_URL = 'https://rickandmortyapi.com/api';

export const endpoints = {
  characters: `${BASE_URL}/character`,
  someEndpoint: `${BASE_URL}/some-endpoint`,
  otherSomeEndpoint: `${BASE_URL}/other-some-endpoint`,
  postNotResponse: `${BASE_URL}/post-not-response`,
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
    body: { key: string };
    response: ApiResponse;
  };
  [endpoints.postNotResponse]: {
    body: { key: string };
    response?: never;
  };
};
