import React, { useRef, useState, useEffect } from 'react';

import { Spreadsheet, Worksheet } from "@jspreadsheet-ce/react";

import "jspreadsheet-ce/dist/jspreadsheet.css";
import "jsuites/dist/jsuites.css";

export default function CreateComponentRequest() {
    const spreadsheetRef = useRef();
    const [data, setData] = useState([[]]);
    const [dropdownValues, setDropdownValues] = useState({
        projects: [],
        componentTypes: [],
        componentNames: [],
        descriptions: [],
        locations: [],
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDropdownValues();
    }, []);

    const fetchDropdownValues = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3001/api/dropdown-values');
            const fetchedData = await response.json();
            console.log("Received dropdown values:", fetchedData);
            setDropdownValues(fetchedData);
        } catch (error) {
            console.error('Error fetching dropdown values:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const columns = [
        {
            type: 'dropdown',
            title: 'Project Name*',
            tooltip: 'Choose a project name',
            source: dropdownValues.projects || [],
            width: '300px',
        },
        {
            type: 'dropdown',
            title: 'Component Type*',
            tooltip: 'Choose a component type',
            source: dropdownValues.componentTypes || [],
            width: '220px',
        },
        {
            type: 'dropdown',
            title: 'Component Name*',
            tooltip: 'Choose a component name',
            source: dropdownValues.componentNames || [],
            width: '220px'
        },
        {
            type: 'dropdown',
            title: 'Component Description*',
            tooltip: 'Choose a description',
            source: dropdownValues.descriptions || [],
            width: '220px'
        },
        {
            type: 'dropdown',
            title: 'Location *',
            tooltip: 'Choose a location',
            source: dropdownValues.locations || [],
            width: '220px'
        },
        {
            type: 'text',
            title: 'Assignee*',
            tooltip: 'Enter an assignee',
            width: '220px'
        }
    ];

    return (
        <div className="spreadsheet-container">
            <button>Create Tickets</button>
            <>
                <Spreadsheet 
                    ref={spreadsheetRef}
                >
                    <Worksheet 
                        minDimensions={[6,30]} 
                        data={data}
                        columns={columns} 
                    />
                </Spreadsheet>
            </>
        </div>
    );
}
