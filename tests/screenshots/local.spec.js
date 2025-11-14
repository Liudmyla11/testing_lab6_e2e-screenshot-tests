// tests/screenshots/local.spec.js
const { test, expect } = require('@playwright/test');


test('Перевірка змін сторінки за скриншотом', async ({ page }) => {
  await page.goto('http://localhost:3000');
  expect(await page.screenshot()).toMatchSnapshot('screenshots/local-page/index-page.png');
});


test('Порівняння скриншота елемента', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const element = await page.locator('h1');
  expect(await element.screenshot()).toMatchSnapshot('screenshots/local-page/index-page-element-h1.png');
});

// Тест для сторінки, яку було додано
test('Скріншот сторінки "Про нас" (повний)', async ({ page }) => {
    await page.goto('http://localhost:3000/about.html');
    expect(await page.screenshot()).toMatchSnapshot('screenshots/about-page/full-page.png');
});

// Тест для демонстрації скріншот-тестування зовнішнього сайту
test('Скріншот елемента "Шапка" сайту ОНПУ', async ({ page }) => {
    await page.goto('https://op.edu.ua/');
    const header = await page.locator('#navbar');
    
    // Переконуємося, що елемент видимий перед знімком
    await expect(header).toBeVisible();
    
    // Порівняння скріншота елемента "шапка"
    expect(await header.screenshot()).toMatchSnapshot('screenshots/op-edu-ua/header-element.png');
});