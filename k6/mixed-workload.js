import http from "k6/http";

export const options = {
  stages: [
    { duration: "30s", target: 20 },
    { duration: "30s", target: 50 },
    { duration: "30s", target: 100 },
    { duration: "30s", target: 0 },
  ],
};

export default function () {
  http.get("http://localhost:3000/products?page=1&limit=20");
}
