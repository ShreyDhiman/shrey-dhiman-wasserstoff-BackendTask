const fs = require("fs"); // File system module for writing to files
const moment = require("moment"); // Moment library for date formatting

/**
 * Logs a message with a timestamp to a file.
 * @param {string} message - The message to log.
 */
const log = (message) => {
  
  const timestamp = moment().format("DD-MM-YYYY"); // Format the current date as 'DD-MM-YYYY'
  // Append the message with a timestamp to 'logs.txt'
  fs.appendFile("logs.txt", `${timestamp} - ${message}\n`, (err) => {
    if (err) throw err; // Handle any errors that occur during the file write operation
  });
};

module.exports = log; // Export the log function for use in other modules
