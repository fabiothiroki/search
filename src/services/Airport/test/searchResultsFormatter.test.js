import searchResultsFormatter from "../searchResultsFormatter";

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
    dateFrom: "28/04/2021",
    dateTo: "28/04/2021",
    fly_from: "BWI",
    fly_to: "TLV",
    return_from: "30/04/2021",
    return_to: "30/04/2021",
  });
});

test("Validate destination and origin", () => {
  const parameters = {
    departureDate: "2021-04-28",
    returnDate: "2021-04-30",
  };

  const result = searchResultsFormatter(parameters);

  expect(result).toEqual({
    dateFrom: "28/04/2021",
    dateTo: "28/04/2021",
    fly_from: undefined,
    fly_to: undefined,
    return_from: "30/04/2021",
    return_to: "30/04/2021",
  });
});
