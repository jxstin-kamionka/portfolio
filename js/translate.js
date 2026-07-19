/**
 * i18n-System für die gesamte Seite (index.html + Legal-Seiten).
 *
 * `translations` bildet Sprachcode -> flaches Key/Value-Wörterbuch ab.
 * Keys folgen der Konvention "bereich.unterbereich(.index).feld", z. B.
 * "portfolio.join.desc" oder "testimonials.0.text". Werte mit HTML
 * (Links, <strong>, <li>-Listen) werden über data-i18n-html eingebunden,
 * reiner Text über data-i18n. Im Markup verwendete Attribute:
 *   data-i18n              -> el.textContent
 *   data-i18n-html          -> el.innerHTML (Achtung: nur für eigene, feste Inhalte!)
 *   data-i18n-placeholder   -> el.placeholder
 *   data-i18n-aria          -> el.aria-label
 * Neue Sprache hinzufügen: einfach ein weiteres Objekt (z. B. "fr")
 * mit denselben Keys ergänzen - supportedLangs liest die Keys automatisch aus.
 */
const translations = {
  de: {
    "nav.about": "Über mich",
    "nav.skills": "Fähigkeiten",
    "nav.portfolio": "Portfolio",
    "nav.contact": "Kontakt",
    "nav.toggleAria": "Menü öffnen",

    "hero.iam": "Ich bin",
    "hero.role": "Frontend Developer",
    "hero.cta": "Lass uns reden!",

    "about.heading": "Über mich",
    "about.lead":
      "Mein Weg in die Softwareentwicklung begann nicht im Hörsaal, sondern am eigenen Rechner: Zeile für Zeile Code schreiben, Dinge kaputt machen und wieder reparieren, bis sie funktionieren. Über die Developer Akademie hat mich diese Neugier zum Frontend-Development geführt, wo ich gelernt habe, aus einem Design tatsächlich ein funktionierendes Stück Software zu bauen. Am meisten reizt mich dabei der Moment, in dem aus einzelnen HTML-Elementen, CSS-Regeln und JavaScript-Logik eine Oberfläche entsteht, die sich für Nutzer:innen einfach richtig anfühlt.",
    "about.point1":
      "Ich bin offen für Remote-Tätigkeiten in ganz Deutschland und ebenso für einen Umzug, wenn Aufgabe und Team passen. Klare, direkte Kommunikation ist mir dabei wichtiger als ein fester Schreibtisch im Büro.",
    "about.point2":
      "Neue Frameworks und Tools schrecken mich nicht ab - im Gegenteil: Stoße ich beim Bauen eines Projekts an eine Grenze, ist das für mich der Startpunkt, mir eine neue Technologie anzueignen. Aktuell vertiefe ich mein Verständnis von TypeScript und Angular, weil sich damit größere Projekte spürbar stabiler entwickeln lassen.",
    "about.point3":
      "An einem Bug arbeite ich mich lieber einmal gründlich durch, als ihn mit einem schnellen Hack zu übertünchen. Bevor ich Code schreibe, versuche ich das eigentliche Problem zu verstehen - oft reicht schon eine saubere Skizze der Datenstruktur oder des Ablaufs, um die einfachste statt nur die erstbeste Lösung zu finden.",

    "skills.heading": "Meine Skills",
    "skills.desc1":
      "Die Icons oben zeigen die Technologien, mit denen ich in meinen Projekten regelmäßig arbeite - von HTML, CSS und JavaScript über TypeScript und Angular bis hin zu Supabase als Backend für Datenbank und Authentifizierung. Genauso selbstverständlich gehören Git zur Versionskontrolle und die Arbeit nach Scrum für mich dazu.",
    "skills.ctaTitle":
      'Auf der Suche nach <span class="highlight">einer weiteren Fähigkeit</span>?',
    "skills.desc2":
      "Fehlt hier eine Technologie, die Sie suchen? Sprechen Sie mich gerne an - jedes der oben gezeigten Werkzeuge habe ich mir selbst erarbeitet, und mit dem nächsten tue ich mir genauso wenig schwer.",
    "skills.btn": "Kontaktieren Sie mich",

    "portfolio.heading": "Portfolio",
    "portfolio.intro":
      "Entdecken Sie hier eine Auswahl meiner Projekte - interagieren Sie damit, um meine Fähigkeiten in Aktion zu sehen.",
    "portfolio.liveTest": "Live-Test",
    "portfolio.join.desc":
      "Ein Task-Manager nach dem Kanban-Prinzip. Aufgaben lassen sich per Drag-and-Drop erstellen und organisieren, Nutzern zuweisen und Kategorien zuordnen.",
    "portfolio.pollo.desc":
      "Ein Jump-and-Run-Spiel nach objektorientiertem Ansatz. Sammle Münzen und wirf Flaschen, um dich gegen die Gegner in der Wüste zu behaupten.",
    "portfolio.pokedex.desc":
      "Basierend auf der PokéAPI - eine einfache Bibliothek, die Pokémon-Informationen bereitstellt und katalogisiert.",

    "testimonials.prevAria": "Vorherige Bewertung",
    "testimonials.nextAria": "Nächste Bewertung",
    "testimonials.0.text":
      "Die Zusammenarbeit mit Justin lief absolut reibungslos. Besonders beeindruckt hat mich seine strukturierte Arbeitsweise und die Fähigkeit, auch bei komplexen Projektanforderungen immer eine saubere Lösung zu finden.",
    "testimonials.0.author": "Sarah Lehmann – Senior Project Manager",
    "testimonials.1.text":
      "Ein fantastischer Teampartner mit einem extrem hohen Qualitätsanspruch. Der Code ist von Anfang an sauber strukturiert, die Dokumentation vorbildlich und die Kommunikation jederzeit transparent und auf Augenhöhe.",
    "testimonials.1.author": "Michael Klose – Full-Stack Developer",
    "testimonials.2.text":
      "Kreative Denkansätze gepaart mit starkem technischem Know-how. Er hat unser Produkt durch clevere Performance-Optimierungen und ein hervorragendes Auge fürs Detail entscheidend nach vorne gebracht.",
    "testimonials.2.author": "Elena Rostova – Product Owner",

    "contact.heading": "Kontakt",
    "contact.problemTitle": "Sie haben ein Problem zu lösen?",
    "contact.problemText":
      "Ob es um eine neue Website, die Weiterentwicklung eines bestehenden Frontends oder ein Bugfixing-Projekt geht: Schreiben Sie mir kurz, worum es geht, und ich melde mich zeitnah mit einer ehrlichen Einschätzung zurück, ob und wie ich weiterhelfen kann.",
    "contact.cta":
      "Suchen Sie einen Frontend-Entwickler? <strong>Kontaktieren Sie mich!</strong>",
    "contact.srName": "Ihr Name",
    "contact.namePlaceholder": "Ihr Name",
    "contact.srEmail": "Ihre E-Mail",
    "contact.emailPlaceholder": "Ihre E-Mail",
    "contact.srMessage": "Ihre Nachricht",
    "contact.messagePlaceholder": "Ihre Nachricht",
    "contact.privacyText":
      'Ich habe die <a href="./datenschutz.html" target="_blank" rel="noopener">Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Daten wie beschrieben zu.',
    "contact.submitBtn": "Nachricht senden :)",
    "contact.sending": "Wird gesendet...",
    "contact.successMessage":
      "Danke für Ihre Nachricht! Ich melde mich zeitnah bei Ihnen.",
    "contact.genericError":
      "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.",
    "contact.scrollTopAria": "Nach oben scrollen",
    "contact.validation.nameRequired": "Bitte geben Sie Ihren Namen ein.",
    "contact.validation.emailRequired":
      "Bitte geben Sie Ihre E-Mail-Adresse ein.",
    "contact.validation.emailInvalid":
      "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    "contact.validation.messageRequired": "Bitte geben Sie eine Nachricht ein.",

    "footer.impressum": "Impressum",
    "footer.copyright": "© 2026 Justin Kamionka",

    "legal.eyebrow": "Rechtliches",
    "legal.back": "Zurück zur Startseite",

    "datenschutz.title": "Datenschutzerklärung",
    "datenschutz.updated": "Stand: Juli 2026",
    "datenschutz.s1.h": "1. Verantwortlicher",
    "datenschutz.s1.p1":
      "Verantwortlicher für die Datenverarbeitung auf dieser Website ist:",
    "datenschutz.s1.address":
      '<strong>Justin Kamionka IT Dienstleistungen</strong><br />\n            <span class="legal-placeholder">Goldbachstraße 4, 97688 Bad Kissingen</span><br />\n            E-Mail:\n            <a href="mailto:info@justinkamionka.de">info@justinkamionka.de</a>',
    "datenschutz.s1.p2":
      'Die vollständigen Kontaktdaten finden Sie im <a href="./impressum.html">Impressum</a>.',

    "datenschutz.s2.h": "2. Allgemeines zur Datenverarbeitung",
    "datenschutz.s2.p1":
      "Ich erhebe und verwende personenbezogene Daten meiner Nutzer grundsätzlich nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie meiner Inhalte und Leistungen erforderlich ist. Die Erhebung und Verwendung personenbezogener Daten erfolgt regelmäßig nur nach Einwilligung der Nutzer oder auf Grundlage eines berechtigten Interesses (Art. 6 Abs. 1 lit. a und f DSGVO).",
    "datenschutz.s2.p2":
      "Eine Ausnahme gilt in solchen Fällen, in denen eine vorherige Einholung einer Einwilligung aus tatsächlichen Gründen nicht möglich ist und die Verarbeitung der Daten durch gesetzliche Vorschriften gestattet ist.",

    "datenschutz.s3.h": "3. Bereitstellung der Website und Server-Logfiles",
    "datenschutz.s3.p1":
      "Beim Aufrufen dieser Website werden durch den auf meinem Server automatisch technische Informationen erfasst, die Ihr Browser übermittelt. Dazu gehören unter anderem:",
    "datenschutz.s3.list":
      "<li>Browsertyp und -version</li>\n            <li>verwendetes Betriebssystem</li>\n            <li>Referrer-URL</li>\n            <li>Hostname des zugreifenden Rechners</li>\n            <li>Uhrzeit der Serveranfrage</li>\n            <li>IP-Adresse (gekürzt bzw. nur temporär gespeichert)</li>",
    "datenschutz.s3.p2":
      "Diese Daten sind technisch erforderlich, um Ihnen die Website auszuliefern und die Stabilität sowie Sicherheit des Angebots zu gewährleisten. Rechtsgrundlage hierfür ist mein berechtigtes Interesse gemäß Art. 6 Abs. 1 lit. f DSGVO. Eine Zusammenführung dieser Daten mit anderen Datenquellen findet nicht statt.",

    "datenschutz.s4.h": "4. Kontaktformular",
    "datenschutz.s4.p1":
      "Wenn Sie mir über das Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Formular - Name, E-Mail-Adresse und Nachricht - zum Zweck der Bearbeitung Ihrer Anfrage und für den Fall von Anschlussfragen bei mir gespeichert und verarbeitet. Die Übermittlung erfolgt direkt an mein E-Mail-Postfach.",
    "datenschutz.s4.p2":
      "Rechtsgrundlage für diese Verarbeitung ist Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage der Anbahnung eines Vertrags dient, andernfalls mein berechtigtes Interesse an der Beantwortung von Anfragen gemäß Art. 6 Abs. 1 lit. f DSGVO.",
    "datenschutz.s4.p3":
      "Zur Erkennung automatisierter Formular-Einsendungen (Spam) enthält das Formular ein zusätzliches, für Menschen unsichtbares Feld (Honeypot). Dessen Inhalt wird ausschließlich zur Spam-Abwehr ausgewertet und nicht weiterverarbeitet.",
    "datenschutz.s4.p4":
      "Die über das Formular übermittelten Daten verbleiben bei mir, bis Sie mich zur Löschung auffordern, Ihre Einwilligung widerrufen oder der Zweck für die Datenspeicherung entfällt. Zwingende gesetzliche Aufbewahrungsfristen bleiben unberührt.",

    "datenschutz.s5.h": "5. Google Fonts",
    "datenschutz.s5.p1":
      "Diese Website bindet zur einheitlichen Darstellung von Schriftarten sogenannte Google Fonts ein, die von einem Server von Google bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Schriftarten in den Browser-Cache, wodurch eine Verbindung zu Servern von Google LLC bzw. der Google Ireland Limited hergestellt und dabei Ihre IP-Adresse übermittelt wird.",
    "datenschutz.s5.p2":
      'Die Nutzung erfolgt im Interesse einer einheitlichen und ansprechenden Darstellung meiner Online-Angebote und stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar. Weitere Informationen zu Google Fonts finden Sie unter <a href="https://developers.google.com/fonts/faq" target="_blank" rel="noopener">developers.google.com/fonts/faq</a> sowie in der <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Datenschutzerklärung von Google</a>.',

    "datenschutz.s6.h": "6. Cookies",
    "datenschutz.s6.p1":
      "Diese Website setzt keine Cookies ein und verwendet keine Analyse- oder Tracking-Dienste. Es findet keine Erstellung von Nutzungsprofilen statt.",

    "datenschutz.s7.h": "7. Ihre Rechte als betroffene Person",
    "datenschutz.s7.p1":
      "Ihnen stehen hinsichtlich Ihrer personenbezogenen Daten grundsätzlich folgende Rechte zu:",
    "datenschutz.s7.list":
      "<li>Recht auf Auskunft (Art. 15 DSGVO)</li>\n            <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>\n            <li>Recht auf Löschung (Art. 17 DSGVO)</li>\n            <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>\n            <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>\n            <li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>\n            <li>Recht auf Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)</li>",
    "datenschutz.s7.p2":
      "Zur Ausübung dieser Rechte genügt eine formlose Nachricht an die oben genannte E-Mail-Adresse. Ihnen steht zudem ein Beschwerderecht bei der für mich zuständigen Datenschutz-Aufsichtsbehörde zu.",

    "datenschutz.s8.h": "8. Datensicherheit",
    "datenschutz.s8.p1":
      'Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung für die Übertragung Ihrer Daten. Eine verschlüsselte Verbindung erkennen Sie an dem Schloss-Symbol sowie der Adresszeile Ihres Browsers, die mit "https://" beginnt.',

    "datenschutz.s9.h":
      "9. Aktualität und Änderung dieser Datenschutzerklärung",
    "datenschutz.s9.p1":
      "Diese Datenschutzerklärung ist aktuell gültig. Durch die Weiterentwicklung meiner Website oder aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern.",

    "impressum.title": "Impressum",
    "impressum.updated": "Stand: Juli 2026",
    "impressum.s1.h": "Angaben gemäß § 5 TMG",
    "impressum.s1.address":
      '<strong>Justin Kamionka IT Dienstleistungen</strong><br />\n            <span class="legal-placeholder">Goldbachstraße 4</span><br />\n            <span class="legal-placeholder">97688 Bad Kissingen</span><br />\n            Deutschland',

    "impressum.s2.h": "Kontakt",
    "impressum.s2.p1":
      'E-Mail:\n            <a href="mailto:info@justinkamionka.de">info@justinkamionka.de</a>',

    "impressum.s3.h": "Redaktionell verantwortlich",
    "impressum.s3.p1":
      'Justin Kamionka,\n            <span class="legal-placeholder">Goldbachstraße 4, 97688 Bad Kissingen</span>',

    "impressum.s4.h": "EU-Streitschlichtung",
    "impressum.s4.p1":
      'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie hier finden: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr/</a>. Meine E-Mail-Adresse finden Sie oben in diesem Impressum.',

    "impressum.s5.h": "Verbraucherstreitbeilegung / Universalschlichtungsstelle",
    "impressum.s5.p1":
      "Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",

    "impressum.s6.h": "Haftung für Inhalte",
    "impressum.s6.p1":
      "Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
    "impressum.s6.p2":
      "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werde ich diese Inhalte umgehend entfernen.",

    "impressum.s7.h": "Haftung für Links",
    "impressum.s7.p1":
      "Mein Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.",
    "impressum.s7.p2":
      "Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Links umgehend entfernen.",

    "impressum.s8.h": "Urheberrecht",
    "impressum.s8.p1":
      "Die durch mich erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.",
    "impressum.s8.p2":
      "Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht von mir erstellt wurden, werden die Urheberrechte Dritter beachtet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitte ich um einen entsprechenden Hinweis.",
  },

  en: {
    "nav.about": "About me",
    "nav.skills": "Skills",
    "nav.portfolio": "Portfolio",
    "nav.contact": "Contact",
    "nav.toggleAria": "Open menu",

    "hero.iam": "I am",
    "hero.role": "Frontend Developer",
    "hero.cta": "Let's talk!",

    "about.heading": "About me",
    "about.lead":
      "My path into software development didn't start in a lecture hall, but at my own desk: writing code line by line, breaking things and fixing them again until they work. That curiosity led me to frontend development through the Developer Akademie, where I learned how to turn a design into an actual working piece of software. What excites me most is the moment individual HTML elements, CSS rules and JavaScript logic come together into an interface that simply feels right to use.",
    "about.point1":
      "I'm open to remote work anywhere in Germany, and equally open to relocating if the role and team are the right fit. Clear, direct communication matters more to me than a fixed desk in an office.",
    "about.point2":
      "New frameworks and tools don't scare me off - quite the opposite: hitting a limit while building a project is usually the starting point for picking up a new technology. Right now I'm deepening my understanding of TypeScript and Angular, since they make larger projects noticeably more stable to build.",
    "about.point3":
      "I'd rather work through a bug properly once than paper over it with a quick hack. Before I write code, I try to understand the actual problem - often a clean sketch of the data structure or the flow is enough to find the simplest solution instead of just the first one that works.",

    "skills.heading": "My Skills",
    "skills.desc1":
      "The icons above show the technologies I regularly work with in my projects - from HTML, CSS and JavaScript to TypeScript and Angular, right through to Supabase as a backend for database and authentication. Git for version control and working with Scrum are just as much a part of that.",
    "skills.ctaTitle":
      'Looking for <span class="highlight">another skill</span>?',
    "skills.desc2":
      "Missing a technology you're looking for? Feel free to reach out - I've taught myself every tool shown above, and picking up the next one won't be any different.",
    "skills.btn": "Contact me",

    "portfolio.heading": "Portfolio",
    "portfolio.intro":
      "Take a look at a selection of my projects here - interact with them to see my skills in action.",
    "portfolio.liveTest": "Live Test",
    "portfolio.join.desc":
      "A task manager built on the Kanban principle. Tasks can be created and organized via drag-and-drop, assigned to users and sorted into categories.",
    "portfolio.pollo.desc":
      "A jump-and-run game built with an object-oriented approach. Collect coins and throw bottles to hold your own against the enemies in the desert.",
    "portfolio.pokedex.desc":
      "Built on the PokéAPI - a simple library that provides and catalogs Pokémon information.",

    "testimonials.prevAria": "Previous review",
    "testimonials.nextAria": "Next review",
    "testimonials.0.text":
      "Working together with Justin was an absolute pleasure. I was particularly impressed by his structured approach and his ability to find clean solutions even for complex project requirements.",
    "testimonials.0.author": "Sarah Lehmann – Senior Project Manager",
    "testimonials.1.text":
      "A fantastic team partner with extremely high quality standards. The code is cleanly structured right from the start, the documentation is exemplary, and communication was always transparent and at eye level.",
    "testimonials.1.author": "Michael Klose – Full-Stack Developer",
    "testimonials.2.text":
      "Creative approaches combined with strong technical know-how. He significantly advanced our product through clever performance optimizations and a great eye for detail.",
    "testimonials.2.author": "Elena Rostova – Product Owner",

    "contact.heading": "Contact",
    "contact.problemTitle": "Got a problem to solve?",
    "contact.problemText":
      "Whether it's a new website, extending an existing frontend, or a bug-fixing project: write me a few lines about what it's about, and I'll get back to you promptly with an honest assessment of whether and how I can help.",
    "contact.cta":
      "Looking for a frontend developer? <strong>Get in touch!</strong>",
    "contact.srName": "Your name",
    "contact.namePlaceholder": "Your name",
    "contact.srEmail": "Your email",
    "contact.emailPlaceholder": "Your email",
    "contact.srMessage": "Your message",
    "contact.messagePlaceholder": "Your message",
    "contact.privacyText":
      'I have read the <a href="./datenschutz.html" target="_blank" rel="noopener">privacy policy</a> and agree to my data being processed as described.',
    "contact.submitBtn": "Send message :)",
    "contact.sending": "Sending...",
    "contact.successMessage":
      "Thank you for your message! I'll get back to you shortly.",
    "contact.genericError":
      "The message could not be sent. Please try again later.",
    "contact.scrollTopAria": "Scroll to top",
    "contact.validation.nameRequired": "Please enter your name.",
    "contact.validation.emailRequired": "Please enter your email address.",
    "contact.validation.emailInvalid": "Please enter a valid email address.",
    "contact.validation.messageRequired": "Please enter a message.",

    "footer.impressum": "Legal Notice",
    "footer.copyright": "© 2026 Justin Kamionka",

    "legal.eyebrow": "Legal",
    "legal.back": "Back to homepage",

    "datenschutz.title": "Privacy Policy",
    "datenschutz.updated": "Last updated: July 2026",
    "datenschutz.s1.h": "1. Controller",
    "datenschutz.s1.p1":
      "The controller responsible for data processing on this website is:",
    "datenschutz.s1.address":
      '<strong>Justin Kamionka IT Dienstleistungen</strong><br />\n            <span class="legal-placeholder">Goldbachstraße 4, 97688 Bad Kissingen</span><br />\n            Email:\n            <a href="mailto:info@justinkamionka.de">info@justinkamionka.de</a>',
    "datenschutz.s1.p2":
      'The full contact details can be found in the <a href="./impressum.html">legal notice</a>.',

    "datenschutz.s2.h": "2. General information on data processing",
    "datenschutz.s2.p1":
      "I only collect and use my users' personal data to the extent necessary to provide a functional website along with my content and services. Personal data is generally collected and used only with the user's consent or on the basis of a legitimate interest (Art. 6 (1) lit. a and f GDPR).",
    "datenschutz.s2.p2":
      "An exception applies in cases where obtaining prior consent is not possible for practical reasons and the processing of the data is permitted by law.",

    "datenschutz.s3.h": "3. Provision of the website and server log files",
    "datenschutz.s3.p1":
      "When you access this website, technical information transmitted by your browser is automatically collected on my server. This includes, among other things:",
    "datenschutz.s3.list":
      "<li>Browser type and version</li>\n            <li>Operating system used</li>\n            <li>Referrer URL</li>\n            <li>Hostname of the accessing device</li>\n            <li>Time of the server request</li>\n            <li>IP address (shortened or stored only temporarily)</li>",
    "datenschutz.s3.p2":
      "This data is technically required to deliver the website to you and to ensure the stability and security of the service. The legal basis for this is my legitimate interest pursuant to Art. 6 (1) lit. f GDPR. This data is not merged with other data sources.",

    "datenschutz.s4.h": "4. Contact form",
    "datenschutz.s4.p1":
      "If you send me inquiries via the contact form, your details from the form - name, email address and message - are stored and processed by me for the purpose of handling your inquiry and in case of follow-up questions. The submission is sent directly to my email inbox.",
    "datenschutz.s4.p2":
      "The legal basis for this processing is Art. 6 (1) lit. b GDPR, provided your inquiry relates to the initiation of a contract; otherwise it is my legitimate interest in responding to inquiries pursuant to Art. 6 (1) lit. f GDPR.",
    "datenschutz.s4.p3":
      "To detect automated form submissions (spam), the form contains an additional field that is invisible to humans (honeypot). Its content is used exclusively for spam prevention and is not processed any further.",
    "datenschutz.s4.p4":
      "The data submitted via the form remains with me until you request its deletion, withdraw your consent, or the purpose for storing the data no longer applies. Mandatory statutory retention periods remain unaffected.",

    "datenschutz.s5.h": "5. Google Fonts",
    "datenschutz.s5.p1":
      "For a consistent display of typefaces, this website embeds so-called Google Fonts, which are provided by a Google server. When you access a page, your browser loads the required fonts into the browser cache, which establishes a connection to servers operated by Google LLC or Google Ireland Limited and transmits your IP address in the process.",
    "datenschutz.s5.p2":
      'This is done in the interest of a consistent and appealing presentation of my online services and constitutes a legitimate interest within the meaning of Art. 6 (1) lit. f GDPR. Further information on Google Fonts can be found at <a href="https://developers.google.com/fonts/faq" target="_blank" rel="noopener">developers.google.com/fonts/faq</a> and in <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google\'s privacy policy</a>.',

    "datenschutz.s6.h": "6. Cookies",
    "datenschutz.s6.p1":
      "This website does not use cookies and does not use any analytics or tracking services. No user profiles are created.",

    "datenschutz.s7.h": "7. Your rights as a data subject",
    "datenschutz.s7.p1":
      "With regard to your personal data, you generally have the following rights:",
    "datenschutz.s7.list":
      "<li>Right to information (Art. 15 GDPR)</li>\n            <li>Right to rectification (Art. 16 GDPR)</li>\n            <li>Right to erasure (Art. 17 GDPR)</li>\n            <li>Right to restriction of processing (Art. 18 GDPR)</li>\n            <li>Right to data portability (Art. 20 GDPR)</li>\n            <li>Right to object to processing (Art. 21 GDPR)</li>\n            <li>Right to withdraw consent given (Art. 7 (3) GDPR)</li>",
    "datenschutz.s7.p2":
      "To exercise these rights, an informal message to the email address given above is sufficient. You also have the right to lodge a complaint with the data protection supervisory authority responsible for me.",

    "datenschutz.s8.h": "8. Data security",
    "datenschutz.s8.p1":
      'For security reasons, this website uses SSL/TLS encryption for the transmission of your data. You can recognize an encrypted connection by the padlock icon and by the address bar of your browser starting with "https://".',

    "datenschutz.s9.h":
      "9. Currency and amendment of this privacy policy",
    "datenschutz.s9.p1":
      "This privacy policy is currently valid. Due to the further development of my website or changes to legal or regulatory requirements, it may become necessary to amend this privacy policy.",

    "impressum.title": "Legal Notice",
    "impressum.updated": "Last updated: July 2026",
    "impressum.s1.h": "Information pursuant to § 5 TMG",
    "impressum.s1.address":
      '<strong>Justin Kamionka IT Dienstleistungen</strong><br />\n            <span class="legal-placeholder">Goldbachstraße 4</span><br />\n            <span class="legal-placeholder">97688 Bad Kissingen</span><br />\n            Germany',

    "impressum.s2.h": "Contact",
    "impressum.s2.p1":
      'Email:\n            <a href="mailto:info@justinkamionka.de">info@justinkamionka.de</a>',

    "impressum.s3.h": "Responsible for editorial content",
    "impressum.s3.p1":
      'Justin Kamionka,\n            <span class="legal-placeholder">Goldbachstraße 4, 97688 Bad Kissingen</span>',

    "impressum.s4.h": "EU dispute resolution",
    "impressum.s4.p1":
      'The European Commission provides a platform for online dispute resolution (ODR), which you can find here: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr/</a>. My email address can be found above in this legal notice.',

    "impressum.s5.h":
      "Consumer dispute resolution / universal arbitration board",
    "impressum.s5.p1":
      "I am not willing and not obliged to participate in dispute resolution proceedings before a consumer arbitration board.",

    "impressum.s6.h": "Liability for content",
    "impressum.s6.p1":
      "As a service provider, I am responsible for my own content on these pages in accordance with general laws pursuant to § 7 (1) TMG. However, pursuant to §§ 8 to 10 TMG, I am not obliged as a service provider to monitor transmitted or stored third-party information or to investigate circumstances that indicate unlawful activity.",
    "impressum.s6.p2":
      "Obligations to remove or block the use of information under general law remain unaffected. However, liability in this regard is only possible from the point in time at which a specific infringement becomes known. Upon becoming aware of any such infringements, I will remove this content immediately.",

    "impressum.s7.h": "Liability for links",
    "impressum.s7.p1":
      "My offering contains links to external third-party websites over whose content I have no influence. I therefore cannot accept any liability for this third-party content. The respective provider or operator of the linked pages is always responsible for their content. The linked pages were checked for possible legal violations at the time of linking. No unlawful content was identifiable at the time of linking.",
    "impressum.s7.p2":
      "However, permanent monitoring of the content of linked pages is not reasonable without concrete evidence of a legal violation. Upon becoming aware of any legal violations, I will remove such links immediately.",

    "impressum.s8.h": "Copyright",
    "impressum.s8.p1":
      "The content and works created by me on these pages are subject to German copyright law. Reproduction, editing, distribution and any kind of use beyond the scope of copyright law require the written consent of the respective author or creator.",
    "impressum.s8.p2":
      "Downloads and copies of this page are only permitted for private, non-commercial use. Insofar as the content on this page was not created by me, the copyrights of third parties are respected. If you nevertheless become aware of a copyright infringement, please notify me accordingly.",
  },
};

const supportedLangs = Object.keys(translations);
let currentLang = document.documentElement.lang === "en" ? "en" : "de";

/**
 * Wechselt die aktive Sprache: aktualisiert html[lang], schreibt alle
 * data-i18n(-html|-placeholder|-aria)-Elemente im DOM neu und feuert ein
 * "languagechange"-CustomEvent, auf das z. B. js/main.js (Testimonials,
 * Kontaktformular-Fehlermeldungen) reagiert, um dynamisch erzeugte Texte
 * ebenfalls zu aktualisieren.
 * @param {string} lang Sprachcode, muss ein Key in `translations` sein
 */
function applyLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const value = translations[lang][key];
    if (value !== undefined) el.textContent = value;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.dataset.i18nHtml;
    const value = translations[lang][key];
    if (value !== undefined) el.innerHTML = value;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    const value = translations[lang][key];
    if (value !== undefined) el.setAttribute("placeholder", value);
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.dataset.i18nAria;
    const value = translations[lang][key];
    if (value !== undefined) el.setAttribute("aria-label", value);
  });

  document.dispatchEvent(
    new CustomEvent("languagechange", { detail: { lang } }),
  );
}

/** Liefert den aktuell aktiven Sprachcode (z. B. für dynamisch erzeugte Inhalte). */
function getCurrentLang() {
  return currentLang;
}

// Kleine Optimierung: Falls der Key nicht existiert, wird der Key als Fallback zurückgegeben
/**
 * Übersetzungs-Lookup für dynamisch (per JS) erzeugte Texte, die kein
 * data-i18n-Attribut im Markup haben können (z. B. Testimonial-Inhalte,
 * Formular-Fehlermeldungen). Wird über window.i18n.t nach außen gereicht.
 * @param {string} key Übersetzungsschlüssel
 * @returns {string} Übersetzter Text, oder der Key selbst als Fallback
 */
function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) || key;
}

/* ---------- Sprachpräferenz in localStorage merken ---------- */
const LANG_STORAGE_KEY = "preferredLang";

/** Liest die zuletzt gewählte Sprache aus localStorage (null, wenn keine gespeichert oder Zugriff blockiert ist). */
function getStoredLang() {
  try {
    return localStorage.getItem(LANG_STORAGE_KEY);
  } catch (e) {
    return null;
  }
}

/** Speichert die gewählte Sprache für den nächsten Seitenaufruf. */
function storeLang(lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch (e) {
    // localStorage nicht verfügbar (z. B. privater Modus)
  }
}

/** Markiert den zur aktiven Sprache passenden .lang-btn als "active". */
function syncLangButtons(lang) {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

/* Klick auf DE/EN-Button: Sprache anwenden, merken und Button-Zustand syncen. */
document.querySelectorAll(".lang-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const lang = button.dataset.lang;
    if (supportedLangs.includes(lang)) {
      applyLanguage(lang);
      storeLang(lang);
      syncLangButtons(lang);
    }
  });
});

/* Initiale Sprache beim Laden: gespeicherte Präferenz, sonst html[lang]-Attribut. */
const storedLang = getStoredLang();
const initialLang = supportedLangs.includes(storedLang)
  ? storedLang
  : currentLang;
applyLanguage(initialLang);
syncLangButtons(initialLang);

// Öffentliche Schnittstelle für andere Skripte (aktuell: js/main.js)
window.i18n = { translations, applyLanguage, getCurrentLang, t };
