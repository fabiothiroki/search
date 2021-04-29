import flightResponseFormatter from "../flightResponseFormatter";
import mockFlightResponse from "./mockFlightResponse";

test("should format expected data", () => {
  const result = flightResponseFormatter(mockFlightResponse);

  expect(result).toEqual([
    {
      arrivalDate: new Date(
        mockFlightResponse.aTimeUTC * 1000
      ).toLocaleString(),
      cityFrom: "San Francisco",
      cityTo: "San Diego",
      departureDate: new Date(
        mockFlightResponse.dTimeUTC * 1000
      ).toLocaleString(),
      flyFrom: "SFO",
      flyTo: "SAN",
      id: "20a108d748b20000d8b4b5f0_0|08d720a148b900007840d555_0",
      price: "88 EUR",
    },
    {
      arrivalDate: new Date(
        mockFlightResponse.aTimeUTC * 1000
      ).toLocaleString(),
      cityFrom: "San Francisco",
      cityTo: "San Diego",
      departureDate: new Date(
        mockFlightResponse.dTimeUTC * 1000
      ).toLocaleString(),
      flyFrom: "SFO",
      flyTo: "SAN",
      id: "20a108d748b40000cea23c4e_0|08d720a148b6000046c7988b_0",
      price: "105 EUR",
    },
  ]);
});

test("should handle null data", () => {
  const result = flightResponseFormatter(null);

  expect(result).toBeNull();
});
