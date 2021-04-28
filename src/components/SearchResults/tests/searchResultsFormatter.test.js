import { searchResultsFormatter } from "../searchResultsFormatter";

test("Results formatter", () => {
  const parameters = {
    origin: {
      code: "BWI",
    },
    destination: {
      code: "TLV",
    },
    departureDate: "2021-04-28",
    returnDate: "2021-04-30",
  };

  const result = searchResultsFormatter(parameters);

  expect(result).toEqual({
    dateFrom: "2021-04-28",
    dateTo: "2021-04-28",
    fly_from: "BWI",
    fly_to: "TLV",
    partner: "skypicker",
    return_from: "2021-04-30",
    return_to: "2021-04-30",
  });
});

test("Validate destination and origin", () => {
  const parameters = {
    departureDate: "2021-04-28",
    returnDate: "2021-04-30",
  };

  const result = searchResultsFormatter(parameters);

  expect(result).toEqual({
    dateFrom: "2021-04-28",
    dateTo: "2021-04-28",
    fly_from: undefined,
    fly_to: undefined,
    partner: "skypicker",
    return_from: "2021-04-30",
    return_to: "2021-04-30",
  });
});
