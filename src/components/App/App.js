import { Search } from "../Search/Search";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { useState } from "react";

export const App = () => {
  const [searchParamters, setSearchParameters] = useState({});

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />{" "}
      <Search onSearchSubmitted={(search) => console.log(search)} />
    </Container>
  );
};
