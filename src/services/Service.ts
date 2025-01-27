export const BASE_URL = 'https://rickandmortyapi.com/api';

export const endpoints = {
  characters: `${BASE_URL}/character`,
  someEndpoint: `${BASE_URL}/some-endpoint`,
  otherSomeEndpoint: `${BASE_URL}/other-some-endpoint`,
  postNotResponse: `${BASE_URL}/post-not-response`,
} as const;
