import React from 'react'
import { BodyCreate } from '../api/payment/create/route'
import { useForm } from 'react-hook-form'

const DonationForm = () => {

  const {register , handleSubmit , reset , formState : {errors}} = useForm<BodyCreate>()

  return (
    <div></div>
  )
}

export default DonationForm