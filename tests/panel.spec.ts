import { test, expect, type Page } from "@playwright/test";
const routes = [
  ["", "Genel Bakış"],
  ["musteriler", "Müşteriler"],
  ["policeler", "Poliçeler"],
  ["teklifler", "Teklifler"],
  ["yenilemeler", "Yenilemeler"],
  ["acenteler", "Acenteler"],
  ["subeler", "Şubeler"],
  ["raporlar", "Raporlar"],
  ["entegrasyonlar", "Entegrasyonlar"],
  ["ayarlar", "Ayarlar"],
];
async function navigate(page: Page, label: string) {
  const menu = page.getByRole("button", { name: "Menüyü aç" });
  if (await menu.isVisible()) await menu.click();
  await page
    .getByRole("navigation", { name: "Yönetim menüsü" })
    .getByRole("link", { name: label, exact: true })
    .click();
}
for (const [route, title] of routes) {
  test(`${title}: route, demo notice, layout`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const response = await page.goto(`/panel/${route}`);
    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole("heading", { level: 1, name: title, exact: true }),
    ).toBeVisible();
    await expect(page.getByText("Demo ortamı", { exact: true })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
  });
}
test("landing page links to demo and renders without runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await page.getByRole("link", { name: "Demo paneli aç" }).click();
  await expect(page).toHaveURL(/\/panel$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Genel Bakış" }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test("customer creation, search, navigation persistence and reset", async ({
  page,
}) => {
  await page.goto("/panel/musteriler");
  await page.getByRole("button", { name: "Demo müşteri ekle" }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByLabel("Ad / işletme adı").fill("Test Örnek Müşteri");
  await dialog.getByLabel("E-posta", { exact: true }).fill("test@example.com");
  await dialog.getByLabel("Şehir").fill("İstanbul");
  await dialog.getByRole("button", { name: "Demo kaydı ekle" }).click();
  await page
    .getByRole("searchbox", { name: "Müşteriler içinde ara" })
    .fill("Test Örnek");
  await expect(
    page.getByRole("cell", { name: /Test Örnek Müşteri/ }),
  ).toBeVisible();
  await navigate(page, "Poliçeler");
  await page.getByRole("button", { name: "Demo poliçe ekle" }).click();
  await expect(page.getByLabel("Müşteri", { exact: true })).toContainText(
    "Test Örnek Müşteri",
  );
  await page.getByRole("button", { name: "Vazgeç" }).click();
  await navigate(page, "Müşteriler");
  await page.reload();
  await page
    .getByRole("searchbox", { name: "Müşteriler içinde ara" })
    .fill("Test Örnek");
  await expect(
    page.getByText("Bu aramaya uygun kayıt bulunamadı."),
  ).toBeVisible();
});
test("policy validates dates and adds demo record", async ({ page }) => {
  await page.goto("/panel/policeler");
  await page.getByRole("button", { name: "Demo poliçe ekle" }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByLabel("Prim (TL)").fill("12345");
  await dialog.getByLabel("Bitiş tarihi").fill("2026-11-13");
  await dialog.getByRole("button", { name: "Demo kaydı ekle" }).click();
  await expect(dialog.getByRole("alert")).toContainText("Bitiş tarihi");
  await dialog.getByLabel("Bitiş tarihi").fill("2027-11-14");
  await dialog.getByRole("button", { name: "Demo kaydı ekle" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Demo poliçe kaydı eklendi",
  );
  await expect(
    page.getByRole("cell", { name: "₺12.345", exact: true }),
  ).toBeVisible();
});
test("quote comparison and renewal tracking are interactive", async ({
  page,
}) => {
  await page.goto("/panel/teklifler");
  await page.getByRole("button", { name: "Yeni demo teklif" }).click();
  await page.getByRole("button", { name: "Demo seçenekleri göster" }).click();
  await expect(page.getByRole("dialog")).toContainText("Örnek A");
  await page.getByRole("button", { name: "İncelendi olarak işaretle" }).click();
  await expect(page.getByRole("status")).toContainText(
    "karşılaştırma tamamlandı",
  );
  await navigate(page, "Yenilemeler");
  await page
    .getByRole("button", { name: "Takibe al", exact: true })
    .first()
    .click();
  await expect(
    page.getByRole("button", { name: "Takipten çıkar" }),
  ).toHaveCount(1);
  await page.getByLabel("Yenileme aralığı").selectOption("7");
  await expect(page.getByRole("table").getByRole("row")).toHaveCount(3);
});
test("agency and branch relationships update in the same session", async ({
  page,
}) => {
  await page.goto("/panel/acenteler");
  await page.getByRole("button", { name: "Demo acente ekle" }).click();
  await page.getByLabel("Acente adı").fill("Test Demo Acente");
  await page.getByLabel("Şehir", { exact: true }).fill("Rize");
  await page.getByRole("button", { name: "Demo kaydı ekle" }).click();
  await navigate(page, "Şubeler");
  await page.getByRole("button", { name: "Demo şube ekle" }).click();
  await page.getByLabel("Şube adı").fill("Test Demo Şube");
  await page.getByLabel("Şehir", { exact: true }).fill("Rize");
  await page
    .getByLabel("Bağlı acente")
    .selectOption({ label: "Test Demo Acente" });
  await page.getByRole("button", { name: "Demo kaydı ekle" }).click();
  await expect(
    page.getByRole("row").filter({ hasText: "Test Demo Şube" }),
  ).toContainText("Test Demo Acente");
});
test("report period and settings use shared data", async ({ page }) => {
  await page.goto("/panel/raporlar");
  await page.getByLabel("Rapor dönemi").selectOption("2026-08");
  await expect(page.getByText("₺0", { exact: true }).first()).toBeVisible();
  await navigate(page, "Ayarlar");
  await page.getByLabel("Çalışma alanı adı").fill("Test Çalışma Alanı");
  await page.getByLabel("Yenileme görünümü").selectOption("7");
  await page.getByRole("button", { name: "Demo tercihleri kaydet" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Demo tercihler kaydedildi",
  );
  await navigate(page, "Genel Bakış");
  await expect(
    page.getByText("Önümüzdeki 7 gün · örnek tarih", { exact: true }),
  ).toBeVisible();
});
test("CSV export, empty search and pagination", async ({ page }) => {
  await page.goto("/panel/musteriler");
  await page.getByRole("button", { name: "Sonraki sayfa" }).click();
  await expect(page.getByText("8 kayıt · Sayfa 2 / 2")).toBeVisible();
  await page
    .getByRole("searchbox", { name: "Müşteriler içinde ara" })
    .fill("bulunamayan");
  await expect(
    page.getByText("Bu aramaya uygun kayıt bulunamadı."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Aramayı temizle" }).click();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "CSV indir" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("acentehane-demo-musteriler.csv");
});
test("integration details stay pending and dialog closes with Escape", async ({
  page,
}) => {
  await page.goto("/panel/entegrasyonlar");
  await expect(page.getByText("Beklemede", { exact: true })).toHaveCount(8);
  await page
    .getByRole("button", { name: "Gereksinimleri gör" })
    .first()
    .click();
  await expect(page.getByRole("dialog")).toContainText(
    "API erişimi veya bağlantı testi yapılmış değildir",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
test("module search navigates and unknown route returns 404", async ({
  page,
}) => {
  await page.goto("/panel");
  await page.getByRole("button", { name: "Modül ara" }).click();
  await page.getByRole("searchbox").fill("Raporlar");
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Raporlar" })
    .click();
  await expect(page).toHaveURL(/\/panel\/raporlar$/);
  const response = await page.goto("/panel/bilinmeyen");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Bu sayfa bulunamadı." }),
  ).toBeVisible();
});
