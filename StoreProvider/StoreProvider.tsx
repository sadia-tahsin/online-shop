'use client'
import store from '@/redux/store/store';
import React from 'react';
import {Provider} from 'react-redux'
const StoreProvider = ({children}:{children:React.ReactNode}) => {
    return (
       <Provider store={store}>{children}</Provider>
    );
};

export default StoreProvider;