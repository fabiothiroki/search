const flightResponseFormatter = (flights) => {
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
    dTimeUTC: flight.dTimeUTC,
    aTimeUTC: flight.aTimeUTC,
  }));
};

export default flightResponseFormatter;
