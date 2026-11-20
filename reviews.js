/* =====================================================================
   SERVICE STORE — reviews.js
   Saves and loads reviews.
   - DEMO mode (SETTINGS.firebase = null): saved only in this browser.
   - LIVE mode (Firebase config pasted in data.js): saved online, everyone sees them,
     and people must sign in with Google or an email link before posting.
   ===================================================================== */
const ReviewStore = (() => {
  const cfg = SETTINGS.firebase;
  const live = !!(cfg && cfg.apiKey);
  let auth = null, db = null, user = null;
  const listeners = [];
  const emit = () => listeners.forEach(f => f(user));

  const local = {
    get(k){ try { return JSON.parse(localStorage.getItem(k)); } catch(e){ return null; } },
    set(k,v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} },
    del(k){ try { localStorage.removeItem(k); } catch(e){} },
  };

  function loadScript(src){
    return new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  let initPromise = null;
  function init(){ return initPromise || (initPromise = _init()); }
  async function _init(){
    if(!live){ user = local.get("demo_user"); emit(); return; }
    const base = "https://cdn.jsdelivr.net/npm/firebase@10.12.2/";
    await loadScript(base + "firebase-app-compat.js");
    await Promise.all([loadScript(base + "firebase-auth-compat.js"), loadScript(base + "firebase-firestore-compat.js")]);
    firebase.initializeApp(cfg);
    auth = firebase.auth();
    db = firebase.firestore();

    // Coming back from the email sign-in link
    if(auth.isSignInWithEmailLink(location.href)){
      const email = local.get("emailForSignIn");
      if(email){
        try { await auth.signInWithEmailLink(email, location.href); local.del("emailForSignIn"); }
        catch(e){ console.error(e); }
      }
      history.replaceState(null, "", location.pathname);
    }
    await new Promise(res => auth.onAuthStateChanged(u => {
      user = u ? { uid: u.uid, email: u.email, name: u.displayName || "" } : null;
      emit(); res();
    }));
  }

  async function list(){
    if(!live) return local.get("demo_reviews") || [];
    const snap = await db.collection("reviews").orderBy("createdAt", "desc").limit(500).get();
    return snap.docs.map(d => {
      const r = d.data();
      return { uid: d.id, name: r.name, rating: r.rating, text: r.text,
               createdAt: r.createdAt && r.createdAt.toMillis ? r.createdAt.toMillis() : Date.now() };
    });
  }

  // One review per person: the review is stored under the person's id, so posting again updates it.
  async function save({ rating, text, name }){
    if(!user) throw new Error("not signed in");
    const review = { uid: user.uid, name: name.slice(0, 40), rating, text: text.slice(0, 1000) };
    if(!live){
      const all = (local.get("demo_reviews") || []).filter(r => r.uid !== user.uid);
      all.unshift({ ...review, createdAt: Date.now() });
      local.set("demo_reviews", all);
      return;
    }
    await db.collection("reviews").doc(user.uid).set({
      ...review, createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  async function signInGoogle(){
    if(!live) return "demo";
    await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    return "ok";
  }

  // Live: emails a sign-in link. Demo: signs in straight away (no email is sent).
  async function signInEmail(email){
    if(!live){
      user = { uid: "demo-" + email.toLowerCase(), email, name: email.split("@")[0] };
      local.set("demo_user", user); emit();
      return "signed";
    }
    await auth.sendSignInLinkToEmail(email, { url: location.origin + location.pathname, handleCodeInApp: true });
    local.set("emailForSignIn", email);
    return "sent";
  }

  async function signOut(){
    if(!live){ local.del("demo_user"); user = null; emit(); return; }
    await auth.signOut();
  }

  function stats(list){
    const dist = [0,0,0,0,0,0];
    list.forEach(r => dist[r.rating]++);
    const count = list.length;
    const avg = count ? list.reduce((s,r) => s + r.rating, 0) / count : 0;
    return { count, avg, dist };
  }

  return { live, init, list, save, signInGoogle, signInEmail, signOut, stats,
           onAuth: f => listeners.push(f), get user(){ return user; } };
})();
