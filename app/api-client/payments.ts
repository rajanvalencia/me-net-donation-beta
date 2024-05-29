import { useCallback } from "react";

// TODO: add types
export const createPayment = (data: any) => {
  return fetch("/api/payment/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((resData) => resData.client_secret);
}

// TODO: confirm payment
