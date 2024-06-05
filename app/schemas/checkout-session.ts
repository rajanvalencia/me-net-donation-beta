import { z } from "zod";

const addressSchema = z.object({
  country: z.string(),
  postal_code: z.string(),
  city: z.string(),
  line1: z.string(),
  line2: z.string(),
});

const customerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().min(11).max(11),
  address: addressSchema,
});

export const bodySchema = z.object({
  customer: customerSchema,
  product_id: z.string(),
  price: z.number(),
});