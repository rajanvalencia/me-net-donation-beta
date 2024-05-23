// TODO: add types
export const createPayment = async (data : any) => {
  const response = await fetch("/api/payment/create" , {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok)
    throw new Error(`HTTP error! status: ${response.status}`);

  // dont know the type of response so , Trpc is used to 連携
  return response.json()

}

// TODO: confirm payment

