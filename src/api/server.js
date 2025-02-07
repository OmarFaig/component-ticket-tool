import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3001;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

app.post('/api/save-data', async (req, res) => {
    console.log("Received request to save data");

    const { data } = req.body;
    try {
        const client = await pool.connect();
        for (const row of data) {
            console.log("Current row:", row);
            console.log("Row length:", row.length);
            
            // Validate row length
            if (row.length !== 4) {
                console.error(`Invalid row length: ${row.length}, expected 4`);
                continue; // Skip invalid rows
            }

            await client.query(
                'INSERT INTO "Components" ("ProjectName", "ComponentType", "ComponentName", "ComponentDescription") VALUES ($1, $2, $3, $4)',
                row
            );
        }
        client.release();
        res.status(200).send('Data saved successfully');
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send('Error saving data');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});