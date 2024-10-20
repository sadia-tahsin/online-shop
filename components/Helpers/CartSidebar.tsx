import { addItem, CartItem, removeItem } from "@/redux/store/cartSlice";
import Image from "next/image";

import React from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { read } from "fs";
import Link from "next/link";
type Props = {
  items: CartItem[];
};

const CartSidebar = ({ items }: Props) => {
const dispatch = useDispatch()
 const handleAddToCart = (item: CartItem)=>dispatch(addItem(item))
 const handleRemoveFromCart = (id: number)=>dispatch(removeItem({
   id,
   title: "",
   price: 0,
   description: "",
   category: "",
   image: "",
   rating: {
     rate: 0,
     count: 0
   }
 }))
 return (
    <div className="mt-6 h-full mb-6">
      <h1 className="text-center font-bold">Your cart</h1>
      {items.length == 0 && (
        <div className="flex items-center w-full h-[80vh] flex-col justify-center">
          <Image
            src="/images/cart.svg"
            alt="cart"
            width={200}
            height={200}
            className="object-cover mx-auto"
          />
          <h1>
            Your Cart is Empty
          </h1>
        </div>
      )}
      {items.length>0 && (
        <div>{
            items?.map((item) =>{
                return (<div key={item.id} className="pb-4 border-b-2 border-gray-300 border-opacity-60 p-4">
                    <Image src={item?.image} alt="image" width={60} height={60} className="object-cover mb-4"/>
                    <div>
                        <h1 className="text-sm w-4/5 font-semibold truncate">{item?.title}</h1>
                        <h1 className="text-base text-blue-950 font-bold">${(item?.price * item?.quantity)}</h1>
                        <h1 className="text-base font-bold mb-2">Quantity: {item?.quantity}</h1>
                    </div>
                    <div className="space-x-4">
                        <Button size={"sm"} onClick={()=>handleAddToCart(item)} >Add</Button>
                        <Button size={"sm"} variant={"destructive"} onClick={()=>{handleRemoveFromCart(item.id)}}>Remove</Button>
                    </div>
                    <Link href="/cart">
                    <Button className="w-full">
                       View Cart
                    </Button>
                    </Link>
                    
                </div>)
            })
            }</div>
      )}
    </div>
  );
};

export default CartSidebar;
