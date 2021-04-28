import { Search } from "../Search/Search";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { SearchResults } from "../SearchResults/SearchResults";
import { useState } from "react";
import { searchResultsFormatter } from "../SearchResults/searchResultsFormatter";

export const App = () => {
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
