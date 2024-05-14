import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";

const schema = z.object({
  payment_intent_id : z.string(),
  payment_method_id : z.string()
})

type Body = z.infer<typeof schema>

// stripe instance is initialized with your secret key elsewhere
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string , {apiVersion : "2024-04-10"});
export async function POST(req:NextRequest ) {
  const body : Body = await req.json()
  const validation = schema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.errors , {status : 400})
  
  // paymentMethod , paymentIntentId を受け取る。

  const {payment_intent_id , payment_method_id } = body


  // stripe api に問い合わせ, payment Intent を確定
  const {status : paymentIntentStatus} = await stripe.paymentIntents.confirm(payment_intent_id , {
    payment_method : payment_method_id,
    return_url : "www.google.com"
  })
  
  // 成功　または　失敗のレスポンス
  return NextResponse.json(paymentIntentStatus)

  // 各関係者に　寄付があったことを通知する

  // 寄付控除証明証を　生成し　、関係者(事務局)に送信

  // 領収証を寄付者にメールにて送る！


}