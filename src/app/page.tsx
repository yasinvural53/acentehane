import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#icerik">İçeriğe geç</a>
      <header className={styles.header}>
        <span className={styles.brand}>
          <span className={styles.mark} aria-hidden="true">a.</span>
          acentehane
        </span>
        <span className={styles.status}>Yeni bir başlangıç</span>
      </header>

      <main id="icerik" className={styles.main}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>ACENTEHANE’YE HOŞ GELDİNİZ</p>
          <h1>Güzel şeyler,<br />bir adımla başlar.</h1>
          <p className={styles.description}>
            İlk adımı attık. Şimdi Acentehane’yi birlikte şekillendiriyoruz.
          </p>
          <a className={styles.link} href="#baslangic">
            Başlangıcı keşfet <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className={styles.art} aria-hidden="true">
          <div className={styles.arch}><span>a.</span></div>
          <span className={styles.artLabel}>YENİ OLASILIKLARA AÇILAN BİR KAPI</span>
        </div>

        <section id="baslangic" className={styles.note} aria-labelledby="baslangic-baslik">
          <span className={styles.noteNumber} aria-hidden="true">01 /</span>
          <div>
            <h2 id="baslangic-baslik">Henüz yolun başındayız.</h2>
            <p>Acentehane’nin ilk sayfası burada. Yeni özellikler ve içerikler bu başlangıcın üzerine eklenecek.</p>
          </div>
          <span className={styles.noteSymbol} aria-hidden="true">✳</span>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>Acentehane</span>
        <span>Birlikte, adım adım.</span>
      </footer>
    </div>
  );
}
