import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Assuming the Stripe instance is initialized with your secret key elsewhere
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string , {apiVersion : "2024-04-10"});

export async function POST(req: NextRequest) {
  const body = {
    customer: {
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

  const { customer, product_id, price } = body;

  let response: Record<string, string | null> = { client_secret: null, paymentIntentId: null };

  try {
    const { id: customerId } = await stripe.customers.create(customer);

    const { id: priceId } = await stripe.prices.create({
      product: product_id,
      currency: "jpy",
      unit_amount: price,
    });

    const { id: invoiceId } = await stripe.invoices.create({ customer: customerId });

    await stripe.invoiceItems.create({
      customer: customerId,
      price: priceId,
      invoice: invoiceId,
    });

    const { payment_intent: paymentIntentId } = await stripe.invoices.finalizeInvoice(invoiceId);

    if (typeof paymentIntentId === "string") {
      const { client_secret } = await stripe.paymentIntents.retrieve(paymentIntentId);
      response = { client_secret, paymentIntentId };
    } else {
      console.error('PaymentIntentId is not available or not a string.');
    }
  } catch (error) {
    console.error('An error occurred in the payment process:', error);
  }

  return new NextResponse(JSON.stringify(response), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
