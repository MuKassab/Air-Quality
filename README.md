# Air Quality Monitoring System

## Purpose of the Application

This is an Air Quality Monitoring System that provides real-time air quality data for cities around the world. The application integrates with the IQAir API to fetch air quality metrics and provides REST API endpoints for retrieving pollution data. It specifically tracks Paris pollution data over time and allows users to query air quality information by geographical coordinates.

## What is Available Now

### Current Features
- **Real-time Air Quality Data**: Get current air quality information for any location using latitude and longitude coordinates
- **Paris Pollution Tracking**: Continuous monitoring and storage of Paris air quality data with historical tracking
- **REST API Endpoints**:
  - `GET /api/air-quality/nearest-city` - Get air quality for nearest city by coordinates
  - `GET /api/air-quality/paris-most-pollution` - Get maximum pollution data recorded for Paris
  - `GET /api/status` - Health check endpoint
- **Database Storage**: PostgreSQL database for storing historical pollution data
- **Automated Data Collection**: Scheduled cronjobs for continuous data collection
- **API Documentation**: Swagger/OpenAPI documentation available
- **Rate Limiting**: Built-in API rate limiting with Redis backend
- **Input Validation**: Request validation using Joi
- **Error Handling**: Structured error handling with custom error codes
- **Docker Support**: Full containerization with Docker Compose

## Requirements to Run the Application

### Prerequisites
- **Node.js**: Version 18+ (ES modules support required)
- **Docker & Docker Compose**: For containerized deployment
- **PostgreSQL**: Database for storing pollution data
- **Redis**: For rate limiting (optional but recommended)
- **IQAir API Key**: Required for fetching air quality data

### Dependencies
The application uses modern Node.js with ES modules and includes:
- **Express.js**: Web framework
- **Sequelize**: PostgreSQL ORM
- **Redis**: Caching and rate limiting
- **Axios**: HTTP client for external API calls
- **Cron**: Scheduled job management
- **Joi**: Input validation
- **Jest**: Testing framework
- **Swagger**: API documentation

## How to Run the Application

### 1. Environment Setup
Copy the sample environment file and configure it:
```bash
cp .sample.env .env
```

### 2. Configure Environment Variables
Edit the `.env` file with your specific values:

```env
NODE_ENV='@node-env/development'
PORT=3000

# Redis (optional - for rate limiting)
REDIS_URI=''

# IQAir API Configuration (Required)
IQAIR_API_KEY='your-iqair-api-key'
IQAIR_API_BASE_URL='http://api.airvisual.com/v2'

# PostgreSQL Configuration
# For local development:
# POSTGRES_URI=postgresql://postgres:someStrongPassword@localhost:5432/air_quality_database
# POSTGRES_TEST_URI=postgresql://postgres:someStrongPassword@localhost:5432/air_quality_database_test

# For Docker deployment:
POSTGRES_URI=postgres://postgres:someStrongPassword@postgres:5432/air_quality_database
POSTGRES_TEST_URI=postgres://postgres:someStrongPassword@postgres:5432/air_quality_database_test

POSTGRES_USER=postgres
POSTGRES_PASSWORD=someStrongPassword
POSTGRES_HOST=localhost
```

**Important**: You must obtain an API key from [IQAir](https://www.iqair.com/air-pollution-data-api) and set it in the `IQAIR_API_KEY` environment variable.

### 3. Running with Docker (Recommended)
```bash
# Start all services (PostgreSQL + API)
docker compose up -d

# Access the application container
docker exec -it air-quality-api /bin/sh
```

### 4. Running Locally
```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Or start production server
npm start
```

### 5. Access the Application
- **API Base URL**: `http://localhost:3000/api` (or `http://localhost:3500` with Docker)
- **API Documentation**: `http://localhost:3000/api/docs`
- **Health Check**: `http://localhost:3000/api/status`

## Cronjobs

The application includes automated scheduled tasks for continuous data collection:

### Paris Pollution Data Collection
- **Job**: `saveParisPollutionStateJob`
- **Schedule**: Every minute (`* * * * *`)
- **Function**: Automatically fetches and stores Paris air quality data
- **Location**: `src/airQuality/cron/saveParisPollutionData.js`

The cronjob:
1. Fetches current air quality data for Paris using predefined coordinates
2. Extracts AQI US and main pollutant values
3. Stores the data in the PostgreSQL database with timestamps
4. Logs execution time and duration for monitoring

All cronjobs are registered in `src/jobs.js` and automatically started when the application launches.

## Testing

The application includes testing with Jest:

### Test Structure
- **Unit Tests**: `src/airQuality/tests/airquality.unit.test.js`
- **Integration Tests**: `src/airQuality/tests/airquality.integration.test.js`

### Running Tests
```bash
# Run all tests
npm test

# Run tests with specific environment
cross-env NODE_ENV=@node-env/testing npm test
```

### Test Features
- API endpoint testing
- Service layer unit tests
- Database integration tests
- Error handling validation
- Input validation testing

## Rate Limiter

The application includes a Redis-based rate limiting system:

### Current Implementation
- **Location**: `src/common/middlewares/api-limiter.js`
- **Backend**: Redis for distributed rate limiting
- **Limit**: 10 requests per minute per user/IP
- **Window**: 60 seconds sliding window
- **Response**: HTTP 429 (Too Many Requests) when exceeded

### Features
- **User-based Limiting**: Tracks requests per authenticated user or guest IP
- **Redis Integration**: Uses Redis INCR and EXPIRE for efficient counting
- **Custom Error Handling**: Structured error responses with error codes
- **Configurable**: Easy to modify limits and time windows

### Usage
The rate limiter is available as middleware but may need to be applied to specific routes. To enable it:

```javascript
import { apiRateLimiter } from './common/middlewares/index.js';
app.use('/api', apiRateLimiter);
```

### Possibility of Enhancement
The current rate limiter can be enhanced with:
- Different limits for different endpoints
- User tier-based limiting (premium vs free users)
- Geographic-based rate limiting
- Dynamic rate limiting based on server load
- Rate limiting analytics and monitoring

## Documentation

### API Documentation
- **Format**: OpenAPI 3.0 (Swagger)
- **Location**: `/api/docs` endpoint
- **Source**: `docs/` directory
- **Framework**: swagger-ui-express

### Documentation Structure
```
docs/
├── index.js              # Main OpenAPI specification
├── tags.js              # API endpoint tags
└── modules/
    ├── airQuality/      # Air quality endpoint documentation
    └── common/          # Common schemas and responses
```

### Available Documentation
- **Interactive API Explorer**: Swagger UI interface
- **Endpoint Documentation**: Complete API endpoint specifications
- **Request/Response Examples**: Sample requests and responses
- **Error Code Documentation**: Structured error response formats

### Accessing Documentation
1. Start the application
2. Navigate to `http://localhost:3000/api/docs`
3. Explore the interactive API documentation

### Documentation Features
- **Live Testing**: Test API endpoints directly from the documentation
- **Schema Validation**: Request/response schema definitions
- **Authentication**: API key requirements and usage
- **Error Handling**: Complete error response documentation

---

## Quick Start Summary

1. Get an IQAir API key from https://www.iqair.com/air-pollution-data-api
2. `cp .sample.env .env` and configure your API key
3. `docker compose up -d` to start all services
4. Visit `http://localhost:3500/api/docs` for API documentation
5. Test with `http://localhost:3500/api/status`

For development: `npm install && npm run dev`

