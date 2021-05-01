import PropTypes from "prop-types";
import { useQuery } from "react-query";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import getFlights from "../../services/Flight/flightService";
import flightResponseFormatter from "../../services/Flight/flightResponseFormatter";
import FlightCard from "../FlightCard/FlightCard";

const SearchResults = ({ searchParameters }) => {
  const { data, isLoading } = useQuery(
    ["flightData", { searchParameters }],
    () => getFlights(searchParameters).then(flightResponseFormatter)
  );

  if (isLoading) {
    return <LinearProgress />;
  }

  if (!data) {
    return (
      <Typography variant="body1" component="p">
        Find cheap flights
      </Typography>
    );
  }

  return data.map((flight) => (
    <FlightCard
      key={flight.id}
      cityFrom={flight.cityFrom}
      cityTo={flight.cityTo}
      departureDate={flight.departureDate}
      arrivalDate={flight.arrivalDate}
      price={flight.price}
    />
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
