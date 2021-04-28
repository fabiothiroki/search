export const SearchResults = ({
  departureDate,
  returnDate,
  origin,
  destination,
}) => {
  return (
    <>
      <p>{departureDate}</p>
      <p>{returnDate}</p>
      <p>{origin}</p>
      <p>{destination}</p>
    </>
  );
};
