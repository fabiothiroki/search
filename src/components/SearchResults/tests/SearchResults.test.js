import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "react-query";
import SearchResults from "../SearchResults";
import mockFlightResponse from "../../../services/Flight/tests/mockFlightResponse";

const server = setupServer(
  rest.get("https://api.skypicker.com/flights", (req, res, ctx) =>
    res(ctx.json(mockFlightResponse))
  )
);

const renderComponent = (props) => {
  const queryClient = new QueryClient();
  const wrapper = (
    <QueryClientProvider client={queryClient}>
      <SearchResults {...props} />
    </QueryClientProvider>
  );

  return wrapper;
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Render component without parameters", () => {
  render(renderComponent());

  expect(screen.getByRole("progressbar")).toBeInTheDocument();
});
