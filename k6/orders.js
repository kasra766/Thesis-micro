import http from "k6/http";
import { check } from "k6";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NTU3YjQ1Yi00M2M5LTQ5ZjAtYTVkNi0wMmVhZDliYjk4NzAiLCJ1c2VySWQiOiJhZG1pbi11c2VyLWlkIiwiZW1haWwiOiJhZG1pbkB0aGVzaXMuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzgyMjMyMjE5LCJleHAiOjE3ODIzMTg2MTl9.NZF_u4pySaiyYM_7rbl9fQobIIklRF0Y52PUHLVp0qM";

export const options = {
  vus: 20,
  duration: "60s",
};

export default function () {
  const res = http.post(
    "http://localhost:3000/orders",
    JSON.stringify({
      productId: "cce63f06-5184-4eb1-b8b5-f781b192f78a",
      quantity: 2,
    }),
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    },
  );

  check(res, {
    "status is 201": (r) => r.status === 201,
  });
}
