export const isPresentInFavorites = (favorites, hotel) => {
  if (!Array.isArray(favorites)) {
    return false;
  }
  return favorites.some((favHotel) => favHotel.id === hotel.id);
};
