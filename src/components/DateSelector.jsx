import React from 'react'
import { useState } from 'react';
import './DateSelector.css';

export function DateSelector({selectedDate, setSelectedDate}){
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };    
    
    return(
        <input className='DateSelectorInput' type="date" value={selectedDate} onChange={handleDateChange}/>
    );
}

export default DateSelector;