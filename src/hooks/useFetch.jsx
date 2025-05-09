import { useState, useEffect, useMemo } from 'react';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const memoizedOptions = useMemo(() => options, [JSON.stringify(options)]);

  useEffect(() => {
    const abortCont = new AbortController();
    const maxRetries = memoizedOptions.retries || 0;
    let retryCount = 0;

    const fetchData = async () => {
      setIsPending(true);
      setError(null);

      try {
        const response = await fetch(url, { 
          ...memoizedOptions,
          signal: abortCont.signal 
        });

        if (!response.ok) {
          throw Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw Error('Response is not JSON');
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        if (err.name === 'AbortError') {
          return;
        }

        if (retryCount < maxRetries) {
          retryCount++;
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
          return fetchData();
        }

        setError(err.message);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();

    return () => abortCont.abort();
  }, [url, memoizedOptions]);

  return { data, isPending, error };
}

export default useFetch;