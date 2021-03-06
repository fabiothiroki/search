import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { QueryClientProvider, QueryClient } from "react-query";
import App from "./components/App/App";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
