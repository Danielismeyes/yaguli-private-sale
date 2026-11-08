const PHONE = "+36306092018";
const USD_RATE = 360;
const app = document.querySelector("#app");
const modalRoot = document.querySelector("#modal-root");
let language = localStorage.getItem("yaguli-private-sale-language") || "hu";
let requestData = null;

const content = {
  hu: {
    prototype: "Prototípus", nav: "YAGULI PRIVATE SALE", heroEyebrow: "Autós concierge magáneladóknak",
    heroTitle: "Privát eladás.<br><span class=\"gradient-text\">Professzionális háttér.</span>",
    heroLead: "Te eladod az autódat a saját feltételeiddel. Én kezelem a hirdetés előkészítését, az érdeklődőket és a komoly vevőkkel való egyeztetést.",
    how: "Így működik", quote: "Előzetes ajánlatot kérek", whoEye: "Kinek való?", whoTitle: "Magánúton adnád el – nyomás és káosz nélkül.",
    who: ["Magánszemélyként, közvetlenül szeretnéd eladni az autódat a vevőnek.", "Nem szeretnél kereskedői nyomást vagy beszámítási alkut.", "Nincs időd a végtelen telefonokra és üzenetekre.", "Csak komoly, előszűrt érdeklődőkkel szeretnél találkozni."],
    howEye: "Hogyan működik?", howTitle: "Négy lépés, a Te jóváhagyásoddal.",
    steps: [["Felmérés és stratégia", "Átnézzük az autót, az állapotát és a piaci helyzetét, majd közösen kialakítjuk az eladási stratégiát."], ["Hirdetés előkészítése", "Elkészül a hirdetés szövege. Használhatod saját fotóidat, vagy kérheted, hogy fotózást szervezzünk."], ["Érdeklődők szűrése", "A jóváhagyott hirdetés megjelenik a megfelelő felületeken. A hívásokat és üzeneteket én kezelem, megválaszolom az első kérdéseket."], ["Komoly vevő, egyeztetett találkozó", "Csak akkor kereslek, ha komoly érdeklődő van. Megtekintést csak akkor egyeztetek, ha Te is szeretnéd."]],
    approval: "A hirdetés közzététele és minden megtekintés kizárólag a tulajdonos jóváhagyásával történik.",
    includesEye: "Mit tartalmaz?", includesTitle: "Teljes értékesítési háttér.", includes: ["Hirdetésszöveg elkészítése", "Javaslat az ár pozicionálásához", "Opcionális fotózás", "Hirdetés közzététele jóváhagyás után", "Hívások és üzenetek kezelése", "Vevők előszűrése", "Találkozók egyeztetése"],
    priceEye: "Díjazás", priceTitle: "Átlátható marketingdíj.", priceOne: "A marketingdíj az autó értékétől, állapotától és a vállalt feladatoktól függ.", priceTwo: "Példa: egy kb. 7,5 millió Ft értékű autónál az előzetes marketingdíj <strong>150 000 Ft</strong> lehet.", priceNote: "A végleges díjat mindig indulás előtt, írásban egyeztetjük.",
    controlEye: "Te irányítasz", control: "Az autó a Te tulajdonod marad. A hirdetés, az ár és minden találkozó a jóváhagyásoddal történik.",
    formEye: "Előzetes ajánlat", formTitle: "Mesélj az autódról.", fields: { name: "Teljes név", phone: "Telefonszám", email: "E-mail", car: "Márka és modell", year: "Évjárat", mileage: "Futásteljesítmény (km)", price: "Elvárt ár", location: "Jelenlegi helyszín", photo: "Fotózás", notes: "Megjegyzés" },
    phonePlaceholder: "pl. 30 123 4567", ownPhotos: "Saját fotók", photoRequest: "Fotózást kérek", review: "Áttekintés", prototypeNote: "Az adatok csak az üzenet előkészítéséhez használhatók; semmi nem kerül automatikusan elküldésre.",
    faqEye: "GYIK", faqTitle: "Gyakori kérdések", faq: [["Kereskedő vagy?", "Nem. Nem vásárolom meg és nem veszem át az autót. Privát értékesítési támogatást nyújtok: az autó a Te tulajdonodban marad, és közvetlenül Te adod el a vevőnek."], ["Garantált az eladás?", "Nem. Az eladást senki sem tudja garantálni. A célom, hogy a hirdetésed jól előkészített legyen, és csak komoly érdeklődőkkel kelljen foglalkoznod."], ["Ki dönt az árról és találkozóról?", "Mindig Te. Az árat, a hirdetés megjelenését és minden megtekintést Te hagysz jóvá."]],
    instagramEye: "Instagram", instagramTitle: "Kövess, vagy írj üzenetet.", instagramText: "Üzenetben is elérsz Instagramon.",
    contactEye: "Kapcsolat", contactTitle: "Kérdésed van?", call: "Hívj nyugodtan", footer: "YAGULI PRIVATE SALE · Privát értékesítési támogatás", terms: "Adatvédelem és feltételek", reviewTitle: "Kérés áttekintése", consent: "Elolvastam és elfogadom az Adatvédelmi és feltétel összefoglalót.", openMessages: "Megnyitás az Üzenetekben", copyRequest: "Kérés másolása", newRequest: "Új kérés", legalNotice: "Ez csak egy előzetes kérés. Nincs fizetés, nincs szerződés, és a rendszer nem küld üzenetet a Te jóváhagyásod nélkül.", sent: "Az üzenet előkészítve — küldd el, és hamarosan jelentkezem.", copied: "A kérés szövege a vágólapra került.", termsTitle: "Adatvédelem és feltételek", close: "Bezárás", country: "Országkód", approximate: "kb.", messageTitle: "YAGULI PRIVATE SALE – előzetes kérés", yes: "Igen", no: "Nem", pricePlaceholder: "12 000 000 Ft", required: "Kérlek, töltsd ki ezt a mezőt.", priceHint: "Példa: 12 000 000 Ft"
  },
  en: {
    prototype: "Prototype", nav: "YAGULI PRIVATE SALE", heroEyebrow: "Automotive concierge for private sellers",
    heroTitle: "Private sale.<br><span class=\"gradient-text\">Professional support.</span>", heroLead: "You sell your car on your own terms. I handle advert preparation, inquiries and coordination with serious buyers.",
    how: "How it works", quote: "Request an estimate", whoEye: "Who is it for?", whoTitle: "Sell privately — without pressure or chaos.",
    who: ["You want to sell directly to the buyer as a private owner.", "You do not want dealer pressure or trade-in negotiations.", "You do not have time for endless calls and messages.", "You only want to meet serious, screened buyers."],
    howEye: "How it works", howTitle: "Four steps, with your approval.",
    steps: [["Assessment and strategy", "We review the car, its condition and its market position, then set the sales strategy together."], ["Advertisement preparation", "The listing text is prepared. You can use your own photos or ask for a photo session."], ["Inquiry screening", "The approved advert is placed on the right platforms. I handle calls and messages and answer the first questions."], ["Serious buyer, arranged viewing", "I contact you only when there is a serious buyer. A viewing is arranged only if you want it."]],
    approval: "Publishing the advert and every viewing happen only with the owner’s approval.", includesEye: "What is included?", includesTitle: "Full sales support.", includes: ["Listing copy", "Price-positioning input", "Optional photography", "Publishing after approval", "Call and message handling", "Buyer screening", "Viewing coordination"],
    priceEye: "Pricing", priceTitle: "Straightforward marketing fee.", priceOne: "The marketing fee depends on the vehicle’s value, condition and the agreed scope of work.", priceTwo: "Example: for a car worth about <strong>≈ $20,833</strong> (7.5 million Ft), the estimated marketing fee can be <strong>≈ $417</strong> (150,000 Ft).", priceNote: "The final fee is always agreed in writing before work begins.",
    controlEye: "You remain in control", control: "The car remains your property. The listing, price and every viewing happen with your approval.",
    formEye: "Request an estimate", formTitle: "Tell me about your car.", fields: { name: "Full name", phone: "Phone number", email: "Email", car: "Make and model", year: "Year", mileage: "Mileage (km)", price: "Expected price", location: "Current location", photo: "Photography", notes: "Notes" },
    phonePlaceholder: "e.g. 30 123 4567", ownPhotos: "My own photos", photoRequest: "I need photography", review: "Review request", prototypeNote: "Your details are used only to prepare the message; nothing is sent automatically.",
    faqEye: "FAQ", faqTitle: "Frequently asked questions", faq: [["Are you a dealer?", "No. I do not buy or take over your car. I provide private-sales support: you remain the owner and sell directly to the buyer."], ["Is a sale guaranteed?", "No. Nobody can guarantee a sale. The goal is a well-prepared listing and only serious inquiries for you to handle."], ["Who decides on price and viewings?", "You always do. You approve the price, publication of the listing and every viewing."]],
    instagramEye: "Instagram", instagramTitle: "Follow or send a message.", instagramText: "You can also reach me by Instagram DM.",
    contactEye: "Contact", contactTitle: "Questions?", call: "Feel free to call", footer: "YAGULI PRIVATE SALE · Private sales support", terms: "Privacy & terms", reviewTitle: "Review your request", consent: "I have read and accept the Privacy & terms summary.", openMessages: "Open Messages", copyRequest: "Copy request", newRequest: "Start over", legalNotice: "This is only an initial request. No payment or contract is created, and no message is sent without your approval.", sent: "Your message is ready — send it and I’ll get back to you shortly.", copied: "The request text was copied to your clipboard.", termsTitle: "Privacy & terms", close: "Close", country: "Country code", approximate: "approx.", messageTitle: "YAGULI PRIVATE SALE – initial request", yes: "Yes", no: "No", pricePlaceholder: "$33,333", required: "Please complete this field.", priceHint: "Enter an HUF amount; USD is shown as an estimate."
  }
};

function t() { return content[language]; }
function section(eye, title, body, id = "") { return `<section class="section"${id ? ` id="${id}"` : ""}><div class="container"><p class="eyebrow">${eye}</p><h2>${title}</h2><div class="section-body">${body}</div></div></section>`; }
function localePrice(huf) { const n = Number(huf || 0); if (!n) return ""; return language === "hu" ? `${new Intl.NumberFormat("hu-HU").format(n)} Ft` : `≈ $${Math.round(n / USD_RATE).toLocaleString("en-US")}`; }
function sourcePrice(huf) { return `${new Intl.NumberFormat("hu-HU").format(Number(huf || 0))} Ft`; }

function render() {
  const c = t();
  document.documentElement.lang = language;
  document.title = "YAGULI PRIVATE SALE";
  app.innerHTML = `
    <div class="shell">
      <header class="site-header"><div class="container header-inner">
        <a class="brand" href="#top" aria-label="Yaguli Private Sale"><img src="yaguli-logo-white.png" alt="Yaguli" /></a>
        <div class="header-right"><div class="lang-switch" aria-label="Language"><button class="${language === "hu" ? "is-active" : ""}" data-language="hu">HU</button><button class="${language === "en" ? "is-active" : ""}" data-language="en">ENG</button></div><span class="badge">${c.prototype}</span></div>
      </div></header>
      <section id="top" class="hero"><div class="container"><p class="eyebrow">${c.heroEyebrow}</p><h1>${c.heroTitle}</h1><p class="lead">${c.heroLead}</p><div class="actions"><a class="button button-ghost" href="#how">${c.how}</a><a class="button button-primary" href="#quote">${c.quote}</a></div></div></section>
      <div class="container"><div class="hairline"></div></div>
      ${section(c.whoEye, c.whoTitle, `<ul class="check-list">${c.who.map(x => `<li>${x}</li>`).join("")}</ul>`)}
      ${section(c.howEye, c.howTitle, `<ol class="steps">${c.steps.map((s, i) => `<li class="step"><span class="step-index">0${i + 1}</span><div><h3 class="step-title">${s[0]}</h3><p>${s[1]}</p></div></li>`).join("")}</ol><p class="small-note">${c.approval}</p>`, "how")}
      ${section(c.includesEye, c.includesTitle, `<div class="service-grid">${c.includes.map(x => `<div>${x}</div>`).join("")}</div>`)}
      ${section(c.priceEye, c.priceTitle, `<div class="card pricing"><p>${c.priceOne}</p><p class="muted">${c.priceTwo}</p><div class="hairline" style="margin:20px 0"></div><p class="small-note">${c.priceNote}</p></div>`)}
      <section class="section"><div class="container"><div class="callout"><p class="eyebrow">${c.controlEye}</p><p>${c.control}</p></div></div></section>
      ${section(c.formEye, c.formTitle, formMarkup(c), "quote")}
      ${section(c.faqEye, c.faqTitle, `<div class="faq">${c.faq.map(x => `<details><summary>${x[0]}</summary><p>${x[1]}</p></details>`).join("")}</div>`)}
      ${section(c.instagramEye, c.instagramTitle, `<div class="card instagram-card"><div class="mini-grid" aria-hidden="true"><span></span><span></span><span></span></div><div><a class="instagram-handle" href="https://www.instagram.com/yaguliautomobili/" target="_blank" rel="noopener noreferrer">@yaguliautomobili</a><p>${c.instagramText}</p></div></div>`)}
      ${section(c.contactEye, c.contactTitle, `<div class="card contact-row"><div><strong>${c.call}</strong><p>+36 30 609 2018</p></div><a class="contact-phone" href="tel:${PHONE}">+36 30 609 2018</a></div>`)}
      <footer class="footer"><div class="container">${c.footer}<div class="footer-links"><button data-terms>${c.terms}</button><a href="tel:${PHONE}">+36 30 609 2018</a></div></div></footer>
    </div>`;
  bindEvents();
}

function formMarkup(c) {
  return `<form id="quote-form" class="form" novalidate>
    <div class="form-grid">
      ${field("name", c.fields.name, "text", "")}
      <div class="field"><label for="dial">${c.country}</label><div class="phone-grid"><select id="dial" class="select" aria-label="${c.country}"><option>+36</option><option>+43</option><option>+44</option><option>+49</option><option>+40</option><option>+421</option><option>+1</option></select><input class="input" id="phone" name="phone" required inputmode="tel" placeholder="${c.phonePlaceholder}" maxlength="24" /></div></div>
      ${field("email", c.fields.email, "email", "")}
      ${field("car", c.fields.car, "text", "")}
      ${field("year", c.fields.year, "text", "numeric")}
      ${field("mileage", c.fields.mileage, "text", "numeric")}
      <div class="field"><label for="price">${c.fields.price}</label><input class="input" id="price" name="price" required inputmode="numeric" autocomplete="off" placeholder="${c.pricePlaceholder}" /><p id="price-hint" class="field-note">${c.priceHint}</p></div>
      ${field("location", c.fields.location, "text", "")}
    </div>
    <fieldset style="border:0;padding:0;margin:0"><legend class="legend">${c.fields.photo}</legend><div class="options" style="margin-top:8px"><button type="button" class="option is-selected" data-photo="own">${c.ownPhotos}</button><button type="button" class="option" data-photo="request">${c.photoRequest}</button></div></fieldset>
    <div class="field"><label for="notes">${c.fields.notes}</label><textarea class="textarea" id="notes" name="notes" maxlength="1000"></textarea></div>
    <button class="button button-primary" type="submit">${c.review}</button><p class="prototype-note">${c.prototypeNote}</p>
  </form>`;
}
function field(name, label, type, inputmode) { return `<div class="field"><label for="${name}">${label}</label><input class="input" id="${name}" name="${name}" required type="${type}" ${inputmode ? `inputmode="${inputmode}"` : ""} maxlength="120" /></div>`; }

function bindEvents() {
  document.querySelectorAll("[data-language]").forEach(button => button.addEventListener("click", () => { language = button.dataset.language; localStorage.setItem("yaguli-private-sale-language", language); render(); }));
  document.querySelector("[data-terms]").addEventListener("click", openTerms);
  let photo = "own";
  document.querySelectorAll("[data-photo]").forEach(button => button.addEventListener("click", () => { photo = button.dataset.photo; document.querySelectorAll("[data-photo]").forEach(b => b.classList.toggle("is-selected", b === button)); }));
  const price = document.querySelector("#price");
  price.addEventListener("input", () => { const raw = price.value.replace(/\D/g, ""); price.dataset.raw = raw; price.value = raw ? localePrice(raw) : ""; document.querySelector("#price-hint").textContent = raw && language === "en" ? `${sourcePrice(raw)}` : t().priceHint; });
  document.querySelector("#quote-form").addEventListener("submit", event => { event.preventDefault(); const form = event.currentTarget; let valid = true; form.querySelectorAll("[required]").forEach(input => { input.classList.remove("invalid"); if (!input.value.trim()) { valid = false; input.setAttribute("aria-invalid", "true"); } else { input.removeAttribute("aria-invalid"); } }); if (!valid) { toast(t().required); return; } const fd = new FormData(form); requestData = { name: fd.get("name").trim(), phone: `${document.querySelector("#dial").value} ${fd.get("phone").trim()}`, email: fd.get("email").trim(), car: fd.get("car").trim(), year: fd.get("year").trim(), mileage: fd.get("mileage").trim(), price: price.dataset.raw || price.value.replace(/\D/g, ""), location: fd.get("location").trim(), photo, notes: fd.get("notes").trim() }; openReview(); });
}

function requestRows() { const c = t(); const d = requestData; const labels = c.fields; const fields = [[labels.name,d.name],[labels.phone,d.phone],[labels.email,d.email],[labels.car,d.car],[labels.year,d.year],[labels.mileage,d.mileage],[labels.price,localePrice(d.price)],[labels.location,d.location],[labels.photo,d.photo === "own" ? c.ownPhotos : c.photoRequest],[labels.notes,d.notes || "—"]]; return fields.map(([label, value], index) => `<div class="${index === fields.length - 1 ? "wide" : ""}"><dt>${label}</dt><dd>${escapeHTML(value)}</dd></div>`).join(""); }
function smsText() { const c = t(); const d = requestData; return `${c.messageTitle}\n\n${c.fields.name}: ${d.name}\n${c.fields.phone}: ${d.phone}\n${c.fields.email}: ${d.email}\n${c.fields.car}: ${d.car}\n${c.fields.year}: ${d.year}\n${c.fields.mileage}: ${d.mileage} km\n${c.fields.price}: ${localePrice(d.price)} (${sourcePrice(d.price)})\n${c.fields.location}: ${d.location}\n${c.fields.photo}: ${d.photo === "own" ? c.ownPhotos : c.photoRequest}\n${c.fields.notes}: ${d.notes || "—"}\n\nNyelv / Language: ${language.toUpperCase()}`; }
function openReview() { const c = t(); openModal(`<div class="modal-head"><div><h3>${c.reviewTitle}</h3></div><button class="close" data-close aria-label="${c.close}">×</button></div><dl class="summary">${requestRows()}</dl><p class="notice">${c.legalNotice}</p><label class="consent"><input id="consent" type="checkbox"><span>${c.consent}</span></label><div class="modal-actions"><button id="sms-action" class="button button-primary" disabled>${c.openMessages}</button><button id="copy-action" class="button button-ghost">${c.copyRequest}</button><button id="restart" class="button button-ghost">${c.newRequest}</button></div>`); document.querySelector("#consent").addEventListener("change", e => document.querySelector("#sms-action").disabled = !e.target.checked); document.querySelector("#sms-action").addEventListener("click", openSms); document.querySelector("#copy-action").addEventListener("click", copyRequest); document.querySelector("#restart").addEventListener("click", () => { closeModal(); document.querySelector("#quote-form").reset(); window.location.hash = "quote"; }); }
function termsBody() { const c = t(); const body = language === "hu" ? `<h4>Szolgáltatás jellege</h4><p>A Yaguli Private Sale marketing- és privát értékesítési támogatást nyújt. Nem vásárolja meg az autót, nem kereskedő és nem garantál értékesítést, vevőt, árat, időtartamot vagy eredményt.</p><h4>Tulajdonos jóváhagyása</h4><p>Az autó végig a tulajdonos birtokában és tulajdonában marad. A hirdetés közzététele, az ár, a hirdetés tartalma és minden találkozó kizárólag a tulajdonos jóváhagyásával történhet.</p><h4>Mit végzek?</h4><p>A szolgáltatás magában foglalhat hirdetés-előkészítést és -közzétételi segítséget, érdeklődők kezelését, kommunikációt és előszűrést. A konkrét feladatokat és a díjat mindig indulás előtt, írásban egyeztetjük.</p><h4>Adatkezelés</h4><p>A megadott adatokat kizárólag a megkeresés megválaszolásához és a szolgáltatás egyeztetéséhez használjuk. Az adatokat nem értékesítjük. Ez az összefoglaló tájékoztató jellegű, nem szerződés.</p>` : `<h4>Nature of service</h4><p>Yaguli Private Sale provides marketing and private-sales support. It does not buy the vehicle, act as a dealership or guarantee a sale, buyer, price, time frame or outcome.</p><h4>Owner approval</h4><p>The vehicle remains in the owner's possession and ownership at all times. The listing, price, listing content and every viewing require the owner's approval.</p><h4>What I do</h4><p>The service may include listing preparation and publishing assistance, inquiry handling, communication and buyer screening. The exact scope and fee are always agreed in writing before work begins.</p><h4>Privacy</h4><p>Submitted personal data is used only to respond to the request and arrange the service. It is not sold. This is an informational summary, not a contract.</p>`; return `<div class="modal-head"><div><h3>${c.termsTitle}</h3></div><button class="close" data-close aria-label="${c.close}">×</button></div><div class="terms-copy">${body}</div>`; }
function openTerms() { openModal(termsBody()); }
function openModal(html) { modalRoot.innerHTML = `<div class="modal-backdrop" role="presentation"><section class="modal" role="dialog" aria-modal="true">${html}</section></div>`; modalRoot.querySelector("[data-close]")?.addEventListener("click", closeModal); modalRoot.querySelector(".modal-backdrop").addEventListener("click", e => { if (e.target === e.currentTarget) closeModal(); }); }
function closeModal() { modalRoot.innerHTML = ""; }
function openSms() { const text = smsText(); const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent); if (!isMobile) { copyRequest(); return; } window.location.href = `sms:${PHONE}?body=${encodeURIComponent(text)}`; toast(t().sent); }
async function copyRequest() { try { await navigator.clipboard.writeText(smsText()); toast(t().copied); } catch { window.prompt("Copy this request:", smsText()); } }
function toast(text) { const old = document.querySelector(".toast"); old?.remove(); const el = document.createElement("div"); el.className = "toast"; el.textContent = text; document.body.append(el); setTimeout(() => el.remove(), 4400); }
function escapeHTML(value) { return String(value).replace(/[&<>'\"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"})[char]); }
render();
