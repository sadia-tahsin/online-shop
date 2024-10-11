import { ShoppingBag, ShoppingBagIcon} from 'lucide-react';
import React from 'react';

const ShoppingCart = () => {
    return (
        <div className='relative' >
            <span className='absolute -top-3 -right-2 w-6 h-6 bg-red-600 text-center text-s rounded-full text-white '>0</span>
            <ShoppingBagIcon cursor={"pointer"} size={26}></ShoppingBagIcon>
            
        </div>
    );
};

export default ShoppingCart;