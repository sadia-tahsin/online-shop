// import { NextResponse } from 'next/server';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'payment',
//       line_items: body.items.map((item: any) => ({
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: item.name,
//           },
//           unit_amount: item.price * 100,
//         },
//         quantity: item.quantity,
//       })),
//       success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success`,
//       cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/cancel`,
//     });

//     return NextResponse.json({ id: session.id });
//   } catch (error) {
//     console.error('Error creating checkout session:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }
"use server"
import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

const apiKey = process.env.STRIPE_SECRET_KEY as string;
const stripe = new Stripe(apiKey);

// Define the interface for a single cart item
interface CartItem {
  price_data: {
    currency: string;
    product_data: {
      name: string;
    };
    unit_amount: number; // Amount in cents
  };
  quantity: number; // Quantity of the product
}

// Define the interface for the session options
interface NewSessionOptions {
  cartItems: CartItem[];
}

// Export the POST request handler
export async function POST(req: Request) {
  try {
    // Ensure correct type is inferred from the request
    const { cartItems }: NewSessionOptions = await req.json(); // Parse incoming JSON

    // Create a new Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItems.map(item => ({
        price_data: item.price_data, // Use the price_data from each cart item
        quantity: item.quantity, // Quantity from each cart item
      })),
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}`,
    });

    // Return the session ID to the client
    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 });
  }
}
