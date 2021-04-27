import { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { getAirportsByTerm } from "../../services/AirportService/airportService";
import throttle from "lodash.throttle";
import { useQuery } from "react-query";

const throttled = throttle((searchTerm) => getAirportsByTerm(searchTerm), 200);

export const AirportSelector = ({ inputLabel, onError }) => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const { error, data } = useQuery(["airportData", { inputValue }], () =>
    throttled(inputValue)
  );

  if (error) {
    onError(error);
  }

  return (
    <Autocomplete
      id="combo-box-demo"
      options={data && data.locations ? data.locations : []}
      getOptionLabel={(option) => option.name}
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
