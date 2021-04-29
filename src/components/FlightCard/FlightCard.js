import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const FlightCard = ({ cityFrom, cityTo }) => (
  <Card variant="outlined">
    <CardContent>
      <Typography variant="body2" component="p">
        {cityFrom} {">"} {cityTo}
      </Typography>
    </CardContent>
  </Card>
);

FlightCard.propTypes = {
  cityFrom: PropTypes.string.isRequired,
  cityTo: PropTypes.string.isRequired,
};

export default FlightCard;
