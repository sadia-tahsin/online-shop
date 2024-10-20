'use client'
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { addItem, CartItem } from "@/redux/store/cartSlice";
import { product } from "@/types";
import React from "react";
import { useDispatch } from "react-redux";

const AddToCart = ({ product }: { product: product }) => {
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    toast({
        description:"Item added successfully",
        variant:"success"
      }) 
    dispatch(addItem(product));
  };
  return (
    <Button
      className="mt-6"
      onClick={() => {
        addToCartHandler();
      }}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCart;