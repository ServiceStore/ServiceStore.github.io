/* =====================================================================
   SERVICE STORE — catalog.js
   Loads the products/sections you edit in admin.html.
   - Firebase connected: saved online, every visitor sees your changes.
   - Not connected (DEMO): saved only in this browser, for trying it out.
   If nothing was saved yet, the store uses data.js as it is.
   ===================================================================== */
const Catalog = (() => {
  const live = !!(SETTINGS.firebase && SETTINGS.firebase.apiKey);
  const LS = {
    get(k){ try { return JSON.parse(localStorage.getItem(k)); } catch(e){ return null; } },
    set(k,v){ try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch(e){ return false; } },
    del(k){ try { localStorage.removeItem(k); } catch(e){} },
  };
  const copy = o => JSON.parse(JSON.stringify(o));
  const snapshot = () => ({
    categories: Object.entries(CATEGORIES).map(([key, c]) => ({ key, ...copy(c) })),
    products: copy(PRODUCTS),
    hero: [...SETTINGS.heroProducts],
  });
  const ORIGINAL = snapshot();          // data.js exactly as written

  function apply(cat, images = {}){
    const cats = cat.categories.filter(c => c.key);
    if(!cats.some(c => c.key === "all")) cats.unshift(ORIGINAL.categories.find(c => c.key === "all"));
    cats.sort((a, b) => (a.key === "all" ? -1 : b.key === "all" ? 1 : 0));
    Object.keys(CATEGORIES).forEach(k => delete CATEGORIES[k]);
    cats.forEach(({ key, ...rest }) => CATEGORIES[key] = rest);
    PRODUCTS.length = 0;
    cat.products.forEach(p => {
      p = copy(p);
      if(p.image && p.image.startsWith("db:")) p.image = images[p.image.slice(3)] || "";
      if(!p.image) delete p.image;
      PRODUCTS.push(p);
    });
    SETTINGS.heroProducts = cat.hero || [];
  }

  async function fetchSaved(){
    if(!live){
      const c = LS.get("demo_catalog");
      return c ? { cat: c, images: LS.get("demo_images") || {} } : null;
    }
    await ReviewStore.init();
    const db = firebase.firestore();
    const doc = await db.collection("catalog").doc("main").get();
    if(!doc.exists) return null;
    const images = {};
    (await db.collection("images").get()).forEach(d => images[d.id] = d.data().data);
    return { cat: JSON.parse(doc.data().json), images };
  }

  async function load(){
    const saved = await fetchSaved();
    if(!saved) return false;
    apply(saved.cat, saved.images);
    return true;
  }

  /* newImages: { id: "data:image/jpeg;base64,..." }, removed: [id, ...] */
  async function save(cat, newImages, removed){
    if(!live){
      const all = Object.assign(LS.get("demo_images") || {}, newImages);
      removed.forEach(id => delete all[id]);
      if(!LS.set("demo_images", all) || !LS.set("demo_catalog", cat)) throw new Error("This browser's storage is full.");
      return;
    }
    const db = firebase.firestore();
    for(const [id, data] of Object.entries(newImages)) await db.collection("images").doc(id).set({ data });
    for(const id of removed) await db.collection("images").doc(id).delete();
    await db.collection("catalog").doc("main").set({ json: JSON.stringify(cat), updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
  }

  async function reset(){
    if(!live){ LS.del("demo_catalog"); LS.del("demo_images"); return; }
    const db = firebase.firestore();
    (await db.collection("images").get()).forEach(d => d.ref.delete());
    await db.collection("catalog").doc("main").delete();
  }

  return { live, load, fetchSaved, save, reset, original: () => copy(ORIGINAL) };
})();
