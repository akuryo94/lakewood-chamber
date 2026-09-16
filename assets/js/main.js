(function () {
  const S = window.SITE;
  const page = document.body.dataset.page;
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = (n) => "$" + n.toLocaleString("en-US");
  const joinHref = S.links.join || "membership.html";

  /* ---------- Header ---------- */
  const nav = [
    ["index.html", "Home", "home"],
    ["membership.html", "Membership", "membership"],
    ["events.html", "Events", "events"],
    ["directory.html", "Directory", "directory"],
    ["transparency.html", "Transparency", "transparency"],
    ["contact.html", "Contact", "contact"]
  ];
  const logo = `<svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="4" fill="#155E75"/>
    <path d="M8 30h24M8 22h24M14 10v24M26 10v24" stroke="#E6EFF1" stroke-width="2"/>
    <circle cx="26" cy="22" r="4" fill="#E9A93B"/></svg>`;

  const header = document.getElementById("site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML = `
      <a class="skip" href="#main">Skip to content</a>
      <div class="wrap">
        <a class="brand" href="index.html">${logo}
          <span class="brand-name">${esc(S.shortName)}<small>${esc(S.city)}</small></span></a>
        <button class="nav-toggle" aria-expanded="false" aria-controls="nav">Menu</button>
        <nav class="nav" id="nav" aria-label="Main">
          <ul>
            ${nav.map(([href, label, key]) => `<li><a href="${href}" ${key === page ? 'aria-current="page"' : ""}>${label}</a></li>`).join("")}
            <li><a class="btn" href="${esc(joinHref)}">Join the Chamber</a></li>
          </ul>
        </nav>
      </div>`;
    const toggle = header.querySelector(".nav-toggle");
    const navEl = header.querySelector(".nav");
    toggle.addEventListener("click", () => {
      const open = navEl.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
  }

  /* ---------- Footer ---------- */
  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="wrap">
        <div class="footer-top">
          <div>
            <p class="footer-name">${esc(S.name)}</p>
            <p>${esc(S.city)}<br><a href="mailto:${esc(S.email)}">${esc(S.email)}</a></p>
          </div>
          <ul>${nav.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join("")}</ul>
        </div>
        <div class="credit">
          <p>&copy; ${new Date().getFullYear()} ${esc(S.name)}. A California nonprofit mutual benefit corporation.</p>
          <p>Platform Architecture &amp; Technical Maintenance Provided on a Volunteer Basis by ${esc(S.volunteerCredit)}</p>
        </div>
      </div>`;
  }

  /* ---------- Join buttons ---------- */
  document.querySelectorAll("[data-join]").forEach((a) => (a.href = joinHref));

  /* ---------- Events ---------- */
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const upcoming = S.events
    .map((e) => ({ ...e, d: new Date(e.date + "T00:00:00") }))
    .filter((e) => e.d >= today)
    .sort((a, b) => a.d - b.d);

  document.querySelectorAll("[data-events]").forEach((el) => {
    const limit = Number(el.dataset.events) || upcoming.length;
    const list = upcoming.slice(0, limit);
    if (!list.length) {
      el.innerHTML = `<div class="empty"><p>No events are scheduled yet. New dates are posted here first.</p></div>`;
      return;
    }
    el.innerHTML = `<ul class="event-list">${list.map((e) => `
      <li class="event">
        <div class="event-date"><span class="m">${months[e.d.getMonth()]}</span><span class="d">${e.d.getDate()}</span></div>
        <div>
          <h3>${esc(e.title)}</h3>
          <p class="meta">${e.d.toLocaleDateString("en-US", { weekday: "long" })}, ${esc(e.time)} &mdash; ${esc(e.place)}</p>
          <p>${esc(e.description)}</p>
          ${e.link ? `<a href="${esc(e.link)}">Register for this event</a>` : ""}
        </div>
      </li>`).join("")}</ul>`;
  });

  /* ---------- Membership tiers ---------- */
  const tiersEl = document.getElementById("tiers");
  if (tiersEl) {
    tiersEl.innerHTML = `
      <div class="table-scroll tiers-table"><table>
        <thead><tr><th scope="col">Membership level</th><th scope="col">Size</th><th scope="col">Annual dues</th></tr></thead>
        <tbody>${S.tiers.map((t) => `
          <tr>
            <td><strong>${esc(t.name)}</strong><br><span style="color:var(--ink-soft);font-size:1rem">${esc(t.who)}</span></td>
            <td>${esc(t.size)}</td>
            <td class="price">${money(t.price)}<small>about ${money(Math.round(t.price / 12))} a month</small></td>
          </tr>`).join("")}</tbody>
      </table></div>`;
  }

  /* ---------- Directory ---------- */
  const dirEl = document.getElementById("directory");
  if (dirEl) {
    const search = document.getElementById("dir-search");
    const cat = document.getElementById("dir-category");
    const count = document.getElementById("dir-count");
    const cats = [...new Set(S.members.map((m) => m.category))].sort();
    cat.innerHTML = `<option value="">All categories</option>` + cats.map((c) => `<option>${esc(c)}</option>`).join("");

    const render = () => {
      const q = search.value.trim().toLowerCase();
      const c = cat.value;
      const list = S.members
        .filter((m) => (!c || m.category === c) && (!q || `${m.name} ${m.description} ${m.category}`.toLowerCase().includes(q)))
        .sort((a, b) => a.name.localeCompare(b.name));
      count.textContent = `${list.length} ${list.length === 1 ? "business" : "businesses"}`;
      if (!S.members.length) {
        dirEl.innerHTML = `<div class="empty"><p>Our first charter members will be listed here.</p><a class="btn" href="${esc(joinHref)}">Become a charter member</a></div>`;
        return;
      }
      if (!list.length) {
        dirEl.innerHTML = `<div class="empty"><p>No members match that search. Try another word or choose all categories.</p></div>`;
        return;
      }
      dirEl.innerHTML = `<ul class="member-list">${list.map((m) => `
        <li class="member">
          <span class="cat">${esc(m.category)}</span>
          <h3>${esc(m.name)}</h3>
          ${m.description ? `<p>${esc(m.description)}</p>` : ""}
          ${m.address ? `<p>${esc(m.address)}</p>` : ""}
          ${m.phone ? `<p><a href="tel:${esc(m.phone)}">${esc(m.phone)}</a></p>` : ""}
          ${m.website ? `<p><a href="${esc(m.website)}" rel="noopener">Visit website</a></p>` : ""}
        </li>`).join("")}</ul>`;
    };
    search.addEventListener("input", render);
    cat.addEventListener("change", render);
    render();
  }

  /* ---------- Transparency ---------- */
  const boardEl = document.getElementById("board");
  if (boardEl) {
    boardEl.innerHTML = `<ul class="board">${S.board.map((b) => `<li><strong>${esc(b.name)}</strong><span>${esc(b.role)}</span></li>`).join("")}</ul>`;
  }
  const docsEl = document.getElementById("documents");
  if (docsEl) {
    const docs = [...S.documents].sort((a, b) => b.date.localeCompare(a.date));
    docsEl.innerHTML = docs.length
      ? `<ul class="doc-list">${docs.map((d) => `
          <li><a href="${esc(d.file)}">${esc(d.title)}</a><span class="type">${esc(d.type)}, ${esc(d.date)}</span></li>`).join("")}</ul>`
      : `<div class="empty"><p>Approved minutes, tax filings and quarterly financial statements will be posted here within 30 days of Board approval.</p></div>`;
  }

  /* ---------- Contact form ---------- */
  const form = document.getElementById("contact-form");
  if (form) {
    if (S.links.contactForm) {
      form.action = S.links.contactForm;
    } else {
      form.hidden = true;
      document.getElementById("contact-fallback").hidden = false;
    }
    document.querySelectorAll("[data-email]").forEach((a) => { a.href = "mailto:" + S.email; a.textContent = S.email; });
  }
})();
