// @flow

const formatAirportResults = (
  results?: { locations?: Array<Airport> },
  selectedAirport: Airport
): Airport[] => {
  const formattedData = [];

  if (selectedAirport) {
    formattedData.push(selectedAirport);
  }

  if (results && results.locations) {
    return formattedData.concat(results.locations);
  }

  return formattedData;
};

export default formatAirportResults;
