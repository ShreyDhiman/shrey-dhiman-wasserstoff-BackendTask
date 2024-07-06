const express = require("express"); // Express framework for handling HTTP requests
const axios = require("axios"); // Axios library for making HTTP requests
const { ports } = require("../config/config"); // Importing port configuration
const log = require("./logger"); // Importing custom logger

const app = express(); // Initialize an Express application

const servers = ports.apiServers; // List of API server ports

// Object to keep track of the number of requests being processed by each server
const requestCounts = servers.reduce((acc, port) => { 
  acc[port] = 0; 
  return acc; // Initialize the request count for each server to 0
}, {});

// Function to find the server with the least number of active requests
const getLeastLoadedServer = () => { 
  return servers.reduce((leastLoaded, server) => {
    // Compare the request count of the current server with the least loaded server
    if (requestCounts[server] < requestCounts[leastLoaded]) { 
      return server; // Return the current server if it has fewer requests
    }
    return leastLoaded; // Otherwise, return the least loaded server
  }, servers[0]);
};

// Route handler for incoming requests to the load balancer
app.get("/api", async (req, res) => {
  
  const server = getLeastLoadedServer(); // Get the least loaded server

  requestCounts[server] += 1; // Increment the request count for the chosen server

  log(`Selected server ${server} for incoming request`); // Log the selected server for this request

  const startTime = Date.now(); // Capture the start time of the request

  try {
    
    const response = await axios.get(`http://localhost:${server}/api`);// Forward the request to the chosen server
    
    const endTime = Date.now(); // Capture the end time of the request
    
    const responseTime = endTime - startTime; // Calculate the response time

    
    log(`Request to server ${server} succeeded in ${responseTime}ms`); // Log the successful request and its response time

    
    res.send(response.data); // Send the response back to the client
  } catch (error) {
    
    log(`Request to server ${server} failed`); // Log the failed request
    
    res.status(500).send("Server error"); // Send an error response to the client
  } finally {
    
    requestCounts[server] -= 1; // Decrement the request count for the chosen server once the request is complete
  }
});

// Start the load balancer on the configured port
app.listen(ports.loadBalancer, () => { 
  console.log(`Load balancer running on port ${ports.loadBalancer}`);
});
