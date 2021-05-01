import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { QueryClientProvider, QueryClient } from "react-query";
import mockAirportResponse from "../../../services/Airport/test/mockAirportReponse";
import App from "../App";

const server = setupServer(
  rest.get("https://api.skypicker.com/locations", (req, res, ctx) =>
    res(ctx.json(mockAirportResponse))
  )
);

const renderComponent = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Render form and results", async () => {
  renderComponent();

  expect(screen.queryByText(/Search Flights/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByText(/Find cheap flights/i)).toBeInTheDocument();
  });
});
