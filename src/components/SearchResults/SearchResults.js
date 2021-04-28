import PropTypes from "prop-types";

const SearchResults = ({ searchParameters }) => (
  <>
    <p>{JSON.stringify(searchParameters, null, 2)}</p>
  </>
);

SearchResults.propTypes = {
  searchParameters: PropTypes.exact({
    fly_from: PropTypes.string.isRequired,
    fly_to: PropTypes.string.isRequired,
    dateFrom: PropTypes.string.isRequired,
    dateTo: PropTypes.string.isRequired,
    return_from: PropTypes.string.isRequired,
    return_to: PropTypes.string.isRequired,
    partner: PropTypes.string.isRequired,
  }).isRequired,
};

export default SearchResults;
