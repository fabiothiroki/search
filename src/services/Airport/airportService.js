import API_BASE_URL from "../constants";

const getAirportsByTerm = (searchTerm) =>
  fetch(
    `${API_BASE_URL}/locations?location_types=airport&term=${searchTerm}`
  ).then((response) => response.json());

export default getAirportsByTerm;
