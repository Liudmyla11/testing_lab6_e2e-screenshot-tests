// tests/e2e/extra.test.js
const { test, expect } = require('@playwright/test');

// --- Тести для нової локальної сторінки (http://localhost:3000/about.html) ---

test('Перевірка переходу на сторінку "Про нас" та заголовка', async ({ page }) => {
  await page.goto('http://localhost:3000/about.html');
  await expect(page).toHaveTitle(/Про нас/);
});

test('Перевірка тексту посилання "Повернутися на головну"', async ({ page }) => {
  await page.goto('http://localhost:3000/about.html');
  // Перевірка, що елемент з ідентифікатором "back-link" має очікуваний текст
  await expect(page.locator('#back-link')).toHaveText('Повернутися на головну');
});

// --- Тести для зовнішнього сайту (ОНПУ) ---

test('E2E: Перевірка заголовка сайту ОНПУ', async ({ page }) => {
    await page.goto('https://op.edu.ua/'); 
    await expect(page).toHaveTitle(/Національний університет «Одеська політехніка»/); 
});

test('E2E: Перевірка наявності головного меню навігації', async ({ page }) => {
    await page.goto('https://op.edu.ua/');
    const navLink = page.locator('text=/університет/i').first();
    await expect(navLink).toBeVisible();
});

test('E2E: Перевірка наявності блоків освітніх ступенів', async ({ page }) => {
    await page.goto('https://op.edu.ua/vstup');
    const bachelorBlock = page.locator('text=БАКАЛАВРАТ').first();
    await expect(bachelorBlock).toBeVisible();
    const firstDegreeBlock = page.locator('text=ЗДОБУТТЯ ВИЩОЇ ОСВІТИ ВПЕРШЕ').first();
    await expect(firstDegreeBlock).toBeVisible();
});