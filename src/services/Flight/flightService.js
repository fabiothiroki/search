const defaultPartner = "skypicker";

const getFlights = (parameters) => {
  if (!parameters) {
    return {};
  }

  const params = new URLSearchParams({
    ...parameters,
    partner: defaultPartner,
  });

  return fetch(
    `https://api.skypicker.com/flights?${params.toString()}`
  ).then((response) => response.json());
};

export default getFlights;
