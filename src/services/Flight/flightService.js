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
    `https://api.skypicker.com/flights?${params.toString()}`
  ).then((response) => response.json());
};

export default getFlights;
