# CV Fullstack - Dockerized System

## Overview

Complete curriculum system with React frontend, Node.js backend, and MongoDB database, fully containerized with Docker.

## Architecture

```
Frontend React (Nginx:3000) → Backend API (Node.js:3001) → MongoDB (27017)
```

## Prerequisites

- Docker installed and running
- Docker Compose installed
- Ports 3000, 3001 and 27017 available

## Quick Start

### Method 1: Automated Script (Recommended)

```bash
# Navigate to project directory
cd /root/projects/yargoar

# Start system using automated script
./start-cv-fullstack.sh
```

### Method 2: Manual Commands

```bash
# Stop existing containers
docker compose --env-file .env down

# Build and start
docker compose --env-file .env up -d --build

# Check status
docker compose --env-file .env ps
```

### Method 3: Using Docker Manager

```bash
# Start system
./docker-manager.sh start

# View logs
./docker-manager.sh logs

# Stop system
./docker-manager.sh stop
```

## Access URLs

### Frontend
- **Complete Application**: http://localhost:3000
- **Title**: CV Fullstack (configurable via VITE_APP_TITLE)

### APIs
- **Portuguese**: http://localhost:3000/api/pt
- **English**: http://localhost:3000/api/en
- **French**: http://localhost:3000/api/fr

### Direct Backend
- **API Base**: http://localhost:3001
- **MongoDB**: localhost:27017

## Services

### Frontend React
- **Container**: yargoar_frontend_react
- **Port**: 3000 → 80
- **Technology**: React + Vite + TypeScript
- **Proxy**: Nginx for APIs

### Backend API
- **Container**: yargoar_node_api
- **Port**: 3001
- **Technology**: Node.js + Express
- **Database**: MongoDB

### Database
- **Container**: yargoar_mongodb
- **Port**: 27017
- **Technology**: MongoDB 6.0
- **Data**: Curriculum in 3 languages

## Environment Configuration

### Frontend (.env)
```env
VITE_APP_TITLE=CV Fullstack
VITE_APP_PRIMARY_COLOR=#007bff
VITE_APP_SECONDARY_COLOR=#6c757d
VITE_APP_TEXT_COLOR=#212529
VITE_APP_BACKGROUND_COLOR=#ffffff
VITE_APP_FONT_TITLE=Inter
VITE_APP_FONT_BODY=Inter
VITE_API_URL=http://localhost:3001/api/
```

### Backend
```env
MONGODB_DB_ROOT_PASSWORD=yargoar_password
MONGODB_DB_NAME=cv_db
LANGUAGES=pt,en,fr
```

## Docker Management

### Container Management Script

The `docker-manager.sh` file facilitates container management:

```bash
# View all available commands
./docker-manager.sh help

# Main commands
./docker-manager.sh start      # Start all services
./docker-manager.sh stop       # Stop all services
./docker-manager.sh restart    # Restart all services
./docker-manager.sh build      # Build Docker images
./docker-manager.sh logs       # Show logs from all services
./docker-manager.sh status     # Show container status
./docker-manager.sh clean      # Remove containers and volumes
./docker-manager.sh shell      # Access backend shell
./docker-manager.sh mongo      # Access MongoDB shell
```

### Container Architecture

#### Services

1. **Frontend (Nginx)**
   - Port: 3000
   - Image: nginx:alpine
   - Function: Serve static files and proxy to API

2. **Backend (Node.js)**
   - Port: 3001
   - Image: node:18-alpine
   - Function: REST API with Express.js

3. **MongoDB**
   - Port: 27017
   - Image: mongo:6
   - Function: NoSQL database

#### Network

- **Name**: yargoar-network
- **Type**: Bridge
- **Communication**: All containers can communicate with each other

#### Volumes

- **mongodb_data**: MongoDB data persistence
- **node_modules**: Node.js dependencies cache

## Useful Commands

### Container Management
```bash
# Check status
docker compose --env-file .env ps

# View logs
docker compose --env-file .env logs -f

# Stop everything
docker compose --env-file .env down

# Clean volumes (removes data)
docker compose --env-file .env down -v
```

### Debug
```bash
# Access frontend shell
docker compose --env-file .env exec frontend_react sh

# Access backend shell
docker compose --env-file .env exec node_api sh

# Access MongoDB
docker compose --env-file .env exec mongo_db mongosh -u root -p yargoar_password --authenticationDatabase admin
```

### Testing
```bash
# Test API directly
curl http://localhost:3001/api/fr

# Test frontend proxy
curl http://localhost:3000/api/pt

# Test frontend
curl http://localhost:3000/
```

## Troubleshooting

### Browser Cache
If frontend doesn't update:
1. Open in incognito mode (Ctrl+Shift+N)
2. Or force refresh (Ctrl+F5)
3. Or clear browser cache

### Containers Won't Start
```bash
# Check logs
docker compose --env-file .env logs

# Rebuild without cache
docker compose --env-file .env build --no-cache
```

### API Not Responding
```bash
# Check if containers are running
docker compose --env-file .env ps

# Check API logs
docker compose --env-file .env logs node_api
```

### Restart Specific Service
```bash
docker compose --env-file .env restart node_api
docker compose --env-file .env restart frontend_react
docker compose --env-file .env restart mongo_db
```

### Clean and Rebuild
```bash
# Stop and remove everything
./docker-manager.sh clean

# Rebuild images
./docker-manager.sh build

# Start again
./docker-manager.sh start
```

### Port Issues
If ports are occupied, edit the `docker-compose.yml` file:

```yaml
ports:
  - "3001:80"    # Change external port
```

### MongoDB Connection Issues

1. Check if MongoDB is running:
   ```bash
   docker compose --env-file .env logs mongo_db
   ```

2. Test connection:
   ```bash
   ./docker-manager.sh mongo
   ```

3. Check data:
   ```javascript
   use cv_db
   db.profiles.find()
   ```

## Development

### Development Mode
For development with hot-reload:

```bash
# Edit docker-compose.yml and uncomment development volumes
# Or use manual commands:

# Backend with nodemon
cd cv-fullstack/api
npm install
npm run dev

# Frontend with simple server
cd cv-fullstack/front-react
python3 -m http.server 3000
```

### Rebuild After Changes
```bash
# Specific rebuild
docker compose --env-file .env build node_api
docker compose --env-file .env up -d node_api

# Complete rebuild
./docker-manager.sh build
./docker-manager.sh start
```

## Monitoring

### Check Resource Usage
```bash
docker stats
```

### Check Disk Space
```bash
docker system df
```

### Real-time Logs
```bash
docker compose --env-file .env logs -f --tail=100
```

## Production

For production deployment:

1. **Configure appropriate environment variables**
2. **Use persistent volumes for data**
3. **Configure MongoDB backup**
4. **Use HTTPS with SSL certificates**
5. **Configure monitoring and centralized logging**

## Useful Commands

```bash
# MongoDB backup
docker compose --env-file .env exec mongo_db mongodump --username root --password yargoar_password --authenticationDatabase admin --db cv_db --out /backup

# MongoDB restore
docker compose --env-file .env exec mongo_db mongorestore --username root --password yargoar_password --authenticationDatabase admin --db cv_db /backup/cv_db

# Run command in container
docker compose --env-file .env exec node_api npm install
docker compose --env-file .env exec mongo_db mongosh

# Copy files to/from container
docker cp file.txt yargoar_node_api:/app/
docker cp yargoar_node_api:/app/file.txt ./
```

## File Structure
```
yargoar/
├── .env                      # Environment variables
├── docker-compose.yml        # Docker orchestration
├── start-cv-fullstack.sh     # Startup script
├── docker-manager.sh         # Docker manager
├── cv-fullstack/
│   ├── api/                  # Node.js backend
│   │   ├── Dockerfile
│   │   └── src/
│   ├── front-react/          # React frontend
│   │   ├── Dockerfile
│   │   ├── nginx.conf
│   │   └── src/
│   └── db/
│       └── init-db/          # MongoDB scripts
└── README.md                 # This file
```

## Support

If you encounter problems:

1. Check logs: `./docker-manager.sh logs`
2. Check status: `./docker-manager.sh status`
3. Restart services: `./docker-manager.sh restart`
4. Clean and rebuild: `./docker-manager.sh clean && ./docker-manager.sh build && ./docker-manager.sh start`

## System Status

- Frontend React working
- Backend API working
- MongoDB with data
- Reverse proxy configured
- Environment variables loaded
- System fully containerized
