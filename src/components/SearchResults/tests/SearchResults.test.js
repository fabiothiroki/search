import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "@testing-library/react";
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

test("Render component initial state", () => {
  render(renderComponent());

  expect(screen.getByRole("progressbar")).toBeInTheDocument();
});

test("Render component without results", async () => {
  server.use(
    rest.get("https://api.skypicker.com/flights", (_req, res) => res(null))
  );

  render(renderComponent());

  await waitFor(() => {
    expect(screen.getByText(/Find cheap flights/i)).toBeInTheDocument();
  });
});

test("Render component with results", async () => {
  render(
    renderComponent({
      searchParameters: {
        dateFrom: "28/04/2021",
        dateTo: "28/04/2021",
        fly_from: "BWI",
        fly_to: "TLV",
        return_from: "30/04/2021",
        return_to: "30/04/2021",
      },
    })
  );
  await waitFor(() => {
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.queryByText(/Find cheap flights/i)).not.toBeInTheDocument();
    expect(screen.getAllByText(/San Francisco/i).length).toEqual(2);
    expect(screen.getAllByText(/San Diego/i).length).toEqual(2);
    expect(screen.getByText(/88 EUR/i)).toBeInTheDocument();
    expect(screen.getByText(/105 EUR/i)).toBeInTheDocument();
  });
});
