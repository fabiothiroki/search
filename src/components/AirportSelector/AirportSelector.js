import { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import throttle from "lodash.throttle";
import { useQuery } from "react-query";
import getAirportsByTerm from "../../services/Airport/airportService";
import formatAirportResults from "../../services/Airport/airportResponseFormatter";

const throttled = throttle((searchTerm) => getAirportsByTerm(searchTerm), 200);

type Props = {
  inputLabel: string,
  onChange: (name: string, airport: Airport) => void,
  nameIdentifier: string,
};

const AirportSelector = ({ inputLabel, onChange, nameIdentifier }: Props) => {
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
        onChange(nameIdentifier, airport);
      }}
      value={selectedAirport}
    />
  );
};

export default AirportSelector;
