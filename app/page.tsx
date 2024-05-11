'use client'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./components/CheckoutForm";


// must call load stripe outside component to avoid rerender
const stripePromise  = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Home() {

  // hard code datas for now
  let clientSecret = "pi_3PF72RDSydiWZpHQ2HQcZO9t_secret_yEGSCaVJx5yynk3csId8YQcDo"
  let paymentnIntentId = "pi_3PF72RDSydiWZpHQ2HQcZO9t"
  const options   = {
    layout :   {
      type : 'tabs',
      appearance : {
        theme : "night"
      }
    },
    clientSecret : clientSecret,
    paymentnIntentId : paymentnIntentId
  }

  return (
  <div className="bg-white">
    <Elements stripe={stripePromise} options={options}   >
      
      <CheckoutForm/>
    </Elements>
  </div>
  );
}
