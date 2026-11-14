# Gerçek kullanıma geçiş sırası

Bu temel sürümde UI demo olarak çalışır. Tamamlanma durumları gerçek servislerin hazır olduğu anlamına gelmez.

1. **Güvenli giriş ve veri izolasyonu:** PostgreSQL şemasında Agency, Branch, User, Customer, Policy, Quote; sunucu tarafında admin/acente/şube yetkileri; her sorguda tenant kapsamı; oturum ve erişim testleri. Menü gizlemek yetki kontrolü değildir.
2. **Müşteri ve poliçe kayıtları:** Doğrulanmış sunucu CRUD, hata/loading durumları, işlem geçmişi, yedekleme ve silme kuralları. DemoProvider yerine tipli sunucu veri katmanı.
3. **PDF aktarımı:** Yetkili ve özel dosya saklama, boyut/tür kontrolü, zararlı dosya denetimi, PDF metin çıkarma, kullanıcı doğrulaması, mükerrer poliçe kontrolü. Alan çıkarma hataları otomatik gerçek poliçe kaydına dönüşmemeli.
4. **İlk yetkili entegrasyon:** API dokümanı ve test erişimi doğrulanan tek şirket/sağlayıcı ile başlama; sunucu sır yönetimi; süre aşımı, tekrar deneme ve istek kimliği; acente başına yetki. Şirket ekranı şifresini koda koymayın.
5. **Tekliften poliçeye geçiş:** Teminat/prim/vergi doğrulaması, açık kullanıcı teyidi, tekrar kayıt engeli, asenkron durum takibi ve işlem denetimi.
6. **Yenileme ve raporlar:** Gerçek tarih/saat dilimi, bildirim tercihleri, e-posta/SMS sağlayıcısı, rapor mutabakatı ve komisyon verileri.
7. **Pilot ve yayın:** İzole test acentesi, masaüstü/mobil kabul testleri, erişim güvenliği, kurtarma denemesi. Üretim yayını, birleştirme ve alan adı değişikliği ayrı kullanıcı onayından sonra.

## Demo kabul senaryosu

- Tanıtımdan Demo paneli açın; on menüye erişin.
- Kurgusal müşteri ekleyin; arayın; Poliçeler formunda müşteriyi seçin.
- Hatalı bitiş tarihinin reddedildiğini, doğru tarihin demo kayıt oluşturduğunu doğrulayın.
- Teklif karşılaştırın; gerçek API çağrısı/poliçe düzenlemesi yapılmadığını görün.
- Yenilemeyi takibe alın; 7/30 günlük filtreyi kontrol edin.
- Acente ekleyin, bağlı şube ekleyin; rapor dönemini değiştirin.
- Entegrasyonların sekizinde de Beklemede ve Bağlı değil etiketlerini görün.
- Sayfayı yenileyin: eklenen demo kayıtlar ve tercihler sıfırlanmalı.
