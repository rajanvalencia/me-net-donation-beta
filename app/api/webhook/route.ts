import { stripe } from "@/app/utils/stripe";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const response = JSON.parse(payload);

  const sig = req.headers.get("Stripe-Signature");

  const dateTime = new Date(response?.created * 1000).toLocaleDateString();
  const timeString = new Date(response?.created * 1000).toLocaleTimeString();

  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case "checkout.session.async_payment_succeeded":
        const checkoutSessionAsyncPaymentSucceeded = event.data.object;
        const { customer_details } = checkoutSessionAsyncPaymentSucceeded;
        const customerEmail = customer_details?.email;

        if (customerEmail) {
          const mailRes = await fetch(
            // req.headersのおりじんにできないかな
            `http://localhost:3000/api/v1/checkout-sessions/send-email`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                send_to: customerEmail,
                subject: "寄付完了",
                message:
                  "寄付にご協力いただきありがとうございます。寄付処理が完了したことをお知らせします。",
              }),
            }
          );

          const mailData = await mailRes.json();
          console.log(event.type)
          return NextResponse.json({ status: 200, data: mailData });
        }
        break;

      // Handle other event types
      default:
        // console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ status: 200, message: 'Webhook processed successfully' });
  } catch (error) {
    console.error("Error processing webhook: ", error);
    return NextResponse.json({ status: 400, error: "Webhook Error" });
  }
}
