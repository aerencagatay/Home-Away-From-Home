/* ============================================
   i18n — Lightweight language switching (EN/IT)
   ============================================ */

const translations = {
  en: {
    "nav.about": "About",
    "nav.openCall": "Open Call",
    "nav.contact": "Contact",
    "hero.tagline": "A Contemporary Art Exhibition",
    "hero.cta": "Apply to the Open Call",
    "about.title": "About the Exhibition",
    "about.text":
      "<em>Milano: Home Away From Home</em> explores what it means to build a life in a city that is not your own. Through the works of emerging artists who have experienced migration, displacement, or simply the quiet act of starting over, the exhibition transforms a WWII-era underground shelter into a space of reflection on belonging, identity, and the invisible ties that connect us to the places we call home \u2014 even temporarily. Set beneath Piazza Grandi in Milan, the venue itself carries the memory of shelter and refuge, echoing the journeys of the artists within.",
    "openCall.title": "Open Call for Artists",
    "openCall.whoTitle": "Who Can Apply",
    "openCall.whoText":
      "Emerging artists (18+) with experience living outside their home country or city, whose journey has crossed paths with Milan at some point.",
    "openCall.whatTitle": "What to Submit",
    "openCall.whatText":
      "Up to 3 works (existing or new) via the Google Forms application. All mediums are welcome.",
    "openCall.deadlineTitle": "Deadline",
    "openCall.deadlineText": "To be announced. Follow us for updates.",
    "openCall.applyBtn": "Apply to the Open Call",
    "openCall.guidelinesBtn": "Full Guidelines & Terms",
    "contact.title": "Contact",
    "contact.artistsTitle": "Artists",
    "contact.pressTitle": "Press",
    "contact.partnersTitle": "Partners & Sponsors",
    "footer.privacy": "Privacy Policy",
  },
  it: {
    "nav.about": "Info",
    "nav.openCall": "Bando",
    "nav.contact": "Contatti",
    "hero.tagline": "Una Mostra di Arte Contemporanea",
    "hero.cta": "Candidati al Bando",
    "about.title": "La Mostra",
    "about.text":
      "<em>Milano: Home Away From Home</em> esplora cosa significa costruire una vita in una citt\u00e0 che non \u00e8 la propria. Attraverso le opere di artisti emergenti che hanno vissuto la migrazione, lo spostamento, o semplicemente il gesto silenzioso di ricominciare, la mostra trasforma un rifugio antiaereo della Seconda Guerra Mondiale in uno spazio di riflessione sull\u2019appartenenza, l\u2019identit\u00e0 e i legami invisibili che ci collegano ai luoghi che chiamiamo casa \u2014 anche temporaneamente. Situata sotto Piazza Grandi a Milano, la sede stessa porta con s\u00e9 la memoria del rifugio e dell\u2019accoglienza, facendo eco ai percorsi degli artisti al suo interno.",
    "openCall.title": "Bando Aperto per Artisti",
    "openCall.whoTitle": "Chi Pu\u00f2 Candidarsi",
    "openCall.whoText":
      "Artisti emergenti (18+) con esperienza di vita al di fuori del proprio paese o citt\u00e0 di origine, il cui percorso si \u00e8 incrociato con Milano.",
    "openCall.whatTitle": "Cosa Presentare",
    "openCall.whatText":
      "Fino a 3 opere (esistenti o nuove) tramite il modulo Google Forms. Tutti i medium sono benvenuti.",
    "openCall.deadlineTitle": "Scadenza",
    "openCall.deadlineText": "Da annunciare. Seguici per aggiornamenti.",
    "openCall.applyBtn": "Candidati al Bando",
    "openCall.guidelinesBtn": "Linee Guida e Termini",
    "contact.title": "Contatti",
    "contact.artistsTitle": "Artisti",
    "contact.pressTitle": "Stampa",
    "contact.partnersTitle": "Partner e Sponsor",
    "footer.privacy": "Informativa sulla Privacy",
  },
};

let currentLang = localStorage.getItem("lang") || "en";

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;

  const strings = translations[lang];
  if (!strings) return;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (strings[key]) {
      if (strings[key].includes("<")) {
        el.innerHTML = strings[key];
      } else {
        el.textContent = strings[key];
      }
    }
  });

  // Update toggle button
  const toggleBtn = document.querySelector(".lang-toggle");
  if (toggleBtn) {
    const nextLang = lang === "en" ? "it" : "en";
    toggleBtn.textContent = nextLang.toUpperCase();
    toggleBtn.setAttribute("data-lang-target", nextLang);
  }
}

function initI18n() {
  setLanguage(currentLang);

  document.querySelector(".lang-toggle")?.addEventListener("click", () => {
    const target = document
      .querySelector(".lang-toggle")
      .getAttribute("data-lang-target");
    setLanguage(target);
  });
}

document.addEventListener("DOMContentLoaded", initI18n);
