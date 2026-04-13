/* ============================================
   i18n — Lightweight language switching (EN/IT)
   ============================================ */

const translations = {
  en: {
    "nav.about": "About",
    "nav.exhibition": "Exhibition",
    "nav.openCall": "Open Call",
    "nav.advisoryBoard": "Advisory Board",
    "nav.contact": "Contact",
    "exhibition.title": "Exhibition",
    "exhibition.text1": "<em>Milano: Home Away From Home</em> is a multidisciplinary contemporary art exhibition that brings together emerging artists whose lives and practices intersect with Milan. Through works spanning painting, photography, sculpture, installation, moving image, digital media, sound, and performance, the exhibition explores what it means to build a life in a city that is not one\u2019s own. Shaped by experiences of migration, displacement, or simply starting over, the works reflect on belonging, identity, and the invisible ties that connect people to the places they call home, even if only temporarily.",
    "exhibition.text2": "Focusing on artists who have arrived in Milan from elsewhere, the exhibition brings together diverse perspectives on navigating unfamiliar environments and forming connections within the city. Set in Milan, it echoes the journeys of the artists themselves, positioning the city as both a shared point of intersection and a lived space where memories, cultural encounters, and evolving identities continue to unfold.",
    "exhibition.meta": "June 2026 \u00b7 Milan \u00b7 Venue to be announced",
    "exhibition.applyPill": "Apply to the Open Call",
    "exhibition.teamLabel": "Curatorial & Exhibition Team",
    "exhibition.boardLink": "Advisory Board \u2192",
    "advisoryBoard.title": "Advisory Board",
    "advisoryBoard.footer": "The Advisory Board supports the curatorial and selection process by reviewing shortlisted submissions and providing expert guidance. It also serves as the jury for the exhibition prize, helping ensure a thoughtful and high-quality final selection.",
    "oc.heading": "Open Call for Artists",
    "oc.labelPrize": "Prize",
    "oc.valPrize": "\u20ac500 award for one artist",
    "oc.labelEntry": "Entry",
    "oc.valEntry": "Free to apply",
    "oc.labelWho": "Who Can Apply",
    "oc.valWho": "Early-stage artists who have lived, studied, or worked in Milan at some point. Still in the city or based somewhere else in the world. Must be at least 18 years old.",
    "oc.labelWhat": "What to Submit",
    "oc.valWhat": "Up to 3 works, existing or new. All mediums welcome.",
    "oc.downloadGuidelines": "Download Guidelines",
    "oc.labelDeadline": "Deadline",
    "oc.valDeadline": "3 May 2026 \u00b7 23:59 CET",
    "oc.labelExhibition": "Exhibition",
    "oc.valExhibition": "June 2026 \u00b7 Milan \u00b7 Date and venue to be announced",
    "oc.cta": "Start Application",
    "hero.tagline": "A Contemporary Art Exhibition",
    "hero.coming": "Coming to Milan · June 2026",
    "hero.openCallPill": "Open Call — Apply by 3 May",
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
    "apply.aboutYou": "About you",
    "apply.firstName": "First name",
    "apply.lastName": "Last name",
    "apply.artistName": "Artist name",
    "apply.artistNameNote": "(if different from above)",
    "apply.email": "Email",
    "apply.phone": "Phone",
    "apply.phoneNote": "include country code",
    "apply.instagram": "Instagram",
    "apply.biography": "Biography",
    "apply.biographyHint": "Please tell us about yourself. Your practice, where you\u2019re from, where you\u2019re based now, and your connection to Milan. Max 300 words.",
    "apply.fieldRequired": "This field is required",
    "apply.yourWork": "Your work",
    "apply.upTo3Works": "Up to 3 works",
    "apply.addWork": "+ Add another work",
    "apply.supportingMaterials": "Supporting materials",
    "apply.portfolio": "Portfolio",
    "apply.cv": "CV",
    "apply.portfolioUrl": "Website / Portfolio URL",
    "apply.chooseFile": "Choose file",
    "apply.changeFile": "Change file",
    "apply.orDragHere": " or drag here",
    "apply.portfolioHint": "PDF \u00b7 max 20 MB",
    "apply.cvHint": "PDF or DOC \u00b7 max 5 MB",
    "apply.declaration1": "All submitted works are original and created by me. If selected, I give the organisers permission to photograph and share images of my work to promote and document the exhibition. I retain all rights to my work.",
    "apply.declaration2": "I have read and accept the <a href=\"terms.html\" target=\"_blank\" class=\"plain-link\">Terms &amp; Conditions</a> and <a href=\"privacy.html\" target=\"_blank\" class=\"plain-link\">Privacy Policy</a>.",
    "apply.submitBtn": "Submit Application",
    "apply.submitHelp": "If you are having problems submitting the application form please email your materials to <a href=\"mailto:artists@homeawayfromhome.art\" class=\"apply-submit-help-link\">artists@homeawayfromhome.art</a>",
    "apply.work": "Work",
    "apply.workTitle": "Title <span class=\"req\">*</span>",
    "apply.workYear": "Year <span class=\"req\">*</span>",
    "apply.workClassification": "Classification <span class=\"req\">*</span>",
    "apply.workSelectType": "Select type",
    "apply.workMedium": "Medium <span class=\"req\">*</span>",
    "apply.workDimensions": "Dimensions",
    "apply.workDimensionsNote": "in centimetres (cm)",
    "apply.workWeight": "Weight",
    "apply.workWeightNote": "in kilograms (kg)",
    "apply.workImages": "Images <span class=\"req\">*</span>",
    "apply.workImagesHint": "Up to 4 images \u00b7 JPG, PNG or TIFF \u00b7 max 10 MB \u00b7 min 1500px",
    "apply.workImageRequired": "At least one image is required",
    "apply.addVideo": "+ Add video",
    "apply.removeVideo": "\u2212 Remove video",
    "apply.chooseVideo": "Choose video",
    "apply.videoHint": "MP4 \u00b7 max 500 MB",
    "apply.equipmentCheck": "I will bring my own display equipment (e.g. screen, power cord)",
    "apply.workAbout": "About this work <span class=\"req\">*</span>",
    "apply.workAboutHint": "What it is and how it connects to the themes of Home Away From Home. Max 200 words.",
    "apply.workInstallation": "Installation preferences",
    "apply.workInstallationHint": "Please share how you\u2019d ideally like your work displayed. Due to the nature of the venue some requests may have limitations, but if you are selected we will work with you to find the best solution.",
    "apply.workFlexible": "I\u2019m flexible, no specific requirements",
    "apply.removeWork": "Remove",
    "apply.downloadGuidelines": "Download guidelines",
  },
  it: {
    "nav.about": "Info",
    "nav.exhibition": "Mostra",
    "nav.openCall": "Bando",
    "nav.advisoryBoard": "Comitato Consultivo",
    "nav.contact": "Contatti",
    "exhibition.title": "Mostra",
    "exhibition.text1": "<em>Milano: Home Away From Home</em> \u00e8 una mostra d\u2019arte contemporanea multidisciplinare che riunisce artisti emergenti le cui vite e pratiche si intrecciano con Milano. Attraverso opere che spaziano dalla pittura alla fotografia, dalla scultura all\u2019installazione, all\u2019immagine in movimento, ai media digitali, al suono e alla performance, la mostra esplora cosa significa costruire una vita in una citt\u00e0 che non \u00e8 la propria. Plasmati da esperienze di migrazione, spostamento o semplicemente dal gesto silenzioso di ricominciare, i lavori riflettono sull\u2019appartenenza, l\u2019identit\u00e0 e i legami invisibili che uniscono le persone ai luoghi che chiamano casa, anche solo temporaneamente.",
    "exhibition.text2": "Incentrata su artisti arrivati a Milano da altrove, la mostra raccoglie prospettive diverse sul navigare ambienti sconosciuti e sul costruire connessioni all\u2019interno della citt\u00e0. Ambientata a Milano, fa eco ai percorsi degli artisti stessi, posizionando la citt\u00e0 sia come punto di intersezione condiviso che come spazio vissuto in cui ricordi, incontri culturali e identit\u00e0 in evoluzione continuano a dispiegarsi.",
    "exhibition.meta": "Giugno 2026 \u00b7 Milano \u00b7 Sede da annunciare",
    "exhibition.applyPill": "Candidati al Bando",
    "exhibition.teamLabel": "Team Curatoriale e di Mostra",
    "exhibition.boardLink": "Comitato Consultivo \u2192",
    "advisoryBoard.title": "Comitato Consultivo",
    "advisoryBoard.footer": "Il Comitato Consultivo supporta il processo curatoriale e di selezione esaminando le candidature selezionate e fornendo una guida specializzata. Funge inoltre da giuria per il premio della mostra, contribuendo a garantire una selezione finale attenta e di alta qualit\u00e0.",
    "oc.heading": "Bando Aperto per Artisti",
    "oc.labelPrize": "Premio",
    "oc.valPrize": "Premio di \u20ac500 per un artista",
    "oc.labelEntry": "Iscrizione",
    "oc.valEntry": "Candidatura gratuita",
    "oc.labelWho": "Chi Pu\u00f2 Candidarsi",
    "oc.valWho": "Artisti nelle prime fasi della carriera che hanno vissuto, studiato o lavorato a Milano in qualsiasi momento. Ancora in citt\u00e0 o con sede altrove nel mondo. Devono avere almeno 18 anni.",
    "oc.labelWhat": "Cosa Presentare",
    "oc.valWhat": "Fino a 3 opere, esistenti o nuove. Tutti i medium sono benvenuti.",
    "oc.downloadGuidelines": "Scarica le linee guida",
    "oc.labelDeadline": "Scadenza",
    "oc.valDeadline": "3 maggio 2026 \u00b7 23:59 CET",
    "oc.labelExhibition": "Mostra",
    "oc.valExhibition": "Giugno 2026 \u00b7 Milano \u00b7 Data e sede da annunciare",
    "oc.cta": "Inizia la candidatura",
    "hero.tagline": "Una Mostra di Arte Contemporanea",
    "hero.coming": "In arrivo a Milano · giugno 2026",
    "hero.openCallPill": "Bando — Candidatura entro il 3 maggio",
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
    "apply.aboutYou": "Su di te",
    "apply.firstName": "Nome",
    "apply.lastName": "Cognome",
    "apply.artistName": "Nome d\u2019arte",
    "apply.artistNameNote": "(se diverso dal precedente)",
    "apply.email": "Email",
    "apply.phone": "Telefono",
    "apply.phoneNote": "includi prefisso internazionale",
    "apply.instagram": "Instagram",
    "apply.biography": "Biografia",
    "apply.biographyHint": "Raccontaci di te. La tua pratica artistica, da dove vieni, dove sei basato/a ora e il tuo legame con Milano. Max 300 parole.",
    "apply.fieldRequired": "Questo campo \u00e8 obbligatorio",
    "apply.yourWork": "Le tue opere",
    "apply.upTo3Works": "Fino a 3 opere",
    "apply.addWork": "+ Aggiungi un\u2019altra opera",
    "apply.supportingMaterials": "Materiali di supporto",
    "apply.portfolio": "Portfolio",
    "apply.cv": "CV",
    "apply.portfolioUrl": "Sito web / URL Portfolio",
    "apply.chooseFile": "Scegli file",
    "apply.changeFile": "Cambia file",
    "apply.orDragHere": " o trascina qui",
    "apply.portfolioHint": "PDF \u00b7 max 20 MB",
    "apply.cvHint": "PDF o DOC \u00b7 max 5 MB",
    "apply.declaration1": "Tutte le opere presentate sono originali e create da me. Se selezionato/a, autorizzo gli organizzatori a fotografare e condividere immagini delle mie opere per promuovere e documentare la mostra. Conservo tutti i diritti sulle mie opere.",
    "apply.declaration2": "Ho letto e accetto i <a href=\"terms.html\" target=\"_blank\" class=\"plain-link\">Termini e Condizioni</a> e la <a href=\"privacy.html\" target=\"_blank\" class=\"plain-link\">Informativa sulla Privacy</a>.",
    "apply.submitBtn": "Invia candidatura",
    "apply.submitHelp": "Se hai problemi con l\u2019invio del modulo, invia i tuoi materiali via email a <a href=\"mailto:artists@homeawayfromhome.art\" class=\"apply-submit-help-link\">artists@homeawayfromhome.art</a>",
    "apply.work": "Opera",
    "apply.workTitle": "Titolo <span class=\"req\">*</span>",
    "apply.workYear": "Anno <span class=\"req\">*</span>",
    "apply.workClassification": "Classificazione <span class=\"req\">*</span>",
    "apply.workSelectType": "Seleziona tipo",
    "apply.workMedium": "Tecnica <span class=\"req\">*</span>",
    "apply.workDimensions": "Dimensioni",
    "apply.workDimensionsNote": "in centimetri (cm)",
    "apply.workWeight": "Peso",
    "apply.workWeightNote": "in chilogrammi (kg)",
    "apply.workImages": "Immagini <span class=\"req\">*</span>",
    "apply.workImagesHint": "Fino a 4 immagini \u00b7 JPG, PNG o TIFF \u00b7 max 10 MB \u00b7 min 1500px",
    "apply.workImageRequired": "\u00c8 richiesta almeno un\u2019immagine",
    "apply.addVideo": "+ Aggiungi video",
    "apply.removeVideo": "\u2212 Rimuovi video",
    "apply.chooseVideo": "Scegli video",
    "apply.videoHint": "MP4 \u00b7 max 500 MB",
    "apply.equipmentCheck": "Porter\u00f2 la mia attrezzatura di visualizzazione (es. schermo, cavo di alimentazione)",
    "apply.workAbout": "Su quest\u2019opera <span class=\"req\">*</span>",
    "apply.workAboutHint": "Di cosa si tratta e come si collega ai temi di Home Away From Home. Max 200 parole.",
    "apply.workInstallation": "Preferenze di installazione",
    "apply.workInstallationHint": "Indica come vorresti idealmente esporre la tua opera. Data la natura della sede, alcune richieste potrebbero avere limitazioni, ma in caso di selezione lavoreremo con te per trovare la soluzione migliore.",
    "apply.workFlexible": "Sono flessibile, nessun requisito specifico",
    "apply.removeWork": "Rimuovi",
    "apply.downloadGuidelines": "Scarica le linee guida",
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

// Global helper: t('key') → translated string (falls back to EN then key itself)
window.t = function(key) {
  return (translations[currentLang] && translations[currentLang][key]) ||
         (translations.en && translations.en[key]) ||
         key;
};

// Apply translations to a subtree (used after dynamic DOM insertion)
window.applyI18n = function(root) {
  const strings = translations[currentLang];
  if (!strings) return;
  (root || document).querySelectorAll("[data-i18n]").forEach(function(el) {
    const key = el.getAttribute("data-i18n");
    if (strings[key] !== undefined) {
      if (strings[key].includes("<")) {
        el.innerHTML = strings[key];
      } else {
        el.textContent = strings[key];
      }
    }
  });
};

document.addEventListener("DOMContentLoaded", initI18n);
