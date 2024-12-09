import { test, expect } from "@playwright/test";
import { request } from "http";

const BASE_URL = "https://petstore3.swagger.io/api/v3/pet";
const status = ["available", "pending", "sold"];
const invalidIds = ["10", "invalidNumber", 23.2];
const tags = [];

test.describe("Pet", async () => {
  test("POST a new Pet", async ({ request }) => {
    const response = await request.post(BASE_URL, {
      data: {
        id: 10,
        name: "doggie",
        category: {
          id: 1,
          name: "Dogs",
        },
        photoUrls: ["string"],
        tags: [
          {
            id: 0,
            name: "string",
          },
        ],
        status: "available",
      },
    });

    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
  });

  test(`DELETE a Pet given an ID `, async ({ request }) => {
    const id = 10;
    const response = await request.delete(BASE_URL + "/" + id);

    const response_after_delete = await request.get(BASE_URL + "/" + id);

    expect(response_after_delete.status()).toBe(404);
  });

  test.skip("GET all pets", async () => {
    const endpoint = `/findByStatus?status=${status}`;
  });

  status.forEach((status) => {
    test(`GET pet given a status - ${status}`, async ({ request }) => {
      const statusEndpoint = `/findByStatus?status=${status}`;

      const response = await request.get(BASE_URL + statusEndpoint);

      expect(response.status()).toBe(200);
    });
  });

  test("PUT a PET", async ({ request }) => {
    const response = await request.put(BASE_URL, {
      data: {
        id: 10,
        name: "doggie",
        category: {
          id: 1,
          name: "Dogs",
        },
        photoUrls: ["string"],
        tags: [
          {
            id: 0,
            name: "string",
          },
        ],
        status: "available",
      },
    });

    // need to add more code (maybe)

    expect(response.status()).toBe(200);
  });

  test("GET Pet given a VALID id", async ({ request }) => {
    const id = 10;
    const endpoint = `/${id}`;
    const response = await request.get(BASE_URL + endpoint);
    expect(response.status()).toBe(200);
  });

  invalidIds.forEach((invalidIds) => {
    test(`GET Pet given an INVALID id :::: ${invalidIds}`, async ({
      request,
    }) => {
      const endpoint = `/${invalidIds}`;
      const response = await request.get(BASE_URL + endpoint);

      expect(response.status()).toBe(400);
    });
  });

  tags.forEach((tag) => {
    test.fixme(`GET - Find By Tags ${tag} `, async ({ request }) => {
      const findByTagEnpoint = `/findByTags?tags=${tag}`;

      const response = await request.get(BASE_URL + findByTagEnpoint);

      expect(response.status()).toBe(200);
    });
  });
});
