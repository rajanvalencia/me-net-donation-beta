import {stripe} from '@/app/utils/stripe'

async function getSession (sessionId : string) {
  

  const session = await stripe.checkout.sessions.retrieve(sessionId!);
  return session
}

export default async function CheckoutReturn({searchParams} : any) {
  const sessionId = searchParams.session_id;
  const session = await getSession(sessionId);

  if (session?.status === "open") {
    return <p>paymet failed</p>
  }

  if (session?.status === "complete") {
    return(
      <h3>
        payment success : {(session.customer as string)}
      </h3>
    )
  }
}