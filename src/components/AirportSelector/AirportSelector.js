import { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { getAirportsByTerm } from "../../services/AirportService/airportService";
import throttle from "lodash.throttle";
import { useQuery } from "react-query";
import PropTypes from "prop-types";

const throttled = throttle((searchTerm) => getAirportsByTerm(searchTerm), 200);

const formatAirportResults = (results, selectedAirport) => {
  const formattedData = [];

  if (selectedAirport) {
    formattedData.push(selectedAirport);
  }

  if (results && results.locations) {
    return formattedData.concat(results.locations);
  }

  return formattedData;
};

export const AirportSelector = ({ inputLabel, onError, onChange, name }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedAirport, setSelectedAirport] = useState(null);

  const { error, data } = useQuery(
    ["airportData", { inputValue, selectedAirport }],
    () => throttled(inputValue)
  );

  if (error) {
    onError(error);
  }

  return (
    <Autocomplete
      options={formatAirportResults(data, selectedAirport)}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField {...params} label={inputLabel} variant="outlined" />
      )}
      onInputChange={(_event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(_e, airport) => {
        setSelectedAirport(airport);
        if (onChange) {
          onChange(name, airport);
        }
      }}
      value={selectedAirport}
    />
  );
};

AirportSelector.propTypes = {
  inputLabel: PropTypes.string,
  onError: PropTypes.func,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
};
