'use client'
import { PaymentElement } from '@stripe/react-stripe-js'
import React from 'react'

const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <button>submmit</button>
    </form>
  )
}

export default CheckoutForm