const app = document.querySelector("#app");
const navLinks = document.querySelectorAll("[data-nav]");

const calculators = [
  { id: "standard", number: "01", icon: "＋", tone: "green", tag: "ZÁKLADNÍ", title: "Základní", description: "+ − × ÷ %", intro: "", chip: "± · % · √" },
  { id: "scientific", number: "02", icon: "√", tone: "purple", tag: "VĚDECKÁ", title: "Vědecká", description: "sin · cos · tan · ln · log", intro: "", chip: "RAD · DEG" },
  { id: "shapes", number: "03", icon: "◩", tone: "orange", tag: "GEOMETRIE", title: "Tvary 2D + 3D", description: "Kruh · kužel · koule · jehlan · hranol", intro: "", chip: "2D · 3D" },
  { id: "finance", number: "04", icon: "Kč", tone: "green", tag: "FINANCE", title: "Finance", description: "Úrok · růst · čas", intro: "", chip: "ÚROČENÍ" },
  { id: "chemistry", number: "05", icon: "⚗", tone: "blue", tag: "CHEMIE", title: "Chemická", description: "mol · M · c · pH", intro: "", chip: "CHEMIE" },
  { id: "physics", number: "06", icon: "ϟ", tone: "purple", tag: "FYZIKA", title: "Fyzikální", description: "U · I · R · P", intro: "", chip: "FYZIKA" },
  { id: "convert", number: "07", icon: "⇄", tone: "orange", tag: "JEDNOTKY", title: "Převodník jednotek", description: "mm ↔ cm · kg ↔ g · l ↔ ml · °C ↔ °F", intro: "", chip: "PŘEVOD" },
];

const formulaGroups = [
  { title: "Matematika", items: [
    ["Pythagorova věta", "a² + b² = c²", "V pravoúhlém trojúhelníku je c přepona."],
    ["Kvadratická rovnice", "x = (−b ± √(b² − 4ac)) / 2a", "Řešení ax² + bx + c = 0; výraz pod odmocninou je diskriminant."],
    ["Diskriminant", "D = b² − 4ac", "D > 0: dva kořeny, D = 0: jeden, D < 0: žádný reálný kořen."],
    ["Kruh", "O = 2πr · S = πr²", "Obvod O a obsah S kruhu s poloměrem r."],
    ["Procentní změna", "((nová − původní) / původní) × 100 %", "Výsledek se znaménkem ukáže růst nebo pokles."],
    ["Aritmetická posloupnost", "aₙ = a₁ + (n − 1)d", "d je diference mezi sousedními členy."],
    ["Součet posloupnosti", "Sₙ = n(a₁ + aₙ) / 2", "Součet prvních n členů aritmetické posloupnosti."],
    ["Sinusová věta", "a / sin α = b / sin β = c / sin γ", "Vztah stran a protilehlých úhlů libovolného trojúhelníku."],
  ] },
  { title: "Geometrie", items: [
    ["Heronův vzorec", "S = √(s(s − a)(s − b)(s − c))", "s = (a + b + c) / 2 je poloviční obvod."],
    ["Obsah trojúhelníku", "S = a · vₐ / 2", "a je základna, vₐ výška na tuto základnu."],
    ["Obsah a obvod kruhu", "S = πr² · O = 2πr", "r je poloměr."],
    ["Obsah a obvod obdélníku", "S = ab · O = 2(a + b)", "a, b jsou délky stran."],
    ["Obsah a obvod čtverce", "S = a² · O = 4a", "a je délka strany."],
    ["Rovnoběžník", "S = ah · O = 2(a + b)", "a je základna, h výška, b strana."],
    ["Lichoběžník", "S = (a + c)h / 2", "a, c jsou rovnoběžné strany."],
    ["Kosočtverec", "S = ah · O = 4a", "a je strana, h výška."],
    ["Elipsa", "S = πab · O ≈ π(3(a + b) − √((3a + b)(a + 3b)))", "a a b jsou poloosy elipsy; obvod je Ramanujanova aproximace."],
    ["Pravidelný n-úhelník", "O = na · S = na² / (4 tan(π/n))", "n je počet stran a a délka strany."],
    ["Objem koule", "V = 4πr³ / 3", "r je poloměr koule."],
    ["Povrch koule", "P = 4πr²", "r je poloměr koule."],
    ["Objem válce", "V = πr²h", "r je poloměr podstavy a h výška."],
    ["Povrch válce", "P = 2πr(r + h)", "Celkový povrch včetně obou podstav."],
    ["Kužel", "V = πr²h / 3 · P = πr(r + s)", "s = √(r² + h²) je strana kužele."],
    ["Krychle", "V = a³ · P = 6a²", "a je délka hrany."],
    ["Kvádr", "V = abc · P = 2(ab + ac + bc)", "a, b, c jsou délky hran."],
    ["Čtyřboký jehlan", "V = a²h / 3", "a je hrana čtvercové podstavy, h výška."],
    ["Trojboký hranol", "V = Sₚh · P = 2Sₚ + (a + b + c)h", "Sₚ je obsah trojúhelníkové podstavy."],
  ] },
  { title: "Finance a fyzika", items: [
    ["Složené úročení", "A = P(1 + r / n)ⁿᵗ", "P počáteční vklad, r roční sazba, n četnost úročení, t roky."],
    ["Jednoduché úročení", "A = P(1 + rt)", "Úrok se počítá vždy jen z původního vkladu."],
    ["Ohmův zákon", "U = R · I", "Napětí U, odpor R a proud I."],
    ["Elektrický výkon", "P = U · I = I²R = U² / R", "P je výkon ve wattech."],
    ["Rovnoměrný pohyb", "s = v · t", "Dráha je rychlost krát čas."],
    ["Hustota", "ρ = m / V", "Hmotnost m dělená objemem V."],
    ["Kinetická energie", "Eₖ = ½mv²", "m je hmotnost a v rychlost tělesa."],
  ] },
  { title: "Chemie", items: [
    ["Látková koncentrace", "c = n / V", "c v mol/l, n v molech a V v litrech."],
    ["Látkové množství", "n = m / M", "Hmotnost m dělená molární hmotností M."],
    ["Hmotnost roztoku", "m = n · M", "n v molech a M v g/mol dají hmotnost v gramech."],
    ["pH", "pH = −log₁₀[H₃O⁺]", "Pro zředěné vodné roztoky; [H₃O⁺] v mol/l."],
    ["pOH", "pOH = −log₁₀[OH⁻]", "Při 25 °C pro zředěné vodné roztoky: pH + pOH = 14."],
    ["Molární hmotnost", "M = m / n", "Jednotka obvykle g/mol."],
  ] },
  { title: "Konstanty", items: [
    ["π", "3,14159265…", "PI · π"],
    ["e", "2,71828183…", "Eulerovo číslo."],
    ["φ", "(1 + √5) / 2 ≈ 1,61803399", "Zlatý poměr."],
    ["τ", "2π ≈ 6,28318531", "TAU · celý kruh v radiánech."],
    ["c₀", "299 792 458 m/s", "Rychlost světla ve vakuu."],
    ["g", "9,80665 m/s²", "Standardní tíhové zrychlení."],
    ["Nₐ", "6,02214076 × 10²³ mol⁻¹", "Avogadrova konstanta."],
    ["kᵦ", "1,380649 × 10⁻²³ J/K", "Boltzmannova konstanta."],
    ["h", "6,62607015 × 10⁻³⁴ J·s", "Planckova konstanta."],
    ["R", "8,314462618 J/(mol·K)", "Molární plynová konstanta."],
  ] },
];

const unitOptions = {
  length: [["mm", "milimetr"], ["cm", "centimetr"], ["m", "metr"], ["km", "kilometr"], ["in", "palec"], ["ft", "stopa"], ["mi", "míle"]],
  mass: [["mg", "miligram"], ["g", "gram"], ["kg", "kilogram"], ["t", "tuna"], ["oz", "unce"], ["lb", "libra"]],
  area: [["cm2", "cm²"], ["m2", "m²"], ["ha", "hektar"], ["km2", "km²"], ["ft2", "ft²"]],
  volume: [["ml", "mililitr"], ["l", "litr"], ["m3", "m³"], ["tsp", "čajová lžička"], ["cup", "šálek"]],
  time: [["s", "sekunda"], ["min", "minuta"], ["h", "hodina"], ["d", "den"]],
  data: [["B", "byte"], ["KB", "kilobyte"], ["MB", "megabyte"], ["GB", "gigabyte"], ["TB", "terabyte"]],
  temperature: [["C", "°C"], ["F", "°F"], ["K", "K"]],
};

const shapes = [
  { group: "2D", id: "circle", title: "Kruh", fields: [["r", "Poloměr r", "cm"]] },
  { group: "2D", id: "square", title: "Čtverec", fields: [["a", "Strana a", "cm"]] },
  { group: "2D", id: "rectangle", title: "Obdélník", fields: [["a", "Strana a", "cm"], ["b", "Strana b", "cm"]] },
  { group: "2D", id: "triangle", title: "Trojúhelník", fields: [["a", "Strana a", "cm"], ["b", "Strana b", "cm"], ["c", "Strana c", "cm"]] },
  { group: "2D", id: "parallelogram", title: "Rovnoběžník", fields: [["a", "Základna a", "cm"], ["b", "Strana b", "cm"], ["h", "Výška h", "cm"]] },
  { group: "2D", id: "trapezoid", title: "Lichoběžník", fields: [["a", "Základna a", "cm"], ["b", "Základna b", "cm"], ["c", "Strana c", "cm"], ["d", "Strana d", "cm"], ["h", "Výška h", "cm"]] },
  { group: "2D", id: "rhombus", title: "Kosočtverec", fields: [["a", "Strana a", "cm"], ["h", "Výška h", "cm"]] },
  { group: "2D", id: "ellipse", title: "Elipsa", fields: [["a", "Hlavní poloosa a", "cm"], ["b", "Vedlejší poloosa b", "cm"]] },
  { group: "2D", id: "polygon", title: "Pravidelný n-úhelník", fields: [["n", "Počet stran n", "", 3], ["a", "Strana a", "cm"]] },
  { group: "3D", id: "cube", title: "Krychle", fields: [["a", "Hrana a", "cm"]] },
  { group: "3D", id: "cuboid", title: "Kvádr", fields: [["a", "Hrana a", "cm"], ["b", "Hrana b", "cm"], ["c", "Hrana c", "cm"]] },
  { group: "3D", id: "sphere", title: "Koule", fields: [["r", "Poloměr r", "cm"]] },
  { group: "3D", id: "cylinder", title: "Válec", fields: [["r", "Poloměr r", "cm"], ["h", "Výška h", "cm"]] },
  { group: "3D", id: "cone", title: "Kužel", fields: [["r", "Poloměr r", "cm"], ["h", "Výška h", "cm"]] },
  { group: "3D", id: "pyramid", title: "Čtyřboký jehlan", fields: [["a", "Hrana podstavy a", "cm"], ["h", "Výška h", "cm"]] },
  { group: "3D", id: "prism", title: "Trojboký hranol", fields: [["a", "Strana podstavy a", "cm"], ["b", "Strana podstavy b", "cm"], ["c", "Strana podstavy c", "cm"], ["h", "Délka hranolu h", "cm"]] },
];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function formatNumber(value, digits = 8) {
  if (!Number.isFinite(value)) throw new Error("Výsledek není konečné číslo.");
  const absolute = Math.abs(value);
  const scientific = absolute !== 0 && (absolute >= 1e12 || absolute < 1e-6);
  return new Intl.NumberFormat("cs-CZ", scientific
    ? { notation: "scientific", maximumSignificantDigits: Math.max(digits, 12) }
    : { maximumFractionDigits: digits }).format(Object.is(value, -0) ? 0 : value);
}

function numberField(name, label, placeholder, unit = "", options = {}) {
  return `<label class="field${options.full ? " full-width" : ""}">
    <span class="field-label">${label}${unit ? ` · ${unit}` : ""}</span>
    <input name="${name}" type="text" inputmode="decimal" ${options.required === false ? "" : "required"} placeholder="${placeholder}" value="${options.value ?? ""}">
  </label>`;
}

function selectField(name, label, options, full = false) {
  return `<label class="field${full ? " full-width" : ""}">
    <span class="field-label">${label}</span>
    <select name="${name}">${options.map(([value, text]) => `<option value="${value}">${text}</option>`).join("")}</select>
  </label>`;
}

function formulaMarkup(items) {
  return items.map(([title, expression, description]) => `<div class="formula-item">
    <strong>${title}</strong><code>${expression}</code><span>${description}</span>
  </div>`).join("");
}

function cardMarkup(item) {
  return `<a class="calc-card tone-${item.tone}" href="#${item.id}">
    <div class="card-top"><span class="card-tag">${item.tag}</span><span class="card-icon">${iconMarkup(item)}</span></div>
    <h3>${item.title}</h3><p>${item.description}</p>
  </a>`;
}

function homePage() {
  return `<section class="hero">
    <div class="hero-copy">
      <span class="eyebrow">kalkulacka.balada.life</span>
      <h1>Kalkulačka<br><em>∑ √ π</em></h1>
    </div>
    <div class="hero-art" aria-hidden="true"><i class="shape shape-one"></i><i class="shape shape-two"></i><i class="shape shape-three"></i><i class="shape shape-four"></i></div>
  </section>
  <section aria-labelledby="tools-heading">
    <div class="section-intro"><h2 id="tools-heading">Kalkulačky</h2></div>
    <div class="calculator-grid">${calculators.map(cardMarkup).join("")}</div>
  </section>
  `;
}

function iconMarkup(item) {
  if (item.id === "finance") return `<span class="finance-icon" aria-hidden="true"><span>Kč</span></span>`;
  if (item.id === "chemistry") return `<svg class="chemistry-icon" viewBox="0 0 32 32" aria-hidden="true"><path d="M12 4h8M14 4v9l-7 12a2 2 0 0 0 2 3h14a2 2 0 0 0 2-3l-7-12V4M10 22h12"/></svg>`;
  if (item.id === "shapes") return `<span class="shapes-icon" aria-hidden="true"><i></i><b></b></span>`;
  return escapeHtml(item.icon);
}

function expressionPanel(scientific) {
  const keys = scientific
    ? [["sin", "sin()"], ["cos", "cos()"], ["tan", "tan()"], ["asin", "asin()"], ["acos", "acos()"], ["atan", "atan()"], ["sinh", "sinh()"], ["cosh", "cosh()"], ["tanh", "tanh()"], ["ln", "ln()"], ["log", "log()"], ["log₂", "log2()"], ["exp", "exp()"], ["√", "√()"], ["xʸ", "^"], ["!", "!"], ["%", "%"], ["π", "π"], ["e", "e"], ["φ", "φ"], ["τ", "τ"], ["c₀", "c₀"], ["g", "g"], ["Nₐ", "Nₐ"], ["kᵦ", "kᵦ"], ["h", "h"], ["(", "("], [")", ")"], ["7", "7"], ["8", "8"], ["9", "9"], ["÷", "÷"], ["4", "4"], ["5", "5"], ["6", "6"], ["×", "×"], ["1", "1"], ["2", "2"], ["3", "3"], ["−", "−"], ["0", "0"], [".", "."], ["+", "+"], ["AC", "clear"], ["⌫", "backspace"], ["=", "calculate"]]
    : [["7", "7"], ["8", "8"], ["9", "9"], ["÷", "÷"], ["4", "4"], ["5", "5"], ["6", "6"], ["×", "×"], ["1", "1"], ["2", "2"], ["3", "3"], ["−", "−"], ["0", "0"], [".", "."], ["%", "%"], ["+", "+"], ["(", "("], [")", ")"], ["√", "√()"], ["x²", "^2"], ["π", "π"], ["e", "e"], ["AC", "clear"], ["⌫", "backspace"], ["=", "calculate"]];
  return `<form class="tool-form" data-type="${scientific ? "scientific" : "standard"}">
    <label class="expression-wrap">
      <span class="field-label">f(x)</span>
      <input class="expression-input" name="expression" type="text" autocomplete="off" spellcheck="false" placeholder="0" aria-label="Výraz">
    </label>
    ${scientific ? `<label class="angle-mode field"><span class="field-label">ÚHEL</span><select name="angleMode"><option value="rad">RAD</option><option value="deg">DEG</option></select></label>` : ""}
    <div class="quick-keys calc-keypad${scientific ? " scientific-keypad" : ""}" aria-label="Tlačítka kalkulačky">${keys.map(([label, insert]) => {
      const action = ["clear", "backspace", "calculate"].includes(insert) ? insert : "";
      return `<button type="button" ${action ? `data-action="${action}"` : `data-insert="${insert}"`}>${label}</button>`;
    }).join("")}</div>
    <div class="calc-actions"><span class="form-error" role="status" aria-live="polite"></span></div>
    <div class="result-box" aria-live="polite"><div><span class="result-label">VÝSLEDEK</span><output class="result-value">—</output></div><span class="result-detail"></span></div>
  </form>`;
}

function getFormFields(id) {
  if (id === "shapes") return `<label class="field full-width"><span class="field-label">TVAR</span><select name="shape">${shapes.map((shape) => `<option value="${shape.id}">${shape.group} · ${shape.title}</option>`).join("")}</select></label><div class="shape-fields field-grid full-width"></div>`;
  if (id === "finance") return `${numberField("principal", "Počáteční vklad", "např. 50 000", "Kč", { min: 0 })}${numberField("rate", "Roční úroková sazba", "např. 5", "%", { min: 0 })}${numberField("years", "Doba spoření", "např. 10", "let", { min: 0 })}${numberField("frequency", "Úročení za rok", "12", "krát", { min: 1, value: 12 })}`;
  if (id === "chemistry") return `<div class="field-grid full-width">
    ${selectField("chemMode", "Typ výpočtu", [["concentration", "Koncentrace · c = n / V"], ["moles", "Látkové množství · n = m / M"], ["mass", "Hmotnost · m = n · M"], ["ph", "pH ze koncentrace"]], true)}
    <div class="chem-fields field-grid full-width"></div>
  </div>`;
  if (id === "physics") return `${selectField("target", "Co chceš vypočítat?", [["voltage", "Napětí U"], ["current", "Proud I"], ["resistance", "Odpor R"], ["power", "Výkon P"]], true)}
    ${numberField("voltage", "Napětí U", "např. 12", "V", { required: false })}
    ${numberField("current", "Proud I", "např. 2", "A", { required: false })}
    ${numberField("resistance", "Odpor R", "např. 6", "Ω", { required: false })}`;
  if (id === "convert") return `${selectField("unitCategory", "Kategorie", [["length", "Délka"], ["mass", "Hmotnost"], ["area", "Plocha"], ["volume", "Objem"], ["time", "Čas"], ["temperature", "Teplota"], ["data", "Data"]], true)}
    ${numberField("value", "Hodnota", "0", "", { full: true })}
    ${selectField("unitFrom", "Z jednotky", [], false)}
    ${selectField("unitTo", "Na jednotku", [], false)}`;
  return "";
}

function pagePage(id) {
  const item = calculators.find((calculator) => calculator.id === id);
  if (!item) return homePage();
  const formulas = formulaGroups.flatMap((group) => group.items).filter((formula) => {
    const groups = {
      standard: ["Procentní změna", "Aritmetická posloupnost", "Součet posloupnosti"],
      scientific: ["Kvadratická rovnice", "Diskriminant", "Sinusová věta"],
      shapes: ["Heronův vzorec", "Obsah trojúhelníku", "Pythagorova věta", "Sinusová věta", "Kruh", "Obsah a obvod kruhu", "Obsah a obvod čtverce", "Obsah a obvod obdélníku", "Rovnoběžník", "Lichoběžník", "Kosočtverec", "Elipsa", "Pravidelný n-úhelník", "Objem koule", "Povrch koule", "Objem válce", "Povrch válce", "Kužel", "Krychle", "Kvádr", "Čtyřboký jehlan", "Trojboký hranol"],
      finance: ["Složené úročení", "Jednoduché úročení", "Procentní změna"],
      chemistry: ["Látková koncentrace", "Látkové množství", "Hmotnost roztoku", "pH", "pOH", "Molární hmotnost"],
      physics: ["Ohmův zákon", "Elektrický výkon", "Rovnoměrný pohyb", "Hustota", "Kinetická energie"],
      convert: [],
    };
    return groups[id].includes(formula[0]);
  });
  const isExpression = id === "standard" || id === "scientific";
  document.title = id === "convert"
    ? "Převodník jednotek online | délka, hmotnost, objem, čas"
    : `${item.title} kalkulačka | kalkulacka.balada.life`;
  document.querySelector('meta[name="description"]').content = id === "convert"
    ? "Převodník jednotek online: převod délky mm na cm a m na km, hmotnosti kg na g, objemu litrů na ml, plochy, času, °C na °F a dat. Zdarma."
    : "Jednoduchá online kalkulačka: výpočty, vzorce, jednotky, chemie, fyzika a geometrie.";
  if (id === "convert") {
    document.querySelector('meta[property="og:title"]').content = document.title;
    document.querySelector('meta[property="og:description"]').content = document.querySelector('meta[name="description"]').content;
  }
  return `<div class="page-heading">
    <div class="breadcrumbs"><a href="#home">⌂</a><span>/</span><span>${item.title}</span></div>
    <div class="page-heading-row"><div><span class="page-kicker">${item.tag}</span><h1>${item.title}</h1>${id === "convert" ? `<p class="seo-intro">Převodník jednotek online: mm na cm, m na km, kg na g, litry na ml, °C na °F. Délka, hmotnost, plocha, objem, čas, teplota a data.</p>` : ""}</div></div>
  </div>
  <div class="work-grid">
    <section class="tool-panel" aria-labelledby="tool-heading">
      <div class="panel-heading"><div><h2 id="tool-heading">${item.title}</h2></div><span class="panel-chip">${item.chip}</span></div>
      ${isExpression ? expressionPanel(id === "scientific") : `<form class="tool-form" data-type="${id}">
        <div class="field-grid">${getFormFields(id)}</div>
        <div class="calc-actions"><button class="primary-button" type="submit">Vypočítat</button><span class="form-error" role="status" aria-live="polite"></span></div>
        <div class="result-box" aria-live="polite"><div><span class="result-label">VÝSLEDEK</span><output class="result-value">—</output></div><span class="result-detail"></span></div>
      </form>`}
    </section>
    <aside class="formula-panel"><h2>Vzorce</h2><div class="formula-list">${formulaMarkup(formulas)}</div></aside>
  </div>`;
}

function referencesPage() {
  const formulaCount = formulaGroups.reduce((count, group) => count + group.items.length, 0);
  return `<section class="page-heading reference-page">
    <div class="breadcrumbs"><a href="#home">⌂</a><span>/</span><span>Vzorce</span></div>
    <div class="page-heading-row"><div><span class="page-kicker">${formulaCount} VZORCŮ A KONSTANT</span><h1>Vzorce</h1></div></div>
    ${formulaGroups.map((group) => `<section class="reference-section"><div class="section-intro"><h2>${group.title}</h2></div><div class="formula-list">${formulaMarkup(group.items)}</div></section>`).join("")}
  </section>`;
}

function updateNavigation(route) {
  navLinks.forEach((link) => link.classList.toggle("active", link.dataset.nav === (route === "home" ? "home" : route === "formulas" ? "formulas" : "standard")));
}

function render() {
  const route = location.hash.slice(1) || "home";
  if (route === "home" || route === "formulas") {
    document.title = "Převodník jednotek online | kalkulacka.balada.life";
    document.querySelector('meta[name="description"]').content = "Převodník jednotek online: převod délky mm na cm a m na km, hmotnosti kg na g, objemu litrů na ml, plochy, času, °C na °F a dat. Zdarma.";
  }
  app.innerHTML = route === "home" ? homePage() : route === "formulas" ? referencesPage() : pagePage(route);
  updateNavigation(route);
  initializeDynamicFields();
}

function initializeDynamicFields() {
  const shapeSelect = app.querySelector('[name="shape"]');
  if (shapeSelect) {
    const drawShapeFields = () => {
      const shape = shapes.find((item) => item.id === shapeSelect.value);
      app.querySelector(".shape-fields").innerHTML = shape.fields
        .map(([name, label, unit, min]) => numberField(name, label, "0", unit, { min }))
        .join("");
    };
    shapeSelect.addEventListener("change", drawShapeFields);
    drawShapeFields();
  }

  const chemMode = app.querySelector('[name="chemMode"]');
  if (chemMode) {
    const drawChemFields = () => {
      const fields = app.querySelector(".chem-fields");
      const modeFields = {
        concentration: `${numberField("moles", "Látkové množství n", "např. 0,5", "mol")}${numberField("volume", "Objem V", "např. 2", "l", { min: 0 })}`,
        moles: `${numberField("mass", "Hmotnost m", "např. 10", "g")}${numberField("molarMass", "Molární hmotnost M", "např. 58,44", "g/mol", { min: 0 })}`,
        mass: `${numberField("moles", "Látkové množství n", "např. 0,5", "mol")}${numberField("molarMass", "Molární hmotnost M", "např. 58,44", "g/mol", { min: 0 })}`,
        ph: `${numberField("concentration", "Koncentrace H₃O⁺", "např. 0,001", "mol/l", { min: 0, full: true })}`,
      };
      fields.innerHTML = modeFields[chemMode.value];
    };
    chemMode.addEventListener("change", drawChemFields);
    drawChemFields();
  }

  const category = app.querySelector('[name="unitCategory"]');
  if (category) {
    const updateUnits = () => {
      const options = unitOptions[category.value];
      ["unitFrom", "unitTo"].forEach((name) => {
        const select = app.querySelector(`[name="${name}"]`);
        const previous = select.value;
        select.innerHTML = options.map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
        if (options.some(([value]) => value === previous)) select.value = previous;
      });
      const to = app.querySelector('[name="unitTo"]');
      if (to.options.length > 1 && to.selectedIndex === 0) to.selectedIndex = 1;
    };
    category.addEventListener("change", updateUnits);
    updateUnits();
  }
}

function tokenize(source) {
  const normalized = source
    .replace(/[−–]/g, "-")
    .replace(/[×·]/g, "*")
    .replace(/[÷]/g, "/")
    .replace(/log₂/g, "log2")
    .replace(/log₁₀/g, "log")
    .replace(/x²/g, "x^2")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/π/g, "pi")
    .replace(/φ/g, "phi")
    .replace(/τ/g, "tau")
    .replace(/c₀/g, "c0")
    .replace(/nₐ/gi, "na")
    .replace(/kᵦ/gi, "kb")
    .replace(/√/g, "sqrt")
    .replace(/,/g, ".")
    .replace(/\s+/g, "")
    .toLowerCase();
  const pattern = /(?:\d+\.?\d*|\.\d+)|(?:sqrt|asin|acos|atan|sinh|cosh|tanh|floor|ceil|round|log2|exp|sin|cos|tan|log|ln|abs|phi|tau|c0|na|kb|pi|e|g|h|r)|[()+\-*/^%!]/gy;
  const tokens = [];
  let position = 0;
  while (position < normalized.length) {
    pattern.lastIndex = position;
    const match = pattern.exec(normalized);
    if (!match) throw new Error("Zkontroluj zadaný výraz.");
    tokens.push(match[0]);
    position = pattern.lastIndex;
  }
  if (!tokens.length) throw new Error("Zadej výraz.");
  const constants = new Set(["pi", "e", "phi", "tau", "c0", "g", "na", "kb", "h", "r"]);
  const functions = new Set(["sqrt", "asin", "acos", "atan", "sinh", "cosh", "tanh", "floor", "ceil", "round", "log2", "exp", "sin", "cos", "tan", "log", "ln", "abs"]);
  const combined = [];
  tokens.forEach((token, index) => {
    const previous = tokens[index - 1];
    const leftCanMultiply = previous && (/^(?:\d|\.)/.test(previous) || constants.has(previous) || previous === ")" || previous === "!");
    const rightCanMultiply = /^(?:\d|\.)/.test(token) || constants.has(token) || token === "(" || functions.has(token);
    if (leftCanMultiply && rightCanMultiply) combined.push("*");
    combined.push(token);
  });
  return combined;
}

function evaluate(source, angleMode = "rad") {
  const tokens = tokenize(source);
  let position = 0;
  const peek = () => tokens[position];
  const consume = () => tokens[position++];
  const functions = new Set(["sqrt", "sin", "cos", "tan", "asin", "acos", "atan", "sinh", "cosh", "tanh", "log", "log2", "ln", "exp", "abs", "floor", "ceil", "round"]);

  function applyFunction(name, value) {
    if (name === "sqrt" && value < 0) throw new Error("Odmocnina ze záporného čísla není reálná.");
    if ((name === "log" || name === "ln") && value <= 0) throw new Error("Logaritmus je definován jen pro kladné číslo.");
    const angle = angleMode === "deg" ? value * Math.PI / 180 : value;
    const result = {
      sqrt: Math.sqrt,
      sin: Math.sin(angle), cos: Math.cos(angle), tan: Math.tan(angle),
      asin: Math.asin(value), acos: Math.acos(value), atan: Math.atan(value),
      sinh: Math.sinh(value), cosh: Math.cosh(value), tanh: Math.tanh(value),
      log: Math.log10, log2: Math.log2, ln: Math.log, exp: Math.exp, abs: Math.abs, floor: Math.floor,
      ceil: Math.ceil, round: Math.round,
    }[name];
    const evaluated = typeof result === "function" ? result(value) : result;
    const converted = angleMode === "deg" && ["asin", "acos", "atan"].includes(name)
      ? evaluated * 180 / Math.PI
      : evaluated;
    if (!Number.isFinite(converted)) throw new Error("Pro toto číslo není výsledek definován.");
    return converted;
  }

  function primary() {
    const token = consume();
    if (token === undefined) throw new Error("Výraz není dokončený.");
    if (token === "+") return unary();
    if (token === "-") return -unary();
    if (token === "pi") return Math.PI;
    if (token === "e") return Math.E;
    if (token === "phi") return (1 + Math.sqrt(5)) / 2;
    if (token === "tau") return 2 * Math.PI;
    if (token === "c0") return 299792458;
    if (token === "g") return 9.80665;
    if (token === "na") return 6.02214076e23;
    if (token === "kb") return 1.380649e-23;
    if (token === "h") return 6.62607015e-34;
    if (token === "r") return 8.314462618;
    if (functions.has(token)) {
      let argument;
      if (peek() === "(") {
        consume();
        argument = addSub();
        if (consume() !== ")") throw new Error("Chybí uzavírací závorka.");
      } else {
        argument = primary();
      }
      return applyFunction(token, argument);
    }
    if (token === "(") {
      const value = addSub();
      if (consume() !== ")") throw new Error("Chybí uzavírací závorka.");
      return value;
    }
    const value = Number(token);
    if (!Number.isFinite(value)) throw new Error("Neplatné číslo.");
    return value;
  }

  function power() {
    const base = primary();
    if (peek() === "^") {
      consume();
      return base ** unary();
    }
    return base;
  }

  function unary() { return power(); }

  function postfix() {
    let value = unary();
    while (peek() === "%" || peek() === "!") {
      const operator = consume();
      if (operator === "%") value /= 100;
      else {
        if (!Number.isInteger(value) || value < 0 || value > 170) throw new Error("Faktoriál je možný pro celá čísla od 0 do 170.");
        let factorial = 1;
        for (let index = 2; index <= value; index += 1) factorial *= index;
        value = factorial;
      }
    }
    return value;
  }

  function multiplyDivide() {
    let value = postfix();
    while (peek() === "*" || peek() === "/") {
      const operator = consume();
      const right = postfix();
      if (operator === "/" && right === 0) throw new Error("Nulou dělit nejde.");
      value = operator === "*" ? value * right : value / right;
    }
    return value;
  }

  function addSub() {
    let value = multiplyDivide();
    while (peek() === "+" || peek() === "-") {
      const operator = consume();
      const right = multiplyDivide();
      value = operator === "+" ? value + right : value - right;
    }
    return value;
  }

  const value = addSub();
  if (position !== tokens.length) {
    if (peek() === ")") throw new Error("Přebývá uzavírací závorka.");
    throw new Error("Zkontroluj zadaný výraz.");
  }
  if (!Number.isFinite(value)) throw new Error("Výsledek není konečné číslo.");
  return Object.is(value, -0) ? 0 : value;
}

function readNumber(data, key, label, options = {}) {
  const raw = data.get(key);
  if (raw === null || raw.trim() === "") {
    if (options.optional) return null;
    throw new Error(`Vyplň hodnotu „${label}“.`);
  }
  const value = Number(raw.replace(",", "."));
  if (!Number.isFinite(value)) throw new Error(`Zkontroluj hodnotu „${label}“.`);
  if (options.positive && value <= 0) throw new Error(`Hodnota „${label}“ musí být větší než nula.`);
  if (options.nonnegative && value < 0) throw new Error(`Hodnota „${label}“ nesmí být záporná.`);
  return value;
}

function calculateTriangle(data) {
  const a = readNumber(data, "a", "strana a", { positive: true });
  const b = readNumber(data, "b", "strana b", { positive: true });
  const c = readNumber(data, "c", "strana c", { positive: true });
  if (a + b <= c || a + c <= b || b + c <= a) throw new Error("Tyto délky nevytvoří trojúhelník — součet dvou stran musí být větší než třetí.");
  const perimeter = a + b + c;
  const semi = perimeter / 2;
  const area = Math.sqrt(semi * (semi - a) * (semi - b) * (semi - c));
  const heightA = 2 * area / a;
  return { value: `${formatNumber(area)} cm²`, detail: `Obvod ${formatNumber(perimeter)} cm · výška na stranu a ${formatNumber(heightA)} cm` };
}

function calculateShape(data) {
  const shape = data.get("shape");
  const get = (key, label = key) => readNumber(data, key, label, { positive: true });
  const triangleArea = (a, b, c) => {
    if (a + b <= c || a + c <= b || b + c <= a) {
      throw new Error("Neplatný trojúhelník.");
    }
    const s = (a + b + c) / 2;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
  };
  let area;
  let perimeter;
  let volume;
  let surface;
  let label;
  switch (shape) {
    case "circle": {
      const r = get("r", "poloměr r");
      label = "Kruh";
      area = Math.PI * r ** 2;
      perimeter = 2 * Math.PI * r;
      break;
    }
    case "square": {
      const a = get("a", "strana a");
      label = "Čtverec";
      area = a ** 2;
      perimeter = 4 * a;
      break;
    }
    case "rectangle": {
      const a = get("a", "strana a");
      const b = get("b", "strana b");
      label = "Obdélník";
      area = a * b;
      perimeter = 2 * (a + b);
      break;
    }
    case "triangle": {
      const a = get("a", "strana a");
      const b = get("b", "strana b");
      const c = get("c", "strana c");
      label = "Trojúhelník";
      area = triangleArea(a, b, c);
      perimeter = a + b + c;
      break;
    }
    case "parallelogram": {
      const a = get("a", "základna a");
      const b = get("b", "strana b");
      const h = get("h", "výška h");
      if (h > b) throw new Error("Výška nesmí být větší než strana b.");
      label = "Rovnoběžník";
      area = a * h;
      perimeter = 2 * (a + b);
      break;
    }
    case "trapezoid": {
      const a = get("a", "základna a");
      const b = get("b", "základna b");
      const c = get("c", "strana c");
      const d = get("d", "strana d");
      const h = get("h", "výška h");
      if (h > c || h > d) throw new Error("Výška nesmí být větší než ramena.");
      label = "Lichoběžník";
      area = (a + b) * h / 2;
      perimeter = a + b + c + d;
      break;
    }
    case "rhombus": {
      const a = get("a", "strana a");
      const h = get("h", "výška h");
      if (h > a) throw new Error("Výška nesmí být větší než strana.");
      label = "Kosočtverec";
      area = a * h;
      perimeter = 4 * a;
      break;
    }
    case "ellipse": {
      const a = get("a", "hlavní poloosa a");
      const b = get("b", "vedlejší poloosa b");
      label = "Elipsa";
      area = Math.PI * a * b;
      perimeter = Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
      break;
    }
    case "polygon": {
      const n = get("n", "počet stran n");
      const a = get("a", "strana a");
      if (!Number.isInteger(n) || n < 3 || n > 10000) throw new Error("Počet stran musí být celé číslo od 3 do 10 000.");
      label = `Pravidelný ${n}-úhelník`;
      perimeter = n * a;
      area = n * a ** 2 / (4 * Math.tan(Math.PI / n));
      break;
    }
    case "cube": {
      const a = get("a", "hrana a");
      label = "Krychle";
      volume = a ** 3;
      surface = 6 * a ** 2;
      break;
    }
    case "cuboid": {
      const a = get("a", "hrana a");
      const b = get("b", "hrana b");
      const c = get("c", "hrana c");
      label = "Kvádr";
      volume = a * b * c;
      surface = 2 * (a * b + a * c + b * c);
      break;
    }
    case "sphere": {
      const r = get("r", "poloměr r");
      label = "Koule";
      volume = 4 * Math.PI * r ** 3 / 3;
      surface = 4 * Math.PI * r ** 2;
      break;
    }
    case "cylinder": {
      const r = get("r", "poloměr r");
      const h = get("h", "výška h");
      label = "Válec";
      volume = Math.PI * r ** 2 * h;
      surface = 2 * Math.PI * r * (r + h);
      break;
    }
    case "cone": {
      const r = get("r", "poloměr r");
      const h = get("h", "výška h");
      const slant = Math.hypot(r, h);
      label = "Kužel";
      volume = Math.PI * r ** 2 * h / 3;
      surface = Math.PI * r * (r + slant);
      break;
    }
    case "pyramid": {
      const a = get("a", "hrana podstavy a");
      const h = get("h", "výška h");
      label = "Čtyřboký jehlan";
      volume = a ** 2 * h / 3;
      surface = a ** 2 + 2 * a * Math.hypot(h, a / 2);
      break;
    }
    case "prism": {
      const a = get("a", "strana podstavy a");
      const b = get("b", "strana podstavy b");
      const c = get("c", "strana podstavy c");
      const h = get("h", "délka hranolu h");
      const baseArea = triangleArea(a, b, c);
      label = "Trojboký hranol";
      volume = baseArea * h;
      surface = 2 * baseArea + (a + b + c) * h;
      break;
    }
    default:
      throw new Error("Vyber geometrický tvar.");
  }
  if (volume !== undefined) {
    return { value: `${formatNumber(volume)} cm³`, detail: `${label} · povrch ${formatNumber(surface)} cm²` };
  }
  return { value: `${formatNumber(area)} cm²`, detail: `${label} · obvod ${formatNumber(perimeter)} cm` };
}

function calculateFinance(data) {
  const principal = readNumber(data, "principal", "počáteční vklad", { nonnegative: true });
  const rate = readNumber(data, "rate", "úroková sazba", { nonnegative: true }) / 100;
  const years = readNumber(data, "years", "doba spoření", { nonnegative: true });
  const frequency = readNumber(data, "frequency", "četnost úročení", { positive: true });
  const amount = principal * (1 + rate / frequency) ** (frequency * years);
  return { value: `${formatNumber(amount, 2)} Kč`, detail: `Zhodnocení ${formatNumber(amount - principal, 2)} Kč · bez daní a poplatků` };
}

function calculateChemistry(data) {
  const mode = data.get("chemMode");
  if (mode === "concentration") {
    const amount = readNumber(data, "moles", "látkové množství", { nonnegative: true });
    const volume = readNumber(data, "volume", "objem", { positive: true });
    return { value: `${formatNumber(amount / volume)} mol/l`, detail: "Látková koncentrace c = n / V" };
  }
  if (mode === "moles" || mode === "mass") {
    const molarMass = readNumber(data, "molarMass", "molární hmotnost", { positive: true });
    if (mode === "moles") {
      const mass = readNumber(data, "mass", "hmotnost", { nonnegative: true });
      return { value: `${formatNumber(mass / molarMass)} mol`, detail: "Látkové množství n = m / M" };
    }
    const moles = readNumber(data, "moles", "látkové množství", { nonnegative: true });
    return { value: `${formatNumber(moles * molarMass)} g`, detail: "Hmotnost m = n · M" };
  }
  const concentration = readNumber(data, "concentration", "koncentrace H₃O⁺", { positive: true });
  const ph = -Math.log10(concentration);
  return { value: `pH ${formatNumber(ph)}`, detail: ph < 7 ? "Kyselý roztok · předpoklad zředěného vodného roztoku" : ph > 7 ? "Zásaditý roztok · předpoklad zředěného vodného roztoku" : "Neutrální roztok při přibližně 25 °C" };
}

function calculatePhysics(data) {
  const target = data.get("target");
  const voltage = readNumber(data, "voltage", "napětí", { optional: true });
  const current = readNumber(data, "current", "proud", { optional: true });
  const resistance = readNumber(data, "resistance", "odpor", { optional: true });
  const known = { voltage, current, resistance };
  if (target === "power") {
    if (voltage !== null && current !== null) return { value: `${formatNumber(voltage * current)} W`, detail: "Výkon P = U · I" };
    if (current !== null && resistance !== null) return { value: `${formatNumber(current ** 2 * resistance)} W`, detail: "Výkon P = I² · R" };
    if (voltage !== null && resistance !== null && resistance !== 0) return { value: `${formatNumber(voltage ** 2 / resistance)} W`, detail: "Výkon P = U² / R" };
    throw new Error("Pro výkon vyplň napětí a proud, proud a odpor, nebo napětí a odpor.");
  }
  const inputKeys = { voltage: ["current", "resistance"], current: ["voltage", "resistance"], resistance: ["voltage", "current"] };
  const [first, second] = inputKeys[target];
  const values = { voltage, current, resistance };
  if (values[first] === null || values[second] === null) throw new Error("Vyplň obě veličiny potřebné pro výpočet.");
  let result;
  let unit;
  let detail;
  if (target === "voltage") { result = current * resistance; unit = "V"; detail = "Ohmův zákon U = R · I"; }
  else if (target === "current") {
    if (resistance === 0) throw new Error("Odporem nula nelze dělit.");
    result = voltage / resistance; unit = "A"; detail = "Ohmův zákon I = U / R";
  } else {
    if (current === 0) throw new Error("Proud nula nelze použít jako dělitel.");
    result = voltage / current; unit = "Ω"; detail = "Ohmův zákon R = U / I";
  }
  return { value: `${formatNumber(result)} ${unit}`, detail };
}

function convertUnits(data) {
  const category = data.get("unitCategory");
  const value = readNumber(data, "value", "hodnota");
  const from = data.get("unitFrom");
  const to = data.get("unitTo");
  if (from === to) return { value: `${formatNumber(value)} ${unitOptions[category].find(([unit]) => unit === to)[1]}`, detail: "Zadaná i cílová jednotka jsou stejné." };
  if (category === "temperature") {
    const celsius = from === "C" ? value : from === "F" ? (value - 32) * 5 / 9 : value - 273.15;
    const result = to === "C" ? celsius : to === "F" ? celsius * 9 / 5 + 32 : celsius + 273.15;
    return { value: `${formatNumber(result)} ${unitOptions[category].find(([unit]) => unit === to)[1]}`, detail: "Převod přes stupně Celsia." };
  }
  const factors = {
    length: { mm: .001, cm: .01, m: 1, km: 1000, in: .0254, ft: .3048, mi: 1609.344 },
    mass: { mg: .000001, g: .001, kg: 1, t: 1000, oz: .028349523125, lb: .45359237 },
    area: { cm2: .0001, m2: 1, ha: 10000, km2: 1000000, ft2: .09290304 },
    volume: { ml: .001, l: 1, m3: 1000, tsp: .00492892159375, cup: .2365882365 },
    time: { s: 1, min: 60, h: 3600, d: 86400 },
    data: { B: 1, KB: 1000, MB: 1000000, GB: 1000000000, TB: 1000000000000 },
  };
  const result = value * factors[category][from] / factors[category][to];
  const label = unitOptions[category].find(([unit]) => unit === to)[1];
  return { value: `${formatNumber(result)} ${label}`, detail: category === "data" ? "Použity desetinné násobky (1 kB = 1 000 B)." : "Převodní koeficienty jsou převedeny na základní jednotku." };
}

function calculateForm(form) {
  const data = new FormData(form);
  const type = form.dataset.type;
  if (type === "standard" || type === "scientific") {
    const expression = data.get("expression").trim();
    if (!expression) throw new Error("Zadej výraz, který chceš vypočítat.");
    return { value: formatNumber(evaluate(expression, data.get("angleMode") || "rad")), detail: "" };
  }
  if (type === "shapes") return calculateShape(data);
  if (type === "finance") return calculateFinance(data);
  if (type === "chemistry") return calculateChemistry(data);
  if (type === "physics") return calculatePhysics(data);
  if (type === "convert") return convertUnits(data);
  throw new Error("Tento typ výpočtu není dostupný.");
}

app.addEventListener("submit", (event) => {
  const form = event.target.closest(".tool-form");
  if (!form) return;
  event.preventDefault();
  const errorOutput = form.querySelector(".form-error");
  const valueOutput = form.querySelector(".result-value");
  const detailOutput = form.querySelector(".result-detail");
  try {
    const result = calculateForm(form);
    valueOutput.textContent = result.value;
    detailOutput.textContent = result.detail;
    errorOutput.textContent = "";
  } catch (error) {
    valueOutput.textContent = "—";
    detailOutput.textContent = "";
    errorOutput.textContent = error.message;
  }
});

app.addEventListener("click", (event) => {
  const button = event.target.closest("[data-insert], [data-action]");
  if (!button) return;
  const input = app.querySelector('[name="expression"]');
  if (!input) return;
  if (button.dataset.action === "clear") {
    input.value = "";
    input.focus();
    return;
  }
  if (button.dataset.action === "calculate") {
    button.closest(".tool-form").requestSubmit();
    return;
  }
  if (button.dataset.action === "backspace") {
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? start;
    if (start === end && start > 0) input.setRangeText("", start - 1, start, "end");
    else input.setRangeText("", start, end, "end");
    input.focus();
    return;
  }
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? start;
  const insertion = button.dataset.insert;
  const cursorInsidePair = insertion.endsWith("()");
  input.setRangeText(insertion, start, end, "end");
  if (cursorInsidePair) input.setSelectionRange(start + insertion.length - 1, start + insertion.length - 1);
  input.focus();
});

app.addEventListener("keydown", (event) => {
  const input = event.target.closest('[name="expression"]');
  if (!input) return;
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? start;
  if (event.key === "(") {
    event.preventDefault();
    input.setRangeText("()", start, end, "end");
    input.setSelectionRange(start + 1, start + 1);
  } else if (event.key === ")" && start === end && input.value[start] === ")") {
    event.preventDefault();
    input.setSelectionRange(start + 1, start + 1);
  } else if (event.key === "Backspace" && start === end && start > 0 &&
    input.value[start - 1] === "(" && input.value[start] === ")") {
    event.preventDefault();
    input.setRangeText("", start - 1, start + 1, "end");
  }
});

window.addEventListener("hashchange", render);
render();
