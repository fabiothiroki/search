import { getAirportsByTerm } from "../airportService";

const mockResponse = {
  locations: [
    {
      id: "PRG",
      int_id: 5212,
      airport_int_id: 5212,
      active: true,
      code: "PRG",
      icao: "LKPR",
      name: "Václav Havel Airport Prague",
      slug: "vaclav-havel-airport-prague-prague-czechia",
      slug_en: "vaclav-havel-airport-prague-prague-czechia",
    },
  ],
};

describe("Airport service", () => {
  it("should fetch using correct url", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );

    const result = await getAirportsByTerm("prag");
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.skypicker.com/locations?location_types=airport&term=prag"
    );
  });
});
