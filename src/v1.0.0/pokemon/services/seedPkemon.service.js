const fs = require('fs');
const es = require('event-stream');
const ExcelJS = require('exceljs');
const { ErrorException } = require('../../../helpers/errorsHandler/ErrorException');
const { bulkPokemonInsert } = require('./pokemon.service');
const { adjustHeadersKeys } = require('../utilities/header.utility');

const filePath = './public/tempPokemon_Go.CSV';
const chunkSize = 5000;
const pauseDuration = 5000; // 5 seconds in milliseconds
let headers = []; // To store the row headers

async function processLine(line) {
  const rowData = line.split(',');
  const rowDataWithHeaders = {};
  headers.forEach((header, i) => {
    if (rowData[i] === '') rowDataWithHeaders[header] = undefined;
    else if (!isNaN(rowData[i])) rowDataWithHeaders[header] = parseInt(rowData[i], 10);
    else rowDataWithHeaders[header] = rowData[i];
  });
  return rowDataWithHeaders;
}
function processHeader(line) {
  headers = adjustHeadersKeys(line.split(','));
}

async function seedPokemon() {
  let lineNr = 0;
  const queue = [];
  const s = fs.createReadStream(filePath, { encoding: 'utf8', flag: 'r' });
  const lineStream = s.pipe(es.split());

  // reading while there is data
  lineStream.on('data', async (line) => {
    lineStream.pause();

    if (lineNr === 0) processHeader(line);
    else {
      const data = processLine(line);
      queue.push(data);

      if (queue.length >= chunkSize) {
        // Process the queue when it reaches the chunk size
        const dataChunk = await Promise.all(queue);
        await bulkPokemonInsert(dataChunk);
        queue.length = 0; // Clear the queue

        /**
         * Pause execution for the specified duration
         * to avoid creating big wave of writing in the DB
         */
        // eslint-disable-next-line no-promise-executor-return
        await new Promise((resolve) => setTimeout(resolve, pauseDuration));
      }
    }
    lineNr += 1;
    lineStream.resume();
  });

  // if error happened during streaming process
  lineStream.on('error', (err) => {
    throw new ErrorException('Error while reading file.', err);
  });

  // if the stream process is done
  lineStream.on('end', async () => {
    if (queue.length > 0) {
      // Process any remaining data in the queue
      const dataChunk = await Promise.all(queue);
      await bulkPokemonInsert(dataChunk);
    }
    fs.unlink(filePath, () => {});
  });
}

async function convertXlsxToCsv(inputFilePath, outputFilePath) {
  const workbook = new ExcelJS.Workbook();

  try {
    // Read the XLSX file
    await workbook.xlsx.readFile(inputFilePath);

    // Assuming you want to convert data from the first sheet
    const worksheet = workbook.getWorksheet(1);

    // Create an array to store CSV lines
    const csvData = [];
    // Iterate through rows in the worksheet
    worksheet.eachRow((row, rowNumber) => {
      // Create an array to store data for each row
      const rowData = [];
      // Iterate through cells in the row
      row.eachCell({ includeEmpty: true }, (cell, i) => {
        // eslint-disable-next-line no-unused-expressions
        i && rowData.push(cell.value !== null && cell.value !== undefined ? cell.value : '');
      });
      // Join the row data with commas to create a CSV line
      const csvLine = rowData.join(',');
      // Push the CSV line to the array
      csvData.push(csvLine);
    });

    // Join all CSV lines with newline characters
    const csvContent = csvData.join('\n');

    // Write the CSV data to a file
    fs.writeFileSync(outputFilePath, csvContent, 'utf8');

    // the the file is converted
    return true;
  } catch (error) {
    throw new Error(`Error converting XLSX to CSV: ${error.message}`);
  }
}

module.exports = { seedPokemon, convertXlsxToCsv };
