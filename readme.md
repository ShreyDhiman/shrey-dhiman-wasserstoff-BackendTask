# Load Balancer Project

## Overview

This project implements a simple load balancer that distributes incoming requests to multiple mock API servers. The load balancer uses a least-connection strategy to forward requests to the server with the fewest active connections. The project is built using Node.js and Express and includes a custom logger for logging request details.

## Project Structure
```
load-balancer/
├── src/
│   ├── index.js
│   ├── loadBalancer.js
│   ├── apiServers.js
│   └── logger.js
├── config/
│   └── config.js
├── README.md
└── package.json
```


- **src/index.js**: The entry point of the application, which initializes the API servers and the load balancer.
- **src/loadBalancer.js**: The core logic of the load balancer, handling incoming requests and distributing them to the API servers.
- **src/apiServers.js**: Code to create multiple mock API servers that handle requests forwarded by the load balancer.
- **src/logger.js**: A custom logger that logs request details to a file.
- **config/config.js**: Configuration file containing port numbers for the load balancer and API servers.
- **README.md**: This file.
- **package.json**: Project dependencies and metadata.

# Use Cases

- **Load Balancing**: The application distributes incoming requests to the least loaded server, ensuring efficient use of server resources.
- **Logging**: All requests and their outcomes are logged to a file, providing a history of the application's activity.
- **Simulated Delays**: One of the servers (port 3001) is configured to have a significantly longer response time, demonstrating how the load balancer handles different server response times.

# Run

```bash
npm run dev
```

# API Endpoints

- **GET /api**: This endpoint is used to test the load balancing. When a request is made to this endpoint, the load balancer forwards it to one of the API servers based on the least-connection strategy.