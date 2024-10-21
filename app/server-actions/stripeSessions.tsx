// "use server";

// import { Stripe } from "stripe";

// const apiKey = process.env.STRIPE_SECRET_KEY as string;

// const stripe = new Stripe(apiKey);

// interface NewSessionOptions {
//     priceId: string
// }

// export const postStripeSession = async ({priceId}: NewSessionOptions) => {
//     const returnUrl = 'http://localhost:3000/checkout-return?session_id={CHECKOUT_SESSION_ID}'

//     const session = await stripe.checkout.sessions.create({
//         ui_mode: "embedded",
//         line_items: [
//           {
//             price: priceId,
//             quantity: 1,
//           },
//         ],
//         mode: "payment",
//         return_url: returnUrl,
//       });

//       if(!session.client_secret) throw new Error('Error initiating Stripe session');

//       return {
//         clientSecret: session.client_secret
//       }
// }
"use server";

import { Stripe } from "stripe";

const apiKey = process.env.STRIPE_SECRET_KEY as string;

const stripe = new Stripe(apiKey);

interface CartItem {
  title: string;
  price: number;
  quantity: number;
}

interface NewSessionOptions {
  cartItems: CartItem[];  // Accept cart items instead of a single priceId
}

export const postStripeSession = async ({ cartItems }: NewSessionOptions) => {
  const returnUrl = 'http://localhost:3000/checkout-return?session_id={CHECKOUT_SESSION_ID}';

  // Map the cart items to Stripe's line_items structure
  const lineItems = cartItems.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.title,  // Use the product name dynamically
      },
      unit_amount: item.price * 100,  // Convert price to cents
    },
    quantity: item.quantity,  // Use the quantity from the cart
  }));

  // Create the checkout session dynamically based on the cart
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: lineItems,  // Pass the dynamic line_items array
    mode: "payment",
    success_url: returnUrl,
    cancel_url: returnUrl,
  });

  if (!session.client_secret) throw new Error('Error initiating Stripe session');

  return {
    clientSecret: session.client_secret,
  };
};
