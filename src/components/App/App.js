import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import SearchResults from "../SearchResults/SearchResults";
import Search from "../Search/Search";
import searchResultsFormatter from "../SearchResults/searchResultsFormatter";

const App = () => {
  const [searchParameters, setSearchParameters] = useState({});

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

export default App;
