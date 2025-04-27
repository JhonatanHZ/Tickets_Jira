import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno

// Configuración de la conexión al pool de MySQL
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

// Configuración del servidor
const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

// Endpoint para verificar el estado del host
app.get("/CheckHostStatus", (req, res) => {
    res.sendStatus(200);
});

// Endpoint para insertar valores de monedas en la base de datos
app.post("/InsertCoinValue", async (req, res) => {
    const { name, date, value } = req.body;

    try {
        await pool.query(
            "INSERT INTO Coin_Values (Name, Date, Value) VALUES (?, ?, ?);",
            [name, date, value]
        );
        res.status(200).send("Inserción exitosa");
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            console.warn("Registro duplicado detectado:", error.message);
            res.status(409).send("Registro duplicado, operación ignorada");
        } else {
            console.error("Error al insertar la información de la moneda:", error);
            res.status(500).send("Error al insertar la información de la moneda");
        }
    }
});

app.post("/GetCoinValue", async (req, res) => {
    const { name, date} = req.body;
    console.log(date);

    try {
        let response = await pool.query(
            "SELECT VALUE FROM COIN_VALUES WHERE NAME = ? AND DATE = ?;",
            [name, date]
        );

        let responseObject = {
            value: response[0][0].VALUE
        }

        res.status(200).json(responseObject);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            console.warn("Registro duplicado detectado:", error.message);
            res.status(409).send("Registro duplicado, operación ignorada");
        } else {
            console.error("Error al insertar la información de la moneda:", error);
            res.status(500).send("Error al insertar la información de la moneda");
        }
    }
});