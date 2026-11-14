import Link from "next/link";
import styles from "./page.module.css";

const features = [
  {
    icon: "◈",
    title: "Müşteri yönetimi",
    description:
      "Müşteri kayıtlarınızı ve iletişim süreçlerinizi tek yerden yönetin.",
  },
  {
    icon: "▤",
    title: "Poliçe takibi",
    description:
      "Poliçe bilgilerini düzenli şekilde takip etmek için tasarlanan alan.",
  },
  {
    icon: "↗",
    title: "Teklif süreçleri",
    description:
      "Sigorta tekliflerini karşılaştırmaya yönelik geliştirme alanı.",
  },
  {
    icon: "◷",
    title: "Yenileme takvimi",
    description: "Yaklaşan poliçe bitiş tarihlerini izlemeye yönelik modül.",
  },
  {
    icon: "▥",
    title: "Raporlama",
    description: "Acente performansını değerlendirmek için planlanan raporlar.",
  },
  {
    icon: "⌘",
    title: "Entegrasyon merkezi",
    description: "Sigorta şirketi bağlantıları için hazırlanan altyapı.",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#icerik">
        İçeriğe geç
      </a>
      <header className={styles.header}>
        <Link
          className={styles.brand}
          href="/"
          aria-label="AcenteHane ana sayfa"
        >
          <span className={styles.logo}>A</span>Acente<span>Hane</span>
        </Link>
        <nav className={styles.nav} aria-label="Ana menü">
          <a href="#ozellikler">Özellikler</a>
          <a href="#nasil-calisir">Nasıl çalışır?</a>
          <a href="#iletisim">İletişim</a>
        </nav>
        <Link className={styles.headerCta} href="/panel">
          Demo paneli aç <span aria-hidden="true">↗</span>
        </Link>
      </header>
      <main id="icerik">
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>
              <span className={styles.dot} /> SİGORTA ACENTELERİ İÇİN DİJİTAL
              YÖNETİM
            </span>
            <h1>
              Acente yönetiminin <em>yeni merkezi.</em>
            </h1>
            <p>
              Müşteriler, poliçeler, teklifler ve yenilemeler için tek bir
              çalışma alanı. AcenteHane ile sigorta acentelerinin günlük
              işlerini kolaylaştıran bir platform geliştiriyoruz.
            </p>
            <div className={styles.actions}>
              <a className={styles.primary} href="#ozellikler">
                Özellikleri keşfet <span aria-hidden="true">↗</span>
              </a>
              <a className={styles.secondary} href="#nasil-calisir">
                Platformu tanıyın →
              </a>
            </div>
            <p className={styles.disclaimer}>
              Platform geliştirme aşamasındadır. Gösterilen modüller henüz aktif
              hizmet değildir.
            </p>
          </div>
          <div
            className={styles.preview}
            aria-label="AcenteHane yönetim paneli tasarım önizlemesi"
          >
            <div className={styles.previewTop}>
              <span className={styles.previewBrand}>◈ AcenteHane</span>
              <span className={styles.previewTag}>TASARIM ÖNİZLEMESİ</span>
            </div>
            <div className={styles.previewBody}>
              <div className={styles.previewHeading}>
                <span>Genel Bakış</span>
                <span className={styles.previewMuted}>Örnek ekran</span>
              </div>
              <div className={styles.stats}>
                <div>
                  <small>Müşteriler</small>
                  <strong>128</strong>
                  <span>Örnek veri</span>
                </div>
                <div>
                  <small>Poliçeler</small>
                  <strong>86</strong>
                  <span>Örnek veri</span>
                </div>
                <div>
                  <small>Yenilemeler</small>
                  <strong>14</strong>
                  <span>Örnek veri</span>
                </div>
              </div>
              <div className={styles.previewPanel}>
                <div className={styles.panelTitle}>
                  İş akışı önizlemesi <span>● ● ●</span>
                </div>
                <div className={styles.bar}>
                  <span style={{ width: "82%" }} />
                </div>
                <div className={styles.bar}>
                  <span style={{ width: "61%" }} />
                </div>
                <div className={styles.bar}>
                  <span style={{ width: "73%" }} />
                </div>
                <div className={styles.bar}>
                  <span style={{ width: "47%" }} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="ozellikler" className={styles.section}>
          <span className={styles.sectionLabel}>PLATFORM MODÜLLERİ</span>
          <h2>
            İhtiyacınız olan araçlar, <span>bir arada.</span>
          </h2>
          <p className={styles.sectionIntro}>
            AcenteHane için planlanan temel yönetim modülleri.
          </p>
          <div className={styles.featureGrid}>
            {features.map((feature) => (
              <article className={styles.feature} key={feature.title}>
                <span className={styles.featureIcon} aria-hidden="true">
                  {feature.icon}
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="nasil-calisir" className={styles.steps}>
          <div>
            <span className={styles.sectionLabel}>YOL HARİTAMIZ</span>
            <h2>AcenteHane ile daha düzenli bir iş akışı.</h2>
          </div>
          <div className={styles.stepList}>
            <p>
              <b>01</b> Acente ve şube hesaplarının güvenli yönetimi
            </p>
            <p>
              <b>02</b> Müşteri, poliçe ve yenileme kayıtlarının takibi
            </p>
            <p>
              <b>03</b> Yetkili sigorta entegrasyonlarının aşamalı kurulumu
            </p>
          </div>
        </section>
        <section id="iletisim" className={styles.contact}>
          <span className={styles.sectionLabel}>BİRLİKTE GELİŞTİRİYORUZ</span>
          <h2>Sigorta acenteleri için daha iyi bir çalışma deneyimi.</h2>
          <p>
            AcenteHane şu anda geliştirme aşamasındadır. Ürün duyuruları ve
            iletişim bilgileri yakında burada yer alacak.
          </p>
        </section>
      </main>
      <footer className={styles.footer}>
        <span>© AcenteHane</span>
        <span>Sigorta acenteleri için dijital çalışma alanı</span>
      </footer>
    </div>
  );
}
