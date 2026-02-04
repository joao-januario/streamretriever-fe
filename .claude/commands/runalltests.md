# Run All Tests

Run all tests including unit, integration, and E2E tests. Fix any failing tests that are the frontend's responsibility.

## Instructions

### Step 1: Run Unit/Integration Tests
1. Run `npm test -- --run` to execute all Vitest tests
2. If any fail, fix them before proceeding (same process as /runlocaltests)

### Step 2: Run E2E Tests
1. Run `npm run test:e2e` to execute Playwright E2E tests
2. If tests fail, analyze the failures:

#### Determining Responsibility
- **Frontend responsibility** (fix these):
  - Component rendering issues
  - Incorrect selectors or assertions
  - Missing UI elements
  - Client-side routing problems
  - State management bugs

- **Backend responsibility** (report but don't fix):
  - API returning unexpected data
  - Authentication/authorization failures from the server
  - Missing or broken backend endpoints
  - Database issues
  - Server errors (5xx)

### Step 3: Report Summary
Provide a summary including:
- Unit/Integration tests: X passed
- E2E tests: X passed, X failed
- Fixes made (list any changes)
- Backend issues found (if any) - describe what the backend team needs to address
- Final status: PASS or FAIL (with reason if fail is due to backend)
