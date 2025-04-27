import React from 'react';
import './Main.css';
import { useState } from 'react';
import DateSelector from './DateSelector';
import CurrentValue from './CurrentValue';
import BitcoinCalculator from './BitcoinCalculator';
import Balance from './Balance';

export function Main(){
    const [initialDate, setInitialDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]); 
    const [investment, setInvestment] = useState(0);
    const [amountOfBitcoin, setAmountOfBitcoin] = useState(0);
    const [bitcoinValue, setBitcoinValue] = useState(0); 
    const [bitcoinOldValue, setBitcoinOldValue] = useState(0);

    return(
        <div className="Body">
            <h1>¡Bienvenido a Tickets Jira!</h1>
            <div className="Fecha" id="FechaInicial">
                <h2>Fecha inicial</h2>
                <DateSelector selectedDate={initialDate} setSelectedDate={setInitialDate}/>
            </div>
            <div className="ValorEnFecha" id="ValorFechaInicial">
                <h2>Valor en fecha</h2>
                <CurrentValue setBitcoinValue={setBitcoinOldValue} date={initialDate}/>
            </div>

            <div className='InitialInvestmentDiv'>
                <BitcoinCalculator investment={investment} setInvestment={setInvestment} amountOfBitcoin={amountOfBitcoin} setAmountOfBitcoin={setAmountOfBitcoin} bitcoinValue={bitcoinOldValue}/>
            </div>

            <div className="Fecha" id="FechaFinal">
                <h2>Fecha Final</h2>
                <DateSelector selectedDate={endDate} setSelectedDate={setEndDate}/>
            </div>
            <div className="ValorEnFecha" id="ValorFechaFinal">
                <h2>Valor en fecha</h2>
                <CurrentValue setBitcoinValue={setBitcoinValue} date={endDate}/>
            </div>

            <div className="BalanceContainer">
                <Balance bitcoinOldValue={bitcoinOldValue} bitcoinValue={bitcoinValue} btc={amountOfBitcoin}/>
            </div>
            
        </div>
    );
}

export default Main;