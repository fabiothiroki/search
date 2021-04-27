import { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { getAirportsByTerm } from "../../services/AirportService/airportService";
import throttle from "lodash.throttle";

const throttled = throttle((inputValue, setOptions, callback) => {
  getAirportsByTerm(inputValue).then((result) => {
    callback(result);
  });
}, 200);

export const AirportSelector = ({ inputLabel }) => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let isActive = true;

    throttled(inputValue, setOptions, (result) => {
      if (isActive) {
        setOptions(result.locations);
      }
    });

    return () => {
      isActive = false;
    };
  }, [value, inputValue]);

  return (
    <Autocomplete
      id="combo-box-demo"
      options={options}
      getOptionLabel={(option) => option.name}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label={inputLabel} variant="outlined" />
      )}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      value={value}
    />
  );
};
