import http from "k6/http";

export const options = {
vus: 20,
duration: '60s',
};

export default function () {
  const res = http.post(
    "http://localhost:3000/auth/login",
    JSON.stringify({
      email: "admin@thesis.com",
      password: "123456",
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );


}