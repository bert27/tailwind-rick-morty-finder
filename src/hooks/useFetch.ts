import { useState, useEffect, useCallback } from 'react';
import { useGlobalContext } from 'context/useGlobalContext';

interface FetchOptions<TBody> {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: TBody;
  customErrorMessage?: string;
}

interface FetchResponse<TData, TBody = undefined> {
  data: TData | null;
  loading: boolean;
  error: string | null;
  refetch: (overrideOptions?: FetchOptions<TBody>) => void;
}

/**
 * Hook useFetch
 * @param url - The endpoint URL.
 * @param options - FetchOptions typed according to the endpoint.
 * @returns Object containing data, loading, error, and refetch.
 */
export function useFetch<TData, TBody = undefined>(url: string, options?: FetchOptions<TBody>): FetchResponse<TData, TBody> {
  const { cache, setCache } = useGlobalContext();

  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState<boolean>(!cache[url]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (overrideOptions?: FetchOptions<TBody>) => {
      try {
        setLoading(true);
        setError(null);

        const finalOptions = { ...options, ...overrideOptions };
        const response = await fetch(url, {
          method: finalOptions?.method || 'GET',
          headers: finalOptions?.headers,
          body: finalOptions?.body ? JSON.stringify(finalOptions.body) : undefined,
        });

        if (!response.ok) {
          const errorMessage = `${finalOptions.customErrorMessage || 'Error fetching data'}: ${response.statusText}`;
          setError(errorMessage);
          return;
        }

        const result = (await response.json()) as TData;
        setCache(url, result);
        setData(result);
      } catch (err) {
        const customErrorMessage = options?.customErrorMessage || 'Error desconocido';
        const errorMessage = `${customErrorMessage}: ${(err as Error).message}`;
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [url, options]
  );

  useEffect(() => {
    if (!cache[url]) {
      void fetchData();
    } else {
      setData(cache[url] as TData);
    }
  }, [url, cache]);

  const refetch = (overrideOptions?: FetchOptions<TBody>) => {
    void fetchData(overrideOptions);
  };

  return { data, loading, error, refetch };
}
