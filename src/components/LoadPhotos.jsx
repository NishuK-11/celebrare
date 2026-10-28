
import { Heart } from "lucide-react";
import React, {useEffect,useReducer,useState,useCallback,useMemo,} from "react";

import { favoritesReducer } from "../reducer/favoriteReducer";
import {
  getInitialFavorites,
  saveFavorites,
} from "../utils/favouriteStorage";

import useFetchPhotos from "../hooks/useFetchPhotos";

const LoadPhotos = () => {
  const [search, setSearch] = useState("");

  const { photos, loading, error } = useFetchPhotos();

  const [favorites, dispatch] = useReducer(
    favoritesReducer,
    undefined,
    getInitialFavorites
  );

  // Save favourites to localStorage
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  // useCallback: memoize the search handler
  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  // useMemo: recalculate filtered photos only when dependencies change
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(search.toLowerCase())
    );
  }, [photos, search]);

  if (loading) {
    return <h1>Loading photos...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">
        Explore Photos
      </h1>

      <input
        type="text"
        placeholder="Search by author name..."
        value={search}
        onChange={handleSearch}
        className="w-full border border-gray-300 rounded-lg p-3 mb-6 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPhotos.length > 0 ? (
          filteredPhotos.map((photo) => {
            const isFavorite = favorites.includes(photo.id);

            return (
              <div
                key={photo.id}
                className="rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={photo.download_url}
                  alt={`Photo by ${photo.author}`}
                  className="w-full h-[250px] object-cover"
                />

                <div className="flex items-center justify-between p-4">
                  <h2 className="font-semibold text-gray-800">
                    {photo.author}
                  </h2>

                  <button
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: "TOGGLE_FAVORITE",
                        id: photo.id,
                      })
                    }
                    aria-label={
                      isFavorite
                        ? "Remove from favourites"
                        : "Add to favourites"
                    }
                    aria-pressed={isFavorite}
                  >
                    <Heart
                      size={24}
                      fill={isFavorite ? "red" : "none"}
                      color={isFavorite ? "red" : "gray"}
                    />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 col-span-full">
            No photos found
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadPhotos;
