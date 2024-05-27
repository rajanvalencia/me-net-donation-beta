import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request:NextRequest) {
  try{
    const {priceId} = await request.json();
    const session = await stripe.checkout.sessions.create({
      ui_mode : "embedded",
      payment_method_types : ["card" ],
      line_items : [
        {price : "price_1PL1mODSydiWZpHQ6S2GDEmm" },
  
      ],
      mode : "payment",
      return_url : `${request.headers.get('origin')}/return?session_id={CHECKOUT_SESSION_ID}`
    })

    return NextResponse.json({id : session.id , clinet_secret : session.client_secret});
  } catch (error : any) {
    console.log(error);
    return NextResponse.json({message : error.message} , {status : 500})
  }
}