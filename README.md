# AcenteHane

Sigorta acenteleri için Next.js 16.4.6, React 19.3 ve Tailwind CSS 4 ile hazırlanmış Türkçe yönetim paneli temeli.

**Bu sürüm bir demodur.** Kimlik doğrulama, gerçek veritabanı ve sigorta API bağlantısı yoktur. Kurgusal kayıtlar yalnızca tarayıcı belleğinde tutulur; sayfa yenilenince sıfırlanır. Gerçek müşteri verisi, TCKN, poliçe PDF'i veya şirket şifresi girmeyin.

## Kurulum

Node.js **24.x** ve npm **11.x** gerekir (`.nvmrc`, `.node-version`, `engines`, `.npmrc`). Doğrulama ortamı: Node 24.22.1 / npm 11.9.0.

```sh
node --version
npm --version
npm ci
npm run dev
```

- Tanıtım: http://localhost:3000
- Demo panel: http://localhost:3000/panel
- Ortam değişkeni gerekmez.

## Kontroller

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

`npm run check` tüm kontrolleri sırayla çalıştırır. Playwright, mevcut üretim derlemesini 3100 portunda başlatır; port boş olmalıdır. Linux sistem bağımlılıkları için CI `npx playwright install --with-deps chromium` kullanır. İsteğe bağlı `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` mevcut bir Chromium ikilisini seçer. Tarayıcı çalıştırmayı engelleyen ortamlarda E2E sonucu **geçti** olarak değerlendirilmez.

Masaüstü ve mobil Chromium projelerinde toplam **38 kontrol** tanımlıdır: on ekranın açılması/taşmaması, müşteri ve poliçe ekleme, tarih doğrulama, sayfalar arası demo durum, yenileme takibi, teklif karşılaştırma, acente-şube ilişkisi, rapor filtresi, ayarlar, CSV, boş arama, sayfalama, modal kapatma ve 404.

## Ekranlar

| URL                     | Çalışan demo                                        | Sonraki gerçek özellik              |
| ----------------------- | --------------------------------------------------- | ----------------------------------- |
| `/panel`                | Kayıtlardan hesaplanan özet ve grafikler            | Sunucu verileri                     |
| `/panel/musteriler`     | Arama, tür filtresi, ekleme, ayrıntı, CSV           | Acente bazlı müşteri CRUD           |
| `/panel/policeler`      | Manuel kayıt, tarih/prim doğrulama, filtre, ayrıntı | Güvenli PDF yükleme ve alan çıkarma |
| `/panel/teklifler`      | Kurgusal seçenekler, karşılaştırıldı durumu         | Yetkili teklif API'si               |
| `/panel/yenilemeler`    | Sabit örnek tarih, süre filtresi, takip işareti     | Zamanlanmış hatırlatmalar           |
| `/panel/acenteler`      | Demo acente ekleme ve listeleme                     | Çok kiracılı veri izolasyonu        |
| `/panel/subeler`        | Acente ilişkili şube ekleme ve filtre               | Şube yetkileri                      |
| `/panel/raporlar`       | Aktif kayıtlardan dönem/branş/şube raporu ve CSV    | Tahsilat, komisyon, mutabakat       |
| `/panel/entegrasyonlar` | 8 şirket için beklemede durumu ve hazırlık listesi  | API erişimi ve bağlantı testleri    |
| `/panel/ayarlar`        | Sekme belleğinde çalışma alanı tercihleri           | Gerçek hesap ve güvenli oturum      |

## Yapı

- `src/app`: Tanıtım, on ayrı panel rotası ve ortak panel layout'u.
- `src/components/ui`: Button, Card, StatCard, Badge, Field, Modal, DataTable, bildirim ve sayfa başlığı.
- `src/components/panel`: Ortak menü/üst navigasyon, modül ekranları ve DemoProvider.
- `src/lib/demo.ts`: Tipler, kurgusal kayıtlar, tutar/tarih biçimleme, yenileme hesabı ve CSV kaçışları.
- `src/lib/navigation.ts`: Ortak menü tanımları.
- `tests/panel.spec.ts`: Davranış ve mobil yerleşim kontrolleri.
- `.github/workflows/ci.yml`: Node 24 / npm 11 kurulum, lint, TypeScript, build, E2E. **Yayın veya PR birleştirme yapmaz.**

Demo tarihi **14 Kasım 2026** olarak sabittir; ekranlar ve testler aynı referansı kullanır. Poliçe dönemleri akışı göstermek için kurgulanmıştır. Demo verilerinin güvenli ve kalıcı olduğu varsayılmamalıdır.

## Çalışma dalı ve geri dönüş

Bu geliştirme PR #1'in `8ad049bd5d78a23578d4b0be2290a0cafe622b57` commit'inden türetilen `feature/acentehane-panel-foundation` dalındadır. Başlangıç `main`: `5b7b7be36b8cce4037e93bf9d98f3330ddb34a2c`. Ana dal ve PR #1 dalı değiştirilmez.

Yerelde devam etmeden önce çalışma dosyalarınızı yedekleyin; `git status` ile kaydedilmemiş değişiklikleri kontrol edin. Bu ayrı dalı incelemek için:

```sh
git fetch origin
git switch feature/acentehane-panel-foundation
npm ci
```

Vercel önizleme ve üretim onayı için [DEPLOY_VERCEL.md](DEPLOY_VERCEL.md), geliştirme sırası için [docs/ROADMAP.md](docs/ROADMAP.md).
