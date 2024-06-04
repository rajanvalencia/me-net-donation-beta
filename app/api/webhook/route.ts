import {stripe} from "@/app/utils/stripe"

const stripeSecret = stripe

import { NextResponse , NextRequest } from "next/server"

export async function POST(req:NextRequest) {
  const payload = await req.text()
  const response = JSON.parse(payload)

  const sig = req.headers.get("Stripe-Signature")

  const dateTime = new Date(response?.created * 1000).toLocaleDateString()
  const timeString = new Date(response?.created * 1000).toLocaleDateString()

  try{
    let event = stripe.webhooks.constructEvent(
      payload , 
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    console.log("event" , event.type)

    // // here we write the logic after webhook catches the specified logic

    // switch (event.type) {
    //   case 'checkout.session.async_payment_failed':
    //     const checkoutSessionAsyncPaymentFailed = event.data.object;
    //     // Then define and call a function to handle the event checkout.session.async_payment_failed
    //     break;
    //   case 'checkout.session.async_payment_succeeded':
    //     const checkoutSessionAsyncPaymentSucceeded = event.data.object;
    //     // Then define and call a function to handle the event checkout.session.async_payment_succeeded
    //     break;
    //   case 'checkout.session.completed':
    //     const checkoutSessionCompleted = event.data.object;
    //     // Then define and call a function to handle the event checkout.session.completed
    //     break;
    //   case 'checkout.session.expired':
    //     const checkoutSessionExpired = event.data.object;
    //     // Then define and call a function to handle the event checkout.session.expired
    //     break;
    //   // ... handle other event types
    //   default:
    //     console.log(`Unhandled event type ${event.type}`);
    // }

    return NextResponse.json({status : 400 , event : event.type})

    
  } catch (error) {
    return NextResponse.json({status : 501 , error})
  }

}