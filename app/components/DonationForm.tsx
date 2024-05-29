"use client";
import React, { useCallback, useRef, useState } from "react";
import { bodySchema } from "../api/v1/checkout-sessions/create/route";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PaymentPage from "./PaymentPage";
import { useMutation } from "@tanstack/react-query";
import { createPayment } from "../api-client/payments";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

interface Props {
  productId: string;
}

type FormData = z.infer<typeof bodySchema>;
interface SubmitResponse {
  client_secret: string;
  paymentIntentId: string;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
const DonationForm = ({ productId }: Props) => {
  // TODO: do smth better than any
  const [checkoutOptions, setcheckoutOptions] = useState<any>();
  const modalRef = useRef<HTMLDialogElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(bodySchema) });

  // POST mutation
  const {
    mutate: createPaymentApi,
    data: createdPaymentData,
    isSuccess,
    isIdle,
    isPending,
  } = useMutation({
    mutationFn: createPayment,
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });


  // wrap this in use callback
  const onSubmit = useCallback( (formData: FormData) => {
    console.log("here are the form data", formData);
    // returns client_secret
    const options = createPayment(formData)
    setcheckoutOptions(options) 
    // modalRef.current?.showModal();
    console.log()
  },[createPayment]);

  return (
    <div className=" mx-auto mt-10 p-5 bg-white shadow-black rounded-lg">
      {checkoutOptions && (
        <EmbeddedCheckoutProvider stripe={stripePromise} options={checkoutOptions}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
      {/* react mutation が　行われてないとき（api叩いてないとき）*/}
      {isIdle && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.product_id?.message}
          {/* passing prop of productId */}
          <input type="hidden" {...register("product_id")} value={productId} />

          <div className="mb-4">
            <label className="block text-sm font-medium text-black">
              Price
            </label>
            <input
              type="number"
              className="input input-bordered w-full bg-gray-500"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              {...register("customer.name")}
            />
            {errors.customer?.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.customer.name.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              className="input input-bordered w-full bg-gray-100"
              {...register("customer.email")}
            />
            {errors.customer?.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.customer.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Phone
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              {...register("customer.phone")}
            />
            {errors.customer?.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.customer.phone.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Country
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              {...register("customer.address.country")}
            />
            {errors.customer?.address?.country && (
              <p className="text-red-500 text-xs mt-1">
                {errors.customer.address.country.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Postal Code
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              {...register("customer.address.postal_code")}
            />
            {errors.customer?.address?.postal_code && (
              <p className="text-red-500 text-xs mt-1">
                {errors.customer.address.postal_code.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              City
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              {...register("customer.address.city")}
            />
            {errors.customer?.address?.city && (
              <p className="text-red-500 text-xs mt-1">
                {errors.customer.address.city.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Line 1
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              {...register("customer.address.line1")}
            />
            {errors.customer?.address?.line1 && (
              <p className="text-red-500 text-xs mt-1">
                {errors.customer.address.line1.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Line 2
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              {...register("customer.address.line2")}
            />
            {errors.customer?.address?.line2 && (
              <p className="text-red-500 text-xs mt-1">
                {errors.customer.address.line2.message}
              </p>
            )}
          </div>

          {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Product ID</label>
          <input type="text" className="input input-bordered w-full bg-gray-100" {...register("product_id")} />
          {errors.product_id && <p className="text-red-500 text-xs mt-1">{errors.product_id.message}</p>}
        </div> */}

          <button
            type="submit"
            className="btn btn-primary w-full bg-blue-500 border-none hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      )}
      <div>
        {/* mutation が issuccess した場合 */}
        {isPending && (
          <span className="loading loading-dots loading-lg text-black" />
        )}
        {isSuccess && (
          <div>
            <PaymentPage
              clientSecret={createdPaymentData.client_secret}
              paymentIntentId={createdPaymentData.paymentIntentId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationForm;
