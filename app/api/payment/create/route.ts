import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// dummy form body
const body = {
  customer : {
    name: "Bishwas",
    email: "koiralabishwas257@gmail.com",
    phone: "080-3511-8306",
    address: {
      country: "jp",
      postal_code: "244-0805",
      city: "神奈川県",
      line1: "横浜市戸塚区川上町",
      line2: "川上団地6棟203",
    }
  },
  product_id: "prod_Q2GxSqbpfzdba4",
  price: 9999,
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest, res: NextResponse) {
  
  const {customer , product_id , price} = body
  

  
  const { id: customerId } = await stripe.customers.create(customer);

  // create price of the selected product
  const { id: priceId } = await stripe.prices.create({
    product: product_id,
    currency: "jpy",
    unit_amount: price,
  });

  // create an empty invoice
  const { id: invoiceId } = await stripe.invoices.create({
    customer: customerId,
  });

  // invoice id が　必要
  await stripe.invoiceItems.create({
    customer: customerId,
    price: priceId,
    invoice: invoiceId,
  });

  const { payment_intent : paymentIntentId} = await stripe.invoices.finalizeInvoice(invoiceId)


  let response : Record<string , string | null>;

  let clientSecret : string | null;
  if (typeof  paymentIntentId === "string"){
    const { client_secret } = await stripe.paymentIntents.retrieve(paymentIntentId)
     response = {client_secret , paymentIntentId}
  }

    


  return NextResponse.json(response);
}
