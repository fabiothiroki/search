import { memo, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import SearchResults from "../SearchResults/SearchResults";
import Search from "../Search/Search";
import searchResultsFormatter from "../../services/Airport/searchResultsFormatter";

const App = () => {
  const [searchParameters, setSearchParameters] = useState(null);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Search
        onSearchSubmitted={(search) =>
          setSearchParameters(searchResultsFormatter(search))
        }
      />
      <SearchResults searchParameters={searchParameters} />
    </Container>
  );
};

export default memo(App);
