"use client"
import React, { useCallback, useRef, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { EmbeddedCheckoutProvider , EmbeddedCheckout } from '@stripe/react-stripe-js'

const EmbededCheckout = () => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

  const [showCheckout , setShowCheckout] = useState(false)
  const modalRef = useRef<HTMLDialogElement>(null)

  const fetchClientSecret = useCallback(() => {
    return fetch("/api/v1/ceckout-session/test",{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({priceId : "price_1PIkK0DSydiWZpHQ3m8cDSM1"})
    })
      .then((res) => res.json())
      .then((data) => data.client_secret)
  },[]);

  const options = {fetchClientSecret}

  const handleCheckoutClick = () => {
    setShowCheckout(true)
    modalRef.current?.showModal()
  }

  const handleCloseModal = () => {
    setShowCheckout(false);
    modalRef.current!.close()
  }

  return (
    <div id='checkout'>
      <button onClick={handleCheckoutClick}>open modal with embedded checkout</button>
      <dialog ref={modalRef}>
        <div>
          <h3>embeded checkout </h3>
          <div>
            {showCheckout && (
              <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                <EmbeddedCheckout/>
              </EmbeddedCheckoutProvider>
            )}
          </div>
          <div>
            <form method='dialog'>
              <button onClick={handleCloseModal}>close</button>
            </form>
          </div>
        </div>
      </dialog>

    </div>
  )
}

export default EmbededCheckout