// @flow

const flightResponseFormatter = (flights: {
  currency: string,
  data: Array<{
    id: string,
    flyFrom: string,
    cityFrom: string,
    cityTo: string,
    flyTo: string,
    price: string,
    dTimeUTC: number,
    aTimeUTC: number,
  }>,
}): ?Array<Flight> => {
  if (!flights) {
    return null;
  }

  return flights.data.map((flight) => ({
    id: flight.id,
    flyFrom: flight.flyFrom,
    cityFrom: flight.cityFrom,
    flyTo: flight.flyTo,
    cityTo: flight.cityTo,
    price: `${flight.price} ${flights.currency}`,
    departureDate: new Date(flight.dTimeUTC * 1000).toLocaleString(),
    arrivalDate: new Date(flight.aTimeUTC * 1000).toLocaleString(),
  }));
};

export default flightResponseFormatter;
