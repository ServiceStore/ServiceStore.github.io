/* =====================================================================
   SERVICE STORE — data.js
   THIS IS THE FILE YOU EDIT MOST: settings, products, prices and text.
   All prices are in IQD and are EXAMPLES. Replace them with your own.
   ===================================================================== */

/* ---------- 1) SETTINGS ---------- */
const SETTINGS = {
  whatsapp: "9647500000000",          // country code + number, no + or spaces
  hours: { en: "12:00 PM – 12:00 AM", ckb: "١٢ی نیوەڕۆ – ١٢ی نیوەشەو", ar: "١٢ ظهراً – ١٢ منتصف الليل" },
  payments: ["FIB", "FastPay", "Zain Cash", "Cash"],
  socials: {                           // put your real links here
    instagram: "https://instagram.com/",
    tiktok: "https://tiktok.com/",
    telegram: "https://t.me/",
    facebook: "https://facebook.com/",
  },
  /* REVIEWS: paste your Firebase web config here to make reviews public (see SETUP-REVIEWS.md).
     While this is null, reviews run in DEMO mode and are only saved in the visitor's own browser. */
  firebase: {
    apiKey: "AIzaSyDLSyvf5BPRiXIpBF4LNm09B2wUDLvVOtg",
    authDomain: "service-store-56d6d.firebaseapp.com",
    projectId: "service-store-56d6d",
    storageBucket: "service-store-56d6d.firebasestorage.app",
    messagingSenderId: "475386978260",
    appId: "1:475386978260:web:c9603759ebde44216e8041",
  },
  /* STORE MANAGER (admin.html)
     ownerEmail: the ONLY account allowed to change the store. Every login sends a link to this Gmail.
     adminPassHash: a scrambled fingerprint of your password (the real password is NOT written anywhere).
     To change the password, ask Claude for a new hash, or use the Firebase console once connected. */
  ownerEmail: "ariabdulaa05@gmail.com",
  adminPassHash: "b440865f02afe0a70568be3ba01759cabb6b26fdb2adeb7f1e1aea1aab3b24cd",
  /* FORTNITE ITEM SHOP: loaded live every day from fortnite-api.com.
     Price in IQD by the item's V-Bucks price. Items above the last "max" are not shown. */
  fortniteShop: {
    tiers: [
      { max: 800,  price: 3000 },   // 0 – 800 V-Bucks
      { max: 1600, price: 5000 },   // 801 – 1600 V-Bucks
      { max: 2400, price: 7000 },   // 1601 – 2400 V-Bucks
    ],
    giftableOnly: true,             // only show items Epic allows to be gifted
    enabled: false,                 // set to true when the site is online to show the live shop
  },
  defaultLanguage: "ckb",
  defaultCurrency: "IQD",
  currencies: { IQD: 1, USD: 1310, EUR: 1420 },  // how many IQD = 1 USD / 1 EUR. Update when rates change.              // "ckb" Kurdish, "ar" Arabic, "en" English
  heroProducts: ["fn-gift-800", "netflix", "gp-ultimate", "fn-gift-1600", "pubg-uc"],   // product ids shown in the big slider
  stats: { customers: "12K+", delivery: { en: "5 min", ckb: "٥ خولەک", ar: "٥ دقائق" } },
};

/* ---------- 2) CATEGORIES ---------- */
const CATEGORIES = {
  all:         { icon:"grid",       color: "#2fd182", en: "Store",       ckb: "فرۆشگا",     ar: "المتجر",
                 tag:{ en:"Everything in one place", ckb:"هەموو شتێک لە یەک شوێن", ar:"كل شيء في مكان واحد" } },
  fortnite:    { icon:"crown",      color: "#9d4dff", en: "Fortnite",    ckb: "فۆرتنایت",   ar: "فورتنايت",
                 tag:{ en:"V-Bucks gifts and Fortnite Crew", ckb:"دیاری V-Bucks و فۆرتنایت کرو", ar:"هدايا في-باكس وفورتنايت كرو" } },
  gamepass:    { icon:"controller", color: "#52b043", en: "Game Pass (Xbox & PC)", ckb: "گەیم پاس (ئێکس بۆکس و PC)", ar: "جيم باس (إكس بوكس وPC)",
                 tag:{ en:"Ultimate, Premium, Essential and PC", ckb:"ئەڵتیمەیت، پریمیەم، ئێسێنشاڵ و PC", ar:"ألتيميت، بريميوم، إسينشال وPC" } },
  xbox:        { icon:"controller", color: "#107c10", en: "Xbox Games",  ckb: "یارییەکانی ئێکس بۆکس", ar: "ألعاب إكس بوكس",
                 tag:{ en:"Battlefield, EA Sports FC and more", ckb:"باتڵفیڵد، EA Sports FC و زیاتر", ar:"باتلفيلد وEA Sports FC والمزيد" } },
  movies:      { icon:"film",       color: "#e50914", en: "Movies & Anime", ckb: "خزمەتگوزاری فیلم و ئەنیمی", ar: "خدمات الأفلام والأنمي",
                 tag:{ en:"Netflix, Shahid, Crunchyroll and more", ckb:"نێتفلیکس، شاهید، کرەنچیڕۆڵ و زیاتر", ar:"نتفليكس وشاهد وكرانشي رول والمزيد" } },
  ai:          { icon:"sparkle",    color: "#19c3b0", en: "AI & More",   ckb: "خزمەتگوزاری زیرەکی دەستکرد و هیتر", ar: "خدمات الذكاء الاصطناعي وغيرها",
                 tag:{ en:"ChatGPT, Claude, Gemini, Spotify and more", ckb:"ChatGPT، Claude، جێمینای، سپۆتیفای و زیاتر", ar:"ChatGPT وClaude وجيميني وسبوتيفاي والمزيد" } },
  pc:          { icon:"monitor",    color: "#66c0f4", en: "PC",          ckb: "کۆمپیوتەر",  ar: "كمبيوتر",
                 tag:{ en:"PC games", ckb:"یارییەکانی کۆمپیوتەر", ar:"ألعاب الكمبيوتر" } },   // hidden until it has products
  mobile:      { icon:"phone",      color: "#f2a900", en: "Mobile",      ckb: "مۆبایل",     ar: "موبايل",
                 tag:{ en:"PUBG, Free Fire and more", ckb:"پەبجی، فری فایەر و زیاتر", ar:"ببجي وفري فاير والمزيد" } },
  gift:        { icon:"gift",       color: "#a66bff", en: "Gift cards",  ckb: "کارتی دیاری", ar: "بطاقات الهدايا",
                 tag:{ en:"iTunes and Xbox gift cards", ckb:"کارتی دیاری iTunes و ئێکس بۆکس", ar:"بطاقات هدايا iTunes وإكس بوكس" } },
};

/* Re-usable option labels */
const GIFT = { en: "Gift via friendship (2 days)", ckb: "دیاری لە ڕێگەی هاوڕێیەتی (٢ ڕۆژ)", ar: "هدية عبر الصداقة (يومان)" };
const M1  = { en: "1 Month",   ckb: "١ مانگ",  ar: "شهر واحد" };
const M3  = { en: "3 Months",  ckb: "٣ مانگ",  ar: "٣ أشهر" };
const M12 = { en: "12 Months", ckb: "١٢ مانگ", ar: "١٢ شهراً" };
const M2  = { en: "2 Months",  ckb: "٢ مانگ",  ar: "شهران" };
const M6  = { en: "6 Months",  ckb: "٦ مانگ",  ar: "٦ أشهر" };
const Y1  = { en: "1 Year",    ckb: "١ ساڵ",   ar: "سنة واحدة" };

/* ---------- 3) PRODUCTS ----------
   id        unique name (no spaces)
   cat       one of the CATEGORIES keys
   platform  short badge text
   image     optional picture (e.g. images/fortnite-crew.jpg) shown instead of the drawn card art
   art       look of the card: chatgpt, claude, gemini, midjourney, spotify, youtube, crunchyroll, pcgp, fortnite, netflix, shahid, disney, osn, prime, xbox, steam, valorant, discord, pubg, freefire, mlbb, google, apple
   icon      controller, gift, coin, gem, chat, bolt, film, play, shirt, crown, star
   label     big text on the card art
   note      optional short highlight shown on the card (e.g. 4K Premium)
   sold      number shown in "best sellers"
   options   each choice: label (text or {en,ckb,ar}), price, old (optional = old price → shows discount)
------------------------------------------------------------------ */
const PRODUCTS = [
  /* ----- Fortnite ----- */
  { id:"fn-gift-800", cat:"fortnite", platform:"FORTNITE", art:"fortnite", icon:"coin", label:"800 V-BUCKS", sold:1650,
    image:"vbucks-800.jpg", bg:"#2a0a5e",
    name:{ en:"Fortnite Gift · 800 V\u2011Bucks", ckb:"دیاری فۆرتنایت · \u2066800 V\u2011Bucks\u2069", ar:"هدية فورتنايت · 800 في-باكس" },
    desc:{ en:"Sent to you as a gift. Choose any Item Shop item worth up to 800 V-Bucks. In the game, add our account as a friend: after 2 days of being friends, we send the gift straight to your account.",
           ckb:"وەک دیاری بۆت دەنێردرێت. هەر ئایتمێک لە ئایتم شۆپ هەڵبژێرە کە نرخەکەی تا 800 V-Bucks بێت. لە ناو یارییەکەدا ئەکاونتەکەمان وەک هاوڕێ زیاد بکە: دوای دوو ڕۆژ هاوڕێیەتی، دیارییەکە ڕاستەوخۆ بۆ ئەکاونتەکەت دەنێرین.",
           ar:"يصلك كهدية. اختر أي عنصر من متجر العناصر بسعر حتى 800 في-باكس. داخل اللعبة أضف حسابنا صديقاً: بعد يومين من الصداقة نرسل الهدية مباشرة إلى حسابك." },
    options:[ {label:GIFT, price:3000} ] },

  { id:"fn-gift-1600", cat:"fortnite", platform:"FORTNITE", art:"fortnite", icon:"coin", label:"1,600 V-BUCKS", sold:1420,
    image:"vbucks-1600.jpg", bg:"#2a0a5e",
    name:{ en:"Fortnite Gift · 1,600 V\u2011Bucks", ckb:"دیاری فۆرتنایت · \u20661,600 V\u2011Bucks\u2069", ar:"هدية فورتنايت · 1,600 في-باكس" },
    desc:{ en:"Sent to you as a gift. Choose any Item Shop item worth up to 1,600 V-Bucks. In the game, add our account as a friend: after 2 days of being friends, we send the gift straight to your account.",
           ckb:"وەک دیاری بۆت دەنێردرێت. هەر ئایتمێک لە ئایتم شۆپ هەڵبژێرە کە نرخەکەی تا 1,600 V-Bucks بێت. لە ناو یارییەکەدا ئەکاونتەکەمان وەک هاوڕێ زیاد بکە: دوای دوو ڕۆژ هاوڕێیەتی، دیارییەکە ڕاستەوخۆ بۆ ئەکاونتەکەت دەنێرین.",
           ar:"يصلك كهدية. اختر أي عنصر من متجر العناصر بسعر حتى 1,600 في-باكس. داخل اللعبة أضف حسابنا صديقاً: بعد يومين من الصداقة نرسل الهدية مباشرة إلى حسابك." },
    options:[ {label:GIFT, price:5000} ] },

  { id:"fn-gift-2400", cat:"fortnite", platform:"FORTNITE", art:"fortnite", icon:"coin", label:"2,400 V-BUCKS", sold:980,
    image:"vbucks-2400.jpg", bg:"#2a0a5e",
    name:{ en:"Fortnite Gift · 2,400 V\u2011Bucks", ckb:"دیاری فۆرتنایت · \u20662,400 V\u2011Bucks\u2069", ar:"هدية فورتنايت · 2,400 في-باكس" },
    desc:{ en:"Sent to you as a gift. Choose any Item Shop item worth up to 2,400 V-Bucks. In the game, add our account as a friend: after 2 days of being friends, we send the gift straight to your account.",
           ckb:"وەک دیاری بۆت دەنێردرێت. هەر ئایتمێک لە ئایتم شۆپ هەڵبژێرە کە نرخەکەی تا 2,400 V-Bucks بێت. لە ناو یارییەکەدا ئەکاونتەکەمان وەک هاوڕێ زیاد بکە: دوای دوو ڕۆژ هاوڕێیەتی، دیارییەکە ڕاستەوخۆ بۆ ئەکاونتەکەت دەنێرین.",
           ar:"يصلك كهدية. اختر أي عنصر من متجر العناصر بسعر حتى 2,400 في-باكس. داخل اللعبة أضف حسابنا صديقاً: بعد يومين من الصداقة نرسل الهدية مباشرة إلى حسابك." },
    options:[ {label:GIFT, price:7000} ] },

  { id:"fn-crew", cat:"fortnite", platform:"FORTNITE", art:"fortnite", icon:"crown", label:"FORTNITE CREW", sold:540,
    image:"fortnite-crew.jpg", bg:"#3a0f8a",
    name:{ en:"Fortnite Crew", ckb:"فۆرتنایت کرو", ar:"فورتنايت كرو" },
    desc:{ en:"Monthly subscription: Battle Pass, 1000 V-Bucks every month and an exclusive Crew skin.", ckb:"مانگانە: باتڵ پاس، 1000 V-Bucks هەموو مانگێک و سکینێکی تایبەتی کرو.", ar:"اشتراك شهري: باتل باس و1000 في-باكس كل شهر وسكن حصري." },
    options:[ {label:M1, price:10000} ] },

  /* ----- Movies & TV ----- */
  { id:"netflix", cat:"movies", platform:"NETFLIX", art:"netflix", icon:"film", label:"NETFLIX", sold:2890,
    image:"netflix.jpg", bg:"#2a0306",
    name:{ en:"Netflix", ckb:"نێتفلیکس", ar:"نتفليكس" },
    note:{ en:"4K Premium", ckb:"4K پریمیەم", ar:"4K بريميوم" },
    desc:{ en:"We give you an account. Sign in on your device and watch your favorite movies.", ckb:"ئەکاونتێکت پێدەدەین. لەسەر ئامێرەکەت بچۆ ژوورەوە و فیلمە دڵخوازەکانت ببینە.", ar:"نعطيك حساباً. سجّل الدخول على جهازك وشاهد أفلامك المفضلة." },
    options:[ {label:M1, price:6000}, {label:M2, price:11000}, {label:M3, price:15000}, {label:M6, price:25000}, {label:Y1, price:50000} ] },

  { id:"shahid", cat:"movies", platform:"SHAHID", art:"shahid", icon:"play", label:"SHAHID VIP", sold:1450,
    image:"shahid.jpg", bg:"#0b1a26",
    name:{ en:"Shahid VIP", ckb:"شاهید VIP", ar:"شاهد VIP" },
    note:{ en:"VIP", ckb:"VIP", ar:"VIP" },
    desc:{ en:"We give you an account. Sign in on your device and watch your favorite movies.", ckb:"ئەکاونتێکت پێدەدەین. لەسەر ئامێرەکەت بچۆ ژوورەوە و فیلمە دڵخوازەکانت ببینە.", ar:"نعطيك حساباً. سجّل الدخول على جهازك وشاهد أفلامك المفضلة." },
    options:[ {label:M1, price:5000}, {label:M3, price:15000} ] },

  { id:"crunchyroll", cat:"movies", platform:"ANIME", art:"crunchyroll", icon:"play", label:"CRUNCHYROLL", sold:830,
    image:"crunchyroll.jpg", bg:"#c2580f",
    name:{ en:"Crunchyroll Premium", ckb:"کرەنچیڕۆڵ پریمیەم", ar:"كرانشي رول بريميوم" },
    note:{ en:"Premium", ckb:"پریمیەم", ar:"بريميوم" },
    desc:{ en:"We give you an account. Sign in on your device and watch your favorite anime.", ckb:"ئەکاونتێکت پێدەدەین. لەسەر ئامێرەکەت بچۆ ژوورەوە و ئەنیمییە دڵخوازەکانت ببینە.", ar:"نعطيك حساباً. سجّل الدخول على جهازك وشاهد الأنمي المفضل لديك." },
    options:[ {label:M1, price:5000}, {label:M3, price:10000}, {label:M6, price:18000}, {label:M12, price:25000} ] },

  { id:"disney", cat:"movies", platform:"DISNEY+", art:"disney", icon:"star", label:"DISNEY+", sold:620,
    image:"disney.jpg", bg:"#0e2a78",
    name:{ en:"Disney+", ckb:"دیزنی پلەس", ar:"ديزني بلس" },
    note:{ en:"4K Premium", ckb:"4K پریمیەم", ar:"4K بريميوم" },
    desc:{ en:"We give you an account. Sign in on your device and watch your favorite movies.", ckb:"ئەکاونتێکت پێدەدەین. لەسەر ئامێرەکەت بچۆ ژوورەوە و فیلمە دڵخوازەکانت ببینە.", ar:"نعطيك حساباً. سجّل الدخول على جهازك وشاهد أفلامك المفضلة." },
    options:[ {label:M1, price:5000}, {label:M2, price:9000}, {label:M3, price:13000}, {label:M6, price:24000}, {label:M12, price:45000} ] },

  { id:"appletv", cat:"movies", platform:"APPLE TV", art:"appletv", icon:"play", label:"APPLE TV", sold:520,
    image:"appletv.jpg", bg:"#18181c",
    note:{ en:"4K Premium", ckb:"4K پریمیەم", ar:"4K بريميوم" },
    name:{ en:"Apple TV", ckb:"ئەپڵ تیڤی", ar:"آبل تي في" },
    desc:{ en:"We give you an account. Sign in on your device and watch your favorite movies.", ckb:"ئەکاونتێکت پێدەدەین. لەسەر ئامێرەکەت بچۆ ژوورەوە و فیلمە دڵخوازەکانت ببینە.", ar:"نعطيك حساباً. سجّل الدخول على جهازك وشاهد أفلامك المفضلة." },
    options:[ {label:M1, price:5000}, {label:M2, price:9000}, {label:M3, price:12000}, {label:M6, price:20000}, {label:Y1, price:29000} ] },

  { id:"prime", cat:"movies", platform:"PRIME", art:"prime", icon:"film", label:"PRIME VIDEO", sold:390,
    image:"prime.jpg", bg:"#06173a",
    name:{ en:"Amazon Prime Video", ckb:"ئەمازۆن پرایم ڤیدیۆ", ar:"أمازون برايم فيديو" },
    note:{ en:"4K Premium", ckb:"4K پریمیەم", ar:"4K بريميوم" },
    desc:{ en:"We give you an account. Sign in on your device and watch your favorite movies.", ckb:"ئەکاونتێکت پێدەدەین. لەسەر ئامێرەکەت بچۆ ژوورەوە و فیلمە دڵخوازەکانت ببینە.", ar:"نعطيك حساباً. سجّل الدخول على جهازك وشاهد أفلامك المفضلة." },
    options:[ {label:M1, price:3000}, {label:M2, price:5000}, {label:M3, price:8000}, {label:M6, price:15000}, {label:M12, price:25000} ] },

  /* ----- Xbox ----- */
  { id:"gp-ultimate", cat:"gamepass", platform:"XBOX", art:"xbox", icon:"controller", label:"GAME PASS ULTIMATE", sold:2210,
    image:"gamepass-ultimate.jpg", bg:"#0e5a10",
    name:{ en:"Xbox Game Pass Ultimate", ckb:"ئێکس بۆکس گەیم پاس ئەڵتیمەیت", ar:"إكس بوكس جيم باس ألتيميت" },
    note:{ en:"1 Xbox console", ckb:"یەک کۆنسۆڵ", ar:"كونسول واحد" },
    desc:{ en:"• New games on day one\n• 400+ games on console and PC\n• Online multiplayer\n• Cloud gaming\n• EA Play, Ubisoft+ Classics and Fortnite Crew included\nFor one Xbox console only.", ckb:"• یاری نوێ لە ڕۆژی یەکەمەوە\n• زیاتر لە ٤٠٠ یاری لەسەر کۆنسۆڵ و PC\n• یاری ئۆنلاین\n• یاری لە ڕێگەی هەور (Cloud)\n• EA Play و Ubisoft+ Classics و Fortnite Crew لەگەڵیدایە\nتەنها بۆ یەک کۆنسۆڵی ئێکس بۆکس.", ar:"• ألعاب جديدة من يوم إصدارها\n• أكثر من ٤٠٠ لعبة على الكونسول والكمبيوتر\n• اللعب أونلاين\n• اللعب السحابي\n• يشمل EA Play وUbisoft+ Classics وFortnite Crew\nلجهاز إكس بوكس واحد فقط." },
    options:[ {label:M1, price:12000},
              {label:M2, price:17000},
              {label:{en:"2 Months 15 Days", ckb:"٢ مانگ و ١٥ ڕۆژ", ar:"شهران و١٥ يوماً"}, price:25000},
              {label:{en:"4 Months 15 Days", ckb:"٤ مانگ و ١٥ ڕۆژ", ar:"٤ أشهر و١٥ يوماً"}, price:40000},
              {label:M6, price:50000},
              {label:M12, price:80000} ] },

  { id:"gp-premium", cat:"gamepass", platform:"XBOX", art:"xbox", icon:"controller", label:"GAME PASS PREMIUM", sold:640,
    image:"gamepass-premium.jpg", bg:"#4a1f5c",
    name:{ en:"Xbox Game Pass Premium", ckb:"ئێکس بۆکس گەیم پاس پریمیەم", ar:"إكس بوكس جيم باس بريميوم" },
    note:{ en:"1 Xbox console", ckb:"یەک کۆنسۆڵ", ar:"كونسول واحد" },
    desc:{ en:"• 200+ games on console and PC\n• Online multiplayer\n• Cloud gaming\n• New Xbox games join within 1 year of launch\nFor one Xbox console only.", ckb:"• زیاتر لە ٢٠٠ یاری لەسەر کۆنسۆڵ و PC\n• یاری ئۆنلاین\n• یاری لە ڕێگەی هەور (Cloud)\n• یارییە نوێیەکانی ئێکس بۆکس لە ماوەی ساڵێکدا دوای دەرچوونیان زیاد دەکرێن\nتەنها بۆ یەک کۆنسۆڵی ئێکس بۆکس.", ar:"• أكثر من ٢٠٠ لعبة على الكونسول والكمبيوتر\n• اللعب أونلاين\n• اللعب السحابي\n• ألعاب إكس بوكس الجديدة تُضاف خلال سنة من إصدارها\nلجهاز إكس بوكس واحد فقط." },
    options:[ {label:{en:"21 Days", ckb:"٢١ ڕۆژ", ar:"٢١ يوماً"}, price:4000} ] },

  { id:"pc-gamepass", cat:"gamepass", platform:"PC", art:"pcgp", icon:"monitor", label:"PC GAME PASS", sold:700,
    image:"gamepass-pc.jpg", bg:"#1c1d20",
    name:{ en:"PC Game Pass", ckb:"PC گەیم پاس", ar:"PC جيم باس" },
    note:{ en:"1 Xbox console", ckb:"یەک کۆنسۆڵ", ar:"كونسول واحد" },
    desc:{ en:"• New games on day one on PC\n• Hundreds of PC games\n• EA Play and Ubisoft+ Classics included\n• In-game benefits\nFor one Xbox console only.", ckb:"• یاری نوێ لە ڕۆژی یەکەمەوە لەسەر PC\n• سەدان یاری PC\n• EA Play و Ubisoft+ Classics لەگەڵیدایە\n• دیاری ناو یارییەکان\nتەنها بۆ یەک کۆنسۆڵی ئێکس بۆکس.", ar:"• ألعاب جديدة من يوم إصدارها على الكمبيوتر\n• مئات ألعاب الكمبيوتر\n• يشمل EA Play وUbisoft+ Classics\n• مكافآت داخل الألعاب\nلجهاز إكس بوكس واحد فقط." },
    options:[ {label:M1, price:10000},
              {label:M2, price:14000},
              {label:{en:"2 Months 16 Days", ckb:"٢ مانگ و ١٦ ڕۆژ", ar:"شهران و١٦ يوماً"}, price:20000},
              {label:{en:"4 Months 20 Days", ckb:"٤ مانگ و ٢٠ ڕۆژ", ar:"٤ أشهر و٢٠ يوماً"}, price:33000},
              {label:M6, price:45000},
              {label:M12, price:75000} ] },

  { id:"chatgpt-plus", cat:"ai", platform:"AI", art:"chatgpt", icon:"sparkle", label:"CHATGPT PLUS", sold:1240,
    image:"chatgpt.jpg", bg:"#0b5a45",
    name:{ en:"ChatGPT Plus", ckb:"ChatGPT Plus", ar:"ChatGPT Plus" },
    desc:{ en:"We buy it for your personal email.", ckb:"بۆسەر ئیمەیڵی تایبەت (شەخسی) بەخۆت ئەیکڕین.", ar:"نشتريه على بريدك الإلكتروني الشخصي." },
    options:[ {label:M1, price:32000} ] },

  { id:"claude-pro", cat:"ai", platform:"AI", art:"claude", icon:"sparkle", label:"CLAUDE PRO", sold:760,
    image:"claude.jpg", bg:"#e9dccb",
    name:{ en:"Claude Pro", ckb:"Claude Pro", ar:"Claude Pro" },
    desc:{ en:"We buy it for your personal email.", ckb:"بۆسەر ئیمەیڵی تایبەت (شەخسی) بەخۆت ئەیکڕین.", ar:"نشتريه على بريدك الإلكتروني الشخصي." },
    options:[ {label:M1, price:32000} ] },

  { id:"gemini", cat:"ai", platform:"AI", art:"gemini", icon:"sparkle", label:"GOOGLE AI PRO", sold:540,
    image:"gemini.jpg", bg:"#6f7fd8",
    note:{ en:"New account", ckb:"ئەکاونتی نوێ", ar:"حساب جديد" },
    name:{ en:"Gemini Pro (Google AI Pro)", ckb:"جێمینای پرۆ (Google AI Pro)", ar:"جيميني برو (Google AI Pro)" },
    desc:{ en:"A new account that works for 17 months.", ckb:"ئەکاونتێکی نوێیە کە بۆ ماوەی ١٧ مانگ کار دەکات.", ar:"حساب جديد يعمل لمدة ١٧ شهراً." },
    options:[ {label:{ en:"17 Months", ckb:"١٧ مانگ", ar:"١٧ شهراً" }, price:20000} ] },

  { id:"spotify", cat:"ai", platform:"MUSIC", art:"spotify", icon:"music", label:"SPOTIFY", sold:980,
    image:"spotify.jpg", bg:"#0e7a3a",
    name:{ en:"Spotify Premium", ckb:"سپۆتیفای پریمیەم", ar:"سبوتيفاي بريميوم" },
    desc:{ en:"We buy it for your personal email.", ckb:"بۆسەر ئیمەیڵی تایبەت (شەخسی) بەخۆت ئەیکڕین.", ar:"نشتريه على بريدك الإلكتروني الشخصي." },
    options:[ {label:M1, price:5000}, {label:M2, price:9000}, {label:M3, price:13000}, {label:M6, price:20000}, {label:Y1, price:35000} ] },

  { id:"youtube", cat:"ai", platform:"VIDEO", art:"youtube", icon:"play", label:"YOUTUBE PREMIUM", sold:690,
    image:"youtube.jpg", bg:"#f2f2f4",
    name:{ en:"YouTube Premium", ckb:"یوتیوب پریمیەم", ar:"يوتيوب بريميوم" },
    desc:{ en:"We buy it on your personal email account.", ckb:"بۆسەر ئیمەیڵی تایبەت (شەخسی) بەخۆت ئەیکڕین.", ar:"نشتريه على حساب بريدك الإلكتروني الشخصي." },
    options:[ {label:M1, price:5000}, {label:M6, price:25000}, {label:Y1, price:45000} ] },

  { id:"office", cat:"ai", platform:"OFFICE", art:"office", icon:"doc", label:"OFFICE PRO 2024", sold:450,
    image:"office.jpg", bg:"#e9e4f2",
    name:{ en:"Microsoft Office Pro 2024", ckb:"مایکرۆسۆفت ئۆفیس پرۆ ٢٠٢٤", ar:"مايكروسوفت أوفيس برو ٢٠٢٤" },
    desc:{ en:"Word, Excel, PowerPoint and more. We buy it for your personal email.", ckb:"Word، Excel، PowerPoint و زیاتر. بۆسەر ئیمەیڵی تایبەت (شەخسی) بەخۆت ئەیکڕین.", ar:"Word وExcel وPowerPoint والمزيد. نشتريه على بريدك الإلكتروني الشخصي." },
    options:[ {label:Y1, price:8000} ] },

  { id:"snapchat-plus", cat:"ai", platform:"SNAPCHAT", art:"snapchat", icon:"ghost", label:"SNAPCHAT+", sold:610,
    image:"snapchat.jpg", bg:"#141210",
    name:{ en:"Snapchat+", ckb:"سناپچات پلەس", ar:"سناب شات بلس" },
    desc:{ en:"No need to send your Snapchat email or password. We buy it for your account.", ckb:"پێویست ناکات ئیمەیڵ یان وشەی نهێنی ئەکاونتی سناپچاتەکەت بنێریت. بۆ ئەکاونتەکەت دەیکڕین.", ar:"لا حاجة لإرسال بريد أو كلمة مرور حساب سناب شات. نشتريه لحسابك." },
    options:[ {label:Y1, price:15000} ] },

  { id:"discord", cat:"ai", platform:"PC", art:"discord", icon:"chat", label:"NITRO", sold:300,
    image:"discord.jpg", bg:"#6a3fd6",
    name:{ en:"Discord Nitro", ckb:"دیسکۆرد نایترۆ", ar:"ديسكورد نيترو" },
    desc:{ en:"HD streaming, bigger uploads and server boosts.", ckb:"ستریمی HD، ناردنی فایلی گەورەتر و بووستی سێرڤەر.", ar:"بث بجودة عالية، رفع ملفات أكبر وتعزيز السيرفرات." },
    options:[ {label:M1, price:10000}, {label:Y1, price:60000} ] },

  /* ----- Xbox games ----- */
  { id:"bf1", cat:"xbox", platform:"XBOX", art:"xbox", icon:"controller", label:"BATTLEFIELD 1", sold:900,
    image:"bf1.jpg", bg:"#111",
    note:{ en:"1 Xbox console", ckb:"یەک کۆنسۆڵ", ar:"كونسول واحد" },
    name:{ en:"Battlefield 1", ckb:"باتڵفیڵد 1", ar:"باتلفيلد 1" },
    desc:{ en:"Full game for Xbox. For one Xbox console only.", ckb:"یاری تەواو بۆ ئێکس بۆکس. تەنها بۆ یەک کۆنسۆڵی ئێکس بۆکس.", ar:"اللعبة كاملة لإكس بوكس. لجهاز إكس بوكس واحد فقط." },
    options:[ {label:{ en:"Full game", ckb:"یاری تەواو", ar:"اللعبة كاملة" }, price:3000} ] },

  { id:"bf5", cat:"xbox", platform:"XBOX", art:"xbox", icon:"controller", label:"BATTLEFIELD V", sold:850,
    image:"bf5.jpg", bg:"#111",
    note:{ en:"1 Xbox console", ckb:"یەک کۆنسۆڵ", ar:"كونسول واحد" },
    name:{ en:"Battlefield V", ckb:"باتڵفیڵد V", ar:"باتلفيلد V" },
    desc:{ en:"Full game for Xbox. For one Xbox console only.", ckb:"یاری تەواو بۆ ئێکس بۆکس. تەنها بۆ یەک کۆنسۆڵی ئێکس بۆکس.", ar:"اللعبة كاملة لإكس بوكس. لجهاز إكس بوكس واحد فقط." },
    options:[ {label:{ en:"Full game", ckb:"یاری تەواو", ar:"اللعبة كاملة" }, price:3000} ] },

  { id:"bf4", cat:"xbox", platform:"XBOX", art:"xbox", icon:"controller", label:"BATTLEFIELD 4", sold:800,
    image:"bf4.jpg", bg:"#111",
    note:{ en:"1 Xbox console", ckb:"یەک کۆنسۆڵ", ar:"كونسول واحد" },
    name:{ en:"Battlefield 4", ckb:"باتڵفیڵد 4", ar:"باتلفيلد 4" },
    desc:{ en:"Full game for Xbox. For one Xbox console only.", ckb:"یاری تەواو بۆ ئێکس بۆکس. تەنها بۆ یەک کۆنسۆڵی ئێکس بۆکس.", ar:"اللعبة كاملة لإكس بوكس. لجهاز إكس بوكس واحد فقط." },
    options:[ {label:{ en:"Full game", ckb:"یاری تەواو", ar:"اللعبة كاملة" }, price:3000} ] },

  { id:"bf2042", cat:"xbox", platform:"XBOX", art:"xbox", icon:"controller", label:"BATTLEFIELD 2042", sold:700,
    image:"bf2042.jpg", bg:"#111",
    note:{ en:"1 Xbox console", ckb:"یەک کۆنسۆڵ", ar:"كونسول واحد" },
    name:{ en:"Battlefield 2042", ckb:"باتڵفیڵد 2042", ar:"باتلفيلد 2042" },
    desc:{ en:"Full game for Xbox. For one Xbox console only.", ckb:"یاری تەواو بۆ ئێکس بۆکس. تەنها بۆ یەک کۆنسۆڵی ئێکس بۆکس.", ar:"اللعبة كاملة لإكس بوكس. لجهاز إكس بوكس واحد فقط." },
    options:[ {label:{ en:"Full game", ckb:"یاری تەواو", ar:"اللعبة كاملة" }, price:5000} ] },

  { id:"bf6", cat:"xbox", platform:"XBOX", art:"xbox", icon:"controller", label:"BATTLEFIELD 6", sold:1100,
    image:"bf6.jpg", bg:"#111",
    note:{ en:"1 Xbox console", ckb:"یەک کۆنسۆڵ", ar:"كونسول واحد" },
    name:{ en:"Battlefield 6", ckb:"باتڵفیڵد 6", ar:"باتلفيلد 6" },
    desc:{ en:"Full game for Xbox. For one Xbox console only.", ckb:"یاری تەواو بۆ ئێکس بۆکس. تەنها بۆ یەک کۆنسۆڵی ئێکس بۆکس.", ar:"اللعبة كاملة لإكس بوكس. لجهاز إكس بوكس واحد فقط." },
    options:[ {label:{ en:"Full game", ckb:"یاری تەواو", ar:"اللعبة كاملة" }, price:33000} ] },

  { id:"fc27", cat:"xbox", platform:"XBOX", art:"xbox", icon:"controller", label:"EA SPORTS FC 27", sold:1300,
    image:"fc27.jpg", bg:"#111",
    note:{ en:"1 Xbox console", ckb:"یەک کۆنسۆڵ", ar:"كونسول واحد" },
    name:{ en:"EA Sports FC 27", ckb:"EA Sports FC 27", ar:"EA Sports FC 27" },
    desc:{ en:"Full game for Xbox. For one Xbox console only.", ckb:"یاری تەواو بۆ ئێکس بۆکس. تەنها بۆ یەک کۆنسۆڵی ئێکس بۆکس.", ar:"اللعبة كاملة لإكس بوكس. لجهاز إكس بوكس واحد فقط." },
    options:[ {label:{ en:"Full game", ckb:"یاری تەواو", ar:"اللعبة كاملة" }, price:55000} ] },

  { id:"pubg-uc", cat:"mobile", platform:"MOBILE", art:"pubg", icon:"coin", label:"PUBG UC", sold:3120,
    image:"pubg-uc.jpg", bg:"#000000",
    name:{ en:"PUBG Mobile UC", ckb:"UCی پەبجی مۆبایل", ar:"شدات ببجي موبايل" },
    desc:{ en:"Sent straight to your player ID. No password needed.", ckb:"ڕاستەوخۆ دەنێردرێت بۆ ئایدی پەبجیەکەت. پێویستی بە وشەی نهێنی نییە.", ar:"تُشحن مباشرة على معرّف اللاعب. لا حاجة لكلمة المرور." },
    options:[ {label:"24 UC", price:600}, {label:"48 UC", price:1200}, {label:"96 UC", price:2400}, {label:"144 UC", price:3600}, {label:"248 UC", price:6200}, {label:"500 UC", price:12500}, {label:"852 UC", price:21300} ] },

  { id:"freefire", cat:"mobile", platform:"MOBILE", art:"freefire", icon:"gem", label:"FREE FIRE", sold:2450,
    name:{ en:"Free Fire Diamonds", ckb:"ئەڵماسی فری فایەر", ar:"جواهر فري فاير" },
    desc:{ en:"Sent straight to your player ID.", ckb:"ڕاستەوخۆ دەنێردرێت بۆ ئایدی یاریزانەکەت.", ar:"تُشحن مباشرة على معرّف اللاعب." },
    options:[ {label:"100 💎", price:1500}, {label:"310 💎", price:3800}, {label:"520 💎", price:7000}, {label:"1060 💎", price:13000, old:14500} ] },

  { id:"mlbb", cat:"mobile", platform:"MOBILE", art:"mlbb", icon:"gem", label:"MLBB", sold:610,
    name:{ en:"Mobile Legends Diamonds", ckb:"ئەڵماسی مۆبایل لێجێندز", ar:"جواهر موبايل ليجندز" },
    desc:{ en:"Sent to your user ID and zone ID.", ckb:"دەنێردرێت بۆ ئایدی و زۆن ئایدیەکەت.", ar:"تُشحن على المعرّف ورقم السيرفر." },
    options:[ {label:"86 💎", price:2500}, {label:"172 💎", price:5000}, {label:"257 💎", price:7500} ] },

  { id:"xbox-card", cat:"gift", platform:"XBOX", art:"xbox", icon:"gift", label:"XBOX CARD", sold:380,
    image:"xbox-card.jpg", bg:"#107c10",
    name:{ en:"Xbox Gift Card", ckb:"کارتی دیاری ئێکس بۆکس", ar:"بطاقة هدايا إكس بوكس" },
    desc:{ en:"Credit for games, add-ons and subscriptions on the Xbox Store.", ckb:"باڵانس بۆ یاری و زیادکراو لە ئێکس بۆکس ستۆر.", ar:"رصيد للألعاب والإضافات والاشتراكات في متجر إكس بوكس." },
    options:[ {label:"$1", price:2500}, {label:"$5", price:10000}, {label:"$10", price:17000}, {label:"$25", price:40000}, {label:"$50", price:78000}, {label:"$100", price:146000} ] },

  /* ----- AI & more ----- */
  { id:"apple", cat:"gift", platform:"iTUNES", art:"apple", icon:"gift", label:"iTUNES", sold:520,
    image:"itunes.jpg", bg:"#7a4fd8",
    name:{ en:"iTunes Gift Card", ckb:"کارتی دیاری iTunes", ar:"بطاقة هدايا iTunes" },
    desc:{ en:"For apps, games, music and subscriptions on iPhone, iPad and Mac.", ckb:"بۆ ئەپ، یاری و مۆسیقا لەسەر ئایفۆن، ئایپاد و ماک.", ar:"للتطبيقات والألعاب والموسيقى والاشتراكات على آيفون وآيباد وماك." },
    options:[ {label:"$2", price:5000}, {label:"$5", price:10000}, {label:"$15", price:28000}, {label:"$25", price:45000} ] },];

/* ---------- 4) TEXT (every sentence in 3 languages) ---------- */
const TEXT = {
  en:{
    fs_title:"Fortnite Item Shop", fs_sub:"Today's real shop, gifted to your account. Updates automatically every day.",
    fs_reset:"New shop in", fs_leaves:"Leaves in {t}", fs_loading:"Loading today's shop…",
    fs_error:"Couldn't load the Fortnite shop right now.", fs_retry:"Try again", fs_count:"{n} items",
    fs_note:"Add our Epic account as a friend. Epic allows gifts after 48 hours of friendship.",
    fs_all:"All", fs_bundle:"Bundles", fs_outfit:"Skins", fs_emote:"Emotes", fs_pickaxe:"Pickaxes", fs_glider:"Gliders", fs_backpack:"Back Blings", fs_other:"Other",
    u_d:"d", u_h:"h", u_m:"m",
    cat_count:"{n} products",
    rv_title:"Service Store Reviews", rv_based:"Based on {n} reviews", rv_none:"No reviews yet. Be the first!",
    rv_write:"Write a review", rv_signin_t:"Sign in to write a review",
    rv_signin_d:"We use your email only to make sure every review comes from a real person. It is never shown publicly.",
    rv_google:"Continue with Google", rv_or:"or", rv_email_ph:"Your email", rv_email_btn:"Send me a sign-in link",
    rv_email_sent:"Check your inbox and open the link on this device.", rv_bad_email:"Please enter a valid email.",
    rv_your_rating:"Your rating", rv_name:"Name shown on your review", rv_text_ph:"Tell others about your experience…",
    rv_submit:"Post review", rv_thanks:"Thanks! Your review is posted.", rv_need_rating:"Please choose a star rating.",
    rv_signed_as:"Signed in as", rv_signout:"Sign out", rv_back:"Back to store", rv_all:"All reviews",
    rv_error:"Something went wrong. Please try again.", rv_one_per:"One review per person. Posting again updates your review.",
    rv_sort_new:"Newest", rv_sort_high:"Highest", rv_sort_low:"Lowest", rv_google_demo:"Google sign-in works after Firebase is connected.",
    store:"Service Store", tagline:"DIGITAL GAMING STORE",
    announce:"⚡ Instant digital delivery · Local payment · Support 7 days a week",
    search:"Search subscriptions, gift cards, top-ups…", no_results:"No products found",
    featured:"Featured", from:"from", currency:"IQD",
    buy_now:"Buy now", add_cart:"Add to cart", details:"Details",
    logo_title:"Your trusted gaming store", customers:"Happy customers", avg_delivery:"Avg. delivery",
    t1:"Instant delivery", t1d:"Codes sent within minutes",
    t2:"Local payment", t2d:"FIB · FastPay · Zain Cash",
    t3:"100% original", t3d:"Every code is tested",
    t4:"Real support", t4d:"Real people reply fast",
    flash:"Flash deals", ends:"Ends in",
    best:"Best sellers", sold:"sold",
    see_all:"See all", store_title:"All products",
    sort_popular:"Most popular", sort_low:"Price: low to high", sort_high:"Price: high to low",
    faq:"Questions",
    q1:"How do I receive my code?", a1:"After payment we send your code on WhatsApp, usually within 5 minutes.",
    q2:"Which payment methods do you accept?", a2:"FIB, FastPay, Zain Cash, or cash at our shop.",
    q3:"Will the code work in my region?", a3:"Tell us your account region before ordering and we'll send a matching code.",
    q4:"Do you need my password for top-ups?", a4:"No. For PUBG UC and Free Fire diamonds we only need your player ID.",
    follow_t:"Stay in the loop", follow_d:"Follow us for new deals, flash sales and giveaways.",
    choose:"Choose an option", qty:"Quantity", total:"Total",
    cart:"Your cart", cart_empty:"Your cart is empty", keep:"Continue shopping",
    note:"Player ID / account email / region (optional)",
    checkout:"Order on WhatsApp", added:"Added to cart",
    msg_intro:"Hello Service Store, I want to order:", msg_note:"Details",
    about:"Gaming subscriptions, gift cards and top-ups in Kurdistan, delivered in minutes.",
    f_store:"Store", f_help:"Help", f_contact:"Contact",
    how:"How to order", hours:"Working hours", rights:"All rights reserved.",
    spotlight:"Featured spotlight", price:"Price", lang_label:"LANG", cur_label:"CURRENCY",
    promo_t:"Order on WhatsApp", promo_d:"Instant codes, real people, local payment", promo_btn:"Message us",
    contact_btn:"Contact us",
  },
  ckb:{
    fs_title:"ئایتم شۆپی فۆرتنایت", fs_sub:"شۆپی ڕاستەقینەی ئەمڕۆ، وەک دیاری بۆ ئەکاونتەکەت. ڕۆژانە خۆکارانە نوێ دەبێتەوە.",
    fs_reset:"شۆپی نوێ دوای", fs_leaves:"دەڕوات دوای {t}", fs_loading:"شۆپی ئەمڕۆ بار دەکرێت…",
    fs_error:"ئێستا نەتوانرا شۆپی فۆرتنایت بار بکرێت.", fs_retry:"دووبارە هەوڵ بدەرەوە", fs_count:"{n} ئایتم",
    fs_note:"ئەکاونتی ئێپیکەکەمان وەک هاوڕێ زیاد بکە. ئێپیک دوای ٤٨ کاتژمێر لە هاوڕێیەتی ڕێگە بە دیاری دەدات.",
    fs_all:"هەمووی", fs_bundle:"باندڵ", fs_outfit:"سکین", fs_emote:"ئیمۆت", fs_pickaxe:"پیکاکس", fs_glider:"گلایدەر", fs_backpack:"باک بلینگ", fs_other:"تر",
    u_d:" ڕۆژ", u_h:" کاتژمێر", u_m:" خولەک",
    cat_count:"{n} بەرهەم",
    rv_title:"هەڵسەنگاندنەکانی سێرڤس ستۆر", rv_based:"بەپێی {n} هەڵسەنگاندن", rv_none:"هێشتا هیچ هەڵسەنگاندنێک نییە. یەکەم کەس بە!",
    rv_write:"هەڵسەنگاندن بنووسە", rv_signin_t:"بۆ نووسینی هەڵسەنگاندن بچۆ ژوورەوە",
    rv_signin_d:"ئیمەیڵەکەت تەنها بۆ ئەوە بەکاردێنین کە دڵنیا بین هەر هەڵسەنگاندنێک لە کەسێکی ڕاستەقینەوەیە. هەرگیز بە گشتی پیشان نادرێت.",
    rv_google:"بەردەوام بە لەگەڵ گووگڵ", rv_or:"یان", rv_email_ph:"ئیمەیڵەکەت", rv_email_btn:"لینکی چوونەژوورەوەم بۆ بنێرە",
    rv_email_sent:"سەیری ئیمەیڵەکەت بکە و لینکەکە لەسەر ئەم ئامێرە بکەرەوە.", rv_bad_email:"تکایە ئیمەیڵێکی دروست بنووسە.",
    rv_your_rating:"هەڵسەنگاندنی تۆ", rv_name:"ئەو ناوەی لەسەر هەڵسەنگاندنەکەت دەردەکەوێت", rv_text_ph:"ئەزموونەکەت بۆ کەسانی تر باس بکە…",
    rv_submit:"بڵاوکردنەوە", rv_thanks:"سوپاس! هەڵسەنگاندنەکەت بڵاوکرایەوە.", rv_need_rating:"تکایە ژمارەی ئەستێرە هەڵبژێرە.",
    rv_signed_as:"چوویتە ژوورەوە بە", rv_signout:"دەرچوون", rv_back:"گەڕانەوە بۆ فرۆشگا", rv_all:"هەموو هەڵسەنگاندنەکان",
    rv_error:"هەڵەیەک ڕوویدا. تکایە دووبارە هەوڵ بدەرەوە.", rv_one_per:"هەر کەسێک یەک هەڵسەنگاندن. دووبارە ناردن هەڵسەنگاندنەکەت نوێ دەکاتەوە.",
    rv_sort_new:"نوێترین", rv_sort_high:"بەرزترین", rv_sort_low:"نزمترین", rv_google_demo:"چوونەژوورەوە بە گووگڵ دوای پەیوەستکردنی Firebase کار دەکات.",
    store:"سێرڤس ستۆر", tagline:"فرۆشگای دیجیتاڵی یاری",
    announce:"⚡ گەیاندنی دیجیتاڵی خێرا · پارەدانی ناوخۆیی · پشتگیری ٧ ڕۆژ لە هەفتەدا",
    search:"گەڕان بۆ خزمەتگوزاری، کارتی دیاری، پڕکردنەوە…", no_results:"هیچ بەرهەمێک نەدۆزرایەوە",
    featured:"تایبەت", from:"لە", currency:"دینار",
    buy_now:"ئێستا بیکڕە", add_cart:"زیادکردن بۆ سەبەتە", details:"وردەکاری",
    logo_title:"فرۆشگای متمانەپێکراوی یارییەکانت", customers:"کڕیاری دڵخۆش", avg_delivery:"تێکڕای گەیاندن",
    t1:"گەیاندنی خێرا", t1d:"کۆدەکان لە چەند خولەکێکدا دەنێردرێن",
    t2:"پارەدانی ناوخۆیی", t2d:"FIB · FastPay · Zain Cash",
    t3:"١٠٠٪ ئەسڵی", t3d:"هەموو کۆدێک تاقیکراوەتەوە",
    t4:"پشتگیری ڕاستەقینە", t4d:"کەسی ڕاستەقینە بە خێرایی وەڵام دەداتەوە",
    flash:"داشکاندنی خێرا", ends:"کۆتایی دێت لە",
    best:"پڕفرۆشترینەکان", sold:"فرۆشراو",
    see_all:"هەمووی ببینە", store_title:"هەموو بەرهەمەکان",
    sort_popular:"بەناوبانگترین", sort_low:"نرخ: کەم بۆ زۆر", sort_high:"نرخ: زۆر بۆ کەم",
    faq:"پرسیارەکان",
    q1:"چۆن کۆدەکەم وەردەگرم؟", a1:"دوای پارەدان کۆدەکەت لە واتسئاپ بۆ دەنێرین، زۆربەی کات لە ماوەی ٥ خولەکدا.",
    q2:"چ ڕێگایەکی پارەدان وەردەگرن؟", a2:"FIB، FastPay، Zain Cash یان پارەی نەختینە لە دوکانەکەمان.",
    q3:"ئایا کۆدەکە لە ناوچەکەی من کار دەکات؟", a3:"پێش داواکردن ناوچەی ئەکاونتەکەت پێمان بڵێ و کۆدێکی گونجاوت بۆ دەنێرین.",
    q4:"بۆ پڕکردنەوە پێویستتان بە وشەی نهێنی منە؟", a4:"نەخێر. بۆ UCی پەبجی و ئەڵماسی فری فایەر تەنها ئایدی یاریزانەکەتمان پێویستە.",
    follow_t:"ئاگادار بە", follow_d:"فۆڵۆمان بکە بۆ داشکاندنی نوێ، ئۆفەری خێرا و خەڵات.",
    choose:"هەڵبژاردنێک دیاری بکە", qty:"ژمارە", total:"کۆی گشتی",
    cart:"سەبەتەکەت", cart_empty:"سەبەتەکەت بەتاڵە", keep:"بەردەوام بە لە کڕین",
    note:"ئایدی یاریزان / ئیمەیڵی ئەکاونت / ناوچە (ئارەزوومەندانە)",
    checkout:"داواکردن لە واتسئاپ", added:"زیادکرا بۆ سەبەتە",
    msg_intro:"سڵاو سێرڤس ستۆر، دەمەوێت ئەمانە داوا بکەم:", msg_note:"زانیاری",
    about:"خزمەتگوزاری یاری، کارتی دیاری و پڕکردنەوە لە کوردستان، لە چەند خولەکێکدا دەگاتە دەستت.",
    f_store:"فرۆشگا", f_help:"یارمەتی", f_contact:"پەیوەندی",
    how:"چۆنیەتی داواکردن", hours:"کاتی کارکردن", rights:"هەموو مافەکان پارێزراون.",
    spotlight:"تایبەتی ئەم هەفتەیە", price:"نرخ", lang_label:"زمان", cur_label:"دراو",
    promo_t:"داواکردن لە واتسئاپ", promo_d:"کۆدی خێرا، کەسی ڕاستەقینە، پارەدانی ناوخۆیی", promo_btn:"نامەمان بۆ بنێرە",
    contact_btn:"پەیوەندیمان پێوە بکە",
  },
  ar:{
    fs_title:"متجر عناصر فورتنايت", fs_sub:"متجر اليوم الحقيقي، يُرسل هدية إلى حسابك. يتحدّث تلقائياً كل يوم.",
    fs_reset:"متجر جديد بعد", fs_leaves:"يغادر بعد {t}", fs_loading:"جارٍ تحميل متجر اليوم…",
    fs_error:"تعذّر تحميل متجر فورتنايت الآن.", fs_retry:"حاول مجدداً", fs_count:"{n} عنصر",
    fs_note:"أضف حساب إيبك الخاص بنا صديقاً. تسمح إيبك بالهدايا بعد ٤٨ ساعة من الصداقة.",
    fs_all:"الكل", fs_bundle:"باقات", fs_outfit:"سكنات", fs_emote:"رقصات", fs_pickaxe:"فؤوس", fs_glider:"مظلات", fs_backpack:"حقائب", fs_other:"أخرى",
    u_d:" يوم", u_h:" ساعة", u_m:" دقيقة",
    cat_count:"{n} منتج",
    rv_title:"تقييمات سيرفس ستور", rv_based:"بناءً على {n} تقييم", rv_none:"لا توجد تقييمات بعد. كن الأول!",
    rv_write:"اكتب تقييماً", rv_signin_t:"سجّل الدخول لكتابة تقييم",
    rv_signin_d:"نستخدم بريدك فقط للتأكد من أن كل تقييم من شخص حقيقي. لن يظهر للعامة أبداً.",
    rv_google:"المتابعة باستخدام جوجل", rv_or:"أو", rv_email_ph:"بريدك الإلكتروني", rv_email_btn:"أرسل لي رابط الدخول",
    rv_email_sent:"تحقق من بريدك وافتح الرابط على هذا الجهاز.", rv_bad_email:"يرجى إدخال بريد صحيح.",
    rv_your_rating:"تقييمك", rv_name:"الاسم الظاهر على تقييمك", rv_text_ph:"أخبر الآخرين عن تجربتك…",
    rv_submit:"نشر التقييم", rv_thanks:"شكراً! تم نشر تقييمك.", rv_need_rating:"يرجى اختيار عدد النجوم.",
    rv_signed_as:"مسجّل باسم", rv_signout:"تسجيل الخروج", rv_back:"العودة إلى المتجر", rv_all:"جميع التقييمات",
    rv_error:"حدث خطأ. حاول مرة أخرى.", rv_one_per:"تقييم واحد لكل شخص. النشر مرة أخرى يحدّث تقييمك.",
    rv_sort_new:"الأحدث", rv_sort_high:"الأعلى", rv_sort_low:"الأدنى", rv_google_demo:"الدخول عبر جوجل يعمل بعد ربط Firebase.",
    store:"سيرفس ستور", tagline:"متجر ألعاب رقمي",
    announce:"⚡ تسليم رقمي فوري · دفع محلي · دعم ٧ أيام في الأسبوع",
    search:"ابحث عن اشتراكات، بطاقات هدايا، شحن…", no_results:"لا توجد منتجات",
    featured:"مميز", from:"من", currency:"دينار",
    buy_now:"اشترِ الآن", add_cart:"أضف إلى السلة", details:"التفاصيل",
    logo_title:"متجر ألعابك الموثوق", customers:"عملاء سعداء", avg_delivery:"متوسط التسليم",
    t1:"تسليم فوري", t1d:"تصلك الأكواد خلال دقائق",
    t2:"دفع محلي", t2d:"FIB · FastPay · Zain Cash",
    t3:"أصلي ١٠٠٪", t3d:"كل كود مجرّب",
    t4:"دعم حقيقي", t4d:"أشخاص حقيقيون يردون بسرعة",
    flash:"عروض سريعة", ends:"ينتهي خلال",
    best:"الأكثر مبيعاً", sold:"مُباع",
    see_all:"عرض الكل", store_title:"جميع المنتجات",
    sort_popular:"الأكثر شعبية", sort_low:"السعر: من الأقل", sort_high:"السعر: من الأعلى",
    faq:"الأسئلة الشائعة",
    q1:"كيف أستلم الكود؟", a1:"بعد الدفع نرسل لك الكود على واتساب، عادةً خلال ٥ دقائق.",
    q2:"ما طرق الدفع المتاحة؟", a2:"FIB وFastPay وزين كاش، أو نقداً في متجرنا.",
    q3:"هل يعمل الكود في منطقتي؟", a3:"أخبرنا بمنطقة حسابك قبل الطلب وسنرسل لك كوداً مناسباً.",
    q4:"هل تحتاجون كلمة المرور للشحن؟", a4:"لا. لشحن ببجي وفري فاير نحتاج فقط معرّف اللاعب.",
    follow_t:"ابقَ على اطلاع", follow_d:"تابعنا للعروض الجديدة والتخفيضات والمسابقات.",
    choose:"اختر", qty:"الكمية", total:"المجموع",
    cart:"سلتك", cart_empty:"سلتك فارغة", keep:"متابعة التسوق",
    note:"معرّف اللاعب / إيميل الحساب / المنطقة (اختياري)",
    checkout:"اطلب عبر واتساب", added:"أُضيف إلى السلة",
    msg_intro:"مرحباً سيرفس ستور، أريد طلب:", msg_note:"معلومات",
    about:"اشتراكات الألعاب وبطاقات الهدايا والشحن في كوردستان، تصلك خلال دقائق.",
    f_store:"المتجر", f_help:"المساعدة", f_contact:"تواصل معنا",
    how:"طريقة الطلب", hours:"ساعات العمل", rights:"جميع الحقوق محفوظة.",
    spotlight:"العروض المميزة", price:"السعر", lang_label:"اللغة", cur_label:"العملة",
    promo_t:"اطلب عبر واتساب", promo_d:"أكواد فورية، أشخاص حقيقيون، دفع محلي", promo_btn:"راسلنا",
    contact_btn:"تواصل معنا",
  },
};
