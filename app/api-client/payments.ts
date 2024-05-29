import { useCallback } from "react";
import { FormData } from "../components/DonationForm";

// TODO: add types
export const createPayment = async (data:any) => {
  return fetch("/api/payment/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  .then((res) => res.json())

}


// do not mistake endpoints !!!
export const createCheckoutSessions = async  (formData: FormData) => {
  const res = await fetch("/api/v1/checkout-sessions/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  return data.client_secret;
}



// TODO: confirm payment


