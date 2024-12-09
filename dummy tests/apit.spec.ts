import { test, expect } from "@playwright/test";
import { count } from "console";

const BASE_URL = "https://restcountries.com/v3.1";
const ALL_ENDPOINT = "/all";
const COUNTRIES = ["Germany", "Argentina", "India"];

test.describe("REST-Countries", () => {
  let response;

  test.beforeEach(async ({ request }) => {
    response = await request.get(BASE_URL + ALL_ENDPOINT);
  });

  test("Verify API returns status 200", async () => {
    expect(response.status()).toBe(200);

    console.log(JSON.parse(await response.text()));
  });

  test("Verify that response has the name attribute", async () => {
    const countries = await response.json();

    countries.forEach((country) => {
      expect(country).toHaveProperty("name");
    });
  });

  test("Verify that a specific country is present in the response", async () => {
    const countries = await response.json();

    const germany = countries.find(
      (country) => country.name.common === "Germany"
    );
    expect(germany).toBeDefined();

    console.log(germany)
  });

  COUNTRIES.forEach((countryName) => {
    test(`Verify ${countryName} is present`, async () => {
      const countries = await response.json();

      const country = countries.find(
        (country) => country.name.common === countryName
      );
      expect(country).toBeDefined();
      console
    });
  });

  test("Verify the API returns the population given a specific country", async () => {
    const countries = await response.json();
    const countryName = "Argentina";

    const country = countries.find(
      (country) => country.name.common === countryName
    );

    const population = country.population;

    expect(typeof population).toBe("number");
    expect(population).toBeGreaterThan(0);
  });
});
