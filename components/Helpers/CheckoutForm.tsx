// 'use client'
// import React, { useCallback, useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//     EmbeddedCheckoutProvider,
//     EmbeddedCheckout,
// } from "@stripe/react-stripe-js";
// import { postStripeSession } from "@/app/server-actions/stripeSessions";



// const stripePromise = loadStripe(
//     process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
// );

// export const CheckoutForm = ({ priceId }: { priceId: string }) => {
//     const fetchClientSecret = useCallback(async () => {
//         const stripeResponse = await postStripeSession({ priceId });
//         return stripeResponse.clientSecret;
//     }, [priceId]);

//     const options = { fetchClientSecret };

//     return (
//         <div id="checkout">
//             <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
//                 <EmbeddedCheckout />
//             </EmbeddedCheckoutProvider>
//         </div>
//     )
// }
// components/Helpers/CheckoutForm.tsx
// components/Helpers/CheckoutForm.tsx
"use client"; // This component uses client-side logic
// components/Helpers/CheckoutForm.tsx
"use client"; // This component uses client-side logic

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button"; // Adjust the import based on your Button component path

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

interface CheckoutFormProps {
  cartItems: {
    price_data: {
      currency: string;
      product_data: {
        name: string;
      };
      unit_amount: number; // Amount in cents
    };
    quantity: number; // Quantity of the product
  }[];
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ cartItems }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    const response = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems }), // Ensure correct structure
    });

    const session = await response.json();

    if (session.error) {
      console.error("Error:", session.error);
      alert("An error occurred: " + session.error);
      setLoading(false);
      return;
    }

    // Redirect to Checkout
    const result = await stripe?.redirectToCheckout({ sessionId: session.id });
    if (result?.error) {
      console.error("Error:", result.error.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <Button onClick={handleCheckout} disabled={loading} className="bg-orange-600 w-full">
        {loading ? "Processing..." : "Checkout"}
      </Button>
    </div>
  );
};

export default CheckoutForm;
