import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// dummy form body
const body = {
  name: "Bishwas",
  email: "koiralabishwas257@gmail.com",
  phone: "080-3511-8306",
  address: {
    country: "jp",
    postal_code: "244-0805",
    city: "神奈川県",
    line1: "横浜市戸塚区川上町",
    line2: "川上団地6棟203",
  },
  product_id : "prod_Q2GxSqbpfzdba4",
  price : 9999
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest, res: NextResponse) {

  // first need to await body
  const newCustomer = await stripe.customers.create({
    name : body.name,
    email : body.email,
    phone : body.phone,
    address : {
      country : body.address.country,
      postal_code : body.address.postal_code,
      city : body.address.city,
      line1 : body.address.line1,
      line2 : body.address.line2
    }
  });
  const createdCustomer = await stripe.customers.retrieve(newCustomer.id);

  // save the created customer id for later use
  const customerID = createdCustomer.id


  // create price of the selected product
  const donationAmount =  await stripe.prices.create({
    product : body.product_id,
    currency : 'jpy',
    unit_amount : body.price,
  })

  const createdAmount = await stripe.prices.retrieve(donationAmount.id)
  
  // save the created priceID here
  const priceID = createdAmount.id

  //
  const creteInvoiceItems = stripe.invoiceItems.create({
    customer : customerID,
    price : priceID
  })
  
  // create invoice 
  const createInvoice = stripe.invoices.create({
    customer : customerID,
    pending_invoice_items_behavior : "include"
    
  })
  




  return NextResponse.json({ newCustomer, createdCustomer , customerID , donationAmount , createdAmount , priceID , createInvoice });
}
