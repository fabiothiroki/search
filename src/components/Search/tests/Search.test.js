import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "react-query";
import userEvent from "@testing-library/user-event";
import Search from "../Search";
import mockAirportResponse from "../../../services/Airport/test/mockAirportReponse";
import FORM_FIELDS from "../constants";

const server = setupServer(
  rest.get("https://api.skypicker.com/locations", (req, res, ctx) =>
    res(ctx.json(mockAirportResponse))
  )
);

const props = {
  onSearchSubmitted: jest.fn(),
};

const renderComponent = () => {
  const queryClient = new QueryClient();
  const wrapper = (
    <QueryClientProvider client={queryClient}>
      <Search onSearchSubmitted={props.onSearchSubmitted} />
    </QueryClientProvider>
  );

  return render(wrapper);
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Page title", () => {
  renderComponent();

  expect(screen.getByText("Search Flights")).toBeInTheDocument();
});

test("Form submission", async () => {
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

  await waitFor(() =>
    expect(props.onSearchSubmitted).toHaveBeenCalledWith({
      departureDate: "2020-05-13",
      destination: {
        code: "PRG",
        id: "PRG",
        name: "Václav Havel Airport Prague",
      },
      origin: {
        code: "PRG",
        id: "PRG",
        name: "Václav Havel Airport Prague",
      },
      returnDate: "2020-05-15",
    })
  );
});

test("Validate required fields", async () => {
  renderComponent();

  fireEvent.submit(screen.getByTestId("submitButton"));

  await waitFor(() => {
    expect(screen.getByText("From is required")).toBeInTheDocument();
    expect(screen.getByText("To is required")).toBeInTheDocument();
    expect(screen.getByText("Departure date is required")).toBeInTheDocument();
    expect(screen.getByText("Return date is required")).toBeInTheDocument();
    expect(props.onSearchSubmitted).not.toBeCalled();
  });
});
