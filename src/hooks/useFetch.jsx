import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    const abortCont = new AbortController();

    setIsPending(true)

    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch data');
        }
        //console.log("Response: ",res)
        //console.log("Response in json: ",res.json())

        return res.json();
      })
      .then((data) => {
        console.log("Response: ", data);
        setData(data);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      })
      .finally(() => setIsPending(false));

    return () => abortCont.abort();


  }, [url]);

  return { data, isPending, error };
}

export default useFetch;