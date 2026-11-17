const quotes = [
  {
    text: "Deep into that darkness peering, long I stood there, wondering, fearing, doubting, dreaming dreams no mortal ever dared to dream before.",
    work: "The Raven", year: 1845
  },
  {
    text: "All that we see or seem is but a dream within a dream.",
    work: "A Dream Within a Dream", year: 1849
  },
  {
    text: "I became insane, with long intervals of horrible sanity.",
    work: "Letter to George Eveleth", year: 1848
  },
  {
    text: "The scariest monsters are the ones that lurk within our souls.",
    work: "The Tell-Tale Heart", year: 1843
  },
  {
    text: "Beauty of whatever kind, in its supreme development, invariably excites the sensitive soul to tears.",
    work: "The Poetic Principle", year: 1850
  },
  {
    text: "Sleep, those little slices of death — how I loathe them.",
    work: "Marginalia", year: 1844
  },
  {
    text: "I was never really insane except upon occasions when my heart was touched.",
    work: "Letter to Maria Clemm", year: 1849
  },
  { text: "The death of a beautiful woman is, unquestionably, the most poetical topic in the world.",
    work: "The Philosophy of Composition", year: 1846
  },
  {
    text: "Take thy beak from out my heart, and take thy form from off my door! Quoth the raven, Nevermore.",
    work: "The Raven", year: 1845
  },
  {
    text: "I had no occupation now but to think about my doom.",
    work: "The Pit and the Pendulum", year: 1842
  }
];

const searchIcon = '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>';

const bookIcon = '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>';

const pageIcon = '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline>';

function makeIcon(paths, size) {
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("width", size);
  icon.setAttribute("height", size);
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("fill", "none");
  icon.setAttribute("stroke", "currentColor");
  icon.setAttribute("stroke-width", "2");
  icon.setAttribute("stroke-linecap", "round");
  icon.setAttribute("stroke-linejoin", "round");
  icon.innerHTML = paths;
  return icon;
}

function normalise(text) {
  return text.toLowerCase().replace(/[^a-z0-9 ]/g, "");
}

function runSearch() {
  const input = document.getElementById("searchInput");
  if (!input) return;
  renderResults(input.value.trim());
}

function renderResults(query) {
  const results = document.getElementById("results");
  const container = document.querySelector(".container");
  if (!results) return;
  results.replaceChildren();

if (!query) {
  results.className = "results-section";
  
if (container) {
  container.classList.remove("compact");
}

return;

}

results.className = "results-section visible";

if (container) {
  container.classList.add("compact");
}

let matches;

const terms = normalise(query).split(" ").filter(Boolean);

matches = quotes

.map(quote => {
  const quoteText = normalise(quote.text);
  const searchableText = normalise(`${quote.text} ${quote.work}`);
  const score = terms.reduce((total, term) => {
  if (!searchableText.includes(term)) return total;
  return total + (quoteText.includes(term) ? 2 : 1);
}, 0);

return { quote, score };

})
    
.filter(result => result.score > 0)
  
.sort((first, second) => second.score - first.score)

.map(result => result.quote);

if (matches.length === 0) {
  const message = document.createElement("div");
  message.className = "no-results";
  message.append(makeIcon(searchIcon, 28));
  message.append(`No quotes found for "${query}"...`);
  results.append(message);
  return;
}

const header = document.createElement("div");

header.className = "results-header";

header.append(makeIcon(pageIcon, 12));

if (query) {
  const count = document.createElement("span");
  count.textContent = `${matches.length} quote${matches.length === 1 ? "" : "s"} for `;
  const searchTerm = document.createElement("b");
  searchTerm.textContent = query;
  header.append(count, searchTerm);

} else {
  header.append("10 quotes · Edgar Allan Poe");
}

results.append(header);

matches.forEach(quote => {
  const card = document.createElement("article");
  card.className = "quote-card";
  const quoteMark = document.createElement("div");
  quoteMark.className = "quote-mark";
  quoteMark.textContent = '"';
  
const text = document.createElement("p");

text.className = "quote-text";

text.textContent = quote.text;

const meta = document.createElement("div");

meta.className = "quote-meta";

meta.append(makeIcon(bookIcon, 11), "Edgar Allan Poe · ");

const work = document.createElement("span");

work.className = "quote-work";

work.textContent = quote.work;
meta.append(work, ` · ${quote.year}`);
card.append(quoteMark, text, meta);
results.append(card);
});

results.scrollIntoView({ behavior: "smooth", block: "start" });

}

document.getElementById("searchInput")?.addEventListener("input", runSearch);

renderResults("");