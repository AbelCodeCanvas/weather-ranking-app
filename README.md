# weather-ranking-app
Check activity ranking  using weather forecast 

Running the Application

Setup Instructions:

1. Backend:

bash
cd backend
npm install
npm run dev  # Starts GraphQL server on http://localhost:4000
npm test     # Runs TDD tests


1. Frontend:

bash
cd frontend
npm install
npm run dev  # Starts React app on http://localhost:3000
npm test     # Runs component tests


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
· Hardcoded URLs: API endpoints hardcoded

3. How AI Assisted:

· Initial Architecture: AI helped structure the TDD approach
· Boilerplate Code: Generated test templates and TypeScript interfaces
· Error Handling Patterns: Suggested try-catch patterns and error types
· GraphQL Schema Design: Recommended schema structure
· Scoring Algorithms: Helped refine scoring logic with constraints
· Test Cases: Generated edge case scenarios for testing

Note: This is a production-ready foundation. To deploy, you would need to:

1. Add environment variables for API keys
2. Implement proper error handling and logging
3. Add CI/CD pipeline
4. Containerize with Docker
5. Add monitoring and alerting
6. Implement comprehensive E2E tests
