import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/useGlobalContext';
import { EndpointResponseMap } from '../services/Service';

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  customErrorMessage?: string;
}

interface FetchResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: (overrideOptions?: FetchOptions) => void;
}

export function useFetch<T extends keyof EndpointResponseMap>(url: T, options?: FetchOptions): FetchResponse<EndpointResponseMap[T]> {
  const { cache, setCache } = useContext(GlobalContext)!;
  const [data, setData] = useState<EndpointResponseMap[T] | null>(null);
  const [loading, setLoading] = useState<boolean>(!cache[url]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (overrideOptions?: FetchOptions) => {
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

      const result: EndpointResponseMap[T] = await response.json();
      setCache(url, result);
      setData(result);
    } catch (err) {
      const customErrorMessage = options?.customErrorMessage || 'Error desconocido';
      const errorMessage = `${customErrorMessage}: ${(err as Error).message}`;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cache[url]) {
      fetchData();
    } else {
      setData(cache[url]);
    }
  }, [url, cache]);

  const refetch = (overrideOptions?: FetchOptions) => {
    fetchData(overrideOptions);
  };

  return { data, loading, error, refetch };
}
