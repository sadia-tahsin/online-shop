import React from 'react';
import HeroSection from './HeroSection';
import Category from './Category';
import AllProducts from './AllProducts';

const HomePage = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <Category></Category>
            <AllProducts></AllProducts>
        </div>
    );
};

export default HomePage;