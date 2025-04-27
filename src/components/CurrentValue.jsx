import React from 'react';
import { useEffect, useState } from 'react';
import './CurrentValue.css';
import { InsertCoinValue, GetCoinValue } from '../controller/TicketsJiraController';

export function CurrentValue({ setBitcoinValue, date }) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        const fetchCoinValue = async () => {
            let valor = await GetCoinValue("Bitcoin", date);
            setValue(valor.value);
            setBitcoinValue(valor.value);
        };
        fetchCoinValue();
    }, [date, setBitcoinValue]);

    return (
        <div className="CurrentValueContainer">
            <h2>$ {value}</h2> {/* Mostrar valor actualizado */}
        </div>
    );
}

export default CurrentValue;
