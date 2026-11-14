# AcenteHane — Vercel önizleme

## İncelenen başlangıç

- Depo: `yasinvural53/acentehane`
- PR #1: `feature/mor-beyaz-ana-sayfa`, `8ad049b`
- Bu geliştirme: `feature/acentehane-panel-foundation`
- Kullanılan sürümler: Next.js 16.4.6, React 19.3.0, Tailwind CSS 4.3.5.

PR #1'in yerel lint hatası, `/` bağlantısında `next/link` yerine `<a>` kullanımıydı. Üretim derlemesi, Cache Components açıkken `new Date()` değerinin ön oluşturulmasında duruyordu. Her ikisi düzeltildi; Cache Components ayarı korundu.

## Önizleme ayarları

- Framework: **Next.js**
- Root Directory: depo kökü (`./`)
- Node.js: **24.x**; npm: **11.x** (packageManager npm 11.9.0)
- Install: `npm ci`
- Build: `npm run build`
- Output Directory: Next.js varsayılanı; override boş
- Environment: **Preview**
- Kaynak: test edilen `feature/acentehane-panel-foundation` commit'i
- Bu demo için ortam değişkeni gerekmez.

Üretim dalı ayarını değiştirmeyin; önizleme için `main` kullanmayın. `vercel --prod`, promote, PR merge veya alan adı değişikliğini kullanıcı onayı olmadan çalıştırmayın. Demo panelde gerçek giriş ve veri güvenliği yoktur.

## Doğrulama

```sh
npm ci
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

GitHub Actions bu kontrolleri üretim yayını yapmadan çalıştırır. Vercel Git entegrasyonu yetkiliyse geliştirme dalı için otomatik preview üretir. Durumu commit'in Vercel kontrolünden ve PR'daki Vercel bağlantısından doğrulayın.

## Bağlantı kontrolü

İlk incelemede PR #1'de Vercel botu ve başarısız Vercel kontrolü bulundu. Bağlantı kurulduktan sonra aynı takım API'de listelendi; eski AcenteHane proje kimliği 404 döndü ve proje araması boş sonuç verdi. Ayrı bir preview projesi oluşturma denemesi 403 yetki hatasıyla reddedildi. Bu, yerel derleme hatasından ayrı bir erişim sorunudur; kesin sebebi hesap/takım erişimi doğrulanmadan belirlenemez.

Üretim, PR birleştirme ve alan adı işlemleri bu çalışmanın otomatik adımı değildir.
