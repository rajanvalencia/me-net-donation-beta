"use client";
import React from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { CustomCheckoutProvider, Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

interface Props {
  clientSecret : string
  paymentIntentId? : string
}

// must call load stripe outside component to avoid rerender
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
const PaymentPage = ({clientSecret , paymentIntentId} : Props) => {
  // let clientSecret =
  //   "pi_3PF72RDSydiWZpHQ2HQcZO9t_secret_yEGSCaVJx5yynk3csId8YQcDo";
  // let paymentnIntentId = "pi_3PF72RDSydiWZpHQ2HQcZO9t";
  const options : StripeElementsOptions = {
    clientSecret: clientSecret,
    locale :"ja" ,
    
    
    
  };

  return (
    <div className="bg-white">
    <div>
      {/* <p>custom checkout provider</p>
      <div>
        <CustomCheckoutProvider stripe={stripePromise} options={options}>
          <CustomCheckoutForm/>
        </CustomCheckoutProvider>
      </div> */}
    </div>
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm/>
    </Elements>
  </div>
  );
};

export default PaymentPage;
