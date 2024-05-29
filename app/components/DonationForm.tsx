"use client";
import React, { useRef, useState, useCallback } from "react";
import { bodySchema } from "../api/v1/checkout-sessions/create/route";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

interface Props {
  productId: string;
}

type FormData = z.infer<typeof bodySchema>;


const DonationForm = ({ productId }: Props) => {
  
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  const modalRef = useRef<HTMLDialogElement>(null);
  const [options, setOptions] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      customer: {
        address: {
          city: "yokohama",
          country: "JP",
          line1: "testline 1",
          line2: "testline2",
          postal_code: "2334213",
        },
        email: "koiralabishwas0816@gmail.com",
        name: "Bishwas Koirla",
        phone: "08035118306",
      },
      price: 9999,
      product_id: "prod_Q2GxSqbpfzdba4",
    },
    resolver: zodResolver(bodySchema),
  });

  const fetchClientSecret = useCallback(async (formData: FormData) => {
    const res = await fetch("/api/payment/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data.client_secret;
  }, []);

  const onSubmit = useCallback(async (formData: FormData) => {
    setLoading(true);
    console.log("here are the form data", formData);
    try {
      const clientSecret = await fetchClientSecret(formData);
      setOptions({ clientSecret });
      modalRef.current?.showModal();
    } catch (error) {
      console.error("Error fetching client secret:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchClientSecret]);

  return (
    <div className="mx-auto mt-10 p-5 bg-white shadow-black rounded-lg flex-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.product_id?.message}
        <input type="hidden" {...register("product_id")} value={productId} />

        <div className="mb-4">
          <label className="block text-sm font-medium text-black">Price</label>
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
          <label className="block text-sm font-medium text-gray-600">Name</label>
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
          <label className="block text-sm font-medium text-gray-600">Email</label>
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
          <label className="block text-sm font-medium text-gray-600">Phone</label>
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
          <label className="block text-sm font-medium text-gray-600">Country</label>
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
          <label className="block text-sm font-medium text-gray-600">Postal Code</label>
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
          <label className="block text-sm font-medium text-gray-600">City</label>
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
          <label className="block text-sm font-medium text-gray-600">Line 1</label>
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
          <label className="block text-sm font-medium text-gray-600">Line 2</label>
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

        <button
          type="submit"
          className="btn btn-primary w-full bg-blue-500 border-none hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
      <div>
        {loading && (
          <span className="loading loading-dots loading-lg text-black" />
        )}
        <div className="flex-auto">
          {options && (
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationForm;
