import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClientProvider, QueryClient } from "react-query";
import { mockAirportResponse } from "../../../services/AirportService/test/mockAirportReponse";
import { AirportSelector } from "../AirportSelector";

const server = setupServer(
  rest.get("https://api.skypicker.com/locations", (req, res, ctx) => res(ctx.json(mockAirportResponse)))
);

const renderComponent = () => {
  const queryClient = new QueryClient();
  const wrapper = (
    <QueryClientProvider client={queryClient}>
      <AirportSelector inputLabel="For" name="airport" />
    </QueryClientProvider>
  );

  return wrapper;
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("initial render", () => {
  render(renderComponent());
  const input = screen.getByRole("textbox");

  expect(input).toBeInTheDocument();
  expect(input).toHaveValue("");
});

test("search airport by term", async () => {
  render(renderComponent());

  const input = screen.getByRole("textbox");
  userEvent.type(input, "prag");

  expect(input).toHaveValue("prag");
});

test("autocomplete suggestions", async () => {
  render(renderComponent());

  const input = screen.getByRole("textbox");
  userEvent.type(input, "prag");

  expect(await screen.findByText(/prague/i)).toBeInTheDocument();
});

test("select autocomplete suggestion", async () => {
  render(renderComponent());

  const input = screen.getByRole("textbox");
  userEvent.type(input, "prag");
  const suggestion = await screen.findByText(/prague/i);
  userEvent.click(suggestion);

  expect(input).toHaveValue("Václav Havel Airport Prague");
});

test("clear autocomplete suggestion", async () => {
  render(renderComponent());

  const input = screen.getByRole("textbox");
  userEvent.type(input, "prag");
  const suggestion = await screen.findByText(/prague/i);
  userEvent.click(suggestion);
  const clear = screen.getByTitle("Clear");
  userEvent.click(clear);

  expect(input).toHaveValue("");
});
