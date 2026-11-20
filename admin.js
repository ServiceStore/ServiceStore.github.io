/* =====================================================================
   SERVICE STORE — admin.js  (the store manager)
   ===================================================================== */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
const LANGS = [["ckb","Kurdish","rtl"],["en","English","ltr"],["ar","Arabic","rtl"]];
const ICON_NAMES = ["controller","gift","coin","gem","crown","film","play","sparkle","monitor","phone","music","shirt","bolt","star","doc","ghost","grid"];
const T = v => (v && typeof v === "object") ? (v.ckb || v.en || v.ar || "") : (v || "");

let cat = null;          // working copy { categories:[{key,...}], products:[...], hero:[...] }
let images = {};         // saved pictures from the database: id -> data
let loadedImageIds = [];
let dirty = false, editing = null, filter = "all";

/* ---------- login ---------- */
const live = Catalog.live;
$("#mode").textContent = live ? "LIVE" : "DEMO";
$("#mode").classList.toggle("live", live);

function showLogin(text){
  $("#login").hidden = false; $("#main").hidden = true; $("#savebar").hidden = true;
  $("#login-text").textContent = text;
  $("#login-demo").hidden = live; $("#login-live").hidden = !live;
}
if(!live){
  showLogin("Enter your owner email and password. (Preview: the Gmail link step starts after Firebase is connected.)");
  let ok = false; try { ok = sessionStorage.getItem("adm") === "1"; } catch(e){}
  if(ok) start();
  $("#pass-btn").onclick = async () => {
    const okEmail = $("#dem").value.trim().toLowerCase() === String(SETTINGS.ownerEmail).toLowerCase();
    if(okEmail && await passHash($("#pass").value) === SETTINGS.adminPassHash){ try { sessionStorage.setItem("adm","1"); } catch(e){} start(); }
    else { $("#login-msg").textContent = "Wrong email or password."; $("#pass").value = ""; }
  };
} else {
  showLogin("Log in with your owner email and password.");
  let checkingPassword = false;
  ReviewStore.onAuth(user => {
    if(checkingPassword) return;                       // step 1 (password) never opens the manager by itself
    if(!user) return showLogin("Log in with your owner email and password.");
    if((user.email || "").toLowerCase() !== String(SETTINGS.ownerEmail).toLowerCase()){
      showLogin("This account has no access."); $("#login-msg").innerHTML = 'Signed in as ' + esc(user.email) + '. <a href="#" id="so">Sign out</a>';
      $("#so").onclick = e => { e.preventDefault(); ReviewStore.signOut(); }; return;
    }
    start();
  });
  ReviewStore.init();
  $("#em").value = SETTINGS.ownerEmail;
  /* Step 1: check the password.  Step 2: send a login link to the owner's Gmail.
     The manager opens only after the link from Gmail is opened. */
  $("#pw-btn").onclick = async () => {
    $("#login-msg").textContent = "";
    const email = $("#em").value.trim().toLowerCase();
    if(email !== String(SETTINGS.ownerEmail).toLowerCase()) return $("#login-msg").textContent = "This account has no access.";
    try { await ReviewStore.init(); }
    catch(e){ return $("#login-msg").textContent = "Can't reach Firebase from here. This preview can't connect to the internet; log in on your real website instead."; }
    checkingPassword = true;
    try { await firebase.auth().signInWithEmailAndPassword(email, $("#pw").value); }
    catch(e){
      checkingPassword = false;
      const c = e.code || "";
      return $("#login-msg").textContent =
        c.includes("network") ? "No connection to Firebase. Check the internet, or use your real website (the preview can't connect)." :
        c.includes("too-many") ? "Too many tries. Wait a few minutes and try again." :
        c.includes("operation-not-allowed") ? "Email/Password login is not turned on in Firebase." :
        c.includes("unauthorized-domain") ? "This website address is not allowed yet. Add it in Firebase → Authentication → Settings → Authorized domains." :
        "Wrong email or password.";
    }
    try {
      await firebase.auth().signOut();
      await firebase.auth().sendSignInLinkToEmail(email, { url: location.origin + location.pathname, handleCodeInApp: true });
      try { localStorage.setItem("emailForSignIn", JSON.stringify(email)); } catch(e){}
      $("#pw").value = "";
      $("#login-msg").textContent = "Password correct ✓ We sent a login link to your Gmail. Open it on this device to enter.";
    } catch(e){ $("#login-msg").textContent = "Could not send the Gmail link: " + e.message; }
    checkingPassword = false;
  };
}

let started = false;
async function start(){
  if(started) return; started = true;
  $("#login").hidden = true; $("#main").hidden = false; $("#savebar").hidden = false;
  try {
    const saved = await Catalog.fetchSaved();
    cat = saved ? saved.cat : Catalog.original();
    images = saved ? saved.images : {};
  } catch(e){ cat = Catalog.original(); images = {}; status("Could not load saved data: " + e.message); }
  loadedImageIds = Object.keys(images);
  cat.hero = cat.hero || [];
  renderAll();
}

/* ---------- helpers ---------- */
async function passHash(p){
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("service-store:" + p));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}
function status(t){ $("#status").textContent = t; }
function changed(){ dirty = true; $("#save").disabled = false; status("Unsaved changes"); }
function picUrl(img){ return !img ? "" : img.startsWith("db:") ? (images[img.slice(3)] || "") : img; }
function thumb(img, label){ const u = picUrl(img); return u ? `style="background-image:url('${u}')"` : ""; }
function catByKey(k){ return cat.categories.find(c => c.key === k); }
function lowest(p){ return Math.min(...p.options.map(o => +o.price || 0)); }
function tri(el, value, multiline, onChange){
  const v = (value && typeof value === "object") ? value : { ckb: value || "", en: value || "", ar: value || "" };
  el.innerHTML = LANGS.map(([k, name, dir]) => multiline
    ? `<div><span class="lang-tag">${name}</span><textarea data-k="${k}" dir="${dir}">${esc(v[k])}</textarea></div>`
    : `<div><span class="lang-tag">${name}</span><input data-k="${k}" dir="${dir}" value="${esc(v[k])}"></div>`).join("");
  el.querySelectorAll("[data-k]").forEach(i => i.oninput = () => { onChange(read(el)); changed(); renderLists(); });
}
function read(el){ const o = {}; el.querySelectorAll("[data-k]").forEach(i => o[i.dataset.k] = i.value.trim()); return o; }
function twoTap(btn, label, action){
  btn.textContent = label; btn.classList.remove("armed");
  btn.onclick = () => {
    if(!btn.classList.contains("armed")){ btn.classList.add("armed"); btn.textContent = "Tap again to confirm"; setTimeout(() => { btn.classList.remove("armed"); btn.textContent = label; }, 3000); return; }
    action();
  };
}

/* ---------- lists ---------- */
function renderAll(){ renderFilter(); renderLists(); }
function renderFilter(){
  $("#filter").innerHTML = `<option value="all">All sections</option>` + cat.categories.filter(c => c.key !== "all")
    .map(c => `<option value="${esc(c.key)}" ${c.key === filter ? "selected" : ""}>${esc(T(c))}</option>`).join("");
}
function renderLists(){
  const ps = cat.products.filter(p => filter === "all" || p.cat === filter);
  $("#plist").innerHTML = ps.length ? ps.map(p => `
    <div class="item"><div class="thumb" ${thumb(p.image)}>${p.image ? "" : "no<br>picture"}</div>
      <div class="info"><b>${esc(T(p.name))}</b><span>${esc(T(catByKey(p.cat)) || "—")} · from ${lowest(p).toLocaleString("en-US")} IQD${cat.hero.includes(p.id) ? " · ★ top slider" : ""}</span></div>
      <button class="btn small ghost" data-edit="${esc(p.id)}">Edit</button></div>`).join("")
    : `<p class="hint">No products here yet.</p>`;
  $("#slist").innerHTML = cat.categories.filter(c => c.key !== "all").map(c => `
    <div class="item"><span class="swatch" style="background:${esc(c.color)}"></span>
      <div class="info"><b>${esc(T(c))}</b><span>${cat.products.filter(p => p.cat === c.key).length} products · icon: ${esc(c.icon)}</span></div>
      <button class="btn small ghost" data-sedit="${esc(c.key)}">Edit</button></div>`).join("");
}
$("#filter").onchange = e => { filter = e.target.value; renderLists(); };
$$(".tabs button").forEach(b => b.onclick = () => {
  $$(".tabs button").forEach(x => x.classList.toggle("on", x === b));
  $("#tab-products").hidden = b.dataset.tab !== "products"; $("#tab-sections").hidden = b.dataset.tab !== "sections";
});

/* ---------- product editor ---------- */
function openProduct(p){
  editing = p;
  $("#ped-title").textContent = T(p.name) || "New product";
  $("#p-thumb").setAttribute("style", (thumb(p.image).match(/style="([^"]*)"/) || [,""])[1]);
  $("#p-thumb").textContent = p.image ? "" : "no picture";
  $("#p-cat").innerHTML = cat.categories.filter(c => c.key !== "all").map(c => `<option value="${esc(c.key)}" ${c.key === p.cat ? "selected" : ""}>${esc(T(c))}</option>`).join("");
  $("#p-cat").onchange = e => { p.cat = e.target.value; changed(); renderLists(); };
  tri($("#p-name"), p.name, false, v => { p.name = v; p.label = (v.en || v.ckb).toUpperCase(); });
  $("#p-platform").value = p.platform || ""; $("#p-platform").oninput = e => { p.platform = e.target.value.toUpperCase(); changed(); };
  tri($("#p-note"), p.note || { ckb:"", en:"", ar:"" }, false, v => { if(v.ckb || v.en || v.ar) p.note = v; else delete p.note; });
  tri($("#p-desc"), p.desc, true, v => p.desc = v);
  renderOpts();
  $("#p-hero").checked = cat.hero.includes(p.id);
  $("#p-hero").onchange = e => { cat.hero = cat.hero.filter(id => id !== p.id); if(e.target.checked) cat.hero.push(p.id); changed(); renderLists(); };
  twoTap($("#p-del"), "Delete this product", () => {
    cat.products = cat.products.filter(x => x !== p); cat.hero = cat.hero.filter(id => id !== p.id);
    changed(); closeEditors(); renderLists();
  });
  $("#ped").classList.add("open"); $("#ped").scrollTop = 0;
}
function renderOpts(){
  const p = editing;
  $("#p-opts").innerHTML = p.options.map((o, i) => {
    const l = (o.label && typeof o.label === "object") ? o.label : { ckb: o.label || "", en: o.label || "", ar: o.label || "" };
    return `<div class="opt-row" data-i="${i}">
      <input class="o-ckb" dir="rtl" placeholder="Kurdish" value="${esc(l.ckb)}">
      <input class="o-en" placeholder="English" value="${esc(l.en)}">
      <input class="o-ar" dir="rtl" placeholder="Arabic" value="${esc(l.ar)}">
      <input class="o-price" type="number" inputmode="numeric" placeholder="Price" value="${esc(o.price)}">
      <button data-rm="${i}" aria-label="Remove">×</button></div>`;
  }).join("");
  $$("#p-opts .opt-row").forEach(row => {
    const o = p.options[+row.dataset.i];
    row.querySelectorAll("input").forEach(inp => inp.oninput = () => {
      o.label = { ckb: row.querySelector(".o-ckb").value.trim(), en: row.querySelector(".o-en").value.trim(), ar: row.querySelector(".o-ar").value.trim() };
      o.price = Math.max(0, parseInt(row.querySelector(".o-price").value, 10) || 0);
      delete o.old; changed(); renderLists();
    });
  });
  $$("#p-opts [data-rm]").forEach(b => b.onclick = () => {
    if(p.options.length <= 1) return status("A product needs at least one option.");
    p.options.splice(+b.dataset.rm, 1); changed(); renderOpts(); renderLists();
  });
}
$("#p-addopt").onclick = () => { editing.options.push({ label: { ckb:"", en:"", ar:"" }, price: 0 }); changed(); renderOpts(); };
$("#p-nopic").onclick = () => { delete editing.image; changed(); openProduct(editing); renderLists(); };
$("#p-file").onchange = async e => {
  const f = e.target.files[0]; if(!f) return;
  try { editing.image = await squareJpeg(f, 700); editing.bg = "#111"; changed(); openProduct(editing); renderLists(); }
  catch(err){ status("Could not read that picture."); }
  e.target.value = "";
};
function squareJpeg(file, size){
  return new Promise((res, rej) => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const s = Math.min(img.width, img.height), c = document.createElement("canvas");
      c.width = c.height = size;
      c.getContext("2d").drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size);
      URL.revokeObjectURL(url); res(c.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = rej; img.src = url;
  });
}
$("#add-product").onclick = () => {
  const firstCat = filter !== "all" ? filter : (cat.categories.find(c => c.key !== "all") || {}).key;
  const p = { id: "p-" + Date.now().toString(36), cat: firstCat, platform: "", art: "steam", icon: "gift", label: "NEW", sold: 0,
              name: { ckb:"", en:"", ar:"" }, desc: { ckb:"", en:"", ar:"" }, options: [{ label: { ckb:"", en:"", ar:"" }, price: 0 }] };
  cat.products.unshift(p); changed(); renderLists(); openProduct(p);
};

/* ---------- section editor ---------- */
function openSection(c){
  editing = c;
  tri($("#s-name"), { ckb: c.ckb, en: c.en, ar: c.ar }, false, v => Object.assign(c, v));
  tri($("#s-tag"), c.tag || { ckb:"", en:"", ar:"" }, false, v => c.tag = v);
  $("#s-color").value = c.color || "#2fd182"; $("#s-color").oninput = e => { c.color = e.target.value; changed(); renderLists(); };
  $("#s-icon").innerHTML = ICON_NAMES.map(n => `<option ${n === c.icon ? "selected" : ""}>${n}</option>`).join("");
  $("#s-icon").onchange = e => { c.icon = e.target.value; changed(); renderLists(); };
  const n = cat.products.filter(p => p.cat === c.key).length;
  $("#s-del-hint").textContent = n ? `This also deletes its ${n} product(s).` : "";
  twoTap($("#s-del"), "Delete this section", () => {
    const ids = cat.products.filter(p => p.cat === c.key).map(p => p.id);
    cat.products = cat.products.filter(p => p.cat !== c.key); cat.hero = cat.hero.filter(id => !ids.includes(id));
    cat.categories = cat.categories.filter(x => x !== c); if(filter === c.key) filter = "all";
    changed(); closeEditors(); renderAll();
  });
  $("#sed").classList.add("open"); $("#sed").scrollTop = 0;
}
$("#add-section").onclick = () => {
  const c = { key: "s-" + Date.now().toString(36), icon: "gift", color: "#2fd182", ckb: "", en: "", ar: "", tag: { ckb:"", en:"", ar:"" } };
  cat.categories.push(c); changed(); renderAll(); openSection(c);
};

function closeEditors(){ $$(".editor").forEach(e => e.classList.remove("open")); editing = null; }
document.addEventListener("click", e => {
  const t = e.target.closest("[data-edit],[data-sedit],[data-done]"); if(!t) return;
  if(t.dataset.edit) openProduct(cat.products.find(p => p.id === t.dataset.edit));
  else if(t.dataset.sedit) openSection(catByKey(t.dataset.sedit));
  else closeEditors();
});

/* ---------- save / reset ---------- */
$("#save").onclick = async () => {
  for(const p of cat.products){
    if(!T(p.name)) return status("Every product needs a name.");
    if(!p.options.length || p.options.some(o => !(+o.price))) return status(`"${T(p.name)}": every option needs a price.`);
  }
  for(const c of cat.categories) if(c.key !== "all" && !T(c)) return status("Every section needs a name.");
  $("#save").disabled = true; status("Saving…");
  const out = JSON.parse(JSON.stringify(cat)), newImgs = {};
  out.products.forEach(p => {
    if(p.image && p.image.startsWith("data:")){ const id = "img-" + p.id.replace(/[^\w-]/g, "") + "-" + Date.now().toString(36); newImgs[id] = p.image; p.image = "db:" + id; }
  });
  const used = new Set(out.products.filter(p => p.image && p.image.startsWith("db:")).map(p => p.image.slice(3)));
  const removed = loadedImageIds.filter(id => !used.has(id));
  try {
    await Catalog.save(out, newImgs, removed);
    Object.assign(images, newImgs); removed.forEach(id => delete images[id]);
    loadedImageIds = [...used];
    cat = out; dirty = false; status("Saved ✓ Customers now see the changes" + (live ? "." : " (in this browser only — demo)."));
    renderAll();
  } catch(err){ $("#save").disabled = false; status("Could not save: " + err.message); }
};
twoTap($("#reset"), "Reset to original", async () => {
  try { await Catalog.reset(); cat = Catalog.original(); images = {}; loadedImageIds = []; dirty = false; $("#save").disabled = true; status("Back to the original store."); renderAll(); }
  catch(err){ status("Could not reset: " + err.message); }
});
window.addEventListener("beforeunload", e => { if(dirty){ e.preventDefault(); e.returnValue = ""; } });
