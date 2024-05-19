import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2024-04-10" });

export async function GET(req: NextRequest) {
  const { data: productData } = await stripe.products.list();

  // Assuming you want to filter the products based on some condition, for example, products with `active` status
  const filteredProducts = productData.filter((product) => product.active);

  // Mapping the filtered products to get only the id and name
  const products = filteredProducts.map((product) => ({
    id: product.id,
    name: product.name,
    image : product.images
  }));

  return NextResponse.json( products , {status : 200} );
}
