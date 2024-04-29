import { TextField } from '@mui/material';
import React, { useState } from 'react';

const Dummy = () => {

  const sampleData = [
    // Example data rows
    { id: 1, name: 'John Doe', details: 'Details 1', date: '2024-03-27' },
    { id: 2, name: 'Jane Doe', details: 'Details 2', date: '2024-03-28' },
    // Add more rows as needed
];

// Define table columns
const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Details', accessor: 'details' },
    { header: 'Date', accessor: 'date' },
    // Add more columns as needed
];
return (
  <table>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {sampleData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column, columnIndex) => (
                            <td key={columnIndex}>
                                {column.Cell ? <column.Cell value={row[column.accessor]} /> : row[column.accessor]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
)
}

export default Dummy;
