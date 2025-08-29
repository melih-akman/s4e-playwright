// @ts-check
import { test, expect } from '@playwright/test';
import 'dotenv/config';

/*
1. Webpage - Join butonu /sign-up adresine yönlendirir
2. Webpage - Pricing sayfasında yearly ve monthly switchi aktif ve erişilebilir olmalıdır
3. Webpage - Pricing sayfasında plan wizard butonu planlama popunu açar
4. Webpage - CTEM Features alanı görüntülenir
5. Webpage - Check Out More Resources alanı altında View butonu görüntülenir
6. Webpage - Check Out More Resources View butonu resources / blog adresine yönlendirir
7. Webpage - Start trial ve See the plans alanları görüntülenir
8. Webpage - Start trial /sign-up adresine yönlendirir
9. Webpage - See the plans butonu /pricing adresine yönlendirir
10. Webpage - footerda s4e linkedin ve X butonları görüntülenir
11. AI Solution web tarafında istek gönderildiğinde solution aldığı gözlemlenmelidir.
*/

test('1.Join button redirects to sign-up page', async ({ page }) => {
  await page.goto(process.env.S4E_BASE_URL + '/');
  await page.click('button:has-text("Join")');
  await expect(page).toHaveURL('https://app.s4e.io/sign-up');
});

test('2.Pricing page has accessible yearly and monthly switch', async ({ page }) => {
  await page.goto(process.env.S4E_BASE_URL + '/pricing');
  await expect(page.getByRole('heading', { name: 'Pay monthly' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Pay yearly' })).toBeVisible();
  await page.click('text=Pay yearly');
  const switchDiv = page.locator('.css-rcvkex > div ');
  await expect(switchDiv).toHaveAttribute('style', /transform: translateX\(78px\)/);
  await page.click('text=Pay monthly');
  await expect(switchDiv).toHaveAttribute('style', /transform: translateX\(-125px\)/);
});

test('3.Pricing page has plan wizard button that opens scheduling popover', async ({ page }) => {
  await page.goto(process.env.S4E_BASE_URL + '/pricing');
  await expect(page.getByRole('button', { name: 'Plan Wizard' })).toBeVisible();
  await page.click('button:has-text("Plan Wizard")');
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('4.CTEM Features section is visible on homepage', async ({ page }) => {
  await page.goto(process.env.S4E_BASE_URL + '/');
  await expect(page.getByRole('heading', { name: 'CTEM Features' })).toBeVisible();
  const slide = page.getByRole('heading', { name: 'Effortless Security Automation' }).locator('..').locator('..').locator('..');//SOR
  await expect(slide).toBeVisible();
});

test('5.Check Out More Resources section is visible with View button', async ({ page }) => {
  await page.goto(process.env.S4E_BASE_URL + '/');
  await expect(page.getByRole('heading', { name: 'Check Out More Resources' })).toBeVisible();
  const resourcesSection = page.getByRole('heading', { name: 'Check Out More Resources' }).locator('xpath=ancestor::section').locator('..').locator('..');
  const slider = resourcesSection.locator('.slick-slider');
  await expect(slider.locator('.slick-slide').first()).toBeVisible();
  await expect(slider.locator('p:has-text("View")').first()).toBeVisible();
});

test('6.First slide in Check Out More Resources section is visible and View button is clickable', async ({ page }) => {
  await page.goto(process.env.S4E_BASE_URL + '/');
  const resourcesSection = page.getByRole('heading', { name: 'Check Out More Resources' }).locator('xpath=ancestor::section').locator('..').locator('..');
  const slider = resourcesSection.locator('.slick-slider');
  const firstSlide = slider.locator('.slick-slide').nth(4); // slide with index 4
  await expect(firstSlide).toBeVisible();
  const viewButton = firstSlide.locator('p:has-text("View")');
  await expect(viewButton).toBeVisible();
  await viewButton.click();
  await expect(page).toHaveURL(/^https:\/\/resources\.s4e\.io\/blog\//);
});

test('7.Start trial and See the plans button is visible', async ({ page }) => {
  await page.goto(process.env.S4E_BASE_URL + '/');
  await expect(page.locator('span:has-text("Start trial")')).toBeVisible();
  await expect(page.locator('span:has-text("See the plans")')).toBeVisible();
});

test('8.Start trial button redirects to sign-up page', async ({ page }) => {
  await page.goto(process.env.S4E_BASE_URL + '/');
  await page.click('span:has-text("Start trial")');
  await expect(page).toHaveURL('https://app.s4e.io/sign-up');
});

test('9.See the plans button redirects to pricing page', async ({ page }) => {
  await page.goto(process.env.S4E_BASE_URL + '/');
  await page.click('span:has-text("See the plans")');
  await expect(page).toHaveURL(process.env.S4E_BASE_URL + '/pricing');
});

test('10.Social media links are visible in footer', async ({ page }) => {
  await page.goto(process.env.S4E_BASE_URL + '/');
  const footer = page.locator('footer');
  await expect(footer).toBeVisible();

  const linkedinButton = footer.locator('img[alt="Linkedin"]').locator('..');
  const xButton = footer.locator('img[alt="Twitter"]').locator('..');
  await expect(linkedinButton).toBeVisible();
  await expect(xButton).toBeVisible();
});


test('11.Ai solution send a request and receive a response', async ({ page }) => {
  await page.goto(process.env.S4E_BASE_URL + '/features/ai-based-security-scanner');
  await page.getByText('Detect Exposed Admin Panel').click();
  await page.click('button[aria-label="Submit prompt"]');
  await expect(page.locator('div#code-container')).toBeVisible({ timeout: 30000 });
  const codeContainer = page.locator('div#code-container');
  await expect(codeContainer).not.toBeEmpty();

});