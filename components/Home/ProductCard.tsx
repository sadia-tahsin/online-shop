'use client'
import { product } from '@/types';
import { HeartIcon, ShoppingBag, StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '@/redux/store/cartSlice';
import { RootState } from '@/redux/store/store';
import { useToast } from '@/hooks/use-toast';
type props = {
    product: product
}
const ProductCard = ({ product }: props) => {
    const num = Math.round(product.rating.rate);
    const ratingArray = new Array(num).fill(0);
    const {toast} = useToast()
    const dispatch = useDispatch()

    const addToCartHandler = (product:product)=>{
      toast({
        description:"Item added successfully",
        variant:"success"
      })  
      dispatch(addItem(product))
    }
    return (
      <div className='p-4 shadow-lg bg-white rounded-lg'>
      <div className='w-full h-auto'>
        <Image
          src={product.image}
          alt='img'
          width={200}
          height={150}
          className='w-full h-40 object-contain'
        />
        <p className='mt-5 text-xs capitalize text-gray-600'>{product.category}</p>
        <Link href={`/product/product-details/${product.id}`}>
          <h1 className='text-lg cursor-pointer hover:text-blue-900 transition-all sm:w-full sm:truncate text-black font-semibold mt-2'>
            {product.title}
          </h1>
        </Link>
        {/* rating */}
        <div className='flex items-center'>
            {ratingArray.map((x)=>{
              return <StarIcon key={Math.random()*100}
              size={16}
              fill='yellow'
              className='text-yellow-500'/>

            })}
        </div>
            {/* pricing */}
        <div className='flex mt-2 items-center space-x-2'>
          <p className='text-black text-base line-through font-semibold opacity-50'>
            {`$${(product.price+10).toFixed(2)}`}
          </p>
          <p className='text-black text-lg font-semibold opacity-80'>
            ${product.price}
          </p>
        </div>
        <div className='mt-4 flex space-x-2'>
          <Button onClick={()=>addToCartHandler(product)} size={"icon"}>
            <ShoppingBag size={16}></ShoppingBag>
          </Button>
          <Button size={"icon"} className='bg-red-400'>
            <HeartIcon size={16}></HeartIcon>
          </Button>
        </div>

      </div>
    </div>
    );
  };
  

export default ProductCard;