// "use client";
// import { Button } from "@/components/ui/button";
// import { addItem, CartItem, removeItem } from "@/redux/store/cartSlice";
// import { RootState } from "@/redux/store/store";
// import { useUser } from "@clerk/nextjs";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";

// const page = () => {
//   const dispatch = useDispatch()  
//   //Get cart items
//   const items = useSelector((state: RootState) => state.cart.items);
//   // calculating total quantity
//   const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
//   // calculate the total price
//   const totalPrice = items.reduce(
//     (totalPrice, item) => totalPrice + item.price * item.quantity,
//     0
//   );
//   // vat 5%
//   const vat = (+totalPrice * 0.15).toFixed(2);

//   const totalPriceWithVAT = (totalPrice + +vat).toFixed(2);

//   //get true user
//   const { user } = useUser();

//   //add item
//   const addItemHandler = (item: CartItem) =>{
//     dispatch(addItem(item))
//   } 
//  //remove item 
//  const removItemHandler =  (id: number) =>{
//     dispatch(removeItem({
//         id,
//         title: "",
//         price: 0,
//         description: "",
//         category: "",
//         image: "",
//         rating: {
//             rate: 0,
//             count: 0
//         }
//     }))
//   } 
//   return (
//     <div className="mt-8 min-h-[60vh] flex">
//       {items.length == 0 && (
//         <div className="flex items-center w-full h-[80vh] flex-col justify-center">
//           <Image
//             src="/images/cart.svg"
//             alt="empty-cart"
//             width={400}
//             height={400}
//             className="object-cover mx-auto"
//           />
//           <h1 className="mt-8 font-semibold text-2xl">The cart is empty.</h1>
//           <Link href="/">
//             <Button>Shop now</Button>
//           </Link>
//         </div>
//       )}
//       {items.length > 0 && (
//         <div className="md:w-4/5 w-[95%] mx-auto grid grid-cols-1 xl:grid-cols-6 gap-12">
//           <div className="rounded-lg shadow-md overflow-hidden xl:col-span-4">
//             <h1 className="p-4 text-xl sm:text-2xl md:text-3xl font-bold text-white bg-blue-700">
//               {totalQuantity} Items
//             </h1>
//             {items.map((item) => {
//               return (
//                 <div key={item.id}>
//                   <div className="flex pb-6 mt-2 p-5 border-b-[1.5px] border-opacity-25 border-gray-700 items-center space-x-10">
//                     <div>
//                       <Image
//                         src={item.image}
//                         alt={item.title}
//                         width={180}
//                         height={180}
//                       />
//                     </div>
//                     <div>
//                       <h1 className="md:text-xl text-base font-bold text-black">
//                         {item.title}
//                       </h1>
//                       <h1 className="md:text-lg text-sm font-semibold ">
//                         Category: {item.category}
//                       </h1>

//                       <h1 className="md:text-lg text-sm font-semibold text-black">
//                         Quantity: {item.quantity}
//                       </h1>
//                       <h1 className="md:text-2xl text-base font-bold text-blue-950">
//                         ${item.price}
//                       </h1>
//                       <div className="flex items-center mt-4 space-x-2">
//                         <Button>Add More</Button>
//                         <Button variant={"destructive"}>Remove</Button>
//                       </div>
//                     </div>
//                   </div>
                 
//                 </div>
                
              
//             );
//             })}
//           </div>
//           {/* // cart summary */}
//           <div className="xl:col-span-2">
//             <div className="bg-indigo-950 sticky top-[25vh] p-6 rounded-lg">
//               <h1 className="text-center mt-8 mb-8 text-white text-3xl font-semibold ">
//                 Summary{" "}
//               </h1>
//               <div className="w-full h-[1.2px] bg-white bg-opacity-20"></div>
//               <div className="flex mt-4 text-xl uppercase font-semibold text-white items-center justify-between">
//                 <span>Subtotal</span>
//                 <span>${totalPrice}</span>
//               </div>
//               <div className="flex mt-10 mb-10 text-xl uppercase font-semibold text-white items-center justify-between">
//                 <span>VAT</span>
//                 <span>${vat}</span>
//               </div>
//               <div className="flex mt-6 text-xl uppercase font-semibold text-white items-center justify-between">
//                 <span>Shipping</span>
//                 <span>FREE</span>
//               </div>
//               <div className="w-full h-[1.2px] bg-white bg-opacity-20"></div>
//               <div className="flex mt-6 mb-6 text-xl uppercase font-semibold text-white items-center justify-between">
//                 <span>Total</span>
//                 <span>${totalPriceWithVAT}</span>
//               </div>

//               {!user && (
//                 <Link href="/sign-in">
//                   <Button className="bg-orange-600 w-full" onClick={()=>{addItemHandler(item)}}>
//                     {" "}
//                     Sign In to Checkout{" "}
//                   </Button>
//                 </Link>
//               )}
//               {user && (
//                 <Link href="/checkout"><Button className="bg-orange-600 w-full">
//                 Buy Now</Button>
//                 </Link>)}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default page;
// app/cart/page.tsx
"use client"; // This page uses client-side logic

import { Button } from "@/components/ui/button";
import { addItem, removeItem } from "@/redux/store/cartSlice";
import { RootState } from "@/redux/store/store";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutForm from "@/components/Helpers/CheckoutForm";

const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );
  const vat = (totalPrice * 0.15).toFixed(2);
  const totalPriceWithVAT = (totalPrice + +vat).toFixed(2);
  
  const { user } = useUser();

  return (
    <div className="mt-8 min-h-[60vh] flex">
      {items.length === 0 ? (
        <div className="flex items-center w-full h-[80vh] flex-col justify-center">
          <Image src="/images/cart.svg" alt="empty-cart" width={400} height={400} />
          <h1 className="mt-8 font-semibold text-2xl">The cart is empty.</h1>
          <Link href="/">
            <Button>Shop now</Button>
          </Link>
        </div>
      ) : (
        <div>
          <h1>{totalQuantity} Items in Cart</h1>
          <div>
            {items.map((item) => (
              <div key={item.id}>
                <h1>{item.title}</h1>
                <h1>Price: ${item.price}</h1>
                <h1>Quantity: {item.quantity}</h1>
              </div>
            ))}
          </div>
          <h2>Total Price: ${totalPriceWithVAT}</h2>
          {user ? (
            <CheckoutForm
              cartItems={items.map((item) => ({
                price_data: {
                  currency: 'usd',
                  product_data: {
                    name: item.title,
                  },
                  unit_amount: item.price * 100, // Convert to cents
                },
                quantity: item.quantity,
              }))}
            />
          ) : (
            <Link href="/sign-in">
              <Button>Sign In to Checkout</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
