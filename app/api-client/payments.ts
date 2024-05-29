import { useCallback } from "react";

// TODO: add types
export const createPayment = async (data:any) => {
  return fetch("/api/payment/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  .then((res) => res.json())

}



// TODO: confirm payment


