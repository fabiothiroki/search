// @flow

import API_BASE_URL from "../constants";

const defaultPartner = "skypicker";

const getFlights = (
  parameters: ?SearchParametersFormatted
): Promise<?FlightSearchResponse> => {
  if (!parameters) {
    return Promise.resolve(null);
  }

  const params = new URLSearchParams({
    fly_from: parameters.fly_from,
    fly_to: parameters.fly_to,
    dateFrom: parameters.dateFrom,
    dateTo: parameters.dateTo,
    return_from: parameters.return_from,
    return_to: parameters.return_to,
    partner: defaultPartner,
    limit: "10",
  });

  return fetch(
    `${API_BASE_URL}/flights?${params.toString()}`
  ).then((response) => response.json());
};

export default getFlights;
