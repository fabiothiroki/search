import { getAirportsByTerm } from "../airportService";
import { mockAirportResponse } from "./mockAirportReponse";

describe("Airport service", () => {
  it("should fetch using correct url", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockAirportResponse),
      })
    );

    const result = await getAirportsByTerm("prag");
    expect(result).toEqual(mockAirportResponse);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.skypicker.com/locations?location_types=airport&term=prag"
    );
  });
});
