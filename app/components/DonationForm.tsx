'use client'
import React, { useState } from "react";
import { bodySchema } from "../api/payment/create/route";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PaymentPage from "./PaymentPage";


interface Props {
  productId : string
}


type FormData = z.infer<typeof bodySchema>;
interface SubmitResponse {
  client_secret : string,
  paymentIntentId : string
}

const DonationForm = ({productId} : Props) => {
  
  console.log(productId)

  const [submitResponse , setSubmitResponse] = useState<SubmitResponse>()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(bodySchema) });


  const onSubmit = async (formData: FormData) => {
    console.log("here are the form data",formData)
    // Include ProdutTd passed from the prop
    const response = await fetch("/api/payment/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json()
    if (data) setSubmitResponse(data)
    if (response.ok) {
      console.log("submit successful", data);
      // reset();
    } else {
      console.log("submit failed", data);
    }
    console.log(errors.product_id)
  };


  return (
    <div className=" mx-auto mt-10 p-5 bg-white shadow-black rounded-lg">
      {/* dont render form after submitted */}
      {!submitResponse && 
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.product_id?.message}
        {/* passing prop of productId */}
        <input type="hidden" {...register('product_id')} value={productId} />
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-black">Price</label>
          <input type="number" className="input input-bordered w-full bg-gray-500" {...register("price", { valueAsNumber: true })} />
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Name</label>
          <input type="text" className="input input-bordered w-full bg-gray-100" {...register("customer.name")} />
          {errors.customer?.name && <p className="text-red-500 text-xs mt-1">{errors.customer.name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input type="email" className="input input-bordered w-full bg-gray-100" {...register("customer.email")} />
          {errors.customer?.email && <p className="text-red-500 text-xs mt-1">{errors.customer.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Phone</label>
          <input type="text" className="input input-bordered w-full bg-gray-100" {...register("customer.phone")} />
          {errors.customer?.phone && <p className="text-red-500 text-xs mt-1">{errors.customer.phone.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Country</label>
          <input type="text" className="input input-bordered w-full bg-gray-100" {...register("customer.address.country")} />
          {errors.customer?.address?.country && <p className="text-red-500 text-xs mt-1">{errors.customer.address.country.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Postal Code</label>
          <input type="text" className="input input-bordered w-full bg-gray-100" {...register("customer.address.postal_code")} />
          {errors.customer?.address?.postal_code && <p className="text-red-500 text-xs mt-1">{errors.customer.address.postal_code.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">City</label>
          <input type="text" className="input input-bordered w-full bg-gray-100" {...register("customer.address.city")} />
          {errors.customer?.address?.city && <p className="text-red-500 text-xs mt-1">{errors.customer.address.city.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Line 1</label>
          <input type="text" className="input input-bordered w-full bg-gray-100" {...register("customer.address.line1")} />
          {errors.customer?.address?.line1 && <p className="text-red-500 text-xs mt-1">{errors.customer.address.line1.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Line 2</label>
          <input type="text" className="input input-bordered w-full bg-gray-100" {...register("customer.address.line2")} />
          {errors.customer?.address?.line2 && <p className="text-red-500 text-xs mt-1">{errors.customer.address.line2.message}</p>}
        </div>

        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Product ID</label>
          <input type="text" className="input input-bordered w-full bg-gray-100" {...register("product_id")} />
          {errors.product_id && <p className="text-red-500 text-xs mt-1">{errors.product_id.message}</p>}
        </div> */}


        <button type="submit" className="btn btn-primary w-full bg-blue-500 border-none hover:bg-blue-600">Submit</button>
      </form>

      }
      <div>
        {submitResponse && <div>
          <PaymentPage  clientSecret={submitResponse.client_secret} paymentIntentId={submitResponse.paymentIntentId}/>
        </div> }
      </div>
    </div>
  );
};

export default DonationForm;
