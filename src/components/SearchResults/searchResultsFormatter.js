const defaultPartner = "skypicker";

export const searchResultsFormatter = (parameters) => {
  return {
    fly_from: parameters.origin?.code,
    fly_to: parameters.destination?.code,
    dateFrom: parameters.departureDate,
    dateTo: parameters.departureDate,
    return_from: parameters.returnDate,
    return_to: parameters.returnDate,
    partner: defaultPartner,
  };
};
