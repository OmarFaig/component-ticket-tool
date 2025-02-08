import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fetch from 'node-fetch';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

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
            //console.log("Current row:", row);
            //console.log("Row length:", row.length);
            
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

app.post('/api/create-tickets', async (req, res) => {
    console.log("Received request to create tickets");

    const { data } = req.body;
    const jiraUrl = 'https://componentrequesttool.atlassian.net/rest/api/3/issue';
    const jiraAuth = `Basic ${Buffer.from(`${process.env.JIRA_MAIL}:${process.env.JIRA_TOKEN}`).toString('base64')}`;

    try {
        for (const row of data) {
            const [projectName, componentType, componentName, description, location, assignee] = row;

            const issueData = {
                fields: {
                    project: {
                        key: "KAN" // Replace with your project key
                    },
                    summary: `${componentName} - ${componentType}`,
                    description: {
                        type: "doc",
                        version: 1,
                        content: [
                            {
                                type: "paragraph",
                                content: [
                                    {
                                        type: "text",
                                        text: description
                                    }
                                ]
                            }
                        ]
                    },
                    issuetype: {
                        name: "Task"
                    },
                    customfield_10040: {
                        value: projectName
                    },
                    customfield_10038: componentName,
                    customfield_10037: {
                        value: componentType
                    }
                }
            };

            console.log("Creating issue with data:", issueData);

            const response = await fetch(jiraUrl, {
                method: 'POST',
                headers: {
                    'Authorization': jiraAuth,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(issueData)
            });

            if (!response.ok) {
                console.error('Failed to create ticket:', await response.text());
                return res.status(500).send('Failed to create some tickets');
            }
        }

        res.status(200).send('Tickets created successfully');
    } catch (error) {
        console.error('Error creating tickets:', error);
        res.status(500).send('Error creating tickets');
    }
});

app.get('/api/dropdown-values', async (req, res) => {
    console.log("Fetching dropdown values");
    try {
        const client = await pool.connect();
        
        const queryResult = await client.query(`
            SELECT 
                DISTINCT "ProjectName" as project,
                "ComponentType" as type,
                "ComponentName" as name,
                "ComponentDescription" as description
                
            FROM "Components"
            ORDER BY "ProjectName", "ComponentType", "ComponentName";
        `);
        
        const dropdownValues = {
            projects: [...new Set(queryResult.rows.map(row => row.project))],
            componentTypes: [...new Set(queryResult.rows.map(row => row.type))],
            componentNames: [...new Set(queryResult.rows.map(row => row.name))],
            descriptions: [...new Set(queryResult.rows.map(row => row.description))],
        };

        console.log("Sending dropdown values:", dropdownValues);
        client.release();
        res.json(dropdownValues);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error fetching dropdown values');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});