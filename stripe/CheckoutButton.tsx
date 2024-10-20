import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY as string);

const CheckoutButton = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    const response = await fetch('/api/checkout_sessions', {
      method: 'POST',
    });
    
    const session = await response.json();

    const result = await stripe?.redirectToCheckout({ sessionId: session.id });

    // TypeScript safe check for the error property
    if (result && result.error) {
      console.error('Error redirecting to checkout:', result.error.message);
    }

    setLoading(false);
  };

  return (
    <button onClick={handleCheckout} disabled={loading} className="bg-orange-600 w-full">
      {loading ? 'Loading...' : 'Checkout with Stripe'}
    </button>
  );
};

export default CheckoutButton;
