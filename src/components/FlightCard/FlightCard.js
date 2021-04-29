import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const FlightCard = ({
  cityFrom,
  cityTo,
  departureDate,
  arrivalDate,
  price,
}) => (
  <Card variant="outlined">
    <CardContent>
      <Typography variant="subtitle1" component="p">
        From:
      </Typography>
      <Typography variant="body2" component="p">
        {cityFrom} - {departureDate}
      </Typography>
      <Typography variant="subtitle1" component="p">
        To:
      </Typography>
      <Typography variant="body2" component="p">
        {cityTo} - {arrivalDate}
      </Typography>
      <Typography variant="body1" component="p" color="textSecondary">
        <b>{price}</b>
      </Typography>
    </CardContent>
  </Card>
);

FlightCard.propTypes = {
  cityFrom: PropTypes.string.isRequired,
  cityTo: PropTypes.string.isRequired,
  departureDate: PropTypes.string.isRequired,
  arrivalDate: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default FlightCard;
