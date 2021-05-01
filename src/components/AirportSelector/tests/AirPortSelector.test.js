import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClientProvider, QueryClient } from "react-query";
import mockAirportResponse from "../../../services/Airport/test/mockAirportReponse";
import AirportSelector from "../AirportSelector";

const server = setupServer(
  rest.get("https://api.skypicker.com/locations", (_req, res, ctx) =>
    res(ctx.json(mockAirportResponse))
  )
);

const props = {
  inputLabel: "For",
  nameIdentifier: "airport",
  onChange: jest.fn(),
};

const renderComponent = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <AirportSelector {...props} />
    </QueryClientProvider>
  );
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("initial render", () => {
  renderComponent();
  const input = screen.getByRole("textbox");

  expect(input).toBeInTheDocument();
  expect(input).toHaveValue("");
});

test("search airport by term", async () => {
  renderComponent();

  const input = screen.getByRole("textbox");
  userEvent.type(input, "prag");

  expect(input).toHaveValue("prag");
});

test("autocomplete suggestions", async () => {
  renderComponent();

  const input = screen.getByRole("textbox");
  userEvent.type(input, "prag");

  expect(await screen.findByText(/prague/i)).toBeInTheDocument();
});

test("select autocomplete suggestion", async () => {
  renderComponent();

  const input = screen.getByRole("textbox");
  userEvent.type(input, "prag");
  const suggestion = await screen.findByText(/prague/i);
  userEvent.click(suggestion);

  expect(input).toHaveValue("Václav Havel Airport Prague");
  expect(props.onChange).toBeCalledWith("airport", {
    code: "PRG",
    id: "PRG",
    name: "Václav Havel Airport Prague",
  });
});

test("clear autocomplete suggestion", async () => {
  renderComponent();

  const input = screen.getByRole("textbox");
  userEvent.type(input, "prag");
  const suggestion = await screen.findByText(/prague/i);
  userEvent.click(suggestion);
  const clear = screen.getByTitle("Clear");
  userEvent.click(clear);

  expect(input).toHaveValue("");
});
