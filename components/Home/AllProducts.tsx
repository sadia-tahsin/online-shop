'use client'
import { getAllProducts } from '@/requests/requests';
import { product } from '@/types';
import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const AllProducts = () => {
    const [products, setProducts] = useState<product[]|null>(null)
    const [loading, setLoading] = useState(true)
    console.log(products)
   useEffect(()=>{
    const getData = async()=>{
        setLoading(true)
        try{
            const products:product[] = await getAllProducts()
            setProducts(products)
           
    } 
    catch(err){
        console.log(err)
    }
    finally{
        setLoading(false)
    }
}

getData()

},[])
    return (
        <div className='pt-16 pb-12'>
            <h1 className="text-center font-bold text-2xl lg:text-4xl">
                All Products
            </h1>
            {loading?(
                <div className='flex justify-center items-center mt-16'>
                    <Loader size={32} className='animate-spin'></Loader>
                </div>
            ):( <div className="w-[90%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 mx-auto">
                {products?.map((p)=>{
                    return <ProductCard key={p.id} product={p}
                    ></ProductCard>
                })}
            </div>)}
        </div>
    );
};

export default AllProducts;