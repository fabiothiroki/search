import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Search } from "../Search";
import { QueryClientProvider, QueryClient } from "react-query";
import { mockAirportResponse } from "../../../services/AirportService/test/mockAirportReponse";
import { FORM_FIELDS } from "../constants";
import userEvent from "@testing-library/user-event";

const server = setupServer(
  rest.get("https://api.skypicker.com/locations", (req, res, ctx) => {
    return res(ctx.json(mockAirportResponse));
  })
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

test("Form submission", async () => {
  render(renderComponent());

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
        active: true,
        airport_int_id: 5212,
        code: "PRG",
        icao: "LKPR",
        id: "PRG",
        int_id: 5212,
        name: "Václav Havel Airport Prague",
        slug: "vaclav-havel-airport-prague-prague-czechia",
        slug_en: "vaclav-havel-airport-prague-prague-czechia",
      },
      origin: {
        active: true,
        airport_int_id: 5212,
        code: "PRG",
        icao: "LKPR",
        id: "PRG",
        int_id: 5212,
        name: "Václav Havel Airport Prague",
        slug: "vaclav-havel-airport-prague-prague-czechia",
        slug_en: "vaclav-havel-airport-prague-prague-czechia",
      },
      returnDate: "2020-05-15",
    })
  );
});
