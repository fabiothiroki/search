import getFlights from "../flightService";
import mockFlightResponse from "./mockFlightResponse";

describe("Flight service", () => {
  it("should return empty object when there is no parameters", async () => {
    const result = await getFlights();

    expect(result).toEqual({});
  });
  it("should fetch using correct url", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockFlightResponse),
      })
    );

    const result = await getFlights({});
    expect(result).toEqual(mockFlightResponse);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.skypicker.com/flights?partner=skypicker"
    );
  });
});
