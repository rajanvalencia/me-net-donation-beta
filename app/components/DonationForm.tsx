import React from "react";
import { bodySchema } from "../api/payment/create/route";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = Zod.infer<typeof bodySchema>;

const DonationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(bodySchema) });

  const onSubmit = async (formData: FormData) => {
    const response = await fetch("/api/v2/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      console.log("submit successful", response);
    } else {
      console.log("submit failed", response);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}></form>
    </div>
  );
};

export default DonationForm;
