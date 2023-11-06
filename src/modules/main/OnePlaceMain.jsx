import React from 'react';
import Header from './components/header/Header';
import Banner1 from './components/banner1/Banner1';
import Banner2 from './components/banner2/Banner2';
import SpecialOffers from './components/special_offers/SpecialOffers';
import BestChoice from './components/bestChoice/bestChoice';

const OnePlaceMain = () => {
    return (
        <div>
        <Header/>
        <Banner1/>
        <BestChoice/>
        <Banner2/>
        <SpecialOffers/>
        </div>
    )
}

export default OnePlaceMain;