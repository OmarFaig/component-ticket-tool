import React, { useRef, useState, useEffect } from 'react';
import { Spreadsheet, Worksheet } from '@jspreadsheet-ce/react';
import 'jsuites/dist/jsuites.css';
import 'jspreadsheet-ce/dist/jspreadsheet.css';

export default function CreateTickets() {
    const spreadsheetRef = useRef(null);
    const [data, setData] = useState([[]]);
    const [dropdownValues, setDropdownValues] = useState({
        projects: [],
        componentTypes: [],
        componentNames: [],
        descriptions: [],
        locations: [],
    });
    const [isLoading, setIsLoading] = useState(true);
    const [selectedValues, setSelectedValues] = useState({
        project: '',
        componentType: '',
    });

    const fetchDropdownValues = async (filters = {}) => {
        setIsLoading(true);
        try {
            let url = 'http://localhost:3001/api/dropdown-values';
            const params = new URLSearchParams();
            if (filters.project) {
                params.append('project', filters.project);
            }
            if (filters.componentType) {
                params.append('componentType', filters.componentType);
            }
            if (params.toString()) {
                url += '?' + params.toString();
            }
            const response = await fetch(url);
            const fetchedData = await response.json();
            console.log('Received dropdown values:', fetchedData);
            setDropdownValues(fetchedData);
        } catch (error) {
            console.error('Error fetching dropdown values:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDropdownValues();
    }, []);

    const handleProjectChange = (value) => {
        setSelectedValues((prev) => ({ ...prev, project: value, componentType: '' }));
        fetchDropdownValues({ project: value });
    };

    const handleComponentTypeChange = (value) => {
        setSelectedValues((prev) => ({ ...prev, componentType: value }));
        fetchDropdownValues({ project: selectedValues.project, componentType: value });
    };

    const handleCreateTickets = async () => {
        console.log("Creating tickets with data:", data);
        try {
            const filteredData = data.filter(row => row[0] && row[1] && row[2] && row[3]);
            const response = await fetch('http://localhost:3001/api/create-tickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: filteredData }),
            });
            if (response.ok) {
                alert('Tickets created successfully!');
            } else {
                alert('Failed to create tickets.');
            }
        } catch (error) {
            console.error('Error creating tickets:', error);
            alert('Error creating tickets.');
        }
    };

    const columns = [
        {
            type: 'dropdown',
            title: 'Project Name*',
            tooltip: 'Choose a project name',
            source: dropdownValues.projects,
            width: '300px',
            onChange: (instance, cell, value, row, col) => {
                handleProjectChange(value);
            },
        },
        {
            type: 'dropdown',
            title: 'Component Type*',
            tooltip: 'Choose a component type',
            source: dropdownValues.componentTypes,
            width: '220px',
            onChange: (instance, cell, value, row, col) => {
                handleComponentTypeChange(value);
            },
        },
        {
            type: 'dropdown',
            title: 'Component Name*',
            tooltip: 'Choose a component name',
            source: dropdownValues.componentNames,
            width: '220px',
        },
        {
            type: 'dropdown',
            title: 'Component Description*',
            tooltip: 'Choose a description',
            source: dropdownValues.descriptions,
            width: '220px',
        },
        {
            type: 'dropdown',
            title: 'Location *',
            tooltip: 'Choose a location',
            source: dropdownValues.locations,
            width: '220px',
        },
        {
            type: 'text',
            title: 'Assignee*',
            tooltip: 'Enter an assignee',
            width: '220px',
        },
    ];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="spreadsheet-container">
            <button onClick={handleCreateTickets}>Create Tickets</button>
            <Spreadsheet ref={spreadsheetRef}>
                <Worksheet minDimensions={[6, 30]} data={data} columns={columns} />
            </Spreadsheet>
        </div>
    );
}
