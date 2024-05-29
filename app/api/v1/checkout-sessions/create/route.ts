import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";

const addressSchema = z.object({
  country: z.string(),
  postal_code: z.string(),
  city: z.string(),
  line1: z.string(),
  line2: z.string(),
});

const customerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().min(11).max(11),
  address: addressSchema,
});

export const bodySchema = z.object({
  customer: customerSchema,
  product_id: z.string(),
  price: z.number(),
});

type BodyInterface = z.infer<typeof bodySchema>;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string , {apiVersion : "2024-04-10"});

export async function POST(req: NextRequest , res : NextResponse) {
  const body: BodyInterface = await req.json();
  const validation = bodySchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { customer, product_id, price } = body;

  // TODO: only create customer and price if it doesnt exist already

  const {id : customerId} = await stripe.customers.create(customer);


  
  const {id : priceId} = await stripe.prices.create({
    product : product_id,
    currency : "jpy",
    // amount passed from the body
    unit_amount : price
  });


  const session  = await stripe.checkout.sessions.create({
    ui_mode : "embedded",
    customer : customerId,
    // TODO: customer のemail をretriveに帰るべき
    customer_email : customer.email,
    payment_method_types : ["card" , "konbini" ],
    line_items : [
      {
        price : priceId,
        quantity : 1
      }

    ],
    automatic_tax : {enabled : false},
    mode : "payment",
    cancel_url : "www.cancel.com",
    return_url : `${req.headers.get('origin')}/return?session_id={CHECKOUT_SESSION_ID}`,
    success_url : "www.success.com"
  })
  return NextResponse.json({id : session.id , client_secret : session.client_secret});

}
