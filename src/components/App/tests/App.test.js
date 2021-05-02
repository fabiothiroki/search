import {
  render,
  screen,
  waitFor,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { QueryClientProvider, QueryClient } from "react-query";
import mockAirportResponse from "../../../services/Airport/test/mockAirportReponse";
import mockFlightResponse from "../../../services/Flight/tests/mockFlightResponse";
import App from "../App";
import FORM_FIELDS from "../../Search/constants";

const server = setupServer(
  rest.get("https://api.skypicker.com/locations", (req, res, ctx) =>
    res(ctx.json(mockAirportResponse))
  ),
  rest.get("https://api.skypicker.com/flights", (req, res, ctx) =>
    res(ctx.json(mockFlightResponse))
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

test("Search submit", async () => {
  renderComponent();

  userEvent.type(screen.getByRole("textbox", { name: "From" }), "prag");
  userEvent.click(await screen.findByText(/prague/i));

  userEvent.type(screen.getByRole("textbox", { name: "To" }), "prag");
  userEvent.click(await screen.findByText(/prague/i));

  fireEvent.change(screen.getByTestId(FORM_FIELDS.DEPARTURE_DATE), {
    target: { value: "2020-05-13" },
  });

  fireEvent.change(screen.getByTestId(FORM_FIELDS.RETURN_DATE), {
    target: { value: "2020-05-15" },
  });

  fireEvent.submit(screen.getByTestId("submitButton"));

  await waitFor(() => {
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));

  expect(screen.queryByText(/Find cheap flights/i)).not.toBeInTheDocument();
  expect(screen.getAllByText(/San Francisco/i).length).toEqual(2);
  expect(screen.getAllByText(/San Diego/i).length).toEqual(2);
  expect(screen.getByText(/88 EUR/i)).toBeInTheDocument();
  expect(screen.getByText(/105 EUR/i)).toBeInTheDocument();
});
