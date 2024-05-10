'use client'
import PaymentElement from "./components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./components/CheckoutForm";
const stripePromise  = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Home() {
  let clientSecret = "pi_3PEvGSDSydiWZpHQ28Bg8PmP_secret_PHOZ6NFCPo4Q21SKqGCK65uUJ"
  let paymetnIntentId = "pi_3PEvGSDSydiWZpHQ28Bg8PmP"

  const options = {
    clientSecret : clientSecret,
    paymetnIntentId : paymetnIntentId
  }

  return (
  <div>
    <main>Hello World</main>
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm/>
    </Elements>
  </div>
  );
}
