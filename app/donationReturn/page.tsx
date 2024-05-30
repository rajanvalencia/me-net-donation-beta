import {stripe} from "@/app/utils/stripe"

async function getSession(sessionId:string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  return session
}

export default async function checkoutReturn({searchParams} : any) {
  const sessionId = searchParams.session_id;
  const session = await getSession(sessionId)

  if (session?.status === "open") {
    return <p className="alert text-red-500">Payent Failder</p>
  }

  if (session?.status === "complete")
    return(
      <h3 className="alert text-green-500">Paymetn success : {(session.customer as string)}</h3>

    )

  
}