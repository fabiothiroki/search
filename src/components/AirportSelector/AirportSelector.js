import { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { getAirportsByTerm } from "../../services/AirportService/airportService";

export const AirportSelector = () => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getAirportsByTerm(inputValue).then((result) =>
      setOptions(result.locations)
    );
  }, [value, inputValue]);

  return (
    <Autocomplete
      id="combo-box-demo"
      options={options}
      getOptionLabel={(option) => option.name}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Combo box" variant="outlined" />
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
