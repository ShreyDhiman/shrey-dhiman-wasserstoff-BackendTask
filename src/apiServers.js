const express = require("express");
const { ports } = require("../config/config");

// Function to create a mock API server
const createServer = (port, responseTime) => { 
  
  const app = express(); // Initialize a new Express application
  
  // Define a route for the mock API
  app.get("/api", (req, res) => { 
    
    // Simulate a delay in response time
    setTimeout(() => { 
      
      res.send(`Response from server ${port}`); // Send a response indicating the server that handled the request
    }, responseTime);
  });

  // Start the server and listen on the specified port
  app.listen(port, () => { 
    console.log(`API server running on port ${port}`);
  });
};

// Create multiple mock API servers with different response times
ports.apiServers.forEach((port, index) => 
  createServer(port, (index + 1) * 100)
);
