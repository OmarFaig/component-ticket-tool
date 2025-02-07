import React, { useRef, useState, useEffect } from 'react';
import { Spreadsheet, Worksheet ,jspreadsheet} from "@jspreadsheet-ce/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet-ce/dist/jspreadsheet.css";
import 'jspreadsheet-ce/dist/jspreadsheet.themes.css';

export default function DataBaseInput() {
    // Spreadsheet array of worksheets
    const spreadsheet = useRef();
    const select = useRef();
     // Columns settings
     const columns = [
        {
            type: 'Text',
            title: 'ProjectName*',
            tooltip: 'Choose a project name',
            width: '300px',
        },
        {
            type: 'Text',
            title: 'CopmponentType*',
            tooltip: 'Choose a component name',
            width: '200px',
        
        },
        {
            type: 'Text',
            title: 'CopmponentName*',
            tooltip: 'Choose a component type',
            width: '200px'
        },
        {
            type: 'Text',
            title: 'ComponentDescription*',
            tooltip: 'Add a component description',
            width: '200px'
        }
    ];

    const [data, setData] = useState([[]]);  // Initialize with empty row

    // Debug data changes
    useEffect(() => {
        console.log("Current data state:", data);
    }, [data]);

    const handleSave = async () => {
        try {
            // Filter out empty rows
            const filteredData = data.filter(row => row.some(cell => cell !== undefined && cell !== ''));
            console.log("Filtered data being sent:", filteredData);
            
            const response = await fetch('http://localhost:3001/api/save-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: filteredData }),
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
           <>
            <Spreadsheet ref={spreadsheet} >
               
            <Worksheet minDimensions={[4,30]} 
            data={data}
                columns={columns} 
                />

            </Spreadsheet>
          
        </>
        </div>
    );
}
