import { check } from "k6";
import http from "k6/http";

export const options = {
  vus: __ENV.VUS ? Number(__ENV.VUS) : 10,
  duration: __ENV.DURATION || "5m",
};

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NTU3YjQ1Yi00M2M5LTQ5ZjAtYTVkNi0wMmVhZDliYjk4NzAiLCJ1c2VySWQiOiJhZG1pbi11c2VyLWlkIiwiZW1haWwiOiJhZG1pbkB0aGVzaXMuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzgyNzYyMzk1LCJleHAiOjE3ODI4NDg3OTV9.8JQk1a95h0JBowKdJZdvRLF2PVlHr9z6fFN4F7tZRe4";

export default function () {
  //   if (!token) {
  //     const loginResponse = http.post(
  //       'http://localhost:4000/auth/login',
  //       JSON.stringify({
  //         email: 'admin@thesis.com',
  //         password: '123456',
  //       }),
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     );
  //     token = loginResponse.json('accessToken');
  //   }

  const response = http.get("http://localhost:3000/orders?limit=20&page=1", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  check(response, {
    "order retrieved": (r) => r.status === 200,
    "response time < 500ms": (r) => r.timings.duration < 500,
  });
}
