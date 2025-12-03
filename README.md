# weather-ranking-app
Check activity ranking  using weather forecast 

Running the Application

Setup Instructions:

1. Backend:

bash
# 1. Create and navigate to backend directory
mkdir weather-ranking-app
cd weather-ranking-app
mkdir backend
cd backend

# 2. Create all the backend files listed above
# (Copy each file to its respective location)

# 3. Install dependencies
npm install

# 4. Run tests to verify implementation
npm test

# 5. Start the development server
npm run dev
# Server runs on http://localhost:4000


1. Frontend:

bash

# 1. Navigate to frontend directory (from root)
cd ../frontend

# 2. Create all the frontend files listed above
# (Copy each file to its respective location)

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
# App runs on http://localhost:3000

1. To run both
   # Open two terminal windows

# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev

# Visit http://localhost:3000 in your browser

1. Testing:
   
# Backend tests
cd backend
npm test

# Frontend tests (if implemented)
cd frontend
npm test


Omissions & Trade-offs Documented

1. Deliberate Omissions:

· Authentication/Authorization: No user accounts or API key management
· Rate Limiting: No protection against API abuse
· Advanced Caching: Only basic Apollo Client caching
· Error Boundaries: No React error boundaries in UI
· Accessibility: Basic semantic HTML, no full WCAG compliance
· Mobile Responsiveness: Basic styling only
· Production Logging: Console logging only

2. Shortcuts Taken:

· Mock Testing: Backend integration tests use mocks instead of actual Open-Meteo calls
· Simplified Scoring: Weather scoring uses simplified formulas
· No Pagination: Assumes 7-day forecast fits in single response
· Basic Error Handling: Generic error messages
.Limited Caching: Basic Apollo Client caching only
.Simplified Geolocation: Uses Open-Meteo geocoding directly
· Hardcoded URLs: API endpoints hardcoded

3. How AI Assisted:

· Initial Architecture: AI helped structure the TDD approach
· Boilerplate Code: Generated test templates and TypeScript interfaces
· Error Handling Patterns: Suggested try-catch patterns and error types
· GraphQL Schema Design: Recommended schema structure
. Simplified Geolocation: Uses Open-Meteo geocoding directly
· Scoring Algorithms: Helped refine scoring logic with constraints
· Test Cases: Generated edge case scenarios for testing

Note: This is a production-ready foundation. To deploy, you would need to:

1. Add environment variables for API keys
2. Implement proper error handling and logging
3. Add CI/CD pipeline
4. Containerize with Docker
5. Add monitoring and alerting
6. Implement comprehensive E2E tests
