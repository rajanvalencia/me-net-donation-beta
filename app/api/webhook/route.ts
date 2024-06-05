import { sendSuccesEmail } from "@/app/api-services/email";
import { stripe } from "@/app/utils/stripe";
import { NextApiRequest } from "next";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

/**
 * checkout.session.complete用のWebhook
 */
type CheckoutSessionWebhookReq = NextRequest & {
  body: Stripe.Checkout.Session;
};

export async function POST(request: CheckoutSessionWebhookReq) {
  try {
    const req = await request.json()

    const { customer_details } = req;

    if(!customer_details?.email)
      return NextResponse.json({ status: 400, error: "Bad Request. Email not found" });

    sendSuccesEmail({
      recipient: customer_details?.email,
      subject: "寄付完了",
      message:
        "寄付にご協力いただきありがとうございます。寄付処理が完了したことをお知らせします。",
    })

    return NextResponse.json({ status: 200, message: 'Webhook processed successfully' });
  } catch (error) {
    console.error("Error processing webhook: ", error);
    return NextResponse.json({ status: 500, error: "Server Error" });
  }
}
