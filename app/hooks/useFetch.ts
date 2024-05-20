import { useEffect, useState } from "react";


export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        setData(await response.json());
      } catch {
        setError(`error fetching , ${error}`);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, isLoading, error };
};
