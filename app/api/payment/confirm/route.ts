import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";

interface Body{
  paymentIntentId : string,
  paymentMethodId : string
}

const schema = z.object({
  paymentIntentId : z.string(),
  
})

// stripe instance is initialized with your secret key elsewhere
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string , {apiVersion : "2024-04-10"});
export async function POST(req:NextRequest ) {
  const body : Body = await req.json()

  // paymentMethod , paymentIntentId を受け取る。
  // stripe api に問い合わせ, payment Intent を確定
  // 成功　または　失敗のレスポンス

  // 各関係者に　寄付があったことを通知する

  // 寄付控除証明証を　生成し　、関係者(事務局)に送信

  // 領収証を寄付者にメールにて送る！

  return NextResponse.json(body)

}