import React from 'react';
import { useEffect, useState } from 'react';
import './CurrentValue.css'
import { InsertCoinValue } from '../controller/TicketsJiraController';
import Papa from 'papaparse';

export function CurrentValue({setBitcoinValue, date}){
    let value = 1000;
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
  
    const fileName = 'btcusd_1-min_data.csv';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(fileName);
                const reader = response.body.getReader();
                let chunks = '';
                
                // Leer todo el stream
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    chunks += new TextDecoder('utf-8').decode(value);
                }
                
                Papa.parse(chunks, {
                    header: true,
                    complete: (results) => {
                        setData(results.data);
                        
                        const filtered = results.data.filter(row => {
                            if (row.datetime) {
                                const date = new Date(row.datetime);
                                return date.getUTCHours() === 23 && date.getUTCMinutes() === 0;
                            }
                            return false;
                        });
                        
                        setFilteredData(filtered);
                        
                        filtered.forEach(row => {
                            if (row.datetime && row.High) {
                                const formattedDate = row.datetime.split(' ')[0];
                                console.log(`${formattedDate} ${row.High}`); 
                                InsertCoinValue("Bitcoin", formattedDate, parseFloat(row.High));
                            }
                        });                
                    },
                    error: (error) => {
                        console.error('Error al parsear CSV:', error);
                    }
                });
            } catch (error) {
                console.error('Error al cargar el archivo CSV:', error);
            }
        }
        fetchData();
        setBitcoinValue(value);
    }, [date]);

    return(
        <div className="CurrentValueContainer">
            <h2>$ {value}</h2>
        </div>
    );
}

export default CurrentValue;