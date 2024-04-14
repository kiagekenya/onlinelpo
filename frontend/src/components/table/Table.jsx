import React from 'react'



const Table = ({ rows, columns, position }) => {
    const cellStyle = {
      border: '1px solid black',
      padding: '8px',
    };
  
    const headerCellStyle = {
      ...cellStyle,
      fontWeight: 'bold',
      backgroundColor: 'lightgray',
    };
    return (
        <table style={{ position: 'absolute', ...position }}>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} style={headerCellStyle}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} style={cellStyle}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    };

export default Table