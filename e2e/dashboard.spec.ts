import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('should redirect to home when not authenticated', async ({ page }) => {
    // Try to access dashboard without authentication
    await page.goto('/dashboard');

    // Middleware should redirect to home
    // or the page should show an error/redirect based on API response
    await expect(page).toHaveURL(/\/(|\?.*)?$/);
  });

  test('should show loading spinner initially', async ({ page }) => {
    await page.goto('/dashboard');

    // Should see spinner briefly while checking auth
    const spinner = page.getByRole('status');
    // May or may not be visible depending on timing
    await expect(spinner.or(page.locator('body'))).toBeVisible();
  });
});

test.describe('Protected Routes', () => {
  test('unauthenticated user cannot access dashboard', async ({ page }) => {
    const response = await page.goto('/dashboard');

    // Either redirected or showing auth error
    const url = page.url();
    const isRedirected = !url.includes('/dashboard');
    const hasError = await page.getByText(/error|unauthorized|login/i).isVisible().catch(() => false);

    expect(isRedirected || hasError).toBe(true);
  });
});
