import { PaymentElement, useCustomCheckout } from '@stripe/react-stripe-js'
import React from 'react'

const CustomCheckoutForm = () => {
  const checkout  = useCustomCheckout()
  console.log(checkout)
  return (
    <div>
      <form >
        <PaymentElement options={{layout : 'accordion'} }>
        </PaymentElement>
      </form>

      <pre>
        {JSON.stringify(checkout.lineItems , null , 2)}
      </pre>
    </div>
  )
}

export default CustomCheckoutForm