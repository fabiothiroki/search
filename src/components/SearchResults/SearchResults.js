import PropTypes from "prop-types";
import { useQuery } from "react-query";
import getFlights from "../../services/Flight/flightService";
import flightResponseFormatter from "../../services/Flight/flightResponseFormatter";
import FlightCard from "../FlightCard/FlightCard";

const SearchResults = ({ searchParameters }) => {
  const { data } = useQuery(["flightData", { searchParameters }], () =>
    getFlights(searchParameters).then(flightResponseFormatter)
  );

  if (!data) {
    return null;
  }

  return data.map((flight) => (
    <FlightCard cityFrom={flight.cityFrom} cityTo={flight.cityTo} />
  ));
};

SearchResults.propTypes = {
  searchParameters: PropTypes.exact({
    fly_from: PropTypes.string.isRequired,
    fly_to: PropTypes.string.isRequired,
    dateFrom: PropTypes.string.isRequired,
    dateTo: PropTypes.string.isRequired,
    return_from: PropTypes.string.isRequired,
    return_to: PropTypes.string.isRequired,
  }),
};

SearchResults.defaultProps = {
  searchParameters: null,
};

export default SearchResults;
