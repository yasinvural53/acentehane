# Acentehane

Next.js App Router ve TypeScript ile oluşturulmuş başlangıç projesi. Türkçe, mobil uyumlu bir karşılama sayfası içerir. Veritabanı, üyelik veya iş süreçleri henüz eklenmemiştir.

## Gereksinimler

- Node.js 24 LTS (`.nvmrc`)
- npm 11

## Kurulum ve geliştirme

```sh
npm ci
npm run dev -- --hostname 0.0.0.0 --port 3000
```

Bulut ortamında npm önbelleğini yazılabilir bir konumda tutmak için `npm_config_cache=/workspace/.cache/npm` kullanılabilir. Mevcut çalışma dizini `/workspace/acentehane`; her bulut görevi zaten izoledir, ayrıca Git worktree oluşturmak gerekmez.

## Kontroller

```sh
npm run lint
npm run typecheck
npm run build
```

Üretim sunucusu, başarılı bir derlemenin ardından:

```sh
npm run start -- --hostname 0.0.0.0 --port 3000
```

Ana sayfaya yapılan HTTP isteği 200 dönmeli; HTML içinde `lang="tr"`, Acentehane başlığı ve “Güzel şeyler” metni bulunmalıdır. Mevcut başlangıç sayfası için API anahtarı, ortam değişkeni veya harici servis gerekmez. Yazı tipleri sistemden yüklenir.

## Dosyalar

- `src/app/page.tsx`: Ana sayfa
- `src/app/page.module.css`: Sayfa stilleri
- `src/app/layout.tsx`: Dil, sayfa başlığı ve açıklama
- `src/app/globals.css`: Genel stiller

Bağımlılıklar `package-lock.json` ile sabitlenir. `npm ci` kilit dosyasını değiştirmeden kurulum yapar. Derleme çıktıları ve `node_modules` Git dışında tutulur.
