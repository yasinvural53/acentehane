# AcenteHane — Vercel yayın rehberi

Bu proje Next.js App Router ile hazırlanmıştır. PR #1'deki sayfa tanıtım amaçlıdır; giriş, veritabanı ve sigorta şirketi entegrasyonları aktif değildir.

## 1. Pull request önizlemesi
1. GitHub'da PR #1'i açın: https://github.com/yasinvural53/acentehane/pull/1
2. Vercel hesabınızda **Add New > Project** ile GitHub hesabınızı bağlayın.
3. **yasinvural53/acentehane** deposunu içe aktarın.
4. Framework Preset: **Next.js**, Root Directory: **./** seçin.
5. Projenin `package.json` dosyası Node.js **24.x**, npm **11.x** gerektirir. Vercel'de Node.js sürümünü 24.x olarak ayarlayın; otomatik algılamayı kontrol edin.
6. Build Command varsayılan `npm run build`; Install Command varsayılan `npm install`. İlk kurulumda ortam değişkeni gerekmez.
7. Deploy edin. Vercel GitHub entegrasyonu kurulduğunda PR dalı için Preview Deployment oluşturabilir.

## 2. Test
Önizleme bağlantısını açıp mobil ve masaüstü görünümünü, #ozellikler / #nasil-calisir / #iletisim bağlantılarını kontrol edin.
Yerelde Node.js 24 ve npm 11 ile:
```bash
npm ci
npm run lint
npm run typecheck
npm run build
```
Bu kontroller geçmeden PR'ı birleştirmeyin.

## 3. Canlıya alma
GitHub PR #1'i inceleyip kontroller başarılıysa `main` dalına birleştirin. Vercel'de Production Branch = `main` olduğundan emin olun. Ardından Vercel > Project > Settings > Domains üzerinden size ait alan adını ekleyin ve Vercel'in gösterdiği DNS kayıtlarını alan adı sağlayıcınızda uygulayın.

## Güvenlik
Sigorta şirketi giriş bilgilerini, API anahtarlarını veya müşteri verilerini GitHub'a yazmayın. Bunlar ileride yalnızca sunucu tarafında ve uygun gizli değişken yönetimiyle kullanılmalıdır.
