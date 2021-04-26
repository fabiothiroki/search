export const getAirportsByTerm = (searchTerm) => {
  return fetch(
    `https://api.skypicker.com/locations?location_types=airport&term=${searchTerm}`
  ).then((response) => response.json());
};
