import { sendSuccesEmail } from "@/app/api-services/email";
import { stripe } from "@/app/utils/stripe";
import { NextApiRequest } from "next";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

/**
 * checkout.session.complete用のWebhook
 */
export async function POST(request: NextRequest) {
  try {
    const req = (await request.json()) as Stripe.Checkout.Session;

    const { customer_details } = req;

    if (!customer_details?.email || customer_details?.email.length === 0) {
      return NextResponse.json({
        status: 400,
        error: "Bad Request. Email not found",
      });
    }

    await sendSuccesEmail({
      recipient: customer_details?.email,
      subject: "寄付完了",
      message:
        "寄付にご協力いただきありがとうございます。寄付処理が完了したことをお知らせします。",
    });

    return NextResponse.json({
      status: 200,
      message: "Webhook processed successfully",
    });
  } catch (error) {
    console.error("Error processing webhook: ", error);
    return NextResponse.json({ status: 500, error: "Server Error" });
  }
}
