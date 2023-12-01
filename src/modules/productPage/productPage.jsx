import React , {useState} from 'react'

import Header from '../main/components/header/Header';
import Footer from '../main/components/footer/Footer';
import ProductInfo from './product-info/productInfo';

const ProductPage = () => {
    return(
        <div>
            <Header/>
            <ProductInfo/>
            <Footer/>
        </div>
    )
}

export default ProductPage