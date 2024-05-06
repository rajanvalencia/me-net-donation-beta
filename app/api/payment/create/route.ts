import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(req:NextRequest , res : NextResponse) {
  
  const customer = await stripe.customers.create({
    name : "Bishwas" , 
    email : "koiralabishwas257@gmail.com"
  })

  return NextResponse.json(customer)
}