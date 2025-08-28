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

test('Join button redirects to sign-up page', async ({ page }) => {
  await page.goto(process.env.S4E_BASE_URL + '/');
  await page.click('button:has-text("Join")');
  await expect(page).toHaveURL('https://app.s4e.io/sign-up');
});

test('Pricing page has accessible yearly and monthly switch', async ({ page }) => {
  await page.goto(process.env.S4E_BASE_URL + '/pricing');
  await expect(page.getByRole('heading', { name: 'Pay monthly' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Pay yearly/i })).toBeVisible();
  await page.click('text=Pay yearly');
  const switchDiv = page.locator('.css-rcvkex > div ');
  await expect(switchDiv).toHaveAttribute('style', /transform: translateX\(78px\)/);
  await page.click('text=Pay monthly');
  await expect(switchDiv).toHaveAttribute('style', /transform: translateX\(-125px\)/);
});

test('Pricing page has plan wizard button that opens scheduling popover', async ({ page }) => {
  await page.goto(process.env.S4E_BASE_URL + '/pricing');
  await expect(page.getByRole('button', { name: 'Plan Wizard' })).toBeVisible();
  await page.click('button:has-text("Plan Wizard")');
  await expect(page.getByRole('dialog')).toBeVisible();
});