import { stripe } from "@/app/utils/stripe"

async function getSession(sessionId:string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId!)
  return sessionId
  
}

export default async function CheckoutReturn({searchParams} : any) {
  const sessionId = searchParams.session_id

  const session : any = await getSession(sessionId)

  if (session?.status === "open") {
    return <p>payment failed</p>
  }

  if (session?.status === "complete") {
    return (
      <h3>
        success : {(session.customer as string)}
      </h3>
    )
  }
}