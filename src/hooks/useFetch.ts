import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/useGlobalContext';
import { EndpointResponseMap } from '../services/Service';

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
}

interface FetchResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: (overrideOptions?: FetchOptions) => void;
}

export function useFetch<URL extends keyof EndpointResponseMap>(url: URL, options?: FetchOptions): FetchResponse<EndpointResponseMap[URL]> {
  const { cache, setCache } = useContext(GlobalContext)!;
  const [data, setData] = useState<EndpointResponseMap[URL] | null>(cache[url] || null);
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
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const result = await response.json();
      setCache(url, result);
      setData(result);
    } catch (err) {
      setError((err as Error).message);
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
  }, [url, cache, fetchData]);

  const refetch = (overrideOptions?: FetchOptions) => {
    fetchData(overrideOptions);
  };

  return { data, loading, error, refetch };
}
