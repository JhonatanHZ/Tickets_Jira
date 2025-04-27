export async function InsertCoinValue(name, date, value) {
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, date, value })
    };

    try {
        const response = await fetch('http://localhost:3000/InsertCoinValue', params);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error inserting coin info:", error);
        return []; // Devuelve un arreglo vacío en caso de error
    }
}

export async function GetCoinValue(name, date){
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, date })
    };

    try {
        const response = await fetch('http://localhost:3000/GetCoinValue', params);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching coin info:", error);
        return []; // Devuelve un arreglo vacío en caso de error
    }
}