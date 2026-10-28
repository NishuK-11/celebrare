
import { useEffect, useState } from "react";

const useFetchPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          "https://picsum.photos/v2/list?limit=30"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch photos!");
        }

        const result = await response.json();
        setPhotos(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return { photos, loading, error };
};

export default useFetchPhotos;
