import React from 'react'
import { useState } from 'react';
import './BitcoinCalculator.css'

export function BitcoinCalculator({investment, setInvestment, amountOfBitcoin, setAmountOfBitcoin, bitcoinValue}){
    
    const handleInvestmentChange = (event) => {
        const value = event.target.value;
        const bitcoinComputedValue = value / bitcoinValue; 
        console.log(bitcoinComputedValue); 
        setInvestment(value);
        setAmountOfBitcoin(bitcoinComputedValue);

    };
    

    const handleBitcoinChange = (event) =>{
        setInvestment(event.target.value * bitcoinValue);
        setAmountOfBitcoin(event.target.value);
    }

    return(
        <div className='InitialInvestment'>
            <div className="InputContainer">
                <img src="USD-Icon.png" width="60" height="55"/>
                <input className="MoneyInput"placeholder='0' value={investment} onChange={handleInvestmentChange} type="number" min="0"/>
            </div>
            <div className="InputContainer">
                <img src="bitcoin-btc-logo.png" width="45" height="45"/>
                <input className="MoneyInput" placeholder='0' value={amountOfBitcoin} onChange={handleBitcoinChange} type="number" min="0"/>
            </div>
        </div>
    );
}

export default BitcoinCalculator;