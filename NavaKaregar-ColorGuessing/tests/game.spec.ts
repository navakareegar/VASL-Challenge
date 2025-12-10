import { TColor } from "@/types/common";
import { COLORS, MAX_COLORS } from "@/utils/constant";
import { test, expect, Page } from "@playwright/test";

async function selectColors(page: Page, colors: TColor[]) {
  for (let i = 0; i < MAX_COLORS; i++) {
    await page.getByText(`Color ${i + 1}`).click();
    await page.getByRole("option", { name: colors[i] }).click();
  }
}

async function selectColorsAndSubmit(
  page: Page,
  colors: TColor[] = [...COLORS] as TColor[]
) {
  await selectColors(page, colors);
  await page.getByRole("button", { name: "Submit" }).click();
}

test.describe("Color Guessing Game", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("home page has welcome message and start button", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Welcome!" })).toBeVisible();
    await expect(
      page.getByText("Ready to play the Color Guessing Game?")
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Start Game" })).toBeVisible();
  });

  test("can navigate to game page", async ({ page }) => {
    await page.getByRole("link", { name: "Start Game" }).click();
    await expect(page).toHaveURL("/game");
    await expect(
      page.getByRole("heading", { name: "Color Guessing Game" })
    ).toBeVisible();
  });

  test("game page shows initial guess counter", async ({ page }) => {
    await page.goto("/game");
    await expect(page.getByText("Guesses: 0 / 15")).toBeVisible();
    await expect(page.getByText("15 remaining")).toBeVisible();
  });

  test(`game page shows ${MAX_COLORS} color selectors`, async ({ page }) => {
    await page.goto("/game");
    for (let i = 1; i <= MAX_COLORS; i++) {
      await expect(page.getByText(`Color ${i}`)).toBeVisible();
    }
  });

  test("can select colors from dropdowns", async ({ page }) => {
    await page.goto("/game");

    // Click on the first color selector and select a color
    await page.getByText("Color 1").click();
    await page.getByRole("option", { name: "red" }).click();

    await page.getByRole("heading", { name: "Color Guessing Game" }).click();

    await expect(page.getByText("red")).toBeVisible();
  });

  test("submit button is visible and clickable", async ({ page }) => {
    await page.goto("/game");
    const submitButton = page.getByRole("button", { name: "Submit" });
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
  });

  test("guess counter increases after submission", async ({ page }) => {
    await page.goto("/game");

    await selectColorsAndSubmit(page);

    // Verify guess counter increased
    await expect(page.getByText("Guesses: 1 / 15")).toBeVisible();
    await expect(page.getByText("14 remaining")).toBeVisible();
  });

  test("can make multiple guesses", async ({ page }) => {
    await page.goto("/game");

    await selectColorsAndSubmit(page);
    await expect(page.getByText("Guesses: 1 / 15")).toBeVisible();

    await selectColorsAndSubmit(page, [
      "Blue",
      "Green",
      "Blue",
      "Yellow",
      "Orange",
    ]);

    await expect(page.getByText("Guesses: 2 / 15")).toBeVisible();
    await expect(page.getByText("13 remaining")).toBeVisible();
  });

  test("shows feedback icons after submission", async ({ page }) => {
    await page.goto("/game");

    await selectColorsAndSubmit(page);

    const icons = page.locator('[class*="anticon"]');
    await expect(icons.first()).toBeVisible();
  });
});
