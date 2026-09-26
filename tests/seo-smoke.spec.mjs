import { expect, test } from '@playwright/test';

const routes = [
  '/',
  '/services/',
  '/services/house-cleaning',
  '/services/commercial-cleaning',
  '/services/deep-cleaning',
  '/services/move-in-move-out-cleaning',
  '/services/post-construction-cleaning',
  '/service-areas'
];

for (const route of routes) {
  test(`${route} keeps its SEO and conversion essentials`, async ({ page }) => {
    const pageErrors = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));

    const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://prmbcleaning.com${route}`
    );
    await expect(page.locator('a[href="tel:+13853149098"]').first()).toBeAttached();
    expect(await page.locator('body').innerText()).not.toContain('(801) 793-6251');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    expect(pageErrors).toEqual([]);
  });
}

test('unknown URLs return a real noindex 404', async ({ page }) => {
  const response = await page.goto('/playwright-seo-missing-page', { waitUntil: 'domcontentloaded' });
  expect(response?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/i);
  await expect(page.locator('a[href="tel:+13853149098"]').first()).toBeAttached();
});
