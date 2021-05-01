import API_BASE_URL from "../constants";

const defaultPartner = "skypicker";

const getFlights = (parameters) => {
  if (!parameters) {
    return Promise.resolve(null);
  }

  const params = new URLSearchParams({
    ...parameters,
    partner: defaultPartner,
    limit: 10,
  });

  return fetch(
    `${API_BASE_URL}/flights?${params.toString()}`
  ).then((response) => response.json());
};

export default getFlights;
