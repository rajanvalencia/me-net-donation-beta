import {stripe} from "@/app/utils/stripe"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

async function getSession(sessionId:string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  return session
}

export default async function checkoutReturn({searchParams} : Params) {
  const sessionId = searchParams.session_id;
  const session = await getSession(sessionId)
  console.log(session)

  if (session?.status === "open") {
    return <p className="alert text-red-500">Payment Failder</p>
  }

  if (session?.status === "complete")
    return(
      <h3 className="alert text-green-500">Paymetn success : {(session.customer as string)}</h3>

    )

  
}