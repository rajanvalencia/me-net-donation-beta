import { stripe } from "@/app/utils/stripe";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {
  try{
    const {priceId} = await request.json();
    const session = await stripe.checkout.sessions.create({
      ui_mode : "embedded",
      payment_method_types : ["card" , "konbini" ],
      line_items : [
        {
          price : priceId,
          quantity : 1
        },
  
      ],
      mode : "payment",
      return_url : `${request.headers.get('origin')}/return?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax : {enabled : false}
    })
    return NextResponse.json({id : session.id , client_secret : session.client_secret});
  } catch (error : any) {
    console.log(error);
    return NextResponse.json({message : error.message} , {status : 500})
  }
}