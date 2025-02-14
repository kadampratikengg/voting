import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelUpload = () => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.xlsx')) {
      setFile(file);
      readExcelFile(file);
    } else {
      setErrorMessage('Please upload a valid Excel file (.xlsx)');
      setData([]);
    }
  };

  // Read and parse the Excel file
  const readExcelFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const ab = e.target.result;
      const wb = XLSX.read(ab, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]]; // Get the first sheet
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

      // Check if the first row matches expected columns
      const requiredColumns = ['Roll Number', 'Name', 'Photo'];
      const fileColumns = jsonData[0];

      const isValid = requiredColumns.every(
        (col) => fileColumns.includes(col)
      );

      if (isValid) {
        setErrorMessage('');
        setData(jsonData);
      } else {
        setErrorMessage('Invalid columns! Please ensure the file contains "Roll Number", "Name", and "Photo".');
        setData([]);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileUpload}
      />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {data.length > 0 && (
        <>
          <table border="1">
            <thead>
              <tr>
                {data[0].map((col, idx) => (
                  <th key={idx}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ExcelUpload;
