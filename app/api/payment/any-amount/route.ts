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
  // let response: Record<string, string | null> = { client_secret: null, paymentIntentId: null };

  

    // create customer returns customerId
    const { id: customerId } = await stripe.customers.create(customer);

    const {default_price} = await stripe.products.retrieve(product_id)

    stripe.prices.update(default_price , )
    
    

  

  return NextResponse.json(default_price)
}
