// // import { CheckoutForm } from "@/components/Helpers/CheckoutForm"


// // const CheckoutPage = () => {
    
// //     const priceId = 'price_1QC0QhJyvC3yWksihmME0UIF'

// //     return (
// //         <main>
// //             <div className="max-w-screen-lg mx-auto my-8">
// //               <CheckoutForm priceId={priceId}/>
// //             </div>
// //         </main>
// //     )
// // }

// // export default CheckoutPage
// import { CheckoutForm } from "@/components/Helpers/CheckoutForm";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store/store";
// import { CartItem } from "@/redux/store/cartSlice"; 
// const CheckoutPage = () => {
//   // Get cart items from the Redux store
//   const items = useSelector((state: RootState) => state.cart.items);

//   // Transform cart items into price data for Stripe if needed
//   const transformedItems = items.map((item: CartItem) => ({
//     price_data: {
//       currency: 'usd',
//       product_data: {
//         name: item.title, // Use product name dynamically
//       },
//       unit_amount: item.price * 100, // Stripe expects amounts in cents
//     },
//     quantity: item.quantity, // Quantity from cart
//   }));

//   return (
//     <main>
//       <div className="max-w-screen-lg mx-auto my-8">
//         {/* Pass cart items to CheckoutForm */}
//         <CheckoutForm cartItems={transformedItems} />
//       </div>
//     </main>
//   );
// };

// export default CheckoutPage;
'use client'
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import CheckoutForm from "@/components/Helpers/CheckoutForm";

const CheckoutPage = () => {
  // Get cart items from the Redux store
  const items = useSelector((state: RootState) => state.cart.items);

  // Transform cart items for Stripe
  const transformedItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.title, // Product name from your cart item
      },
      unit_amount: item.price * 100, // Price in cents
    },
    quantity: item.quantity, // Quantity from the cart
  }));

  return (
    <main>
      <div className="max-w-screen-lg mx-auto my-8">
        <CheckoutForm cartItems={transformedItems} />
      </div>
    </main>
  );
};

export default CheckoutPage;
