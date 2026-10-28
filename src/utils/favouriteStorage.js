const STORAGE_KEY = "favoritePhotoIds";

export const getInitialFavorites = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(favorites)
    );
  } catch (error) {
    console.error("Could not save favorites:", error);
  }
};