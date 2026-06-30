import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: __ENV.VUS ? Number(__ENV.VUS) : 10,
  duration: __ENV.DURATION || "5m",
};

const products = [
  "cce63f06-5184-4eb1-b8b5-f781b192f78a",
  "36a10441-0230-4a34-a9ee-63ab760674fe",
  "5f99d292-b1cd-4552-bd61-96c2eb1c88c6",
  "0db0a00b-d33f-4ee2-880c-9e88a1bcf5f9",
];
const productId =
  products[Math.floor(Math.random() * products.length)] || products[0];

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NTU3YjQ1Yi00M2M5LTQ5ZjAtYTVkNi0wMmVhZDliYjk4NzAiLCJ1c2VySWQiOiJhZG1pbi11c2VyLWlkIiwiZW1haWwiOiJhZG1pbkB0aGVzaXMuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzgyODQxMDI5LCJleHAiOjE3ODI5Mjc0Mjl9.7czJECWPUp7QRSMgJP8nqilRWEa0GvzjChrGejIvdhw";

export default function () {
  // if (!token) {
  //   const loginResponse = await http.post(
  //     'http://localhost:4000/auth/login',
  //     JSON.stringify({
  //       email: 'admin@thesis.com',
  //       password: '123456',
  //     }),
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     },
  //   );
  //   token = loginResponse.json('accessToken');
  // }

  const response = http.post(
    "http://localhost:3000/orders",
    JSON.stringify({
      productId: productId,
      quantity: 2,
    }),
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  check(response, {
    "order created": (r) => r.status === 201,
    "response time < 500ms": (r) => r.timings.duration < 500,
  });
}
