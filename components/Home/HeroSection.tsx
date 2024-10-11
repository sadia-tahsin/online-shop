import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';

const HeroSection = () => {
    return (
        <div className='flex flex-col w-full h-[calc(100vh-12vh)] justify-center'>
            <div className='w-4/5 mx-auto grid  items-center grid-cols-1 md:grid-cols-2 gap-12'>
                <div>
                    <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl text-black font-bold uppercase'>
                        mega sale <span className='text-rose-600'>special</span> offer upto {" "}<span className='text-orange-500'>60%</span> off

                    </h1>
                    <p className='text-sm md:text-base lg:text-lg text-black text-poacity-70 mt-4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure, corrupti. Laborum 
                        et natus quidem eos quia odio facilis culpa sequi numquam recusandae necessitatibus quam aliquid, fugiat, quasi quis impedit harum!</p>
                    <div className='flex space-x-4 items-center mt-6 '>
                        <Button className='bg-blue-500'>Shop Now</Button>
                        <Button>Explore More</Button>
                    </div>
                </div>
                <div className='hidden lg:block'>
                    <Image src="/images/hero.svg" alt='hero' width={600} height={600} className='lg:h-[50%] lg:w-[50%] xl:w-[80%] xl:h-[80%]'/>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;