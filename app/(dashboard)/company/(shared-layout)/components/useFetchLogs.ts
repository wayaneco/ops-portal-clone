// hooks/useFetchLogs.ts
import { useState, useEffect } from "react";
import axios from "axios";

interface LogData {
  // Define the structure of your API response here
  // For example:
  logs: string[];
}

const useFetchLogs = ({ name }: { name: string }) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api-portal-dev.everesteffect.com/provision-logs?provider_name=${name}&bucket_name=ee-provision-dev`
        );
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchData(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchData();
    }, 20000); // 20 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [name]);

  return { data, loading, error };
};

export default useFetchLogs;
