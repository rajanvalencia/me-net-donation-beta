import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {z} from "zod"


 const addressSchema = z.object({
  country : z.string(),
  postal_code : z.string(),
  city : z.string(),
  line1 : z.string(),
  line2 : z.string()
})

 const customerSchema = z.object({
  name : z.string(),
  email : z.string().email(),
  phone : z.string().min(11).max(11),
  address : addressSchema
})

 export const bodySchema = z.object({
  customer : customerSchema,
  product_id : z.string(),
  price : z.number()
})

type BodyInterface = z.infer<typeof bodySchema>

// Assuming the Stripe instance is initialized with your secret key elsewhere
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string , {apiVersion : "2024-04-10"});

export async function POST(req: NextRequest) {
  const body : BodyInterface = await req.json()

  // return error if schema errors
  const validation = bodySchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.errors , {status : 400})

  // destructuring the body
  const { customer, product_id, price } = body;

  // var to return response 
  let response: Record<string, string | null> = { client_secret: null, paymentIntentId: null };

  try {

    // create customer returns customerId
    const { id: customerId } = await stripe.customers.create(customer);
    // create the given price => returns priceId
    const { id: priceId } = await stripe.prices.create({
      product: product_id,
      currency: "jpy",
      // this price is from body =>i.e body.price
      unit_amount: price,
    });
    // create invoice  => returns invoiceId
    const { id: invoiceId } = await stripe.invoices.create({
      customer : customerId ,
      payment_settings : {
        // ほかいれるとなんかばぐる
        
        payment_method_types : ["card" ,  "link"]
      }
    });

    // create invoice item  => no any returns
    // 請求書に詳細内容を書き込む感覚
    await stripe.invoiceItems.create({
      invoice: invoiceId,
      customer: customerId,
      price: priceId
    });

    // create an payment intent 
    const { payment_intent: paymentIntentId } = await stripe.invoices.finalizeInvoice(invoiceId);

    // retrive client secret from payment intent
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
