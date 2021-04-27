import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockAirportResponse } from "../../../services/AirportService/test/mockAirportReponse";
import { AirportSelector } from "../AirportSelector";

const server = setupServer(
  rest.get("https://api.skypicker.com/locations", (req, res, ctx) => {
    return res(ctx.json(mockAirportResponse));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("initial render", () => {
  render(<AirportSelector inputLabel="For" />);
  const input = screen.getByRole("textbox");

  expect(input).toBeInTheDocument();
  expect(input).toHaveValue("");
});

test("search airport by term", async () => {
  render(<AirportSelector inputLabel="For" />);

  const input = screen.getByRole("textbox");
  userEvent.type(input, "prag");

  expect(input).toHaveValue("prag");
});

test("autocomplete suggestions", async () => {
  render(<AirportSelector inputLabel="For" />);

  const input = screen.getByRole("textbox");
  userEvent.type(input, "prag");

  expect(await screen.findByText(/prague/i)).toBeInTheDocument();
});

test("select autocomplete suggestion", async () => {
  render(<AirportSelector inputLabel="For" />);

  const input = screen.getByRole("textbox");
  userEvent.type(input, "prag");
  const suggestion = await screen.findByText(/prague/i);
  userEvent.click(suggestion);

  expect(input).toHaveValue("Václav Havel Airport Prague");
});

test("clear autocomplete suggestion", async () => {
  render(<AirportSelector inputLabel="For" />);

  const input = screen.getByRole("textbox");
  userEvent.type(input, "prag");
  const suggestion = await screen.findByText(/prague/i);
  userEvent.click(suggestion);
  const clear = screen.getByTitle("Clear");
  userEvent.click(clear);

  expect(input).toHaveValue("");
});
