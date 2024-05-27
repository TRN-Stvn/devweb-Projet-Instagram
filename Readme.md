# Project Setup and Execution Guide for YouTube Clone

## Overview
This guide provides instructions on how to build the Docker containers for the YouTube Clone project and launch the interface. The YouTube Clone project is designed to mimic the basic functionalities of the popular video-sharing platform, YouTube, allowing users to upload, view, and comment on videos.

## Prerequisites
- Docker
- Docker Compose
- Node.js


## Building the Docker Containers
To build the Docker containers required for the project, follow these steps:
1. Ensure Docker and Docker Compose are installed on your system.
2. Navigate to the root directory of the project where the main `docker-compose.yml` file is located.
3. **Before building the containers, ensure the `.env` file is placed in the `services/Auth` directory.**
4. Run the following command to build all the services:
   ```bash
   docker-compose build
   ```
Alternatively, if you need to build individual services:

2. Navigate to the root directory of the project where the `docker-compose.yml` files are located.
3. Before building the individual services, ensure the `.env` file is placed in the `services/Auth` directory.
4. Run the following commands to build the services individually:
   ```bash
   docker-compose -f services/Auth/docker-compose.yml build
   docker-compose -f services/comment/rest-service/docker-compose.yml build
   docker-compose -f services/image/docker-compose.yml build
   docker-compose -f services/youtube-clone/docker-compose.yml build
   ```

## Launching the Interface
After building the Docker containers, you can launch the interface:

1. Ensure all containers are up and running. You can start all services using:
   ```bash
   docker-compose up
   ```
2. The interface will be automatically launched and available on port 4200. You can access it by navigating to `http://localhost:4200` in your web browser.

## Additional Commands
- To stop all services, you can use:
  ```bash
  docker-compose down
  ```
- To view logs for a specific service, use:
  ```bash
  docker-compose logs [service-name]
  ```

## Collaborator Contributions
- **[Tom Beaurain]**: Contributed to the development of  the **images** management system + Service_Comments(ver propre). 
- **[Amaury Dubuc Tabouy]**: Contributed to the development of the **authentication** service system. 
- **[AUDIE Cédric]**: Contributed to the development of the **comment** management system. 
- **[TRAN Thien Tri Steven ]**: Contributed to the development of the **interface**. 
- **[BOURRE Blanche]**: Contributed to the **design** of the **interface**. 

## Troubleshooting
If you encounter any issues with building the Docker containers or launching the interface, ensure that:
- Docker and Docker Compose are correctly installed and updated.
- All paths in the `docker-compose.yml` files are correctly set according to your project structure.
- Ports specified in the `docker-compose.yml` files are available and not being used by other applications.

## Conclusion
Following these steps should help you successfully build the Docker containers and launch the interface for the YouTube Clone project. For more detailed configuration changes or troubleshooting, refer to the specific Docker or Angular documentation related to your issue.
