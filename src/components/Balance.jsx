import React, { useState, useEffect } from 'react';
import './Balance.css';

export default function Balance({ bitcoinOldValue, bitcoinValue, btc }) {
    const [balance, setBalance] = useState(0);
    const [profitLossPercentage, setProfitLossPercentage] = useState(0);
    const [imgURL, setImgURL] = useState('NoChange.png');
    const [profitLoss, setProfitLoss] = useState(null);

    useEffect(() => {
        setBalance(btc * bitcoinValue);

        // Calcular y establecer el porcentaje de ganancia/pérdida con dos decimales
        const percentage = ((Math.abs(bitcoinOldValue - bitcoinValue) / bitcoinOldValue) * 100).toFixed(2);
        setProfitLossPercentage(percentage);

        if (bitcoinOldValue < bitcoinValue) {
            setImgURL('profitArrow.png');
            setProfitLoss('ProfitText');
        } else if (bitcoinOldValue > bitcoinValue) {
            setImgURL('lossArrow.png');
            setProfitLoss('LossText');
        } else {
            setImgURL('NoChange.png');
            setProfitLoss('NoChangeText');
        }
    }, [bitcoinOldValue, bitcoinValue, btc]);

    return (
        <div className='Balance'>
            <img id="IconoDolar" src="USD-Icon.png" width="55" height="49" />
            <h2 className={profitLoss}>{balance}</h2>
            <img id="ProfitLoss" src={imgURL} width="55" height="49" />
            <p className={profitLoss}>{profitLossPercentage}%</p>
        </div>
    );
}
