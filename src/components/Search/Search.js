import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import AirportSelector from "../AirportSelector/AirportSelector";
import FORM_FIELDS from "./constants";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
  },
  form: {
    width: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formLine: {
    marginTop: theme.spacing(2),
  },
}));

type Props = {
  onSearchSubmitted: (searchParameters: SearchParameters) => void,
};

const Search = ({ onSearchSubmitted }: Props) => {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => onSearchSubmitted(data);

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Search Flights
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2} className={classes.formLine}>
          <Grid item xs={12} sm={6}>
            <Controller
              name={FORM_FIELDS.ORIGIN}
              control={control}
              defaultValue={null}
              rules={{ required: true }}
              render={() => (
                <AirportSelector
                  nameIdentifier={FORM_FIELDS.ORIGIN}
                  inputLabel="From"
                  onChange={setValue}
                />
              )}
            />
            {errors[FORM_FIELDS.DESTINATION] && "From is required"}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name={FORM_FIELDS.DESTINATION}
              control={control}
              defaultValue={null}
              rules={{ required: true }}
              render={() => (
                <AirportSelector
                  nameIdentifier={FORM_FIELDS.DESTINATION}
                  inputLabel="To"
                  onChange={setValue}
                />
              )}
            />
            {errors[FORM_FIELDS.DESTINATION] && "To is required"}
          </Grid>
        </Grid>

        <Grid container spacing={2} className={classes.formLine}>
          <Grid item xs={12} sm={6}>
            <Controller
              name={FORM_FIELDS.DEPARTURE_DATE}
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  name={FORM_FIELDS.DEPARTURE_DATE}
                  label="Departure"
                  type="date"
                  style={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    "data-testid": FORM_FIELDS.DEPARTURE_DATE,
                  }}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            {errors[FORM_FIELDS.DEPARTURE_DATE] && "Departure date is required"}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name={FORM_FIELDS.RETURN_DATE}
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  name={FORM_FIELDS.RETURN_DATE}
                  label="Return"
                  type="date"
                  style={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    "data-testid": FORM_FIELDS.RETURN_DATE,
                  }}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            {errors[FORM_FIELDS.RETURN_DATE] && "Return date is required"}
          </Grid>
        </Grid>

        <Button
          data-testid="submitButton"
          className={classes.submit}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default Search;
