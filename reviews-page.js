/* =====================================================================
   SERVICE STORE — reviews-page.js  (logic for reviews.html)
   ===================================================================== */
const RV_ICONS = {
  chevron:'<path d="m9 6 6 6-6 6"/>',
  shield:'<path d="M12 3 5 6v6c0 4.4 3 8 7 9 4-1 7-4.6 7-9V6z"/><path d="m9 12 2 2 4-4"/>',
  star:'<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.6l6.2-.9z"/>',
};
const icon = n => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${RV_ICONS[n]}</svg>`;
const STAR = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.6l6.2-.9z"/></svg>';

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
let lang = "ckb";
try { lang = JSON.parse(localStorage.getItem("lang")) || SETTINGS.defaultLanguage; } catch(e){ lang = SETTINGS.defaultLanguage; }
const T = k => TEXT[lang][k] ?? k;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));

let reviews = [], sortMode = "new", pickRating = 0;

/* Star row: filled boxes like the store summary */
function starBoxes(avg, small){
  return `<div class="stars ${small ? "sm" : ""}">${[1,2,3,4,5].map(i => {
    const fill = Math.max(0, Math.min(1, avg - (i - 1)));     // supports half stars
    return `<span class="sb" style="--f:${fill * 100}%">${STAR}</span>`;
  }).join("")}</div>`;
}

function renderSummary(){
  const st = ReviewStore.stats(reviews);
  $("#rv-avg").innerHTML = st.count ? `${st.avg.toFixed(1)}<small> / 5.0</small>` : "–";
  $("#rv-stars").innerHTML = starBoxes(st.avg);
  $("#rv-based").textContent = st.count ? T("rv_based").replace("{n}", st.count) : T("rv_none");
  $("#rv-bars").innerHTML = [5,4,3,2,1].map(n => {
    const pct = st.count ? Math.round(st.dist[n] / st.count * 100) : 0;
    return `<div class="rv-bar"><span class="n">${n}${STAR}</span><div class="track"><i style="width:${pct}%"></i></div><span class="c">${st.dist[n]}</span></div>`;
  }).join("");
}

function renderList(){
  const list = [...reviews];
  if(sortMode === "new")  list.sort((a,b) => b.createdAt - a.createdAt);
  if(sortMode === "high") list.sort((a,b) => b.rating - a.rating || b.createdAt - a.createdAt);
  if(sortMode === "low")  list.sort((a,b) => a.rating - b.rating || b.createdAt - a.createdAt);
  const locale = { en:"en-GB", ckb:"ckb-IQ", ar:"ar-IQ" }[lang];
  $("#rv-list").innerHTML = list.length ? list.map(r => `
    <article class="rv-item">
      <div class="rv-item-head">
        <span class="avatar">${esc((r.name || "?").trim()[0] || "?").toUpperCase()}</span>
        <div><b>${esc(r.name || "—")}</b><span>${new Date(r.createdAt).toLocaleDateString(locale, { year:"numeric", month:"short", day:"numeric" })}</span></div>
        ${starBoxes(r.rating, true)}
      </div>
      ${r.text ? `<p>${esc(r.text)}</p>` : ""}
    </article>`).join("")
  : `<div class="empty">${T("rv_none")}</div>`;
}

function renderPick(){
  $("#rv-pick").innerHTML = [1,2,3,4,5].map(i =>
    `<button type="button" data-rate="${i}" class="${i <= pickRating ? "on" : ""}" aria-label="${i}">${STAR}</button>`).join("");
}

let lastUid = null;
function renderAuth(user){
  $("#rv-signin").hidden = !!user;
  $("#rv-form").hidden = !user;
  const uid = user ? user.uid : null;
  if(uid !== lastUid){                         // a different person: clear the form
    lastUid = uid; pickRating = 0;
    $("#rv-name").value = ""; $("#rv-text").value = ""; $("#rv-form-msg").textContent = "";
  }
  if(user){
    $("#rv-user-email").textContent = user.email || "";
    const mine = reviews.find(r => r.uid === user.uid);
    if(mine){ pickRating = mine.rating; $("#rv-text").value = mine.text || ""; }
    if(!$("#rv-name").value) $("#rv-name").value = (mine && mine.name) || user.name || "";
    renderPick();
  }
}

async function load(){
  try { reviews = await ReviewStore.list(); }
  catch(e){ console.error(e); reviews = []; }
  renderSummary(); renderList();
}

function setLanguage(l){
  lang = TEXT[l] ? l : "en";
  try { localStorage.setItem("lang", JSON.stringify(lang)); } catch(e){}
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
  $$("[data-t]").forEach(el => el.innerHTML = T(el.dataset.t));
  $$("[data-ph]").forEach(el => el.placeholder = T(el.dataset.ph));
  $$("[data-lang]").forEach(b => b.classList.toggle("active", b.dataset.lang === lang));
  renderSummary(); renderList();
}

/* ---------- Events ---------- */
document.addEventListener("click", async e => {
  const t = e.target.closest("button"); if(!t) return;
  if(t.dataset.lang) return setLanguage(t.dataset.lang);
  if(t.dataset.rate){ pickRating = +t.dataset.rate; return renderPick(); }
  if(t.id === "rv-write-btn"){
    $("#rv-write").hidden = false;
    return $("#rv-write").scrollIntoView({ behavior:"smooth", block:"center" });
  }
  if(t.id === "rv-google"){
    try {
      const r = await ReviewStore.signInGoogle();
      if(r === "demo") $("#rv-signin-msg").textContent = T("rv_google_demo");
    } catch(err){ console.error(err); $("#rv-signin-msg").textContent = T("rv_error"); }
  }
  if(t.id === "rv-signout") ReviewStore.signOut();
});

$("#rv-email-form").addEventListener("submit", async e => {
  e.preventDefault();
  const email = $("#rv-email").value.trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return $("#rv-signin-msg").textContent = T("rv_bad_email");
  try {
    const r = await ReviewStore.signInEmail(email);
    $("#rv-signin-msg").textContent = r === "sent" ? T("rv_email_sent") : "";
  } catch(err){ console.error(err); $("#rv-signin-msg").textContent = T("rv_error"); }
});

$("#rv-form").addEventListener("submit", async e => {
  e.preventDefault();
  const msg = $("#rv-form-msg");
  if(!pickRating) return msg.textContent = T("rv_need_rating");
  try {
    await ReviewStore.save({ rating: pickRating, text: $("#rv-text").value.trim(), name: $("#rv-name").value.trim() });
    msg.textContent = T("rv_thanks");
    await load();
  } catch(err){ console.error(err); msg.textContent = T("rv_error"); }
});

$("#rv-sort").addEventListener("change", e => { sortMode = e.target.value; renderList(); });

/* ---------- Start ---------- */
$$("[data-icon]").forEach(el => el.outerHTML = icon(el.dataset.icon));
$("#demo-bar").hidden = ReviewStore.live;
setLanguage(lang);
ReviewStore.onAuth(renderAuth);
ReviewStore.init().then(load).then(() => renderAuth(ReviewStore.user)).catch(err => { console.error(err); load(); });
