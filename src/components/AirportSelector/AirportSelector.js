import { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import throttle from "lodash.throttle";
import { useQuery } from "react-query";
import PropTypes from "prop-types";
import getAirportsByTerm from "../../services/Airport/airportService";

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

const AirportSelector = ({ inputLabel, onChange, name }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedAirport, setSelectedAirport] = useState(null);

  const { data } = useQuery(
    ["airportData", { inputValue, selectedAirport }],
    () => throttled(inputValue)
  );
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
  inputLabel: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default AirportSelector;
