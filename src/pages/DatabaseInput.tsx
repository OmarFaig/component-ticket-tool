import React, { useRef, useState } from 'react';
import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";
import 'jspreadsheet-ce/dist/jspreadsheet.themes.css';

export default function DataBaseInput() {
    const spreadsheet = useRef(null);
    const [data, setData] = useState([
        ['Project1', 'Type1', 'Component1', 'Description1'],
        ['Project2', 'Type2', 'Component2', 'Description2'],
        // Add more initial data as needed
    ]);

    const handleSave = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/save-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data }),
            });
            if (response.ok) {
                alert('Data saved successfully!');
            } else {
                alert('Failed to save data.');
            }
        } catch (error) {
            console.error('Error saving data:', error);
            alert('Error saving data.');
        }
    };

    return (
        <div className="spreadsheet-container">
            <button onClick={handleSave}>Save</button>
            <Spreadsheet
                ref={spreadsheet}
                tabs={false}
                toolbar={false}
                data={data}
                onChange={(instance, cell, row, x, y, value) => {
                    const newData = [...data];
                    newData[y][x] = value;
                    setData(newData);
                }}
                columns={[
                    { title: 'ProjectName', width: 200 },
                    { title: 'ComponentType', width: 200 },
                    { title: 'ComponentName', width: 200 },
                    { title: 'ComponentDescription', width: 300 },
                ]}
            >
                <Worksheet minDimensions={[10, 10]} />
            </Spreadsheet>
        </div>
    );
}
