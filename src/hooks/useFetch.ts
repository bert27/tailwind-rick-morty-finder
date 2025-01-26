import { useState, useEffect } from 'react';
import { useGlobalContext } from 'context/useGlobalContext';
import { EndpointResponseMap } from 'services/Service';

type ExtractBody<ExtendedType extends keyof EndpointResponseMap> = EndpointResponseMap[ExtendedType] extends { body: infer B } ? B : never;

interface FetchOptions<ExtendedType extends keyof EndpointResponseMap> {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: ExtractBody<ExtendedType>;
  customErrorMessage?: string;
}

interface FetchResponse<ExtendedType extends keyof EndpointResponseMap> {
  data: EndpointResponseMap[ExtendedType]['response'] | null;
  loading: boolean;
  error: string | null;
  refetch: (overrideOptions?: FetchOptions<ExtendedType>) => void;
}

/**
 * Hook useFetch
 * @param url - URL del endpoint (key de EndpointResponseMap).
 * @param options - FetchOptions tipadas según el endpoint.
 */
export function useFetch<ExtendedType extends keyof EndpointResponseMap>(
  url: ExtendedType,
  options?: FetchOptions<ExtendedType>
): FetchResponse<ExtendedType> {
  const { cache, setCache } = useGlobalContext();

  const [data, setData] = useState<EndpointResponseMap[ExtendedType]['response'] | null>(null);
  const [loading, setLoading] = useState<boolean>(!cache[url]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (overrideOptions?: FetchOptions<ExtendedType>) => {
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

      const result = (await response.json()) as EndpointResponseMap[ExtendedType]['response'];
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
      void fetchData();
    } else {
      setData(cache[url]);
    }
  }, [url, cache]);

  const refetch = (overrideOptions?: FetchOptions<ExtendedType>) => {
    void fetchData(overrideOptions);
  };

  return { data, loading, error, refetch };
}
