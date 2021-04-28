import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { AirportSelector } from "../AirportSelector/AirportSelector";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formLine: {
    marginTop: theme.spacing(2),
  },
}));

export const Search = () => {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Search Flights
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2} className={classes.formLine}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="from_airport"
                control={control}
                defaultValue={null}
                rules={{ required: true }}
                render={() => (
                  <AirportSelector
                    name="from_airport"
                    inputLabel="From"
                    onChange={setValue}
                  />
                )}
              />
              {errors.from_airport && "From is required"}
            </Grid>
            <Grid item xs={12} sm={6}>
              <AirportSelector inputLabel="To" />
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.formLine}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="date"
                label="Departure"
                type="date"
                defaultValue="2017-05-24"
                style={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="date"
                label="Return"
                type="date"
                defaultValue="2017-05-24"
                style={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>

          <Button
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
    </Container>
  );
};
