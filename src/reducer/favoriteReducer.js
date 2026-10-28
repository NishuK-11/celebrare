export const favoritesReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id)
        : [...state, action.id];

    default:
      return state;
  }
};