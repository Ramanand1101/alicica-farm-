const express = require('express');
const exceljs = require('exceljs');
const fs = require('fs');

const queryRouter = express.Router()

// Serve static files from the 'public' directory
queryRouter.use(express.static('public'));

// Function to append data to an Excel worksheet
function appendDataToWorksheet(worksheet, data) {
  const headers = Object.keys(data[0]);

  // Add headers if the worksheet is empty
  if (worksheet.rowCount === 1) {
    worksheet.addRow(headers);
  }

  // Add data rows to the worksheet
  data.forEach((row) => {
    const values = headers.map((header) => row[header]);
    worksheet.addRow(values);
  });
}

// Route to export data to an Excel file
queryRouter.post('/export', async (req, res) => {
  const customerData = [req.body];
  console.log('Received customer data:', customerData);

  const filename = 'sampleData.xlsx';
  let workbook = new exceljs.Workbook();
  let worksheet;

  try {
    // Check if the file exists, then read or create a new worksheet accordingly
    if (fs.existsSync(filename)) {
      workbook = await workbook.xlsx.readFile(filename);
      worksheet = workbook.getWorksheet(1);
    } else {
      worksheet = workbook.addWorksheet('Sheet 1');
      // Add headers assuming each customer object has the same structure
      const headers = Object.keys(customerData[0]);
      worksheet.addRow(headers);
    }

    // Append customer data to the worksheet
    appendDataToWorksheet(worksheet, customerData);

    // Write the workbook to the Excel file
    await workbook.xlsx.writeFile(filename);

    res.status(200).send('Data exported successfully!');
  } catch (err) {
    console.error('Error exporting data:', err);
    res.status(500).send('Error exporting data');
  }
});

// Route to get data from the Excel file
queryRouter.get('/getData', async (req, res) => {
  const filename = 'sampleData.xlsx';

  try {
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(filename);
    const worksheet = workbook.getWorksheet(1);

    const data = [];

    // Iterate through each row and construct data objects
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber !== 1) {
        const rowData = {};
        row.eachCell((cell, colNumber) => {
          const header = worksheet.getRow(1).getCell(colNumber).value;
          const value = header === 'date' ? formatDate(cell.value) : cell.value;
          rowData[header] = value;

        });
        console.log(rowData)
        // Include customer ID in the response
        rowData['customerId'] = row.getCell(2).value;

        data.push(rowData);
      }
    });

    res.status(200).json(data);
  } catch (err) {
    console.error('Error reading data:', err);
    res.status(500).send('Error reading data');
  }
});

// Route to delete data based on customer ID
queryRouter.delete('/delete/:customerId', async (req, res) => {
  const customerId = req.params.customerId;
  const filename = 'sampleData.xlsx';

  try {
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(filename);
    const worksheet = workbook.getWorksheet(1);

    const rowsToDelete = [];

    // Find rows to delete based on customer ID
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber !== 1 && row.getCell(2).value === customerId) {
        rowsToDelete.push(rowNumber);
      }
    });

    // Delete rows from the worksheet
    rowsToDelete.forEach((rowNumber) => {
      worksheet.spliceRows(rowNumber, 1);
    });

    // Write the updated workbook to the Excel file
    await workbook.xlsx.writeFile(filename);

    res.status(200).send('Data deleted successfully!');
  } catch (err) {
    console.error('Error deleting data:', err);
    res.status(500).send('Error deleting data');
  }
});

// Function to format dates
function formatDate(date) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}

// Exporting the queryRouter for usage in other files
module.exports = {
  queryRouter
};