# Run Local Tests

Run all unit and integration tests that don't require backend integration. Fix any failing tests.

## Instructions

1. Run `npm test -- --run` to execute all Vitest tests
2. If all tests pass, report success with the test count
3. If any tests fail:
   - Analyze the failure output carefully
   - Identify the root cause (test bug vs actual code bug)
   - Fix the issue - prefer fixing tests if they have incorrect expectations, fix code if there's an actual bug
   - Re-run tests to verify the fix
   - Repeat until all tests pass
4. Provide a summary of:
   - Total tests run
   - Any fixes made
   - Final pass/fail status
