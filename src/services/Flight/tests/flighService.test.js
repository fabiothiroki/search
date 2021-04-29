import getFlights from "../flightService";
import mockFlightResponse from "./mockFlightResponse";

describe("Flight service", () => {
  it("should return empty object when there is no parameters", async () => {
    const result = await getFlights();

    expect(result).toEqual(null);
  });
  it("should fetch using correct url", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockFlightResponse),
      })
    );

    const result = await getFlights({
      dateFrom: "28/04/2021",
      dateTo: "28/04/2021",
      fly_from: "BWI",
      fly_to: "TLV",
      return_from: "30/04/2021",
      return_to: "30/04/2021",
    });
    expect(result).toEqual(mockFlightResponse);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.skypicker.com/flights?dateFrom=28%2F04%2F2021&dateTo=28%2F04%2F2021&fly_from=BWI&fly_to=TLV&return_from=30%2F04%2F2021&return_to=30%2F04%2F2021&partner=skypicker&limit=10"
    );
  });
});
