import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import { Search } from "../Search";
import { QueryClientProvider, QueryClient } from "react-query";

const server = setupServer(
  rest.get("https://api.skypicker.com/locations", (req, res, ctx) => {
    return res(ctx.json(mockAirportResponse));
  })
);

const renderComponent = () => {
  const queryClient = new QueryClient();
  const wrapper = (
    <QueryClientProvider client={queryClient}>
      <Search />
    </QueryClientProvider>
  );

  return wrapper;
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Page title", () => {
  render(renderComponent());

  const title = screen.getByText("Search Flights");

  expect(title).toBeInTheDocument();
});
