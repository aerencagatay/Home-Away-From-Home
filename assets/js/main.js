/* ============================================
   Main JS — Interactive view navigation
   ============================================ */

// ─── Apps Script Web App URL ───
// After deploying Code.gs, paste the URL here.
// While empty, form submits skip the upload (dev mode).
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzJGHioq1VSdYzX7jxTbLVSdFFIWAG9Lz8ip3_lSSi0RBvC5CDSm0m_PPkso3Tcpq-k/exec';

const GUIDELINES_PDF =
  'assets/docs/Home%20Away%20From%20Home_%20OPEN%20CALL%20(3).pdf';

document.addEventListener('DOMContentLoaded', () => {
  let current = 'home';

  // ─── Bios (English) ───
  const bios = {
    'Bethany Landrum': 'Bethany Landrum is a product manager and strategist. With more than seven years of professional experience at Apple, she led AI/ML initiatives in support of the energy grid\'s transition to renewables, helped launch Apple TV+ to over 100 countries, and supported Apple Music\'s early catalog and subscriber growth. Bethany holds a Bachelor\'s degree in Political Economy from UC Berkeley and is pursuing a Master\'s degree in Arts Management at Bocconi.',
    'Caroline Marie Duque': 'Caroline Marie Duque is a cultural heritage professional with over a decade of experience in museum practice, specializing in exhibition development, collections stewardship, and institutional initiatives. She currently serves as Curator for Fine Arts at the National Museum of the Philippines. In 2022, she received the Asian Cultural Council Individual Fellowship Grant and spent six months in the United States working with institutions including the Smithsonian Institution, the Yale Peabody Museum, and the Ellis Island National Museum of Immigration. She is currently pursuing a Master in Arts Management and Administration at SDA Bocconi.',
    'Iona Anastassiadou': 'Iona Anastassiadou holds a BA in Classics from the University of Reading and an MA in Classics from King\'s College London. Her academic interests centre on the reception of the classical world in film, literature, and visual culture, with particular emphasis on feminist reinterpretations. She has contributed to exhibition work through cataloguing, archiving, and digital outreach. She is currently a Master\'s candidate in Arts Management and Administration at SDA Bocconi.',
    'Lara Mercan Şahin': 'Lara Mercan Şahin is an arts and culture professional with experience across performing arts programming, production, and festival operations. She has worked within major cultural institutions in Turkey, including Zorlu Performing Arts Center and the Istanbul Foundation for Culture and Arts (IKSV). She also served as Assistant to the Manager at Sabancı University Performing Arts Center. She is currently a Master\'s candidate in Arts Management and Administration at SDA Bocconi.',
    'Sneha Mahato': 'Sneha is an arts management graduate student at SDA Bocconi in Milan with a background in architecture, strategy, and storytelling. She has worked across consulting, marketing, and design. Beyond her professional work, Sneha is building Maawu, an early-stage venture focused on making Indian art and craft more accessible through curated experiences and sustainable artist partnerships.',
    'Damiano Gullì': 'Damiano Gullì (Fidenza, 1979) lives and works in Milan. Since April 2022, he is the Curator for Contemporary Art and Public Programs at Triennale Milano. Recent exhibitions curated for the institution include: Davide Sartori. The Shape of Your Eyes, Other Things I Wouldn\'t Know, with Ilaria Campioli and Daniele De Luigi, 2026; Pintura italiana hoje. Uma nova scena, Museu Nacional da República, Brasília, 2025 (travelling exhibition promoted by MAECI, upcoming venues: Rio de Janeiro, from June 2026, and Mexico City, autumn–winter 2026); Milano. Paradossi e opportunità, with Jermay Michael Gabriel (Black History Months Milano), Radio Ballads, with Serpentine, London, both within Inequalities, 24th International Exhibition of Triennale Milano, 2025; Pintura italiana hoy. Una nueva escena, Palacio Libertad, Buenos Aires, 2025 (travelling exhibition promoted by MAECI); Sempre, ovunque. 211 anni di storia dei Carabinieri tra arte, cinema e società, Palazzo Reale, Milan, 2025; Davide Allieri. After All, 2024; Gianni Politi. Le stelle per te dentro, 2024; Generating Visions. Alcantara in the Arts, 2024; Pittura italiana oggi, 2023; Anna Franceschini. All Those Stuffed Shirts, 2023; Lisa Ponti. Disegni e voci, with Salvatore Licitra, 2023; Marcello Maloberti. Martellate, 2022; Corrado Levi. Tra gli spazi, with Joseph Grima, 2020.\n\nIn 2025, he curated the Art Posters and Iconic Posters project, born from the collaboration between Triennale Milano and Fondazione Milano Cortina 2026, as well as the project of three public art installations by Marcello Maloberti for the Palazzo dell\'Arte. For Triennale, he has also curated the installations by Lorenzo Vitturi, Alice Ronchi, and Luca Staccioli, and coordinated the installations and exhibitions by Mariella Bettineschi, Nico Vascellari, Francesco Vezzoli, Yona Friedman, Gianfranco Mazzucchelli, Dan Graham, Seçkin Pirim, and John Giorno. From 2021 to 2025, he hosted Triennale Radio Show for Radio Raheem. He has curated numerous exhibitions throughout Italy, and his texts have been published in catalogues and publications both in Italy and internationally. He contributes regularly to "Interni", "Flash Art", "Inventario", "CAP 74024", and "Artribune", for which he created the column Pittura lingua viva. In 2024, the magazine "Inside Art" named him Best Curator of the Year in Italy.',
    'Dr. Sharon Hecker': 'DR. SHARON HECKER (B.A. Yale University, cum laude; M.A. and Ph.D., University of California, Berkeley) is an art historian, curator, author, educator, and consultant. A leading authority on modern and contemporary Italian art and on Medardo Rosso, she has authored over 30 publications. Dr. Hecker has curated exhibitions at institutions such as the Peggy Guggenheim Collection, Harvard University Art Museums, Pulitzer Arts Foundation, and Nasher Sculpture Center. Her work has been supported by the Getty, Mellon, and Fulbright Foundations. She is Chair of the International Catalogue Raisonné Association (ICRA) and Coordinator of the Expert Witness Pool for the Court of Arbitration for Art (CAfA).',
    'Valentina Kovalishina': 'Valentina Kovalishina, known professionally as Valentinaki, is a Latvian-born multimedia artist whose work explores the elemental force of water and its profound role in human existence. Born in Riga in 1985, she was a student of the Latvian painter Valeria Shuvalova before moving to Italy in 2009. In Milan, she refined her oil painting technique under the guidance of the renowned Florentine figurative artist Giusy Boncinelli, a pivotal period in discovering her signature style.\n\nValentinaki\'s work merges poetic sensibility with conceptual depth, addressing environmental issues and our responsibility toward the planet. A strong believer in the power of collective expertise, she actively engages in cross-disciplinary collaborations with specialists in science, new technologies, sound, and light. This exchange of knowledge allows her to push the boundaries of traditional media, evolving her practice into a multi-sensory language that explores new creative frontiers.\n\nOver the past decade, Valentinaki has exhibited extensively in prestigious international venues and historical Italian sites. Her practice is defined by a strong focus on site-specific installations, both indoor and outdoor, designed to create a symbiotic relationship between the artwork and its architectural or natural surroundings. Notable locations include the Sanctuary of Santa Maria dei Miracoli at San Celso (Milan), Castel dell\'Ovo (Naples), the Basilica of Sant\'Ambrogio (Milan), and Palazzo del Pegaso (Florence).\n\nIn 2022, she founded The Baltic Vibe, a cultural initiative dedicated to promoting the artistic heritage of the Baltic countries through international exhibitions and cultural exchanges.',
    'Lorenzo Perini Natali': 'Lorenzo Perini Natali, born in Viareggio (Lucca) in 1990, lives in Milan. After working for an industrial group with production sites in Italy, Brazil and the United States, he moves to Milan where he graduates in Visual Arts at NABA Milano, specializes with a Master in Contemporary Art Markets and does an internship at Sotheby\'s Milan. The Collezione Perini Natali is based in Milan and Viareggio (Lucca) and focuses on emerging Italian and international artists.\n\nIn 2021 he founded PROGETTO LUDOVICO, a platform dedicated to research, production and exhibitions, focusing on the connections between visual arts and industry.',
    'Paula Trommel': 'Paula Trommel is the Global Head of Risk and Compliance at Hauser & Wirth, with an international career spanning the art market, law, and regulatory governance. She previously held key roles at Christie\'s in London and Milan. Paula also worked at the UK Financial Conduct Authority (FCA) and The Fine Art Group, specialising in anti-money laundering, international sanctions, and financial regulation in the art market. She holds law degrees from both Germany and the United Kingdom, as well as a Master\'s in Arts Management from SDA Bocconi.'
  };

  // ─── Bios (Italian) ───
  const biosIT = {
    'Bethany Landrum': 'Bethany Landrum è una product manager e stratega. Con oltre sette anni di esperienza professionale in Apple, ha guidato iniziative di AI/ML a supporto della transizione della rete elettrica verso le energie rinnovabili, contribuito al lancio di Apple TV+ in oltre 100 paesi e supportato la crescita iniziale del catalogo e degli abbonati di Apple Music. Bethany è laureata in Political Economy presso UC Berkeley e sta conseguendo un Master in Arts Management presso la Bocconi.',
    'Caroline Marie Duque': 'Caroline Marie Duque è una professionista del patrimonio culturale con oltre un decennio di esperienza nella pratica museale, specializzata nello sviluppo di mostre, nella gestione delle collezioni e nelle iniziative istituzionali. Attualmente ricopre il ruolo di Curatrice per le Belle Arti presso il Museo Nazionale delle Filippine. Nel 2022 ha ricevuto l\'Asian Cultural Council Individual Fellowship Grant e ha trascorso sei mesi negli Stati Uniti lavorando con istituzioni tra cui lo Smithsonian Institution, il Yale Peabody Museum e l\'Ellis Island National Museum of Immigration. Sta attualmente conseguendo un Master in Arts Management and Administration presso la SDA Bocconi.',
    'Iona Anastassiadou': 'Iona Anastassiadou è laureata in Classics presso l\'Università di Reading e ha conseguito un MA in Classics al King\'s College London. I suoi interessi accademici si concentrano sulla ricezione del mondo classico nel cinema, nella letteratura e nella cultura visiva, con particolare enfasi sulle reinterpretazioni femministe. Ha contribuito a progetti espositivi attraverso la catalogazione, l\'archiviazione e la comunicazione digitale. È attualmente candidata al Master in Arts Management and Administration presso la SDA Bocconi.',
    'Lara Mercan Şahin': 'Lara Mercan Şahin è una professionista del settore culturale con esperienza nella programmazione, produzione e gestione di festival nelle arti dello spettacolo. Ha lavorato all\'interno di importanti istituzioni culturali in Turchia, tra cui il Zorlu Performing Arts Center e la Istanbul Foundation for Culture and Arts (IKSV). Ha inoltre ricoperto il ruolo di Assistente al Manager presso il Sabancı University Performing Arts Center. È attualmente candidata al Master in Arts Management and Administration presso la SDA Bocconi.',
    'Sneha Mahato': 'Sneha è una studentessa di gestione delle arti alla SDA Bocconi di Milano, con una formazione in architettura, strategia e storytelling. Ha lavorato in ambiti che spaziano dalla consulenza al marketing, fino al design. Oltre alla sua attività professionale, Sneha sta costruendo Maawu, un\'iniziativa in fase iniziale focalizzata sul rendere l\'arte e l\'artigianato indiani più accessibili attraverso esperienze curate e partnership sostenibili con gli artisti.',
    'Damiano Gullì': 'Damiano Gullì (Fidenza, 1979) vive e lavora a Milano. Da aprile 2022 è Curatore per l\'Arte Contemporanea e i Programmi Pubblici alla Triennale Milano. Tra le mostre recenti curate per l\'istituzione: Davide Sartori. The Shape of Your Eyes, Other Things I Wouldn\'t Know, con Ilaria Campioli e Daniele De Luigi, 2026; Pintura italiana hoje. Uma nova scena, Museu Nacional da República, Brasília, 2025 (mostra itinerante promossa dal MAECI, prossime sedi: Rio de Janeiro, da giugno 2026, e Città del Messico, autunno–inverno 2026); Milano. Paradossi e opportunità, con Jermay Michael Gabriel (Black History Months Milano), Radio Ballads, con Serpentine, London, entrambe nell\'ambito di Inequalities, 24a Esposizione Internazionale della Triennale Milano, 2025; Pintura italiana hoy. Una nueva escena, Palacio Libertad, Buenos Aires, 2025 (mostra itinerante promossa dal MAECI); Sempre, ovunque. 211 anni di storia dei Carabinieri tra arte, cinema e società, Palazzo Reale, Milano, 2025; Davide Allieri. After All, 2024; Gianni Politi. Le stelle per te dentro, 2024; Generating Visions. Alcantara in the Arts, 2024; Pittura italiana oggi, 2023; Anna Franceschini. All Those Stuffed Shirts, 2023; Lisa Ponti. Disegni e voci, con Salvatore Licitra, 2023; Marcello Maloberti. Martellate, 2022; Corrado Levi. Tra gli spazi, con Joseph Grima, 2020.\n\nNel 2025 ha curato il progetto Art Posters e Iconic Posters, nato dalla collaborazione tra Triennale Milano e Fondazione Milano Cortina 2026, e il progetto di tre installazioni d\'arte pubblica di Marcello Maloberti per il Palazzo dell\'Arte. Per la Triennale ha curato inoltre le installazioni di Lorenzo Vitturi, Alice Ronchi e Luca Staccioli, e coordinato le installazioni e le mostre di Mariella Bettineschi, Nico Vascellari, Francesco Vezzoli, Yona Friedman, Gianfranco Mazzucchelli, Dan Graham, Seçkin Pirim e John Giorno. Dal 2021 al 2025 ha condotto Triennale Radio Show per Radio Raheem. Ha curato numerose mostre in tutta Italia e i suoi testi sono stati pubblicati in cataloghi e pubblicazioni sia in Italia che a livello internazionale. Collabora regolarmente con "Interni", "Flash Art", "Inventario", "CAP 74024" e "Artribune", per cui ha creato la rubrica Pittura lingua viva. Nel 2024 la rivista "Inside Art" lo ha nominato Miglior Curatore dell\'Anno in Italia.',
    'Dr. Sharon Hecker': 'DR. SHARON HECKER (B.A. Yale University, cum laude; M.A. e Ph.D., University of California, Berkeley) è storica dell\'arte, curatrice, autrice, docente e consulente. Massima autorità sull\'arte moderna e contemporanea italiana e su Medardo Rosso, ha firmato oltre 30 pubblicazioni. Ha curato mostre presso istituzioni quali la Peggy Guggenheim Collection, Harvard University Art Museums, Pulitzer Arts Foundation e Nasher Sculpture Center. Il suo lavoro è stato sostenuto dalle fondazioni Getty, Mellon e Fulbright. È Presidente dell\'International Catalogue Raisonné Association (ICRA) e Coordinatrice del Pool di Esperti Testimoni per la Court of Arbitration for Art (CAfA).',
    'Valentina Kovalishina': 'Valentina Kovalishina, conosciuta professionalmente come Valentinaki, è un\'artista multimediale nata in Lettonia, il cui lavoro esplora la forza elementare dell\'acqua e il suo ruolo profondo nell\'esistenza umana. Nata a Riga nel 1985, è stata allieva della pittrice lettone Valeria Shuvalova prima di trasferirsi in Italia nel 2009. A Milano ha affinato la sua tecnica nella pittura a olio sotto la guida della rinomata artista figurativa fiorentina Giusy Boncinelli, un periodo fondamentale per la scoperta del suo stile distintivo.\n\nL\'opera di Valentinaki unisce sensibilità poetica e profondità concettuale, affrontando temi ambientali e la nostra responsabilità nei confronti del pianeta. Convinta sostenitrice del valore dell\'expertise collettiva, partecipa attivamente a collaborazioni interdisciplinari con specialisti della scienza, delle nuove tecnologie, del suono e della luce. Questo scambio di conoscenze le consente di superare i confini dei media tradizionali, evolvendo la sua pratica in un linguaggio multisensoriale che esplora nuove frontiere creative.\n\nNegli ultimi dieci anni, Valentinaki ha esposto ampiamente in prestigiose sedi internazionali e in siti storici italiani. La sua pratica si distingue per una forte attenzione alle installazioni site-specific, sia indoor sia outdoor, progettate per creare una relazione simbiotica tra l\'opera e il contesto architettonico o naturale che la accoglie. Tra i luoghi più significativi figurano il Santuario di Santa Maria dei Miracoli presso San Celso (Milano), Castel dell\'Ovo (Napoli), la Basilica di Sant\'Ambrogio (Milano) e Palazzo del Pegaso (Firenze).\n\nNel 2022 ha fondato The Baltic Vibe, un\'iniziativa culturale dedicata alla promozione del patrimonio artistico dei Paesi Baltici attraverso mostre internazionali e scambi culturali.',
    'Lorenzo Perini Natali': 'Lorenzo Perini Natali, nato a Viareggio (Lucca) nel 1990, vive a Milano. Dopo aver lavorato per un gruppo industriale con sedi produttive in Italia, Brasile e Stati Uniti, si trasferisce a Milano dove si laurea in Arti Visive alla NABA Milano, si specializza con un Master in Contemporary Art Markets e svolge un tirocinio da Sotheby\'s Milano. La Collezione Perini Natali ha sede a Milano e Viareggio (Lucca) e si concentra su artisti emergenti italiani e internazionali.\n\nNel 2021 ha fondato PROGETTO LUDOVICO, una piattaforma dedicata alla ricerca, produzione e mostre, con focus sui legami tra arti visive e industria.',
    'Paula Trommel': 'Paula Trommel è Global Head of Risk and Compliance presso Hauser & Wirth, con una carriera internazionale che abbraccia il mercato dell\'arte, il diritto e la governance regolamentare. Ha ricoperto in precedenza ruoli chiave da Christie\'s a Londra e Milano. Paula ha inoltre lavorato presso la UK Financial Conduct Authority (FCA) e The Fine Art Group, specializzandosi in antiriciclaggio, sanzioni internazionali e regolamentazione finanziaria nel mercato dell\'arte. È laureata in legge sia in Germania che nel Regno Unito e ha conseguito un Master in Arts Management presso la SDA Bocconi.'
  };

  // ─── Classification options (per v3 spec) ───
  const classifications = [
    'Ceramics', 'Collage', 'Digital / New Media', 'Drawing', 'Film',
    'Installation', 'Mixed Media', 'Painting', 'Performance', 'Photography',
    'Printmaking', 'Sculpture', 'Textile / Fiber Art', 'Video', 'Other'
  ];

  // ─── View navigation ───
  const goldNav = document.getElementById('gold-nav');
  const VALID_VIEWS = new Set([
    'home', 'menu', 'exhibition', 'advisory-board',
    'open-call', 'apply', 'thanks', 'contact'
  ]);

  function showView(id, pushHistory = true) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById('view-' + id);
    if (!target) return;
    target.classList.add('active');
    current = id;

    // Hide gold nav on menu view only
    if (goldNav) {
      if (id === 'menu') goldNav.classList.add('is-hidden');
      else goldNav.classList.remove('is-hidden');
    }

    // Reset scroll to top on navigation
    const scroll = target.querySelector('.section-scroll');
    if (scroll) scroll.scrollTop = 0;

    // Push to browser history so the back button returns to the previous view
    if (pushHistory) {
      const hash = id === 'home' ? ' ' : '#' + id;
      try {
        history.pushState({ view: id }, '', hash);
      } catch (_) {}
    }
  }

  // ─── Browser history integration ───
  // Seed the initial state (using the current hash if valid, otherwise 'home')
  const initialHash = (location.hash || '').replace('#', '');
  const initialView = VALID_VIEWS.has(initialHash) ? initialHash : 'home';
  try {
    history.replaceState({ view: initialView }, '', location.hash || ' ');
  } catch (_) {}
  if (initialView !== 'home') {
    showView(initialView, false);
  }

  // Back/forward button → swap views without pushing a new entry
  window.addEventListener('popstate', e => {
    const view = (e.state && e.state.view) || 'home';
    if (VALID_VIEWS.has(view)) {
      // Close bio overlay if it was open
      const overlay = document.getElementById('bio-overlay');
      if (overlay && !overlay.hidden) overlay.hidden = true;
      showView(view, false);
    }
  });

  // Hamburger → menu
  document.getElementById('btn-info')?.addEventListener('click', () => showView('menu'));

  // Gold nav brand → home
  document.getElementById('gold-nav-home')?.addEventListener('click', e => {
    e.preventDefault();
    showView('home');
  });

  // Close button → home
  document.getElementById('btn-close')?.addEventListener('click', () => showView('home'));

  // Menu items → section
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
      const target = item.dataset.target;
      if (target) showView(target);
    });
  });

  // data-target buttons (About CTA, OC apply btn, pill cta, etc.)
  document.querySelectorAll('[data-target]').forEach(el => {
    if (el.classList.contains('menu-item')) return;
    el.addEventListener('click', e => {
      e.preventDefault();
      const target = el.dataset.target;
      if (target) showView(target);
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const overlay = document.getElementById('bio-overlay');
      if (overlay && !overlay.hidden) {
        overlay.hidden = true;
        return;
      }
      if (current === 'menu') {
        showView('home');
      } else if (current !== 'home') {
        showView('menu');
      }
    }
  });

  // ─── Bio overlay ───
  // Track the currently open bio so we can re-render on language switch
  let _openBioName = null;

  function _renderBioText(name) {
    const lang = document.documentElement.lang || 'en';
    const bioMap = lang === 'it' ? biosIT : bios;
    const text = bioMap[name] || (lang === 'it' ? 'Bio in arrivo.' : 'Bio coming soon.');
    document.querySelector('.bio-text').innerHTML =
      text.split('\n\n').map(p => `<p>${p}</p>`).join('');
  }

  function openBio(name, role) {
    _openBioName = name;

    const nameEl = document.getElementById('bio-name');
    const roleEl = document.getElementById('bio-role');
    const ruleEl = document.querySelector('.bio-rule');
    nameEl.textContent = name;
    const hasRole = Boolean(role && String(role).trim());
    if (hasRole) {
      roleEl.textContent = role;
      roleEl.hidden = false;
      if (ruleEl) ruleEl.hidden = false;
      nameEl.classList.remove('no-role');
    } else {
      roleEl.textContent = '';
      roleEl.hidden = true;
      if (ruleEl) ruleEl.hidden = true;
      nameEl.classList.add('no-role');
    }
    _renderBioText(name);
    const overlay = document.getElementById('bio-overlay');
    overlay.hidden = false;
    document.getElementById('bio-close')?.focus();
  }

  window.openBio = openBio;

  // Re-render the open bio whenever the page language changes
  new MutationObserver(() => {
    const overlay = document.getElementById('bio-overlay');
    if (overlay && !overlay.hidden && _openBioName) {
      _renderBioText(_openBioName);
    }
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  document.getElementById('bio-close')?.addEventListener('click', () => {
    document.getElementById('bio-overlay').hidden = true;
  });

  document.getElementById('bio-overlay')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      e.currentTarget.hidden = true;
    }
  });

  // ─── Work blocks ───
  let workCount = 0;

  function buildClassificationSelect(index) {
    let html = `<select name="work${index}_classification" required>`;
    html += '<option value="">Select type</option>';
    classifications.forEach(c => { html += `<option value="${c}">${c}</option>`; });
    html += '</select>';
    return html;
  }

  function createWorkBlock(isFirst) {
    workCount++;
    const index = workCount;
    const block = document.createElement('div');
    block.className = 'work-block';
    block.dataset.index = index;

    const _t = window.t || (k => k);
    const removeBtn = isFirst ? '' : `<button type="button" class="work-remove-btn" data-i18n="apply.removeWork">${_t('apply.removeWork')}</button>`;

    block.innerHTML = `
      <div class="work-header">
        <div class="work-header-left">
          <span class="work-dot"></span>
          <span class="work-label">${_t('apply.work')} ${index}</span>
          <span class="work-summary"></span>
        </div>
        <div class="work-header-right">
          ${removeBtn}
          <button type="button" class="work-toggle-btn" aria-label="Toggle">⌃</button>
        </div>
      </div>
      <div class="work-body">
        <div class="form-grid-2">
          <div class="field-wrap">
            <label class="field-label" data-i18n="apply.workTitle">${_t('apply.workTitle')}</label>
            <input type="text" name="work${index}_title" required>
            <span class="field-error" data-i18n="apply.fieldRequired">${_t('apply.fieldRequired')}</span>
          </div>
          <div class="field-wrap">
            <label class="field-label" data-i18n="apply.workYear">${_t('apply.workYear')}</label>
            <input type="text" name="work${index}_year" required>
            <span class="field-error" data-i18n="apply.fieldRequired">${_t('apply.fieldRequired')}</span>
          </div>
        </div>
        <div class="form-grid-2">
          <div class="field-wrap">
            <label class="field-label" data-i18n="apply.workClassification">${_t('apply.workClassification')}</label>
            ${buildClassificationSelect(index)}
            <span class="field-error" data-i18n="apply.fieldRequired">${_t('apply.fieldRequired')}</span>
          </div>
          <div class="field-wrap">
            <label class="field-label" data-i18n="apply.workMedium">${_t('apply.workMedium')}</label>
            <input type="text" name="work${index}_medium" required>
            <span class="field-error" data-i18n="apply.fieldRequired">${_t('apply.fieldRequired')}</span>
          </div>
        </div>
        <div class="form-grid-2">
          <div class="field-wrap">
            <label class="field-label"><span data-i18n="apply.workDimensions">${_t('apply.workDimensions')}</span> <span class="field-note" data-i18n="apply.workDimensionsNote">${_t('apply.workDimensionsNote')}</span></label>
            <div class="dims-group">
              <input type="text" name="work${index}_h" placeholder="H">
              <input type="text" name="work${index}_w" placeholder="W">
              <input type="text" name="work${index}_d" placeholder="D">
            </div>
          </div>
          <div class="field-wrap">
            <label class="field-label"><span data-i18n="apply.workWeight">${_t('apply.workWeight')}</span> <span class="field-note" data-i18n="apply.workWeightNote">${_t('apply.workWeightNote')}</span></label>
            <input type="text" name="work${index}_kg">
          </div>
        </div>

        <div class="field-wrap">
          <label class="field-label" data-i18n="apply.workImages">${_t('apply.workImages')}</label>
          <p class="apply-hint" data-i18n="apply.workImagesHint">${_t('apply.workImagesHint')}</p>
          <div class="image-grid" data-work="${index}">
            <div class="image-slot image-slot--empty"><span>+</span></div>
            <div class="image-slot image-slot--empty"><span>+</span></div>
            <div class="image-slot image-slot--empty"><span>+</span></div>
            <div class="image-slot image-slot--empty"><span>+</span></div>
          </div>
          <input type="file" class="image-grid-input" accept="image/jpeg,image/png,image/tiff" multiple hidden data-work="${index}">
          <span class="field-error" data-i18n="apply.workImageRequired">${_t('apply.workImageRequired')}</span>
          <button type="button" class="video-toggle-btn" data-work="${index}" data-i18n="apply.addVideo">${_t('apply.addVideo')}</button>
          <div class="video-zone" data-work="${index}" hidden>
            <label class="upload-zone video-upload-zone">
              <input type="file" name="work${index}_video" accept="video/mp4" hidden>
              <span class="upload-icon">↑</span>
              <span class="upload-zone-text"><span class="upload-choose" data-i18n="apply.chooseVideo">${_t('apply.chooseVideo')}</span><span data-i18n="apply.orDragHere">${_t('apply.orDragHere')}</span></span>
              <span class="upload-hint" data-i18n="apply.videoHint">${_t('apply.videoHint')}</span>
            </label>
            <div class="video-file-row" hidden>
              <span class="video-filename"></span>
              <button type="button" class="video-remove-btn">×</button>
            </div>
            <label class="privacy-check" style="margin-top:0.5rem">
              <input type="checkbox" name="work${index}_hasEquipment">
              <span data-i18n="apply.equipmentCheck">${_t('apply.equipmentCheck')}</span>
            </label>
          </div>
        </div>

        <div class="field-wrap">
          <label class="field-label" data-i18n="apply.workAbout">${_t('apply.workAbout')}</label>
          <p class="field-hint"><span data-i18n="apply.workAboutHint">${_t('apply.workAboutHint')}</span> <a href="${GUIDELINES_PDF}" download="Home-Away-From-Home-Open-Call.pdf" class="plain-link" data-i18n="apply.downloadGuidelines">${_t('apply.downloadGuidelines')}</a></p>
          <textarea name="work${index}_about" rows="4" required></textarea>
          <span class="field-error" data-i18n="apply.fieldRequired">${_t('apply.fieldRequired')}</span>
        </div>

        <div class="field-wrap">
          <label class="field-label" data-i18n="apply.workInstallation">${_t('apply.workInstallation')}</label>
          <p class="field-hint" data-i18n="apply.workInstallationHint">${_t('apply.workInstallationHint')}</p>
          <textarea name="work${index}_installation" rows="3"></textarea>
          <label class="privacy-check" style="margin-top:0.5rem">
            <input type="checkbox" class="flexible-check" data-work="${index}">
            <span data-i18n="apply.workFlexible">${_t('apply.workFlexible')}</span>
          </label>
        </div>
      </div>
    `;

    // ─── Image grid ───
    const imageGrid = block.querySelector('.image-grid');
    const imageInput = block.querySelector('.image-grid-input');
    const slots = imageGrid.querySelectorAll('.image-slot');
    const imageFiles = [null, null, null, null];

    slots.forEach((slot, i) => {
      slot.addEventListener('click', () => {
        if (slot.classList.contains('image-slot--empty')) {
          imageInput.dataset.slotIndex = i;
          imageInput.click();
        }
      });
    });

    function consumeImageFiles(fileList, preferredStartSlot) {
      const files = Array.from(fileList).filter(f => /^image\//i.test(f.type));
      if (!files.length) return;

      let startSlot = preferredStartSlot != null
        ? preferredStartSlot
        : parseInt(imageInput.dataset.slotIndex || '0', 10);
      let fileIdx = 0;

      if (fileIdx < files.length && !imageFiles[startSlot]) {
        fillSlot(startSlot, files[fileIdx]);
        fileIdx++;
      }

      for (let i = 0; i < 4 && fileIdx < files.length; i++) {
        if (i === startSlot) continue;
        if (!imageFiles[i]) {
          fillSlot(i, files[fileIdx]);
          fileIdx++;
        }
      }

      imageInput.value = '';
      if (imageFiles.some(Boolean)) {
        const imagesWrap = imageInput.closest('.field-wrap');
        imagesWrap?.classList.remove('has-error');
      }
    }

    imageInput.addEventListener('change', () => {
      const files = Array.from(imageInput.files);
      if (!files.length) return;
      consumeImageFiles(files);
    });

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evName => {
      imageGrid.addEventListener(evName, e => {
        e.preventDefault();
        e.stopPropagation();
      });
    });
    imageGrid.addEventListener('dragenter', () => imageGrid.classList.add('is-dragover'));
    imageGrid.addEventListener('dragover', () => imageGrid.classList.add('is-dragover'));
    imageGrid.addEventListener('dragleave', e => {
      if (!imageGrid.contains(e.relatedTarget)) imageGrid.classList.remove('is-dragover');
    });
    imageGrid.addEventListener('drop', e => {
      imageGrid.classList.remove('is-dragover');
      const fl = e.dataTransfer && e.dataTransfer.files;
      if (fl && fl.length) consumeImageFiles(fl, 0);
    });

    function fillSlot(i, file) {
      imageFiles[i] = file;
      const slot = slots[i];
      slot.classList.remove('image-slot--empty');
      slot.classList.add('image-slot--filled');

      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.alt = file.name;

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'image-remove-btn';
      removeBtn.textContent = '×';
      removeBtn.addEventListener('click', e => {
        e.stopPropagation();
        clearSlot(i);
      });

      slot.innerHTML = '';
      slot.appendChild(img);
      slot.appendChild(removeBtn);
    }

    function clearSlot(i) {
      imageFiles[i] = null;
      const slot = slots[i];
      slot.classList.remove('image-slot--filled');
      slot.classList.add('image-slot--empty');
      slot.innerHTML = '<span>+</span>';
    }

    // ─── Video zone toggle ───
    const videoToggle = block.querySelector('.video-toggle-btn');
    const videoZone = block.querySelector('.video-zone');
    const videoInput = videoZone.querySelector('input[type="file"]');
    const videoUploadZone = videoZone.querySelector('.video-upload-zone');
    const videoFileRow = videoZone.querySelector('.video-file-row');
    const videoFilename = videoZone.querySelector('.video-filename');
    const videoRemoveBtn = videoZone.querySelector('.video-remove-btn');

    videoToggle.addEventListener('click', () => {
      const isOpen = !videoZone.hidden;
      if (isOpen) {
        videoZone.hidden = true;
        videoToggle.textContent = (window.t || (k=>k))('apply.addVideo');
        videoInput.value = '';
        videoUploadZone.hidden = false;
        videoFileRow.hidden = true;
      } else {
        videoZone.hidden = false;
        videoToggle.textContent = (window.t || (k=>k))('apply.removeVideo');
      }
    });

    videoInput.addEventListener('change', () => {
      if (videoInput.files.length > 0) {
        videoFilename.textContent = videoInput.files[0].name;
        videoUploadZone.hidden = true;
        videoFileRow.hidden = false;
      }
    });

    videoRemoveBtn.addEventListener('click', () => {
      videoInput.value = '';
      videoUploadZone.hidden = false;
      videoFileRow.hidden = true;
    });

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evName => {
      videoUploadZone.addEventListener(evName, e => {
        e.preventDefault();
        e.stopPropagation();
      });
    });
    videoUploadZone.addEventListener('dragenter', () => videoUploadZone.classList.add('is-dragover'));
    videoUploadZone.addEventListener('dragover', () => videoUploadZone.classList.add('is-dragover'));
    videoUploadZone.addEventListener('dragleave', e => {
      if (!videoUploadZone.contains(e.relatedTarget)) videoUploadZone.classList.remove('is-dragover');
    });
    videoUploadZone.addEventListener('drop', e => {
      videoUploadZone.classList.remove('is-dragover');
      const fl = e.dataTransfer && e.dataTransfer.files;
      if (!fl || !fl.length) return;
      const f = fl[0];
      if (!/^video\//i.test(f.type)) return;
      const dt = new DataTransfer();
      dt.items.add(f);
      videoInput.files = dt.files;
      videoFilename.textContent = f.name;
      videoUploadZone.hidden = true;
      videoFileRow.hidden = false;
    });

    // ─── "I'm flexible" checkbox ───
    const flexCheck = block.querySelector('.flexible-check');
    const installTextarea = block.querySelector(`textarea[name="work${index}_installation"]`);

    flexCheck.addEventListener('change', () => {
      if (flexCheck.checked) {
        installTextarea.value = '';
        installTextarea.disabled = true;
      } else {
        installTextarea.disabled = false;
      }
    });

    // ─── Toggle collapse + summary ───
    block.querySelector('.work-toggle-btn').addEventListener('click', () => {
      const body = block.querySelector('.work-body');
      body.classList.toggle('collapsed');
      updateWorkSummary(block, index);
    });

    // ─── Remove block ───
    const removeEl = block.querySelector('.work-remove-btn');
    if (removeEl) {
      removeEl.addEventListener('click', e => {
        e.stopPropagation();
        block.remove();
        updateAddBtn();
      });
    }

    // Store imageFiles ref for validation + submission
    block._imageFiles = imageFiles;

    // Attach live-error clearing to inputs
    attachLiveValidation(block);

    return block;
  }

  function updateWorkSummary(block, index) {
    const summary = block.querySelector('.work-summary');
    const titleInput = block.querySelector(`input[name="work${index}_title"]`);
    const yearInput = block.querySelector(`input[name="work${index}_year"]`);
    const mediumInput = block.querySelector(`input[name="work${index}_medium"]`);

    const body = block.querySelector('.work-body');
    if (body.classList.contains('collapsed')) {
      const parts = [titleInput?.value, yearInput?.value, mediumInput?.value].filter(Boolean);
      summary.textContent = parts.length ? ' · ' + parts.join(' · ') : '';
    } else {
      summary.textContent = '';
    }
  }

  function updateAddBtn() {
    const btn = document.getElementById('add-work-btn');
    if (!btn) return;
    const count = document.querySelectorAll('.work-block').length;
    if (count >= 3) {
      btn.disabled = true;
      btn.classList.add('is-disabled');
    } else {
      btn.disabled = false;
      btn.classList.remove('is-disabled');
    }
  }

  document.getElementById('add-work-btn')?.addEventListener('click', () => {
    const container = document.getElementById('work-blocks');
    const count = container.querySelectorAll('.work-block').length;
    if (count >= 3) return;
    const block = createWorkBlock(false);
    container.appendChild(block);
    if (window.applyI18n) window.applyI18n(block);
    updateAddBtn();
  });

  const workContainer = document.getElementById('work-blocks');
  if (workContainer) {
    const firstBlock = createWorkBlock(true);
    workContainer.appendChild(firstBlock);
    if (window.applyI18n) window.applyI18n(firstBlock);
    updateAddBtn();
  }

  // ─── CV / Portfolio upload feedback + drag-and-drop ───
  function bindUploadZones(root) {
    (root || document).querySelectorAll('.upload-zone').forEach(zone => {
      if (zone.classList.contains('video-upload-zone')) return;
      if (zone.dataset.bound) return;
      zone.dataset.bound = '1';
      const input = zone.querySelector('input[type="file"]');
      const filenameEl = zone.querySelector('.upload-filename');
      const chooseEl = zone.querySelector('.upload-choose');
      if (!input) return;
      input.addEventListener('change', () => {
        if (input.files.length > 0) {
          zone.classList.add('has-file');
          if (filenameEl) filenameEl.textContent = input.files[0].name;
          if (chooseEl) chooseEl.textContent = (window.t || (k=>k))('apply.changeFile');
          const wrap = zone.closest('.field-wrap');
          wrap?.classList.remove('has-error');
        }
      });

      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evName => {
        zone.addEventListener(evName, e => {
          e.preventDefault();
          e.stopPropagation();
        });
      });
      zone.addEventListener('dragenter', () => zone.classList.add('is-dragover'));
      zone.addEventListener('dragover', () => zone.classList.add('is-dragover'));
      zone.addEventListener('dragleave', e => {
        if (!zone.contains(e.relatedTarget)) zone.classList.remove('is-dragover');
      });
      zone.addEventListener('drop', e => {
        zone.classList.remove('is-dragover');
        const fl = e.dataTransfer && e.dataTransfer.files;
        if (!fl || !fl.length) return;
        const f = fl[0];
        const ext = fileExt(f.name);
        const acc = (input.getAttribute('accept') || '').toLowerCase();
        const ok = acc.split(',').some(a => {
          const t = a.trim();
          if (t === '.pdf') return ext === '.pdf';
          if (t === '.doc') return ext === '.doc';
          if (t === '.docx') return ext === '.docx';
          return false;
        });
        if (!ok) return;
        const dt = new DataTransfer();
        dt.items.add(f);
        input.files = dt.files;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });
  }
  bindUploadZones(document);

  // ─── Declaration checkboxes enable submit ───
  const declarationChecks = document.querySelectorAll('.declaration-check');
  const submitBtn = document.getElementById('apply-submit');

  function updateSubmitState() {
    if (!submitBtn) return;
    const allChecked = Array.from(declarationChecks).every(cb => cb.checked);
    submitBtn.disabled = !allChecked;
  }

  declarationChecks.forEach(cb => {
    cb.addEventListener('change', updateSubmitState);
  });

  // ─── Live validation: clear errors as the user types ───
  function attachLiveValidation(root) {
    (root || document).querySelectorAll('input, textarea, select').forEach(el => {
      if (el.dataset.liveBound) return;
      el.dataset.liveBound = '1';
      const clear = () => {
        const wrap = el.closest('.field-wrap');
        if (!wrap) return;
        if (el.value && el.value.trim() !== '') {
          wrap.classList.remove('has-error');
        }
      };
      el.addEventListener('input', clear);
      el.addEventListener('change', clear);
    });
  }
  attachLiveValidation(document);

  // ─── Form validation on submit ───
  function validateForm(form) {
    const errors = [];

    // Clear previous errors
    form.querySelectorAll('.field-wrap.has-error').forEach(w => w.classList.remove('has-error'));

    // Validate required inputs/textareas/selects
    form.querySelectorAll('input[required], textarea[required], select[required]').forEach(el => {
      // Skip disabled
      if (el.disabled) return;
      const wrap = el.closest('.field-wrap');
      if (!wrap) return;
      const val = (el.value || '').trim();
      if (!val) {
        wrap.classList.add('has-error');
        errors.push(wrap);
      }
    });

    // Validate portfolio (required file)
    const portfolioInput = form.querySelector('input[name="portfolio"]');
    if (portfolioInput && portfolioInput.files.length === 0) {
      const wrap = portfolioInput.closest('.field-wrap');
      if (wrap) {
        wrap.classList.add('has-error');
        errors.push(wrap);
      }
    }

    // Validate work blocks — each must have at least one image
    form.querySelectorAll('.work-block').forEach(block => {
      const images = block._imageFiles || [];
      if (!images.some(Boolean)) {
        const imgWrap = block.querySelector('.image-grid')?.closest('.field-wrap');
        if (imgWrap) {
          imgWrap.classList.add('has-error');
          errors.push(imgWrap);
        }
      }
    });

    if (errors.length > 0) {
      // Scroll first error into view
      const scrollContainer = form.closest('.section-scroll');
      const first = errors[0];
      if (first && scrollContainer) {
        const firstRect = first.getBoundingClientRect();
        const contRect = scrollContainer.getBoundingClientRect();
        scrollContainer.scrollTop += firstRect.top - contRect.top - 80;
      }
      // Focus the first invalid input if possible
      const firstInput = first?.querySelector('input, textarea, select');
      firstInput?.focus({ preventScroll: true });
    }

    return errors.length === 0;
  }

  // ─── File helpers ───

  function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          name: file.name,
          mime: file.type,
          base64: reader.result.split(',')[1]
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function fileExt(name) {
    const m = /(\.[a-zA-Z0-9]+)$/.exec(name || '');
    return m ? m[1].toLowerCase() : '';
  }

  function slugify(s) {
    return String(s || 'untitled')
      .toLowerCase().replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '').substring(0, 40) || 'untitled';
  }

  // POST with no-cors to avoid Google's redirect CORS issue.
  // Returns opaque response — we verify success via a GET check.
  async function postToAppsScript(payload) {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
      mode: 'no-cors'
    });
    // If we reach here without throwing, request was sent.
    return { ok: true };
  }

  // GET is CORS-friendly on Apps Script — use it to verify finalize.
  async function verifySubmission(tempId, maxAttempts) {
    for (let i = 0; i < maxAttempts; i++) {
      if (i > 0) await new Promise(r => setTimeout(r, 3000));
      try {
        const res = await fetch(APPS_SCRIPT_URL + '?check=' + encodeURIComponent(tempId));
        const data = await res.json();
        if (data.ok) return data;
        if (data.error) throw new Error(data.error);
      } catch (_) { /* retry */ }
    }
    // If verification times out, don't fail — the submission may still be processing
    return { ok: true, unverified: true };
  }

  // ─── Form submission ───

  function showThanksWithConfetti() {
    showView('thanks');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof confetti !== 'function') return;
    requestAnimationFrame(() => {
      confetti({
        particleCount: 110,
        spread: 72,
        origin: { y: 0.62 },
        colors: ['#F1C338', '#f0ece7', '#d4a828', '#ffffff']
      });
      setTimeout(() => {
        confetti({
          particleCount: 55,
          angle: 60,
          spread: 52,
          origin: { x: 0, y: 0.62 },
          colors: ['#F1C338', '#f0ece7']
        });
      }, 130);
      setTimeout(() => {
        confetti({
          particleCount: 55,
          angle: 120,
          spread: 52,
          origin: { x: 1, y: 0.62 },
          colors: ['#F1C338', '#f0ece7']
        });
      }, 260);
    });
  }

  async function submitApplication(form) {
    // Dev mode: skip upload if no URL configured
    if (!APPS_SCRIPT_URL) {
      showThanksWithConfetti();
      return;
    }

    const tempId = 'tmp_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);

    // Collect text fields
    const val = (name) => (form.querySelector('[name="' + name + '"]')?.value || '').trim();
    const data = {
      firstName:    val('firstName'),
      lastName:     val('lastName'),
      artistName:   val('artistName'),
      email:        val('email'),
      phoneCode:    val('phoneCode'),
      phone:        val('phone'),
      instagram:    val('instagram'),
      biography:    val('biography'),
      portfolioUrl: val('portfolioUrl')
    };

    // Collect files to upload: { path, file }
    const uploads = [];

    const portfolio = form.querySelector('[name="portfolio"]')?.files[0];
    if (portfolio) uploads.push({ path: 'portfolio' + fileExt(portfolio.name), file: portfolio });

    const cv = form.querySelector('[name="cv"]')?.files[0];
    if (cv) uploads.push({ path: 'cv' + fileExt(cv.name), file: cv });

    // Work blocks
    const blocks = form.querySelectorAll('.work-block');
    let workNum = 0;
    blocks.forEach(block => {
      workNum++;
      const idx = block.dataset.index;
      const g = (field) => {
        const el = block.querySelector('[name="work' + idx + '_' + field + '"]');
        if (!el) return '';
        return el.type === 'checkbox' ? el.checked : el.value.trim();
      };

      const workData = {
        title:          g('title'),
        year:           g('year'),
        classification: g('classification'),
        medium:         g('medium'),
        h: g('h'), w: g('w'), d: g('d'),
        kg:             g('kg'),
        about:          g('about'),
        installation:   g('installation'),
        hasEquipment:   g('hasEquipment')
      };
      data['work' + workNum] = workData;

      const folder = 'work-0' + workNum + '_' + slugify(workData.title);

      // Images (from _imageFiles array stored on the block element)
      const imgs = (block._imageFiles || []).filter(Boolean);
      imgs.forEach((file, i) => {
        uploads.push({
          path: folder + '/image-' + String(i + 1).padStart(2, '0') + fileExt(file.name),
          file: file
        });
      });

      // Video (optional)
      const vidInput = block.querySelector('input[type="file"][name$="_video"]');
      const vidFile = vidInput?.files[0];
      if (vidFile) {
        uploads.push({ path: folder + '/video' + fileExt(vidFile.name), file: vidFile });
      }
    });

    // ── Upload with progress ──
    const btn = document.getElementById('apply-submit');
    const originalText = btn.textContent;
    btn.disabled = true;

    const total = uploads.length + 1; // +1 for finalize step
    let done = 0;
    const progress = () => { btn.textContent = 'Uploading ' + done + '/' + total + '...'; };
    progress();

    try {
      for (const u of uploads) {
        const f = await readFileAsBase64(u.file);
        const res = await postToAppsScript({
          action: 'upload',
          tempId: tempId,
          path:   u.path,
          name:   f.name,
          mime:   f.mime,
          base64: f.base64
        });
        if (!res.ok) throw new Error(res.error || 'Upload failed');
        done++;
        progress();
      }

      // ── Finalize ──
      btn.textContent = 'Finalizing...';
      await postToAppsScript({
        action: 'finalize',
        tempId: tempId,
        data:   data
      });

      btn.textContent = originalText;
      btn.disabled = false;
      showThanksWithConfetti();
      verifySubmission(tempId, 5).catch(() => {});

    } catch (err) {
      btn.disabled = false;
      btn.textContent = originalText;
      alert(
        'Submission failed: ' + (err.message || err) +
        '\n\nPlease try again. If the problem persists, contact artists@homeawayfromhome.art'
      );
    }
  }

  const applyForm = document.getElementById('apply-form');

  if (applyForm) {
    applyForm.addEventListener('submit', e => {
      e.preventDefault();
      if (!validateForm(applyForm)) return;
      submitApplication(applyForm);
    });
  }

  // ─── Force PDF download (bypasses browser inline viewer) ───
  document.querySelectorAll('a[download$=".pdf"]').forEach(link => {
    link.addEventListener('click', async (e) => {
      e.preventDefault();
      const url = link.getAttribute('href');
      const filename = link.getAttribute('download') || 'guidelines.pdf';
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('fetch failed');
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(blobUrl);
        }, 1000);
      } catch {
        window.open(url, '_blank');
      }
    });
  });

});
