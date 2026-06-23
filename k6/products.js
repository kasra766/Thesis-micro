import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 50,
  duration: "60s",
};

export default function () {
  const res = http.get("http://localhost:3000/products?page=1&limit=20");

  check(res, {
    "status is 200": (r) => r.status === 200,
  });
}
