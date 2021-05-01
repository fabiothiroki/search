// @flow

const dateFormatter = (dateString: string): string =>
  new Date(dateString).toJSON().slice(0, 10).split("-").reverse().join("/");

const searchResultsFormatter = (
  parameters: SearchParameters
): SearchParametersFormatted => ({
  fly_from: parameters.origin?.code,
  fly_to: parameters.destination?.code,
  dateFrom: dateFormatter(parameters.departureDate),
  dateTo: dateFormatter(parameters.departureDate),
  return_from: dateFormatter(parameters.returnDate),
  return_to: dateFormatter(parameters.returnDate),
});

export default searchResultsFormatter;
