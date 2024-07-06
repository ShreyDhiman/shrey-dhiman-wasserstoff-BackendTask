module.exports = {
  // Configuration object containing ports for the load balancer and API servers
  ports: {
    
    loadBalancer: 3000, // Port number for the load balancer
    
    apiServers: [3001, 3002, 3003, 3004], // Array of port numbers for the API servers
  },
};
