'use client'
import { RootState } from '@/redux/store/store';
import {  ShoppingBagIcon} from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import CartSidebar from './CartSidebar';

const ShoppingCart = () => {
    const items = useSelector((state : RootState)=>state.cart.items
)
const totalQuantity = items.reduce((total,item)=>total+item.quantity,0)
console.log(items)
    return (
    <Sheet>
        <SheetTrigger>
        <div className='relative' >
            <span className='absolute -top-3 -right-2 w-6 h-6 bg-red-600 text-center text-s rounded-full text-white '>{totalQuantity}</span>
            <ShoppingBagIcon cursor={"pointer"} size={26}></ShoppingBagIcon>
            
        </div>
        </SheetTrigger>
      <SheetContent>
       <CartSidebar items={items}></CartSidebar>
        </SheetContent>  
    </Sheet>
    );
};

export default ShoppingCart;