/**
 * KANIEN'KÉHA LEARNING APP — DATA FILE
 * ======================================
 * Primary source: Kontinónhstats (kanehsatakevoices.com)
 * Curriculum: Onwá:ri Tekahawáhkwen Mary McDonald, Kanehsatà:ke
 * Supplementary: Bonvillain (1984), Wikipedia Mohawk language article,
 *   native-languages.org, academic grammar sources (Mithun, Baker),
 *   Deering & Harries-Delisle teaching grammar.
 *
 * HOW TO ADD VOCABULARY:
 *   Add entries to GLOSS array following the template below.
 *   Add units/lessons to UNITS array.
 *   To cross-reference with "One Thousand Useful Mohawk Words" (Maracle),
 *   look up entries and add them here with cite.text noting the page/entry.
 *
 * DIALECT NOTES (applies throughout):
 *   Kanehsatà:ke / Kahnawà:ke: r-initial where Akwesasne uses l
 *   Six Nations / Tyendinaga: y where Kanehsatà:ke uses i in some positions
 *   All dialects equally valid; VARIANTS object below maps community differences.
 */

// ══════════════════════════════════════════════════════════════════
// IPA + TTS DATA FOR SYLLABARY
// tts = phonetic string for SpeechSynthesis (English approximation)
// ipa = IPA transcription
// ══════════════════════════════════════════════════════════════════
const SYL = {
  vowels: [
    {id:'sv-a',  c:'a',   r:'a',    ipa:'/a/',       tts:'ah',         s:"like 'a' in father",        t:'Short open back vowel. Very common. Do not add English r-colour after it.'},
    {id:'sv-a2', c:'a:',  r:'a:',   ipa:'/aː/',      tts:'aaah',       s:'long — held double length',  t:'The colon (:) marks length. A long vowel can completely change a word\'s meaning. Always honour it.'},
    {id:'sv-e',  c:'e',   r:'e',    ipa:'/e/',        tts:'eh',         s:"like 'e' in bed",            t:"Short mid front vowel. Keep it pure — no gliding into 'ay'."},
    {id:'sv-e2', c:'e:',  r:'e:',   ipa:'/eː/',       tts:'ehhh',       s:'long e',                     t:'Held roughly twice as long as the short version.'},
    {id:'sv-i',  c:'i',   r:'i',    ipa:'/i/',        tts:'ee',         s:"like 'ee' in see",           t:"High front vowel, like Spanish 'i'. In Ontario dialects (Six Nations/Tyendinaga), some positions use 'y' instead — both are valid."},
    {id:'sv-i2', c:'i:',  r:'i:',   ipa:'/iː/',       tts:'eeee',       s:'long i',                     t:'Sustained high front vowel.'},
    {id:'sv-o',  c:'o',   r:'o',    ipa:'/o/',        tts:'oh',         s:"like 'o' in go",             t:'Rounded back vowel. Short unless marked with :.'},
    {id:'sv-o2', c:'o:',  r:'o:',   ipa:'/oː/',       tts:'ohhh',       s:'long — held double',         t:'Length here distinguishes verb forms and possession. Honour the colon.'},
    {id:'sv-en', c:'ę',   r:'ę',    ipa:'/ẽ/ or /ã/', tts:'en',         s:'nasalized vowel',            t:'Air flows through nose AND mouth together. Nasal vowels are a key feature of Iroquoian languages. Cannot be approximated by English TTS — listen to FirstVoices for authentic pronunciation.'},
    {id:'sv-on', c:'ǫ',   r:'ǫ',    ipa:'/õ/',        tts:'on',         s:'nasalized o-sound',          t:'A distinct sound from ę — both are nasal vowels common in Kanehsatà:ke Kanien\'kéha. FirstVoices has authentic audio.'},
  ],
  consonants: [
    {id:'sc-k',  c:'k',   r:'k',    ipa:'/k/',        tts:'k',          s:"'k' in sky (no puff)",       t:"Unaspirated — no puff of air, unlike English 'key'. Think 'sky', not 'key'."},
    {id:'sc-t',  c:'t',   r:'t',    ipa:'/t/',        tts:'t',          s:"'t' in stop (no puff)",      t:"Also unaspirated. The 't' in 'stop', not 'top'."},
    {id:'sc-gs', c:"'",   r:"'",    ipa:'/ʔ/',        tts:'uh',         s:"glottal stop — 'uh-oh'",     t:"A full consonant in Kanien'kéha. A brief closure of the throat. Cannot be replicated in English TTS — listen to FirstVoices."},
    {id:'sc-h',  c:'h',   r:'h',    ipa:'/h/',        tts:'h',          s:"like 'h' in help",           t:'Breathy onset before vowels. Can appear between vowels too.'},
    {id:'sc-n',  c:'n',   r:'n',    ipa:'/n/',        tts:'n',          s:"like 'n' in no",             t:'Standard nasal consonant.'},
    {id:'sc-r',  c:'r',   r:'r / l',ipa:'/ɾ/ or /l/', tts:'r',          s:'flap (r) or lateral (l)',    t:'r in Kanehsatà:ke/Kahnawà:ke; l in Akwesasne. Both are community-valid forms, not errors.'},
    {id:'sc-w',  c:'w',   r:'w',    ipa:'/w/',        tts:'w',          s:"like 'w' in water",          t:'Labial glide.'},
    {id:'sc-y',  c:'y',   r:'y / i',ipa:'/j/ or /i/', tts:'y',          s:"y in Ontario; i in Quebec dialects",t:"Six Nations/Tyendinaga: 'y' in some positions. Kanehsatà:ke/Kahnawà:ke: 'i'. Both are correct."},
    {id:'sc-ts', c:'ts',  r:'ts',   ipa:'/ts/',       tts:'ts',         s:"'ts' as in cats",            t:'Affricate. In Kahnawà:ke consistently pronounced ts; other communities may vary.'},
    {id:'sc-tsh',c:'tsh', r:'tsh',  ipa:'/tʃ/',       tts:'ch',         s:"'ch' as in church",          t:'Another common affricate in Kanien\'kéha.'},
  ],
  tone: [
    {id:'st-vl', c:'V:',  r:'Long vowel', ipa:'Vː',   tts:'',           s:'Held ~2× longer',            t:'Always write and honour the colon. Never shorten a marked vowel — the word changes.'},
    {id:'st-gs', c:"'",   r:'Glottal stop',ipa:'ʔ',   tts:'',           s:'Throat closure',             t:"Appears mid-word and word-finally. í:'i (I) ≠ í:se' (you) — the glottal makes them different words."},
    {id:'st-ac', c:'á',   r:'Stress accent',ipa:'ˈ',  tts:'',           s:'Primary stress',             t:'The acute accent marks where the word\'s primary stress falls. Stressed syllables are louder and higher-pitched.'},
    {id:'st-ns', c:'ę/ǫ', r:'Nasal vowels',ipa:'/ẽ/ /õ/',tts:'',       s:'Nasalized',                  t:"These two sounds are distinct from each other and from their oral counterparts. Both are common in Kanehsatà:ke Kanien'kéha."},
    {id:'st-rm', c:'R-',  r:'Male prefix', ipa:'',     tts:'',           s:'Marks male persons',         t:'R- (Ro-, Ra-, Ron-) marks male person nouns and pronouns. In Akwesasne: L-. Compare I-/Iak-/A- for female.'},
    {id:'st-if', c:'I-',  r:'Female prefix',ipa:'',   tts:'',           s:'Marks female persons',       t:'I-/Iak-/A-/Ako- marks female person nouns and pronouns. This prefix system is systematic throughout Kanien\'kéha.'},
  ]
};

// ══════════════════════════════════════════════════════════════════
// DIALECT VARIANTS
// Source: Bonvillain (1984) Akwesasne Grammar; native-languages.org;
//         CBC Original Voices; Pentangelo (2020)
// ══════════════════════════════════════════════════════════════════
const VARIANTS = {
  'p01': [{c:"Kanehsatà:ke / Kahnawà:ke",f:"í:se'",n:'i-form (Eastern Quebec dialects)'},{c:'Six Nations / Tyendinaga',f:"ý:se'",n:'y-form (Ontario dialects)'}],
  'p02': [{c:"Kanehsatà:ke / Kahnawà:ke",f:"í:'i",n:'i-form'},{c:'Six Nations / Tyendinaga',f:"ý:'i",n:'y-form'}],
  'p04': [{c:'Kanehsatà:ke / Kahnawà:ke',f:'raónha',n:'r-initial'},{c:'Akwesasne',f:'laónha',n:'r→l alternation (Bonvillain 1984)'}],
  'n05': [{c:"Kanehsatà:ke / Kahnawà:ke",f:"Raksá:'a",n:'r-initial'},{c:'Akwesasne',f:"Laksá:'a",n:'r→l alternation'}],
  'n07': [{c:'Kanehsatà:ke / Kahnawà:ke',f:'Rón:kwe',n:'r-initial'},{c:'Akwesasne',f:'Lón:kwe',n:'r→l alternation'}],
  'n06': [{c:'Kanehsatà:ke / Kahnawà:ke',f:'Ranekénhteron',n:'r-initial'},{c:'Akwesasne',f:'Lanekénhteron',n:'r→l alternation'}],
  'n08': [{c:'Kanehsatà:ke / Kahnawà:ke',f:'Rokstén:ha',n:'r-initial'},{c:'Akwesasne',f:'Lokstén:ha',n:'r→l alternation'}],
};

// ══════════════════════════════════════════════════════════════════
// GLOSSARY
// Template for each entry:
// {
//   id: 'unique_id',
//   target: 'Kanien\'kéha word',
//   english: 'English meaning',
//   pos: 'Part of speech',
//   unit: unit_number (0-indexed),
//   lesson: lesson_index_within_unit,
//   notes: 'Cultural/grammatical note',
//   cite: { text: 'Source', url: 'URL' },
//   accepts: ['array','of','accepted','spellings'],  // dialect variants + accent-free
//   forms: [{label:'My X',form:'akX'}, ...] or null,
//   ipa: 'IPA transcription' (optional, for future use)
// }
// ══════════════════════════════════════════════════════════════════
const GLOSS = [

  // ─────────────────────────────────────────────
  // UNIT 1 · LESSON 1: FREE PRONOUNS
  // Source: Kontinónhstats Lesson 1 / Mary McDonald
  // ─────────────────────────────────────────────
  {id:'p01',target:"í:se'",english:'You (singular)',pos:'Free Pronoun',unit:0,lesson:0,
   notes:"Singular 'you'. Free pronouns stand alone and can open a sentence for emphasis. The glottal stop (') at the end is a full consonant. In Six Nations/Tyendinaga: ý:se'.",
   cite:{text:"Kontinónhstats Lesson 1 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-1/"},
   accepts:["í:se'","i:se'","ise'","ý:se'","yse'","ise"],forms:null},

  {id:'p02',target:"í:'i",english:'I (singular)',pos:'Free Pronoun',unit:0,lesson:0,
   notes:"First person singular. The glottal stop (') between the vowels is a full consonant — not punctuation. In Ontario dialects: ý:'i.",
   cite:{text:"Kontinónhstats Lesson 1 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-1/"},
   accepts:["í:'i","i:'i","i'i","ý:'i","y'i"],forms:null},

  {id:'p03',target:'akaónha',english:'She (formal/respectful)',pos:'Free Pronoun',unit:0,lesson:0,
   notes:"Used for a female you respect — a mother, elder, or person of authority. Kanien'kéha encodes relational respect directly into grammar. Contrast with aónha (informal).",
   cite:{text:"Kontinónhstats Lesson 1 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-1/"},
   accepts:['akaónha','akaonha'],forms:null},

  {id:'p04',target:'raónha',english:'He (singular)',pos:'Free Pronoun',unit:0,lesson:0,
   notes:"Third person singular male. Ra- consistently marks male. In Akwesasne: laónha.",
   cite:{text:"Kontinónhstats Lesson 1 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-1/"},
   accepts:['raónha','raonha','laónha','laonha'],forms:null},

  {id:'p05',target:'aónha',english:'It / She (informal)',pos:'Free Pronoun',unit:0,lesson:0,
   notes:"Three uses: (1) a female animal, (2) a familiar female — sister or close friend, (3) an inanimate object. Familiarity and animacy are encoded grammatically.",
   cite:{text:"Kontinónhstats Lesson 1 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-1/"},
   accepts:['aónha','aonha'],forms:null},

  {id:'p06',target:'teseniiáhshe',english:'You two (dual)',pos:'Free Pronoun — Dual',unit:0,lesson:0,
   notes:"Kanien'kéha maintains singular / dual / plural as three distinct grammatical categories. The dual is not a quirk — it is a more precise way of seeing the social world.",
   cite:{text:"Kontinónhstats Lesson 1 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-1/"},
   accepts:['teseniiáhshe','teseniiahshe','teseniahshe'],forms:null},

  {id:'p07',target:'teiakeniiáhshe',english:'We two (you and I)',pos:'Free Pronoun — Dual',unit:0,lesson:0,
   notes:"First person dual inclusive. The Teiaken- prefix marks 'you and I together'.",
   cite:{text:"Kontinónhstats Lesson 1 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-1/"},
   accepts:['teiakeniiáhshe','teiakeniiahshe','teiakeniahshe'],forms:null},

  {id:'p08',target:'teteniiáhshe',english:'Two females (us two)',pos:'Free Pronoun — Dual',unit:0,lesson:0,
   notes:"Dual pronoun for two females.",
   cite:{text:"Kontinónhstats Lesson 1 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-1/"},
   accepts:['teteniiáhshe','teteniiahshe','teteniahshe'],forms:null},

  {id:'p09',target:'tehniiáhshe',english:'Two males / one of each',pos:'Free Pronoun — Dual',unit:0,lesson:0,
   notes:"For two males, or one male and one female together.",
   cite:{text:"Kontinónhstats Lesson 1 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-1/"},
   accepts:['tehniiáhshe','tehniiahshe','tehniahshe'],forms:null},

  {id:'p10',target:'sewakwé:kon',english:'You all (plural)',pos:'Free Pronoun — Plural',unit:0,lesson:0,
   notes:"Second person plural — 'all of you'. The plural distinguishes a gathering or group from a pair.",
   cite:{text:"Kontinónhstats Lesson 1 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-1/"},
   accepts:['sewakwé:kon','sewakwe:kon','sewakwekon'],forms:null},

  {id:'p11',target:'onkwé:kon',english:'We all (plural, inclusive)',pos:'Free Pronoun — Plural',unit:0,lesson:0,
   notes:"First person plural inclusive — all of us, including the person being spoken to.",
   cite:{text:"Kontinónhstats Lesson 1 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-1/"},
   accepts:['onkwé:kon','onkwe:kon','onkwekon'],forms:null},

  {id:'p12',target:'kontié:ren',english:'All females (plural)',pos:'Free Pronoun — Plural',unit:0,lesson:0,
   notes:"Third person feminine plural. Used when referring to a group of women or girls.",
   cite:{text:"Kontinónhstats Lesson 1 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-1/"},
   accepts:['kontié:ren','kontie:ren','kontieren'],forms:null},

  {id:'p13',target:'ratié:ren',english:'All males / everybody (plural)',pos:'Free Pronoun — Plural',unit:0,lesson:0,
   notes:"Third person masculine/mixed plural. Can mean 'all males in the world' or 'everybody'.",
   cite:{text:"Kontinónhstats Lesson 1 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-1/"},
   accepts:['ratié:ren','ratie:ren','ratieren'],forms:null},

  // ─────────────────────────────────────────────
  // UNIT 1 · LESSON 2: PEOPLE NOUNS (Lesson 2)
  // ─────────────────────────────────────────────
  {id:'n01',target:"Ieksá:'a",english:'Girl',pos:'Noun — Person',unit:0,lesson:1,
   notes:"Singular female child. I- prefix marks female. The glottal stop (') before the final vowel is phonemically significant.",
   cite:{text:"Kontinónhstats Lesson 2 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-2/"},
   accepts:["Ieksá:'a","ieksá:'a","ieksa'a"],forms:null},

  {id:'n02',target:"Ieià:tase'",english:'Teenage girl',pos:'Noun — Person',unit:0,lesson:1,
   notes:"Female adolescent. The long vowel (:) on 'a' is critical.",
   cite:{text:"Kontinónhstats Lesson 2 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-2/"},
   accepts:["Ieià:tase'","ieia:tase'","ieiatase'"],forms:null},

  {id:'n03',target:'Iakón:kwe',english:'Woman',pos:'Noun — Person',unit:0,lesson:1,
   notes:"Adult woman. Iak- prefix marks female. The '-kwe' root connects to personhood across Iroquoian languages.",
   cite:{text:"Kontinónhstats Lesson 2 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-2/"},
   accepts:['Iakón:kwe','iakón:kwe','iakon:kwe','iakónkwe'],forms:null},

  {id:'n04',target:'Akokstén:ha',english:'Elder woman',pos:'Noun — Person',unit:0,lesson:1,
   notes:"Elder woman — a title of authority and respect. Ako- prefix marks formal/respectful female. In Kanien'kehá:ka matrilineal society, elder women hold clan and ceremonial authority.",
   cite:{text:"Kontinónhstats Lesson 2 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-2/"},
   accepts:['Akokstén:ha','akokstén:ha','akoksten:ha','akokstenha'],forms:null},

  {id:'n05',target:"Raksá:'a",english:'Boy',pos:'Noun — Person',unit:0,lesson:1,
   notes:"Singular male child. R- marks male. In Akwesasne: Laksá:'a.",
   cite:{text:"Kontinónhstats Lesson 2 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-2/"},
   accepts:["Raksá:'a","raksa'a","raksá:'a","Laksá:'a","laksa'a"],forms:null},

  {id:'n06',target:'Ranekénhteron',english:'Teenage boy',pos:'Noun — Person',unit:0,lesson:1,
   notes:"Male adolescent. Ra- prefix marks male. In Akwesasne: Lanekénhteron.",
   cite:{text:"Kontinónhstats Lesson 2 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-2/"},
   accepts:['Ranekénhteron','ranekénhteron','ranekenhteron','Lanekénhteron'],forms:null},

  {id:'n07',target:'Rón:kwe',english:'Man',pos:'Noun — Person',unit:0,lesson:1,
   notes:"Adult male. Same '-kwe' root as Iakón:kwe (woman). R- vs Iak- prefix marks gender. In Akwesasne: Lón:kwe.",
   cite:{text:"Kontinónhstats Lesson 2 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-2/"},
   accepts:['Rón:kwe','rón:kwe','ron:kwe','ronkwe','Lón:kwe','lon:kwe'],forms:null},

  {id:'n08',target:'Rokstén:ha',english:'Elder man',pos:'Noun — Person',unit:0,lesson:1,
   notes:"Elder male. Same '-stén:ha' suffix as Akokstén:ha (elder woman) — parallel construction. In Akwesasne: Lokstén:ha.",
   cite:{text:"Kontinónhstats Lesson 2 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-2/"},
   accepts:['Rokstén:ha','rokstén:ha','roksten:ha','rokstenha','Lokstén:ha'],forms:null},

  // ─────────────────────────────────────────────
  // UNIT 2 · LESSON 3: KINSHIP NOUNS (Lesson 5)
  // Real forms from Kontinónhstats Lesson 5
  // ─────────────────────────────────────────────
  {id:'k01',target:"Sa'nisténha",english:'Your mother',pos:'Noun — Kinship',unit:1,lesson:0,
   notes:"'Your mother' — the Sa- prefix marks 'your'. The base is nisténha/ista in various forms. Kanien'kehá:ka society is matrilineal — the mother's line determines clan membership.",
   cite:{text:"Kontinónhstats Lesson 5 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-5/"},
   accepts:["Sa'nisténha","sa'nistenha","sanistenha"],
   forms:[{label:"Your mother",form:"Sa'nisténha"},{label:"My mother",form:"Ake'nisténha"},{label:"Her mother",form:"Ontate'nisténha"},{label:"His mother",form:"Ro'nisténha"}]},

  {id:'k02',target:"Ia'níha",english:'Your father',pos:'Noun — Kinship',unit:1,lesson:0,
   notes:"'Your father' — Ia- prefix marks 'your' in this paternal form. The possessive prefix changes the entire word, not just the beginning.",
   cite:{text:"Kontinónhstats Lesson 5 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-5/"},
   accepts:["Ia'níha","ia'niha","ianiha"],
   forms:[{label:"Your father",form:"Ia'níha"},{label:"My father",form:"Rake'níha"},{label:"Her father",form:"Ronwa'níha"},{label:"His father",form:"Ro'níha"}]},

  {id:'k03',target:'Sasóhtha',english:'Your grandmother',pos:'Noun — Kinship',unit:1,lesson:0,
   notes:"'Your grandmother' — Sa- prefix marks 'your'. Grandmothers hold central ceremonial and social authority in Kanien'kehá:ka matrilineal society.",
   cite:{text:"Kontinónhstats Lesson 5 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-5/"},
   accepts:['Sasóhtha','sasohtha','sasotha'],
   forms:[{label:"Your grandmother",form:"Sasóhtha"},{label:"My grandmother",form:"Aksóhtha"},{label:"Her grandmother",form:"Ontatsóhtha"},{label:"His grandmother",form:"Rohsóhtha"}]},

  {id:'k04',target:'Iahsóhtha',english:'Your grandfather',pos:'Noun — Kinship',unit:1,lesson:0,
   notes:"'Your grandfather' — Iah- prefix marks 'your' in this paternal kinship form.",
   cite:{text:"Kontinónhstats Lesson 5 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-5/"},
   accepts:['Iahsóhtha','iahsohtha'],
   forms:[{label:"Your grandfather",form:"Iahsóhtha"},{label:"My grandfather",form:"Rakhsóhtha"},{label:"Her grandfather",form:"Ronwahsóhtha"},{label:"His grandfather",form:"Rohsóhtha"}]},

  {id:'k05',target:"Sahtsí:'a",english:'Your older sister',pos:'Noun — Kinship',unit:1,lesson:0,
   notes:"'Your older sister'. Sibling terms in Kanien'kéha encode both the relative age and the speaker's gender — a more precise map of family structure than English.",
   cite:{text:"Kontinónhstats Lesson 5 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-5/"},
   accepts:["Sahtsí:'a","sahtsi'a"],
   forms:[{label:"Your older sister",form:"Sahtsí:'a"},{label:"My older sister",form:"Akhtsí:'a"},{label:"Her older sister",form:"Ontattsí:'a"},{label:"His older sister",form:"Rohtsí:'a"}]},

  {id:'k06',target:"Iahtsí:'a",english:'Your older brother',pos:'Noun — Kinship',unit:1,lesson:0,
   notes:"'Your older brother'. Note that the word for 'his older sister' (Rohtsí:'a) and 'his older brother' (Rohtsí:'a) may share a form in some dialects — context distinguishes them.",
   cite:{text:"Kontinónhstats Lesson 5 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-5/"},
   accepts:["Iahtsí:'a","iahtsi'a"],
   forms:[{label:"Your older brother",form:"Iahtsí:'a"},{label:"My older brother",form:"Rakhtsí:'a"},{label:"Her older brother",form:"Ronwahtsí:'a"},{label:"His older brother",form:"Rohtsí:'a"}]},

  {id:'k07',target:"She'kén:'a",english:'Your younger sister',pos:'Noun — Kinship',unit:1,lesson:0,
   notes:"'Your younger sister' — note the different prefix pattern compared to older sister.",
   cite:{text:"Kontinónhstats Lesson 5 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-5/"},
   accepts:["She'kén:'a","she'ken'a","shekena"],
   forms:[{label:"Your younger sister",form:"She'kén:'a"},{label:"My younger sister",form:"Khe'kén:'a"},{label:"Her younger sister",form:"Ontate'kén:'a"},{label:"His younger sister",form:"Shako'kén:'a"}]},

  {id:'k08',target:"Tshe'kén:'a",english:'Your younger brother',pos:'Noun — Kinship',unit:1,lesson:0,
   notes:"'Your younger brother'.",
   cite:{text:"Kontinónhstats Lesson 5 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-5/"},
   accepts:["Tshe'kén:'a","tshe'ken'a","tshekena"],
   forms:[{label:"Your younger brother",form:"Tshe'kén:'a"},{label:"My younger brother",form:"Ri'kén:'a"},{label:"Her younger brother",form:"Ronwa'kén:'a"},{label:"His younger brother",form:"Ro'kén:'a"}]},

  {id:'k09',target:"Sheién:'a",english:'Your daughter',pos:'Noun — Kinship',unit:1,lesson:0,
   notes:"'Your daughter'. Daughter and son forms follow distinct prefix patterns from sibling forms.",
   cite:{text:"Kontinónhstats Lesson 5 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-5/"},
   accepts:["Sheién:'a","sheien'a","sheiena"],
   forms:[{label:"Your daughter",form:"Sheién:'a"},{label:"My daughter",form:"Kheién:'a"},{label:"Her daughter",form:"Ontatién:'a"},{label:"His daughter",form:"Shakoién:'a"}]},

  {id:'k10',target:"Shetiá:wen",english:'Your son',pos:'Noun — Kinship',unit:1,lesson:0,
   notes:"'Your son'.",
   cite:{text:"Kontinónhstats Lesson 5 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-5/"},
   accepts:["Shetiá:wen","shetia:wen","shetiawen"],
   forms:[{label:"Your son",form:"Shetiá:wen"},{label:"My son",form:"Ketiá:wen"},{label:"Her son",form:"Wakotiá:wen"},{label:"His son",form:"Rakotiá:wen"}]},

  {id:'k11',target:'Sakhsotha',english:'Your granddaughter',pos:'Noun — Kinship',unit:1,lesson:1,
   notes:"'Your granddaughter'. The grandchild forms are distinct from the grandparent forms.",
   cite:{text:"Kontinónhstats Lesson 5 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-5/"},
   accepts:['Sakhsotha','sakhsotha'],
   forms:[{label:"Your granddaughter",form:"Sakhsotha"},{label:"My granddaughter",form:"Akakhsotha"},{label:"Her granddaughter",form:"Ontatkhsotha"},{label:"His granddaughter",form:"Shakókhsotha"}]},

  {id:'k12',target:'Iakhsotha',english:'Your grandson',pos:'Noun — Kinship',unit:1,lesson:1,
   notes:"'Your grandson'.",
   cite:{text:"Kontinónhstats Lesson 5 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-5/"},
   accepts:['Iakhsotha','iakhsotha'],
   forms:[{label:"Your grandson",form:"Iakhsotha"},{label:"My grandson",form:"Rakhsotha"},{label:"Her grandson",form:"Ronwakhsotha"},{label:"His grandson",form:"Rohsotha"}]},

  // ─────────────────────────────────────────────
  // UNIT 3: A-CLASS NOUNS (Lesson 7) — Household/Objects
  // ─────────────────────────────────────────────
  {id:'a01',target:"áhta'",english:'Shoe / shoes',pos:'Noun — A-class',unit:2,lesson:0,
   notes:"A-class nouns begin with 'a'. áhta' demonstrates noun incorporation: when the suffix owá:nen is added to the noun root, you get watahkowá:nen (big shoe). This incorporation process is central to Kanien'kéha grammar.",
   cite:{text:"Kontinónhstats Lesson 7 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-7/"},
   accepts:["áhta'","ahta'","ahta"],forms:null},

  {id:'a02',target:'atháhsteren',english:'Pants',pos:'Noun — A-class',unit:2,lesson:0,
   notes:"A-class noun — begins with 'a'. Clothing items are among the most practical vocabulary.",
   cite:{text:"Kontinónhstats Lesson 7 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-7/"},
   accepts:['atháhsteren','athahsteren'],forms:null},

  {id:'a03',target:"ate'wáhshare'",english:'Earrings',pos:'Noun — A-class',unit:2,lesson:0,
   notes:"A-class noun for earrings. Cultural items like earrings have ancient roots in Kanien'kehá:ka material culture.",
   cite:{text:"Kontinónhstats Lesson 7 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-7/"},
   accepts:["ate'wáhshare'","ate'wahshare'"],forms:null},

  {id:'a04',target:"atkahráhnha'",english:'Glasses / eyeglasses',pos:'Noun — A-class',unit:2,lesson:0,
   notes:"A-class noun. An example of Kanien'kéha adapting to describe modern objects through its root system.",
   cite:{text:"Kontinónhstats Lesson 7 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-7/"},
   accepts:["atkahráhnha'","atkahrahnha'","atkarahnha"],forms:null},

  {id:'a05',target:"ani'tskwá:ra",english:'Chair',pos:'Noun — A-class',unit:2,lesson:0,
   notes:"A-class noun. Note the long vowel (:) in the third syllable.",
   cite:{text:"Kontinónhstats Lesson 7 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-7/"},
   accepts:["ani'tskwá:ra","ani'tskwa:ra","anitskwara"],forms:null},

  {id:'a06',target:'atià:tawi',english:'Shirt / dress / coat',pos:'Noun — A-class',unit:2,lesson:0,
   notes:"A 'fake' A-class noun — we know its root means 'body cover', making it a derived noun. The root meaning reveals that Kanien'kéha often encodes function into the word itself.",
   cite:{text:"Kontinónhstats Lesson 7 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-7/"},
   accepts:['atià:tawi','atia:tawi','atiatawi'],forms:null},

  {id:'a07',target:'ahthén:no',english:'Ball',pos:'Noun — A-class',unit:2,lesson:0,
   notes:"A-class noun for ball. The long vowel (:) is important.",
   cite:{text:"Kontinónhstats Lesson 7 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-7/"},
   accepts:['ahthén:no','ahthen:no','ahthenno'],forms:null},

  // ─────────────────────────────────────────────
  // UNIT 3: COLOURS (Lesson 21)
  // ─────────────────────────────────────────────
  {id:'c01',target:'Onekwénhtara',english:'Red',pos:'Colour noun',unit:2,lesson:1,
   notes:"Red — Onekwénhtara. Colour words in Kanien'kéha function as nouns rather than adjectives in the English sense. You say 'it is red' rather than 'a red thing'.",
   cite:{text:"Kontinónhstats Lesson 21 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-21/"},
   accepts:['Onekwénhtara','onekwénhtara','onekwenhtara'],forms:null},

  {id:'c02',target:'Oròn:ia',english:'Blue',pos:'Colour noun',unit:2,lesson:1,
   notes:"Blue — Oròn:ia. The grave accent (ò) marks a low or falling tone on that syllable.",
   cite:{text:"Kontinónhstats Lesson 21 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-21/"},
   accepts:['Oròn:ia','oron:ia','oronia'],forms:null},

  {id:'c03',target:'Otiarèn:ta',english:'Orange',pos:'Colour noun',unit:2,lesson:1,
   notes:"Orange — Otiarèn:ta.",
   cite:{text:"Kontinónhstats Lesson 21 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-21/"},
   accepts:['Otiarèn:ta','otiaren:ta','otiarenta'],forms:null},

  {id:'c04',target:"Ariwa'konhné:ha",english:'Purple',pos:'Colour noun',unit:2,lesson:1,
   notes:"Purple — Ariwa'konhné:ha.",
   cite:{text:"Kontinónhstats Lesson 21 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-21/"},
   accepts:["Ariwa'konhné:ha","ariwa'konhne:ha","ariwakonnha"],forms:null},

  {id:'c05',target:"Óhonte'",english:'Green',pos:'Colour noun',unit:2,lesson:1,
   notes:"Green — Óhonte'. This word is also used for 'plant/vegetation' — green as the colour of living plants.",
   cite:{text:"Kontinónhstats Lesson 21 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-21/"},
   accepts:["Óhonte'","ohonte'","ohonte"],forms:null},

  {id:'c06',target:'Washén:ra',english:'Pink',pos:'Colour noun',unit:2,lesson:1,
   notes:"Pink — Washén:ra.",
   cite:{text:"Kontinónhstats Lesson 21 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-21/"},
   accepts:['Washén:ra','washen:ra','washenra'],forms:null},

  {id:'c07',target:'Athéhsa',english:'Brown',pos:'Colour noun',unit:2,lesson:1,
   notes:"Brown — Athéhsa.",
   cite:{text:"Kontinónhstats Lesson 21 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-21/"},
   accepts:['Athéhsa','athehsa'],forms:null},

  {id:'c08',target:'Otsì:nekwahr',english:'Yellow',pos:'Colour noun',unit:2,lesson:1,
   notes:"Yellow — Otsì:nekwahr. The grave accent (ì) marks low tone.",
   cite:{text:"Kontinónhstats Lesson 21 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-21/"},
   accepts:['Otsì:nekwahr','otsi:nekwahr','otsinekwahr'],forms:null},

  {id:'c09',target:'Kahòn:tsi',english:'Black',pos:'Colour noun',unit:2,lesson:1,
   notes:"Black — Kahòn:tsi.",
   cite:{text:"Kontinónhstats Lesson 21 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-21/"},
   accepts:['Kahòn:tsi','kahon:tsi','kahontsi'],forms:null},

  // ─────────────────────────────────────────────
  // UNIT 3: SHAPES (Lesson 20)
  // ─────────────────────────────────────────────
  {id:'sh01',target:'Otsísto',english:'Star',pos:'Shape / Nature noun',unit:2,lesson:2,
   notes:"Star — Otsísto. Shapes in Kanien'kéha include both geometric and natural forms, demonstrating the language's descriptive flexibility.",
   cite:{text:"Kontinónhstats Lesson 20 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-20/"},
   accepts:['Otsísto','otsisto'],forms:null},

  {id:'sh02',target:"Teiotokerón:te'",english:'Square',pos:'Shape noun',unit:2,lesson:2,
   notes:"Square — Teiotokerón:te'. An example of how Kanien'kéha creates new words for new concepts through existing roots.",
   cite:{text:"Kontinónhstats Lesson 20 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-20/"},
   accepts:["Teiotokerón:te'","teiotokerón:te'","teiotokeronte"],forms:null},

  {id:'sh03',target:"Ka'neróhkwes",english:'Rectangle',pos:'Shape noun',unit:2,lesson:2,
   notes:"Rectangle — Ka'neróhkwes. Ka- class noun.",
   cite:{text:"Kontinónhstats Lesson 20 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-20/"},
   accepts:["Ka'neróhkwes","ka'nerohkwes"],forms:null},

  {id:'sh04',target:'Karáhkwa',english:'Sun / wheel / clock',pos:'Noun',unit:2,lesson:2,
   notes:"Sun — Karáhkwa. This word also serves as the base for 'clock' and 'wheel', demonstrating how the language extends ancient roots to cover new realities.",
   cite:{text:"Kontinónhstats Lesson 20 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-20/"},
   accepts:['Karáhkwa','karahkwa'],forms:null},

  {id:'sh05',target:'Ohtsí:kera',english:'Cloud',pos:'Nature noun',unit:2,lesson:2,
   notes:"Cloud — Ohtsí:kera. Weather vocabulary is deeply embedded in Kanien'kéha as a language of people who live close to the land.",
   cite:{text:"Kontinónhstats Lesson 20 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-20/"},
   accepts:['Ohtsí:kera','ohtsi:kera','ohtsikera'],forms:null},

  {id:'sh06',target:'Áhsen nikahióhsake',english:'Triangle',pos:'Shape noun',unit:2,lesson:2,
   notes:"Triangle — literally 'three sides/angles'. Áhsen = three, nikahióhsake = of the sides. Number words combine with other elements to describe shapes.",
   cite:{text:"Kontinónhstats Lesson 20 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-20/"},
   accepts:['Áhsen nikahióhsake','ahsen nikahiohsake'],forms:null},

  // ─────────────────────────────────────────────
  // UNIT 4: NUMBERS (Lesson 27)
  // ─────────────────────────────────────────────
  {id:'num01',target:'Énska',english:'One',pos:'Number',unit:3,lesson:0,
   notes:"One — Énska. Numbers in Kanien'kéha change form when they count people versus objects.",
   cite:{text:"Kontinónhstats Lesson 27 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-27/"},
   accepts:['Énska','énska','enska'],forms:null},

  {id:'num02',target:'Tékeni',english:'Two',pos:'Number',unit:3,lesson:0,
   notes:"Two — Tékeni. The dual pronoun prefix 'tei-' is related to this root.",
   cite:{text:"Kontinónhstats Lesson 27 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-27/"},
   accepts:['Tékeni','tékeni','tekeni'],forms:null},

  {id:'num03',target:'Áhsen',english:'Three',pos:'Number',unit:3,lesson:0,
   notes:"Three — Áhsen. This number appears in the shape word for triangle (Áhsen nikahióhsake).",
   cite:{text:"Kontinónhstats Lesson 27 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-27/"},
   accepts:['Áhsen','áhsen','ahsen'],forms:null},

  {id:'num04',target:'Kaié:ri',english:'Four',pos:'Number',unit:3,lesson:0,
   notes:"Four — Kaié:ri. Also appears in the shape word for diamond (Kaié:ri nikahióhsake — four-sided).",
   cite:{text:"Kontinónhstats Lesson 27 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-27/"},
   accepts:['Kaié:ri','kaié:ri','kaieri'],forms:null},

  {id:'num05',target:'Wísk',english:'Five',pos:'Number',unit:3,lesson:0,
   notes:"Five — Wísk.",
   cite:{text:"Kontinónhstats Lesson 27 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-27/"},
   accepts:['Wísk','wísk','wisk'],forms:null},

  {id:'num06',target:'Ià:iak',english:'Six',pos:'Number',unit:3,lesson:0,
   notes:"Six — Ià:iak.",
   cite:{text:"Kontinónhstats Lesson 27 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-27/"},
   accepts:['Ià:iak','ia:iak','iaiak'],forms:null},

  {id:'num07',target:'Tsá:ta',english:'Seven',pos:'Number',unit:3,lesson:0,
   notes:"Seven — Tsá:ta.",
   cite:{text:"Kontinónhstats Lesson 27 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-27/"},
   accepts:['Tsá:ta','tsa:ta','tsata'],forms:null},

  {id:'num08',target:'Shaté:kon',english:'Eight',pos:'Number',unit:3,lesson:0,
   notes:"Eight — Shaté:kon.",
   cite:{text:"Kontinónhstats Lesson 27 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-27/"},
   accepts:['Shaté:kon','shaté:kon','shatekon'],forms:null},

  {id:'num09',target:"Wá:hre'",english:'Nine',pos:'Number',unit:3,lesson:0,
   notes:"Nine — Wá:hre'. Note the glottal stop at the end.",
   cite:{text:"Kontinónhstats Lesson 27 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-27/"},
   accepts:["Wá:hre'","wa:hre'","wahre"],forms:null},

  {id:'num10',target:'Ohiá:ri',english:'Ten',pos:'Number',unit:3,lesson:0,
   notes:"Ten — Ohiá:ri.",
   cite:{text:"Kontinónhstats Lesson 27 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-27/"},
   accepts:['Ohiá:ri','ohia:ri','ohiari'],forms:null},

  // ─────────────────────────────────────────────
  // UNIT 4: NATURE WORDS (Lessons 19, 33)
  // ─────────────────────────────────────────────
  {id:'nat01',target:'Kaniatarowanénhne',english:'St. Lawrence River / Great River',pos:'Proper Noun — Place',unit:3,lesson:1,
   notes:"The Kanien'kéha name for the St. Lawrence River — literally 'great waterway'. Kanehsatà:ke sits on its shores. Place names encode relationship to the land.",
   cite:{text:"Kontinónhstats Lesson 19 / place name tradition · Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-19/"},
   accepts:['Kaniatarowanénhne','kaniatarowanénhne','kaniatarowanenhne'],forms:null},

  {id:'nat02',target:"Onhwén:tsia",english:'Earth / Land / Ground',pos:'Noun — Nature',unit:3,lesson:1,
   notes:"Earth / the land — Onhwén:tsia. This word is at the heart of Haudenosaunee identity — the Thanksgiving Address gives thanks to the earth before all else. Land is not property in this worldview; it is a relative.",
   cite:{text:"Thanksgiving Address tradition / Kontinónhstats · Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/"},
   accepts:["Onhwén:tsia","onhwen:tsia","onhwentsia"],forms:null},

  {id:'nat03',target:"Ohnehká:'a",english:'Water',pos:'Noun — Nature',unit:3,lesson:1,
   notes:"Water — Ohnehká:'a. Among the first beings acknowledged in the Thanksgiving Address. Water is a relative, not a resource.",
   cite:{text:"Thanksgiving Address tradition · Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/"},
   accepts:["Ohnehká:'a","ohnehka'a","ohnehkaa"],forms:null},

  {id:'nat04',target:"Otsirá:'a",english:'Fire',pos:'Noun — Nature',unit:3,lesson:1,
   notes:"Fire — Otsirá:'a. Fire is central to ceremony, warmth, and community life in Kanien'kehá:ka culture.",
   cite:{text:"Academic sources / Mithun (1984) · Kanehsatà:ke dialect",url:"https://www.kanehsatakevoices.com/"},
   accepts:["Otsirá:'a","otsira'a","otsiraa"],forms:null},

  {id:'nat05',target:'Karáhkwa',english:'Sun',pos:'Noun — Nature',unit:3,lesson:1,
   notes:"Sun — Karáhkwa. Also means clock and wheel — the same root expands to cover new realities through Kanien'kéha's productive morphology. The sun is acknowledged in the Thanksgiving Address.",
   cite:{text:"Kontinónhstats Lesson 20 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-20/"},
   accepts:['Karáhkwa','karahkwa'],forms:null},

  {id:'nat06',target:'Sonkwiatíson',english:'Our Creator / God (Christian loanword context)',pos:'Proper Noun',unit:3,lesson:1,
   notes:"Our Creator — Sonkwiatíson. In the Thanksgiving Address this refers to the original Creator. In Christian contexts it is also used for God. This is an example of how Kanien'kéha adapts: the language uses its own word rather than a loanword, grounding the concept in Haudenosaunee cosmology.",
   cite:{text:"Thanksgiving Address tradition; Kontinónhstats · Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/"},
   accepts:['Sonkwiatíson','sonkwiatison'],forms:null},

  // ─────────────────────────────────────────────
  // UNIT 4: ANIMALS (Lesson 22)
  // ─────────────────────────────────────────────
  {id:'an01',target:"Ohkwá:ri",english:'Bear',pos:'Noun — Animal',unit:3,lesson:2,
   notes:"Bear — Ohkwá:ri. Bears are central to Haudenosaunee story traditions. The word appears in the title of the Kontinónhstats puppet series 'Tóta tánon Ohkwá:ri' (Grandmother and Bear).",
   cite:{text:"Kontinónhstats Lesson 22 / story tradition · Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-22/"},
   accepts:["Ohkwá:ri","ohkwa:ri","ohkwari"],forms:null},

  {id:'an02',target:"Tsi'tsiá:'a",english:'Bird (generic)',pos:'Noun — Animal',unit:3,lesson:2,
   notes:"Bird — Tsi'tsiá:'a. A general term for birds.",
   cite:{text:"Kontinónhstats Lesson 25 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-25/"},
   accepts:["Tsi'tsiá:'a","tsi'tsia'a","tsitsiaa"],forms:null},

  {id:'an03',target:"Atsi'tentshera",english:'Dog',pos:'Noun — Animal',unit:3,lesson:2,
   notes:"Dog — Atsi'tentshera. Dogs appear in the Two Dog Wampum Belt, a significant Kanehsatà:ke ancestral artifact currently being repatriated.",
   cite:{text:"Kontinónhstats / wampum belt tradition · Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/"},
   accepts:["Atsi'tentshera","atsi'tentshera","atsitentshera"],forms:null},

  // ─────────────────────────────────────────────
  // UNIT 5: BASIC VERBS & EXPRESSIONS
  // ─────────────────────────────────────────────
  {id:'v01',target:'Niawenhkó:wa',english:'Thank you very much',pos:'Expression',unit:4,lesson:0,
   notes:"Thank you very much — Niawenhkó:wa. The '-kó:wa' suffix means 'great/big', so this is 'great thanks'. The base 'niawén:kwe' is a shorter form meaning simply 'thank you'.",
   cite:{text:"Thanksgiving Address tradition; Kontinónhstats · Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/"},
   accepts:['Niawenhkó:wa','niawenhkó:wa','niawenhkowa','niawenkowa'],forms:null},

  {id:'v02',target:"Niawén:kwe",english:'Thank you',pos:'Expression',unit:4,lesson:0,
   notes:"Thank you — Niawén:kwe. Simpler form of Niawenhkó:wa.",
   cite:{text:"Kontinónhstats / Thanksgiving Address tradition · Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/"},
   accepts:["Niawén:kwe","niawen:kwe","niawenkwe"],forms:null},

  {id:'v03',target:"Tho niioht",english:'That is all / It is so',pos:'Expression',unit:4,lesson:0,
   notes:"'Tho niioht' — 'that is all' or 'it is so'. Used to close a speech or lesson, as in the Kontinónhstats materials.",
   cite:{text:"Kontinónhstats · Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/"},
   accepts:['Tho niioht','tho niioht','tho nioht'],forms:null},

  {id:'v04',target:'Shé:kon',english:'Hello / Still / Yet',pos:'Expression / Particle',unit:4,lesson:0,
   notes:"Shé:kon is used as a greeting meaning 'hello', but also means 'still' or 'yet' in other contexts. It is the most common everyday greeting.",
   cite:{text:"Kontinónhstats / common usage · Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/"},
   accepts:['Shé:kon','she:kon','shekon'],forms:null},

  {id:'v05',target:"Skén:nen",english:'Peace / Calm / Are you well?',pos:'Expression',unit:4,lesson:0,
   notes:"Peace, calm — Skén:nen. Also used as a greeting 'are you in peace/health?' Deeply connected to the Haudenosaunee concept of peace at the heart of the Great Law.",
   cite:{text:"Great Law of Peace tradition / Kontinónhstats · Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/"},
   accepts:["Skén:nen","sken:nen","skennen"],forms:null},

  {id:'v06',target:'Wá:s',english:'Go (command, singular)',pos:'Verb — A-stem command',unit:4,lesson:1,
   notes:"'Go!' — Wá:s. Command form for one person. Kanien'kéha verbs encode person, number, gender, and aspect. The verb structure: pronominal prefix + verb root + aspect suffix.",
   cite:{text:"Kontinónhstats Lesson 12; Deering & Harries-Delisle teaching grammar",url:"https://www.kanehsatakevoices.com/lessons/lesson-12/"},
   accepts:['Wá:s','wa:s','was'],forms:[{label:'Go! (1 person)',form:'Wá:s'},{label:'You two go!',form:'Tewá:s'},{label:'Go! (you all)',form:'Sewá:s'}]},

  {id:'v07',target:'Kontá:ti',english:'I live / I am from here',pos:'Verb — Stative',unit:4,lesson:1,
   notes:"'I live (here)' — Kontá:ti. Stative verbs describe ongoing states. The kon- prefix marks first person singular female/indefinite.",
   cite:{text:"Kontinónhstats Lesson 18 / grammar sources · Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-18/"},
   accepts:['Kontá:ti','konta:ti','kontati'],forms:null},

  {id:'v08',target:"Tóka'",english:'Maybe / Perhaps',pos:'Particle',unit:4,lesson:0,
   notes:"Maybe, perhaps — Tóka'. An important particle for expressing uncertainty or conditionality.",
   cite:{text:"Kontinónhstats / Deering & Harries-Delisle · Kanehsatà:ke dialect",url:"https://www.kanehsatakevoices.com/"},
   accepts:["Tóka'","toka'","toka"],forms:null},

  {id:'v09',target:'Tánon',english:'And / Also',pos:'Conjunction',unit:4,lesson:0,
   notes:"And, also — Tánon. A very common conjunction that appears in many Kontinónhstats lesson titles (e.g., 'Tóta tánon Ohkwá:ri').",
   cite:{text:"Kontinónhstats · Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/"},
   accepts:['Tánon','tanon'],forms:null},

  {id:'v10',target:'Iáh',english:'No / Not (negator)',pos:'Negative particle',unit:4,lesson:1,
   notes:"No / not — Iáh. The primary negator in Kanien'kéha. Used before the verb to negate it: Iáh + verb = 'not + verb'. Does not stand alone as simply 'no' — see also 'Iah tewá:ien' (it is not so).",
   cite:{text:"Deering & Harries-Delisle teaching grammar; Kontinónhstats",url:"https://www.kanehsatakevoices.com/"},
   accepts:['Iáh','iah'],forms:null},

  {id:'v11',target:"Iáh tewá:ien",english:"It is not so / That's not right",pos:'Negative expression',unit:4,lesson:1,
   notes:"'It is not so' — Iáh tewá:ien. Iáh (not) + tewá:ien (it is so/right). A useful everyday negation.",
   cite:{text:"Deering & Harries-Delisle; Kontinónhstats · Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/"},
   accepts:["Iáh tewá:ien","iah tewa:ien","iah tewaien"],forms:null},

  // ─────────────────────────────────────────────
  // UNIT 5: TIME WORDS (Lesson 3 / everyday language)
  // ─────────────────────────────────────────────
  {id:'t01',target:"Ón:wa",english:'Now / Today',pos:'Time adverb',unit:4,lesson:2,
   notes:"Now / today — Ón:wa. One of the most basic time expressions.",
   cite:{text:"Kontinónhstats Lesson 3 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-3/"},
   accepts:["Ón:wa","on:wa","onwa"],forms:null},

  {id:'t02',target:'Oká:ra',english:'Yesterday',pos:'Time adverb',unit:4,lesson:2,
   notes:"Yesterday — Oká:ra.",
   cite:{text:"Kontinónhstats Lesson 3 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-3/"},
   accepts:['Oká:ra','oka:ra','okara'],forms:null},

  {id:'t03',target:'Ó:nenhste',english:'Tomorrow',pos:'Time adverb',unit:4,lesson:2,
   notes:"Tomorrow — Ó:nenhste.",
   cite:{text:"Kontinónhstats Lesson 3 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-3/"},
   accepts:['Ó:nenhste','o:nenhste','onenhste'],forms:null},

  {id:'t04',target:'Ohrhòn:ke',english:'In the morning',pos:'Time adverb',unit:4,lesson:2,
   notes:"In the morning — Ohrhòn:ke. Time-of-day vocabulary is important for everyday conversation.",
   cite:{text:"Kontinónhstats Lesson 3 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-3/"},
   accepts:['Ohrhòn:ke','ohrhon:ke','ohrhonke'],forms:null},

  {id:'t05',target:"Iotohétston'",english:'In the afternoon',pos:'Time adverb',unit:4,lesson:2,
   notes:"In the afternoon — Iotohétston'.",
   cite:{text:"Kontinónhstats Lesson 3 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-3/"},
   accepts:["Iotohétston'","iotohetston'","iotohetstion"],forms:null},

  {id:'t06',target:'Teiotohrhéton',english:'In the evening',pos:'Time adverb',unit:4,lesson:2,
   notes:"In the evening — Teiotohrhéton.",
   cite:{text:"Kontinónhstats Lesson 3 · Mary McDonald, Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-3/"},
   accepts:['Teiotohrhéton','teiotohrheton'],forms:null},

  // ─────────────────────────────────────────────
  // UNIT 5: CLANS (Lesson 28)
  // ─────────────────────────────────────────────
  {id:'cl01',target:'Ohkwarí:yo',english:'Bear Clan',pos:'Clan name',unit:4,lesson:3,
   notes:"Bear Clan — Ohkwarí:yo. Kanien'kehá:ka society is organized into three clans (in some communities): Bear, Wolf, and Turtle. Clan membership is matrilineal — passed through the mother.",
   cite:{text:"Kontinónhstats Lesson 28 / clan tradition · Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-28/"},
   accepts:['Ohkwarí:yo','ohkwari:yo','ohkwariyo'],forms:null},

  {id:'cl02',target:'Okwaho',english:'Wolf Clan',pos:'Clan name',unit:4,lesson:3,
   notes:"Wolf Clan — Okwaho. Wolf represents the teachers and pathfinders.",
   cite:{text:"Kontinónhstats Lesson 28 / clan tradition · Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-28/"},
   accepts:['Okwaho','okwaho'],forms:null},

  {id:'cl03',target:'Ahné:warak',english:'Turtle Clan',pos:'Clan name',unit:4,lesson:3,
   notes:"Turtle Clan — Ahné:warak. The turtle is at the heart of Haudenosaunee creation — Turtle Island.",
   cite:{text:"Kontinónhstats Lesson 28 / clan tradition · Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/lessons/lesson-28/"},
   accepts:['Ahné:warak','ahne:warak','ahnewarak'],forms:null},

  // ─────────────────────────────────────────────
  // UNIT 5: THANKSGIVING ADDRESS vocabulary
  // Source: Ohén:ton Karihwatéhkwen (Haudenosaunee tradition)
  // ─────────────────────────────────────────────
  {id:'ta01',target:'Ohén:ton Karihwatéhkwen',english:'The Thanksgiving Address (Words Before All Else)',pos:'Ceremonial expression',unit:4,lesson:4,
   notes:"The Thanksgiving Address — Ohén:ton Karihwatéhkwen. Literally 'the words that come before all else'. This is the most important oral text in Kanien'kéha — spoken before any gathering to acknowledge and give thanks to each part of the natural world in proper order.",
   cite:{text:"Haudenosaunee oral tradition; Kontinónhstats animated version",url:"https://www.youtube.com/watch?v=pqMomjdi-GQ"},
   accepts:['Ohén:ton Karihwatéhkwen','ohen:ton karihwatehkwen'],forms:null},

  {id:'ta02',target:'Onkwehón:we',english:'Original people / Indigenous people',pos:'Noun',unit:4,lesson:4,
   notes:"Onkwehón:we — the original people, or Indigenous people broadly. Also used to refer specifically to Kanien'kehá:ka and Haudenosaunee peoples.",
   cite:{text:"Common usage; Kontinónhstats · Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/"},
   accepts:['Onkwehón:we','onkwehon:we','onkwehonwe'],forms:null},

  {id:'ta03',target:"Kanien'kehá:ka",english:'People of the Flint / Mohawk people',pos:'Proper Noun — Ethnonym',unit:4,lesson:4,
   notes:"Kanien'kehá:ka — the people's own name for themselves: 'People of the Flint'. 'Mohawk' is an Anglicization of an Algonquin term. The self-name grounds identity in relationship to the land.",
   cite:{text:"Cultural tradition / Kontinónhstats · Kanehsatà:ke",url:"https://www.kanehsatakevoices.com/"},
   accepts:["Kanien'kehá:ka","kanien'keha:ka","kanienkehaaka"],forms:null},

];

// ══════════════════════════════════════════════════════════════════
// UNIT STRUCTURE
// Maps units to lessons; lessons reference vocabulary IDs.
// ══════════════════════════════════════════════════════════════════
const UNITS = [

  // ─────────────────────────────────────────────
  // UNIT 1: WHO WE ARE
  // ─────────────────────────────────────────────
  {
    id:0, title:"Unit 1 — Who We Are: Pronouns & People",
    desc:"Free pronouns, singular people nouns — the foundation of every sentence",
    lessons:[
      {
        id:'u0l0', title:'Lesson 1 — Free Pronouns', icon:'👤', sub:'Seeing the world in threes',
        intro:[
          "Kanien'kéha sees the world in <strong>three sets of five pronouns</strong> — singular (one), dual (two), and plural (many). This is not grammatical complexity; it is precision. English's single 'you' is the imprecise one.",
          "A key pattern: <strong>Ra-/Ro- marks male, I-/Iak-/A- marks female</strong>. This prefix logic runs through the entire language.",
          "Dialect note: In Six Nations/Tyendinaga, you will see <strong>y</strong> where this dialect uses <strong>i</strong> (ý:se' vs í:se'). In Akwesasne, <strong>r becomes l</strong>. All variants are correct and accepted here.",
          "Source: <strong>Lesson 1</strong> of the Kontinónhstats curriculum by Onwá:ri Tekahawáhkwen Mary McDonald, Kanehsatà:ke."
        ],
        ped:"<strong>Freirean grounding:</strong> We begin with pronouns because language starts with the self in relation to others. García & Li Wei (2014) remind us that learners bring their full linguistic repertoire — your English understanding of 'I' and 'you' is a bridge, not a barrier.",
        vocabIds:['p01','p02','p03','p04','p05','p06','p07','p08','p09','p10'],
        exercises:[
          {type:'mc',wid:'p01',prompt:"What does í:se' mean?",sub:'',correct:'You (singular)',options:["You (singular)","I / Me","He","She (respectful)"],cm:"Io'nikonhraién:ta'ne! í:se' — 'you' (one person). In Six Nations/Tyendinaga: ý:se'.",wm:"That answer is incorrect — please try again."},
          {type:'mc',wid:'p02',prompt:"What does í:'i mean?",sub:'',correct:'I (singular)',options:["I (singular)","You (singular)","We two","She"],cm:"Tho niioht! í:'i — 'I'. The glottal stop (') between the vowels is a full consonant.",wm:"That answer is incorrect — please try again."},
          {type:'mc',wid:'p03',prompt:'Which pronoun is used for a respected woman — a mother or elder?',sub:'Consider the formal vs. informal distinction',correct:'akaónha',options:['aónha','akaónha','raónha',"í:se'"],cm:"Niawenhkó:wa! akaónha — respect encoded directly in grammar.",wm:"That answer is incorrect — please try again."},
          {type:'mc',wid:'p04',prompt:'Which pronoun means "He"?',sub:'',correct:'raónha',options:['aónha','akaónha','raónha','teseniiáhshe'],cm:"Shé:kon! raónha. In Akwesasne: laónha. Both are correct.",wm:"That answer is incorrect — please try again."},
          {type:'match',wid:null,prompt:'Match each pronoun to its meaning',sub:'Tap a word on the left, then its match on the right',pairs:[{target:"í:se'",english:'You (singular)',wids:['p01']},{target:"í:'i",english:'I / Me',wids:['p02']},{target:'raónha',english:'He',wids:['p04']},{target:'akaónha',english:'She (respectful)',wids:['p03']}],cm:"Shé:kon! The Ra-/A-/Iak- prefix pattern is the key to the whole system.",wm:"That answer is incorrect — please try again."},
          {type:'mc',wid:'p05',prompt:'aónha has three uses. Which is NOT one of them?',sub:'',correct:'A respected elder woman',options:['A female animal','A familiar female (sister, friend)','An inanimate object','A respected elder woman'],cm:"Tho niioht! akaónha is for respected women. aónha is familiar/informal.",wm:"That answer is incorrect — please try again."},
          {type:'fill',wid:'p06',prompt:'Complete the sentence',sentence:'To address two people, use ___',correct:'teseniiáhshe',hint:'tes',alts:['teseniiahshe'],cm:"Io'nikonhraién:ta'ne! teseniiáhshe — you two. Kanien'kéha's dual is a full grammatical category.",wm:"That answer is incorrect — please try again. Starts with 'tes'."},
          {type:'type',wid:'p01',prompt:"How do you say 'You (singular)'?",sub:'Dialect variants accepted',correct:"í:se'",alts:["i:se'","ise'","ý:se'","yse'"],cm:"Niawenhkó:wa! í:se' or ý:se' in Ontario dialects.",wm:"That answer is incorrect — please try again. Try: í:se'"},
          {type:'mc',wid:'p10',prompt:"'You all (plural)' is sewakwé:kon. What does this tell you about Kanien'kéha grammar?",sub:'A grammar-reflection question',correct:"It distinguishes singular / dual / plural as three separate categories",options:["It distinguishes singular / dual / plural as three separate categories","It only has singular and plural","It uses the same word for you (one) and you (many)","The plural always ends in -kon"],cm:"Io'nikonhraién:ta'ne! Three-way number distinction: singular, dual, plural. English has collapsed this precision.",wm:"That answer is incorrect — please try again."},
          {type:'story',wid:'p03',prompt:'Connect to your life',sub:'A moment of reflection',word:'akaónha',meaning:'She (respectful)',storyPrompt:"In Kanien'kéha, respect is built into grammar — you choose a different pronoun based on your relationship to the person. Who in your life would you address with this respectful form? Take a moment to bring that person to mind."},
        ]
      },
      {
        id:'u0l1', title:'Lesson 2 — People Nouns', icon:'👥', sub:'Naming the people in our world',
        intro:[
          "Eight core singular people nouns: four female, four male. Each covers a life stage — child, teenager, adult, elder.",
          "<strong>I-/Iak- marks female; R- marks male.</strong> Once you see this pattern, it unlocks dozens of vocabulary items. In Akwesasne, R- becomes L- (Lón:kwe, not Rón:kwe).",
          "Notice that 'elder man' and 'elder woman' are not simply 'old person'. The language encodes authority and respect — elders in Kanien'kehá:ka society are leaders.",
          "Source: <strong>Lesson 2</strong>, Kontinónhstats curriculum, Mary McDonald."
        ],
        ped:"<strong>Nation (2001) / McCarty & Lee (2014):</strong> Semantic set learning (age-graded people nouns) supports chunked acquisition. The R/I prefix is a generative rule — learning it once unlocks the whole pattern.",
        vocabIds:['n01','n02','n03','n04','n05','n06','n07','n08'],
        exercises:[
          {type:'mc',wid:'n01',prompt:"What does Ieksá:'a mean?",sub:'',correct:'Girl',options:['Girl','Woman','Teenage girl','Elder woman'],cm:"Tho niioht! Ieksá:'a — girl. I- prefix marks female.",wm:"That answer is incorrect — please try again."},
          {type:'mc',wid:'n07',prompt:'What does Rón:kwe mean?',sub:'',correct:'Man',options:['Boy','Teenage boy','Man','Elder man'],cm:"Shé:kon! Rón:kwe — man. In Akwesasne: Lón:kwe.",wm:"That answer is incorrect — please try again."},
          {type:'match',wid:null,prompt:'Match the female person nouns',sub:'',pairs:[{target:'Iakón:kwe',english:'Woman',wids:['n03']},{target:"Ieksá:'a",english:'Girl',wids:['n01']},{target:'Akokstén:ha',english:'Elder woman',wids:['n04']},{target:"Ieià:tase'",english:'Teenage girl',wids:['n02']}],cm:"Io'nikonhraién:ta'ne! The four female life stages — a complete picture.",wm:"That answer is incorrect — please try again."},
          {type:'match',wid:null,prompt:'Match the male person nouns',sub:'',pairs:[{target:'Rón:kwe',english:'Man',wids:['n07']},{target:"Raksá:'a",english:'Boy',wids:['n05']},{target:'Rokstén:ha',english:'Elder man',wids:['n08']},{target:'Ranekénhteron',english:'Teenage boy',wids:['n06']}],cm:"Niawenhkó:wa! Male and female sets mirror each other — same age stages, different prefix.",wm:"That answer is incorrect — please try again."},
          {type:'type',wid:'n03',prompt:"How do you say 'Woman'?",sub:'Dialect variants accepted',correct:'Iakón:kwe',alts:['iakón:kwe','iakon:kwe','iakónkwe'],cm:"Tho niioht! Iakón:kwe. Iak- = adult female.",wm:"That answer is incorrect — please try again. Try: Iakón:kwe"},
          {type:'type',wid:'n07',prompt:"How do you say 'Man'? (Kanehsatà:ke or Akwesasne form)",sub:'',correct:'Rón:kwe',alts:['rón:kwe','ron:kwe','ronkwe','Lón:kwe','lon:kwe'],cm:"Shé:kon! Rón:kwe or Lón:kwe (Akwesasne) — both accepted.",wm:"That answer is incorrect — please try again. Try: Rón:kwe"},
          {type:'fill',wid:'n04',prompt:'Complete the word',sentence:'The elder woman is Akokstén:___',correct:'ha',hint:'h',alts:['ha'],cm:"Io'nikonhraién:ta'ne! Akokstén:ha. The -stén:ha suffix also appears in Rokstén:ha (elder man).",wm:"That answer is incorrect — the suffix starts with 'h'."},
          {type:'mc',wid:'n04',prompt:"What social role do elder women (Akokstén:ha) hold in Kanien'kehá:ka society?",sub:'',correct:"Central authority — clan and ceremonial leadership through the matrilineal line",options:["Central authority — clan and ceremonial leadership through the matrilineal line","Primarily domestic roles","No formal social role","The same roles as elder men but with less authority"],cm:"Io'nikonhraién:ta'ne! Kanien'kehá:ka society is matrilineal. Elder women hold clan authority, select chiefs, and are keepers of cultural knowledge.",wm:"That answer is incorrect — please try again."},
          {type:'audio',wid:'n07',prompt:'Say this word aloud',sub:'Record, listen back, self-assess',word:'Rón:kwe',meaning:'Man',hint:"Two syllables: RÓN - kwe. The : means the n-vowel is held longer. 'kwe' sounds like 'kway'. In Akwesasne: Lón:kwe."},
          {type:'story',wid:'n04',prompt:'Connect to your life',sub:'',word:'Akokstén:ha',meaning:'Elder woman',storyPrompt:"In Kanien'kéha, the word for elder woman carries authority, not just age. Think of an elder woman in your life, your family's history, or your community. What did she carry? What has she passed forward?"},
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // UNIT 2: FAMILY & KINSHIP
  // ─────────────────────────────────────────────
  {
    id:1, title:"Unit 2 — Family & Kinship",
    desc:"Kinship nouns with all possessive forms — relationship as grammar",
    lessons:[
      {
        id:'u1l0', title:'Lesson 3 — Core Kinship Nouns', icon:'🌿', sub:'Relationship encoded in structure',
        intro:[
          "In Kanien'kéha, kinship words <strong>change their form depending on who is speaking</strong>. 'Your mother' and 'my mother' are different words — relationship is built into structure.",
          "Kanien'kehá:ka society is <strong>matrilineal</strong>. Clan membership, land rights, and social identity pass through the mother's line. Tuck & Yang (2012): decolonization means restoring what was disrupted — learning these terms is itself reconnection.",
          "This lesson covers the first ten kinship nouns from <strong>Lesson 5</strong> of the Kontinónhstats curriculum by Mary McDonald."
        ],
        ped:"<strong>McCarty & Lee (2014) / Freire (1970):</strong> Kinship vocabulary is presented within its social and matrilineal context — language as a map of social reality, not just vocabulary items.",
        vocabIds:['k01','k02','k03','k04','k05','k06','k07','k08','k09','k10'],
        exercises:[
          {type:'mc',wid:'k01',prompt:"How do you say 'Your mother'?",sub:'',correct:"Sa'nisténha",options:["Sa'nisténha","Ake'nisténha","Ro'nisténha","Ontate'nisténha"],cm:"Niawenhkó:wa! Sa'nisténha — your mother. Sa- marks 'your'.",wm:"That answer is incorrect — please try again."},
          {type:'mc',wid:'k03',prompt:"How do you say 'My grandmother'?",sub:'',correct:"Aksóhtha",options:["Sasóhtha","Aksóhtha","Rohsóhtha","Ontatsóhtha"],cm:"Tho niioht! Aksóhtha — my grandmother. Ak- marks 'my' here.",wm:"That answer is incorrect — please try again."},
          {type:'match',wid:null,prompt:'Match the kinship forms',sub:'',pairs:[{target:"Sa'nisténha",english:'Your mother',wids:['k01']},{target:"Ia'níha",english:'Your father',wids:['k02']},{target:'Sasóhtha',english:'Your grandmother',wids:['k03']},{target:'Iahsóhtha',english:'Your grandfather',wids:['k04']}],cm:"Shé:kon! Notice how different prefixes mark 'your' for maternal vs. paternal kin.",wm:"That answer is incorrect — please try again."},
          {type:'mc',wid:'k05',prompt:"Sahtsí:'a means 'your older sister'. What does Akhtsí:'a mean?",sub:'',correct:"My older sister",options:["My older sister","Her older sister","His older sister","Your younger sister"],cm:"Io'nikonhraién:ta'ne! Akh- marks 'my' in this sibling form.",wm:"That answer is incorrect — please try again."},
          {type:'fill',wid:'k09',prompt:'Complete the form',sentence:"'Her daughter' is Ontatién:'___",correct:'a',hint:'a',alts:['a'],cm:"Tho niioht! Ontatién:'a — her daughter.",wm:"That answer is incorrect — the final sound is 'a'."},
          {type:'type',wid:'k10',prompt:"How do you say 'My son'? (base: Shetiá:wen)",sub:'',correct:'Ketiá:wen',alts:['kétia:wen','ketiáwen','ketiawen'],cm:"Niawenhkó:wa! Ketiá:wen — my son. The Ke- prefix marks 'my' in this form.",wm:"That answer is incorrect — please try again. Try: Ketiá:wen"},
          {type:'mc',wid:'k01',prompt:"Why does Kanien'kéha use completely different word-forms for 'my mother' vs 'your mother' rather than adding a possessive word?",sub:'A grammar-reflection question',correct:"Because relationship is grammaticalized — the language encodes the speaker's social position directly in the word",options:["Because relationship is grammaticalized — the language encodes the speaker's social position directly in the word","To make the language harder to learn","For historical reasons unrelated to culture","Because Kanien'kéha has too few pronouns"],cm:"Io'nikonhraién:ta'ne! This is polysynthesis in action — Chew, Leonard & Rosenblum (2023) note that Indigenous language pedagogies must help learners see language as carrying a worldview.",wm:"That answer is incorrect — please try again."},
          {type:'audio',wid:'k03',prompt:'Say this word aloud',sub:'',word:'Aksóhtha',meaning:'My grandmother',hint:"Three syllables: AK - sóh - tha. The accent on 'soh' marks stress."},
          {type:'match',wid:null,prompt:'Match the sibling forms',sub:'',pairs:[{target:"Sahtsí:'a",english:'Your older sister',wids:['k05']},{target:"Iahtsí:'a",english:'Your older brother',wids:['k06']},{target:"She'kén:'a",english:'Your younger sister',wids:['k07']},{target:"Tshe'kén:'a",english:'Your younger brother',wids:['k08']}],cm:"Niawenhkó:wa! Sibling terms encode age order — older and younger are grammatically distinct.",wm:"That answer is incorrect — please try again."},
          {type:'story',wid:'k03',prompt:'Connect to your life',sub:'',word:'Aksóhtha',meaning:'My grandmother',storyPrompt:"A grandmother teaching beading. A grandmother holding ceremony. A grandmother who carries what cannot be written down. Think of the knowledge that passes through your grandmother — biological or chosen. How does holding it in this language feel?"},
        ]
      },
      {
        id:'u1l1', title:'Lesson 4 — Extended Kinship', icon:'👨‍👩‍👧‍👦', sub:'Grandchildren, in-laws, and friends',
        intro:[
          "Lesson 5 of the Kontinónhstats curriculum covers 22 kinship nouns total. This lesson completes the set: grandchildren, in-laws, and friends.",
          "Note that 'girlfriend', 'boyfriend', 'stepson', and 'stepdaughter' also have Kanien'kéha forms — the language has always been able to describe the full range of human relationships.",
          "The possessive system here (your/my/his/her) works the same way as the core kinship forms."
        ],
        ped:"<strong>García (2009) translanguaging principle:</strong> New vocabulary is best introduced in relation to what learners already know. These forms extend the possessive prefix patterns from Lesson 3.",
        vocabIds:['k11','k12'],
        exercises:[
          {type:'mc',wid:'k11',prompt:"'Sakhsotha' means your granddaughter. What does 'Akakhsotha' mean?",sub:'',correct:'My granddaughter',options:['My granddaughter','Her granddaughter','His granddaughter','Your granddaughter'],cm:"Tho niioht! Akakh- marks 'my' in this grandchild form.",wm:"That answer is incorrect — please try again."},
          {type:'mc',wid:'k12',prompt:"'Iakhsotha' means your grandson. What does 'Rakhsotha' mean?",sub:'',correct:'My grandson',options:['My grandson','Her grandson','His grandson','Your grandson'],cm:"Niawenhkó:wa! Rakh- marks 'my' for the grandson form.",wm:"That answer is incorrect — please try again."},
          {type:'match',wid:null,prompt:'Match the grandchild forms',sub:'',pairs:[{target:'Sakhsotha',english:'Your granddaughter',wids:['k11']},{target:'Akakhsotha',english:'My granddaughter',wids:['k11']},{target:'Iakhsotha',english:'Your grandson',wids:['k12']},{target:'Rakhsotha',english:'My grandson',wids:['k12']}],cm:"Shé:kon! The grandchild prefix patterns follow from the grandparent ones.",wm:"That answer is incorrect — please try again."},
          {type:'story',wid:null,prompt:'Reflect on kinship',sub:'',word:'',meaning:'',storyPrompt:"You have now learned more than 20 kinship words — each one a different form of connection. In Kanien'kéha, relationship is not added to language; it IS language. Which kinship word feels most significant to you right now? Write about why."},
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // UNIT 3: THE WORLD AROUND US
  // ─────────────────────────────────────────────
  {
    id:2, title:"Unit 3 — The World Around Us",
    desc:"A-class nouns, colours, shapes, and the natural world",
    lessons:[
      {
        id:'u2l0', title:'Lesson 5 — A-Class Nouns: Objects', icon:'👟', sub:'Things you can name and touch',
        intro:[
          "A-class nouns are nouns that begin with the letter <strong>A</strong>. Some are 'real' A-class nouns — the root meaning has been lost to time. Others are 'fake' A-class nouns — we can still see their verb root, describing what the object does.",
          "The most important concept here is <strong>noun incorporation</strong>: when a noun root combines with a verb suffix, it creates a single word. Example: áhta' (shoe) + owá:nen (big) = watahkowá:nen (big shoe).",
          "Source: <strong>Lesson 7</strong>, Kontinónhstats curriculum, Mary McDonald."
        ],
        ped:"<strong>Freirean generative theme:</strong> Objects in daily life (shoes, shirts, glasses) are among the first words any language learner needs. Introducing noun incorporation here plants the seed for understanding Kanien'kéha's polysynthetic structure.",
        vocabIds:['a01','a02','a03','a04','a05','a06','a07'],
        exercises:[
          {type:'mc',wid:'a01',prompt:"What does áhta' mean?",sub:'',correct:'Shoe / shoes',options:['Shoe / shoes','Pants','Ball','Chair'],cm:"Tho niioht! áhta' — shoe. This word demonstrates noun incorporation: add owá:nen and get 'big shoe'.",wm:"That answer is incorrect — please try again."},
          {type:'match',wid:null,prompt:'Match the A-class nouns',sub:'',pairs:[{target:"áhta'",english:'Shoe',wids:['a01']},{target:'atháhsteren',english:'Pants',wids:['a02']},{target:'ahthén:no',english:'Ball',wids:['a07']},{target:"ani'tskwá:ra",english:'Chair',wids:['a05']}],cm:"Niawenhkó:wa! All these nouns start with A — the defining feature of A-class nouns.",wm:"That answer is incorrect — please try again."},
          {type:'mc',wid:'a06',prompt:"atià:tawi means 'shirt / dress / coat'. Why is it called a 'fake' A-class noun?",sub:'',correct:"Because its root still means something — 'body cover' — making it a derived noun",options:["Because its root still means something — 'body cover' — making it a derived noun","Because it is borrowed from English","Because it is only used for modern clothing","Because A-class nouns can't refer to clothing"],cm:"Io'nikonhraién:ta'ne! 'Fake' A-class means we can still see the verb root — 'a body cover'. Real A-class nouns have roots so ancient their original meaning is lost.",wm:"That answer is incorrect — please try again."},
          {type:'type',wid:'a01',prompt:"How do you say 'Shoe'?",sub:'',correct:"áhta'",alts:["ahta'","ahta"],cm:"Tho niioht! áhta'. Note the glottal stop at the end.",wm:"That answer is incorrect — please try again. Try: áhta'"},
          {type:'mc',wid:'a01',prompt:"Noun incorporation means a noun root can combine with a verb suffix. áhta' = shoe. What would watahkowá:nen mean?",sub:'The suffix owá:nen = big',correct:'Big shoe',options:['Small shoe','Big shoe','My shoe','Two shoes'],cm:"Io'nikonhraién:ta'ne! This is polysynthesis — one word expressing what English needs two or three words for.",wm:"That answer is incorrect — please try again."},
          {type:'story',wid:null,prompt:'Connect to your world',sub:'',word:'',meaning:'',storyPrompt:"A-class nouns are the things you can touch and see around you right now. Look around the room. What do you see? Write down three objects in English — and try to find or imagine their Kanien'kéha names. What would it mean to have grown up naming everything around you in this language?"},
        ]
      },
      {
        id:'u2l1', title:'Lesson 6 — Colours', icon:'🌈', sub:'Describing the world by colour',
        intro:[
          "Colour words in Kanien'kéha function as <strong>nouns rather than adjectives</strong>. You don't say 'a red car' the way English does — you say the colour stands as a description of the object's state.",
          "Several colour words have roots connected to natural things: Óhonte' (green) shares its root with 'plant/vegetation'. The language describes colour in relation to the natural world.",
          "Source: <strong>Lesson 21</strong>, Kontinónhstats curriculum, Mary McDonald."
        ],
        ped:"<strong>Krashen (1982) comprehensible input:</strong> Colour vocabulary is immediately verifiable — learners can look around the room and practice. This makes it ideal for early acquisition.",
        vocabIds:['c01','c02','c03','c04','c05','c06','c07','c08','c09'],
        exercises:[
          {type:'mc',wid:'c01',prompt:'What does Onekwénhtara mean?',sub:'',correct:'Red',options:['Red','Blue','Green','Black'],cm:"Tho niioht! Onekwénhtara — red.",wm:"That answer is incorrect — please try again."},
          {type:'mc',wid:'c09',prompt:'What does Kahòn:tsi mean?',sub:'',correct:'Black',options:['White','Black','Grey','Brown'],cm:"Niawenhkó:wa! Kahòn:tsi — black.",wm:"That answer is incorrect — please try again."},
          {type:'match',wid:null,prompt:'Match the colours',sub:'',pairs:[{target:'Onekwénhtara',english:'Red',wids:['c01']},{target:'Oròn:ia',english:'Blue',wids:['c02']},{target:"Óhonte'",english:'Green',wids:['c05']},{target:'Otsì:nekwahr',english:'Yellow',wids:['c08']}],cm:"Shé:kon! Notice that Óhonte' (green) shares its root with the word for plant/vegetation.",wm:"That answer is incorrect — please try again."},
          {type:'type',wid:'c05',prompt:"How do you say 'Green'?",sub:'',correct:"Óhonte'",alts:["ohonte'","ohonte"],cm:"Io'nikonhraién:ta'ne! Óhonte' — also the root for 'plant/vegetation'.",wm:"That answer is incorrect — please try again. Try: Óhonte'"},
          {type:'mc',wid:'c05',prompt:"Óhonte' means green. This same root also relates to which other concept?",sub:'',correct:'Plants / vegetation',options:['Water','Sky','Fire','Plants / vegetation'],cm:"Tho niioht! The language describes colour through relationship to the natural world.",wm:"That answer is incorrect — please try again."},
          {type:'story',wid:null,prompt:'Colour in context',sub:'',word:'',meaning:'',storyPrompt:"Colour words in Kanien'kéha are nouns, not adjectives. The language doesn't describe things as 'red' — it gives them a colour-name that stands on its own. What does it feel like to think of red not as a property of things but as a thing in itself? Write a few thoughts."},
        ]
      },
      {
        id:'u2l2', title:'Lesson 7 — Shapes & Nature', icon:'🌞', sub:'Describing what we see',
        intro:[
          "Shapes in Kanien'kéha include both geometric forms and natural shapes like star, cloud, and sun.",
          "Notice that triangle = Áhsen nikahióhsake (three sides) and diamond = Kaié:ri nikahióhsake (four sides). <strong>Shapes are described by counting their sides</strong>, using number words you will learn in Unit 4.",
          "The sun — Karáhkwa — is also the word for clock and wheel. This demonstrates how Kanien'kéha extends ancient roots to cover new realities without borrowing foreign words.",
          "Source: <strong>Lesson 20</strong>, Kontinónhstats curriculum, Mary McDonald."
        ],
        ped:"<strong>Michelson & Michelson (2020):</strong> Kanien'kéha's polysynthetic structure allows it to coin new terms from existing roots — an aspect of the language's vitality and adaptability that learners should appreciate early.",
        vocabIds:['sh01','sh02','sh03','sh04','sh05','sh06'],
        exercises:[
          {type:'mc',wid:'sh04',prompt:'Karáhkwa means "sun". What other two things does this word also refer to?',sub:'',correct:'Clock and wheel',options:['Moon and star','Clock and wheel','Fire and sky','River and rain'],cm:"Io'nikonhraién:ta'ne! Karáhkwa = sun, clock, wheel. The same root describes all circular, time-marking, rotating things.",wm:"That answer is incorrect — please try again."},
          {type:'match',wid:null,prompt:'Match shapes to meanings',sub:'',pairs:[{target:'Otsísto',english:'Star',wids:['sh01']},{target:"Teiotokerón:te'",english:'Square',wids:['sh02']},{target:'Ohtsí:kera',english:'Cloud',wids:['sh05']},{target:'Karáhkwa',english:'Sun',wids:['sh04']}],cm:"Niawenhkó:wa! Natural shapes and geometric shapes are treated the same way in Kanien'kéha.",wm:"That answer is incorrect — please try again."},
          {type:'mc',wid:'sh06',prompt:"Áhsen nikahióhsake means 'triangle'. Áhsen means three. What does nikahióhsake mean?",sub:'',correct:'Sides / angles',options:['Sides / angles','Corners','Points','Shapes'],cm:"Tho niioht! nikahióhsake = sides/angles. Shapes are described by counting their sides — you already know Áhsen (three) and Kaié:ri (four) for diamond.",wm:"That answer is incorrect — please try again."},
          {type:'story',wid:'sh04',prompt:'Language and the natural world',sub:'',word:'Karáhkwa',meaning:'Sun / clock / wheel',storyPrompt:"The same word for 'sun' became the word for 'clock' and 'wheel' — the language adapts without abandoning its roots. What does it mean for a language to describe new realities through its own ancient vocabulary rather than borrowing foreign words? How does this relate to cultural continuity?"},
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // UNIT 4: COUNTING, ANIMALS & NATURE
  // ─────────────────────────────────────────────
  {
    id:3, title:"Unit 4 — Numbers, Animals & the Natural World",
    desc:"Numbers 1-10, key animals, place names, and nature vocabulary",
    lessons:[
      {
        id:'u3l0', title:'Lesson 8 — Numbers 1–10', icon:'🔢', sub:'Counting in Kanien\'kéha',
        intro:[
          "Numbers 1–10 from <strong>Lesson 27</strong> of the Kontinónhstats curriculum. Numbers in Kanien'kéha change form when counting people vs. objects — you will see this in later lessons.",
          "Notice that Áhsen (three) already appeared in the shape word for triangle, and Kaié:ri (four) in diamond. The number system is woven through the entire language."
        ],
        ped:"<strong>Spaced repetition principle:</strong> Áhsen and Kaié:ri have already appeared in context (shapes). Returning to them as numbers activates prior knowledge.",
        vocabIds:['num01','num02','num03','num04','num05','num06','num07','num08','num09','num10'],
        exercises:[
          {type:'mc',wid:'num01',prompt:"What does Énska mean?",sub:'',correct:'One',options:['One','Two','Three','Ten'],cm:"Tho niioht! Énska — one.",wm:"That answer is incorrect — please try again."},
          {type:'match',wid:null,prompt:'Match numbers 1–5',sub:'',pairs:[{target:'Énska',english:'One',wids:['num01']},{target:'Tékeni',english:'Two',wids:['num02']},{target:'Áhsen',english:'Three',wids:['num03']},{target:'Kaié:ri',english:'Four',wids:['num04']},{target:'Wísk',english:'Five',wids:['num05']}],cm:"Niawenhkó:wa! Numbers 1–5. Áhsen (three) and Kaié:ri (four) appeared in the shape words.",wm:"That answer is incorrect — please try again."},
          {type:'match',wid:null,prompt:'Match numbers 6–10',sub:'',pairs:[{target:'Ià:iak',english:'Six',wids:['num06']},{target:'Tsá:ta',english:'Seven',wids:['num07']},{target:'Shaté:kon',english:'Eight',wids:['num08']},{target:"Wá:hre'",english:'Nine',wids:['num09']},{target:'Ohiá:ri',english:'Ten',wids:['num10']}],cm:"Shé:kon! Numbers 6–10 complete the first set.",wm:"That answer is incorrect — please try again."},
          {type:'type',wid:'num03',prompt:"How do you say 'Three'? (You've seen this word before)",sub:'',correct:'Áhsen',alts:['áhsen','ahsen'],cm:"Io'nikonhraién:ta'ne! Áhsen. You already knew this from 'Áhsen nikahióhsake' (triangle — three sides).",wm:"That answer is incorrect — please try again. Try: Áhsen"},
          {type:'mc',wid:'num02',prompt:"Tékeni = two. Where have you seen the 'tei-' prefix in this unit?",sub:'',correct:"In the dual pronouns (teseniiáhshe = you two, teiakeniiáhshe = we two)",options:["In the dual pronouns (teseniiáhshe = you two, teiakeniiáhshe = we two)","In the colour words","In the elder nouns","Nowhere — it's only a number"],cm:"Tho niioht! The 'tei-' element relates to the concept of two — it runs through pronouns, verb forms, and numbers. Kanien'kéha is internally consistent.",wm:"That answer is incorrect — please try again."},
          {type:'audio',wid:'num01',prompt:'Say these numbers aloud',sub:'Count from one to five, recording yourself',word:'Énska, Tékeni, Áhsen, Kaié:ri, Wísk',meaning:'One, Two, Three, Four, Five',hint:"Take each syllable slowly: ÉN-ska, TÉ-ke-ni, ÁH-sen, ka-IÉ-ri, wísk."},
        ]
      },
      {
        id:'u3l1', title:'Lesson 9 — Animals & the Natural World', icon:'🐻', sub:'Living beings and their names',
        intro:[
          "Animals in Kanien'kéha are not just vocabulary — they are clan relatives, ceremonial beings, and teaching figures.",
          "The bear (Ohkwá:ri) appears in the Kontinónhstats puppet series. The turtle (Ahné:warak) carries Turtle Island. The wolf (Okwaho) is a clan name and a teacher.",
          "Nature words in this lesson — earth, water, fire, sun — are also the first words of the Thanksgiving Address, the oral text that opens every Haudenosaunee gathering.",
          "Sources: Kontinónhstats Lessons 22, 33; Thanksgiving Address oral tradition."
        ],
        ped:"<strong>Freirean generative themes:</strong> Animals and natural elements are not neutral vocabulary. They carry cosmology, ceremony, and relationship. Learning them means entering a different way of knowing the living world.",
        vocabIds:['nat01','nat02','nat03','nat04','nat05','an01','an02','an03'],
        exercises:[
          {type:'mc',wid:'an01',prompt:"What does Ohkwá:ri mean?",sub:'',correct:'Bear',options:['Bear','Wolf','Turtle','Bird'],cm:"Tho niioht! Ohkwá:ri — bear. You've seen this word in the title 'Tóta tánon Ohkwá:ri' (Grandmother and Bear).",wm:"That answer is incorrect — please try again."},
          {type:'match',wid:null,prompt:'Match nature words',sub:'',pairs:[{target:"Onhwén:tsia",english:'Earth / Land',wids:['nat02']},{target:"Ohnehká:'a",english:'Water',wids:['nat03']},{target:"Otsirá:'a",english:'Fire',wids:['nat04']},{target:'Karáhkwa',english:'Sun',wids:['nat05']}],cm:"Niawenhkó:wa! These four — earth, water, fire, sun — are among the first beings acknowledged in the Thanksgiving Address.",wm:"That answer is incorrect — please try again."},
          {type:'mc',wid:'nat02',prompt:"Onhwén:tsia means 'earth/land'. In the Thanksgiving Address, the earth is addressed first. What does this tell us?",sub:'',correct:'Land is understood as a relative and first being, not a resource',options:['Land is understood as a relative and first being, not a resource','Land is the most commercially valuable asset','The Address was written by farmers','Land only matters as a place to live'],cm:"Io'nikonhraién:ta'ne! The Thanksgiving Address gives thanks to the earth before anything else — not as property, but as a living relative.",wm:"That answer is incorrect — please try again."},
          {type:'mc',wid:'nat05',prompt:"Karáhkwa means sun, clock, and wheel. Which principle of Kanien'kéha does this illustrate?",sub:'',correct:"Polysynthesis and root extension — new realities described through existing roots",options:["Polysynthesis and root extension — new realities described through existing roots","The language is unable to coin new words","All circular things are the same in Kanien'kéha","It is a borrowing from English"],cm:"Tho niioht! Kanien'kéha extends ancient roots rather than borrowing — a sign of linguistic vitality, not limitation.",wm:"That answer is incorrect — please try again."},
          {type:'story',wid:'nat02',prompt:'Land as relative',sub:'',word:"Onhwén:tsia",meaning:'Earth / Land',storyPrompt:"In Kanien'kéha, the earth is not property — it is a relative acknowledged before any gathering. What does it feel like to address the land before you address the people in a room? Write about what that shift means to you."},
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // UNIT 5: EXPRESSIONS, VERBS & CEREMONY
  // ─────────────────────────────────────────────
  {
    id:4, title:"Unit 5 — Expressions, Verbs & Ceremony",
    desc:"Everyday expressions, basic verbs, negation, time, clans, and the Thanksgiving Address",
    lessons:[
      {
        id:'u4l0', title:'Lesson 10 — Everyday Expressions', icon:'💬', sub:'The words you\'ll use every day',
        intro:[
          "Before full verb conjugation, some words carry complete social meaning on their own — greetings, thanks, agreement, negation.",
          "These expressions appear constantly in Kontinónhstats lesson materials, in the Thanksgiving Address, and in everyday Kanien'kehá:ka speech. Learn these first; they make every interaction possible.",
          "Source: Kontinónhstats materials; Thanksgiving Address oral tradition."
        ],
        ped:"<strong>Krashen (1982) Natural Order:</strong> High-frequency expressions are acquired early because they appear in every interaction. Starting here gives learners immediate communicative ability.",
        vocabIds:['v01','v02','v03','v04','v05','v08','v09'],
        exercises:[
          {type:'mc',wid:'v01',prompt:'What does Niawenhkó:wa mean?',sub:'',correct:'Thank you very much',options:['Thank you very much','Hello','Goodbye','Peace'],cm:"Tho niioht! Niawenhkó:wa — great thanks. The -kó:wa suffix means 'great/big'.",wm:"That answer is incorrect — please try again."},
          {type:'mc',wid:'v04',prompt:"Shé:kon is the everyday greeting. What does it also mean in other contexts?",sub:'',correct:"Still / yet",options:["Still / yet","Thank you","Goodbye","Peace"],cm:"Niawenhkó:wa! Shé:kon = hello, but also 'still' or 'yet'. Context determines meaning.",wm:"That answer is incorrect — please try again."},
          {type:'match',wid:null,prompt:'Match expressions to meanings',sub:'',pairs:[{target:'Niawenhkó:wa',english:'Thank you very much',wids:['v01']},{target:'Shé:kon',english:'Hello',wids:['v04']},{target:'Tho niioht',english:'That is all',wids:['v03']},{target:"Skén:nen",english:'Peace / Are you well?',wids:['v05']}],cm:"Shé:kon! These four expressions will appear in almost every conversation.",wm:"That answer is incorrect — please try again."},
          {type:'type',wid:'v04',prompt:"How do you say 'Hello'?",sub:'',correct:'Shé:kon',alts:['she:kon','shekon'],cm:"Io'nikonhraién:ta'ne! Shé:kon.",wm:"That answer is incorrect — please try again. Try: Shé:kon"},
          {type:'mc',wid:'v05',prompt:"Skén:nen means 'peace/calm'. It's also used as a greeting. How does this connect to Haudenosaunee values?",sub:'',correct:'Peace is at the heart of the Great Law — Skén:nen is a greeting because wellbeing is the first thing you acknowledge in another person',options:['Peace is at the heart of the Great Law — Skén:nen is a greeting because wellbeing is the first thing you acknowledge in another person','It is simply a translation of a French greeting','Peace is only used in ceremonial contexts','It is an older form now replaced by Shé:kon'],cm:"Io'nikonhraién:ta'ne! Skén:nen opens with peace — the same principle that opens the Great Law of Peace (Kaienerekowa).",wm:"That answer is incorrect — please try again."},
          {type:'story',wid:'v01',prompt:'Gratitude in the language',sub:'',word:'Niawenhkó:wa',meaning:'Thank you very much',storyPrompt:"The Thanksgiving Address is entirely built on gratitude — it gives thanks to each part of the living world before any gathering begins. Niawenhkó:wa is how that gratitude sounds in daily life. What would it mean to open every day with this word? Write your thoughts."},
        ]
      },
      {
        id:'u4l1', title:'Lesson 11 — Basic Verbs & Negation', icon:'🔄', sub:'Action and its absence',
        intro:[
          "Kanien'kéha verbs are extraordinarily complex — they encode person, number, gender, aspect, and direction in a single word. This lesson introduces the simplest forms: command verbs and the negator.",
          "<strong>Iáh</strong> is the primary negator. Place it before a verb to negate it: Iáh + verb = not + verb. The concept of 'no' in Kanien'kéha is an action on a verb, not a standalone answer.",
          "Command (imperative) forms are among the first verb types in the Kontinónhstats curriculum (Lesson 12), because they are short, memorable, and immediately useful.",
          "Source: Kontinónhstats Lesson 12; Deering & Harries-Delisle teaching grammar."
        ],
        ped:"<strong>Mithun (1984) / Baker (1996):</strong> Mohawk verbs are best introduced as wholes before their parts. The imperative is the minimal verb form — a root plus an aspect suffix, no extra prefixes needed.",
        vocabIds:['v06','v07','v08','v09','v10','v11'],
        exercises:[
          {type:'mc',wid:'v10',prompt:"What does Iáh mean?",sub:'',correct:'No / Not (negator)',options:['No / Not (negator)','Yes','Maybe','And'],cm:"Tho niioht! Iáh — the negator. It goes before a verb to negate it.",wm:"That answer is incorrect — please try again."},
          {type:'mc',wid:'v06',prompt:"Wá:s means 'Go!' (command to one person). The suffix for commanding two people is 'Tewá:s'. What does adding Te- do?",sub:'',correct:'Marks the dual — you are commanding two people',options:['Marks the dual — you are commanding two people','Negates the verb','Makes it polite','Marks the future tense'],cm:"Niawenhkó:wa! Te- marks dual/two. You already know this from teseniiáhshe (you two) and Tékeni (two).",wm:"That answer is incorrect — please try again."},
          {type:'mc',wid:'v11',prompt:"'Iáh tewá:ien' means 'it is not so'. What is the function of Iáh in this phrase?",sub:'',correct:'Iáh negates the verb tewá:ien',options:['Iáh negates the verb tewá:ien','Iáh means therefore','Iáh means and','Iáh is a greeting'],cm:"Io'nikonhraién:ta'ne! Iáh + verb = negation. Iáh is always placed before the verb.",wm:"That answer is incorrect — please try again."},
          {type:'match',wid:null,prompt:'Match expressions',sub:'',pairs:[{target:"Tóka'",english:'Maybe / Perhaps',wids:['v08']},{target:'Tánon',english:'And / Also',wids:['v09']},{target:'Iáh',english:'No / Not',wids:['v10']},{target:'Wá:s',english:'Go! (command)',wids:['v06']}],cm:"Shé:kon! These four particles and verb forms carry a lot of conversational weight.",wm:"That answer is incorrect — please try again."},
          {type:'story',wid:'v10',prompt:'The grammar of negation',sub:'',word:'Iáh',meaning:'No / Not',storyPrompt:"Iáh — 'not' — is not a standalone 'no' in Kanien'kéha. It acts on verbs. Negation in this language is relational — it negates an action, not just a thing. What does it mean to think of 'no' as something that acts on the world, rather than just refusing it?"},
        ]
      },
      {
        id:'u4l2', title:'Lesson 12 — Time & Daily Life', icon:'🌅', sub:'When things happen',
        intro:[
          "Time vocabulary from <strong>Lesson 3</strong> of the Kontinónhstats curriculum: today, yesterday, tomorrow, and times of day.",
          "Kanien'kéha expresses time primarily through aspect (whether something is completed, ongoing, or anticipated) rather than tense. Today/yesterday/tomorrow are particles that combine with aspect-marked verbs.",
          "These are among the most immediately useful words for everyday conversation."
        ],
        ped:"<strong>García & Li Wei (2014) translanguaging:</strong> Time concepts are universal human experience — learners can map their own daily rhythms onto the new vocabulary, using lived experience as an acquisition resource.",
        vocabIds:['t01','t02','t03','t04','t05','t06'],
        exercises:[
          {type:'mc',wid:'t01',prompt:"What does Ón:wa mean?",sub:'',correct:'Now / Today',options:['Now / Today','Yesterday','Tomorrow','Morning'],cm:"Tho niioht! Ón:wa — now/today.",wm:"That answer is incorrect — please try again."},
          {type:'match',wid:null,prompt:'Match time words',sub:'',pairs:[{target:"Ón:wa",english:'Now / Today',wids:['t01']},{target:'Oká:ra',english:'Yesterday',wids:['t02']},{target:'Ó:nenhste',english:'Tomorrow',wids:['t03']},{target:'Ohrhòn:ke',english:'In the morning',wids:['t04']}],cm:"Niawenhkó:wa! These four time words cover the most essential temporal reference.",wm:"That answer is incorrect — please try again."},
          {type:'type',wid:'t03',prompt:"How do you say 'Tomorrow'?",sub:'',correct:'Ó:nenhste',alts:['o:nenhste','onenhste'],cm:"Shé:kon! Ó:nenhste.",wm:"That answer is incorrect — please try again. Try: Ó:nenhste"},
          {type:'story',wid:null,prompt:'Time in the language',sub:'',word:'',meaning:'',storyPrompt:"Kanien'kéha expresses time through aspect — 'completed', 'ongoing', 'anticipated' — rather than tense. There is no 'was' and 'will be' in the same way English has them. What does it mean for a language to be more concerned with the nature of an action than with when it happened? Write your thoughts."},
        ]
      },
      {
        id:'u4l3', title:'Lesson 13 — Clans & Identity', icon:'🐢', sub:'Who you belong to',
        intro:[
          "Kanien'kehá:ka society is organized by clan — Bear, Wolf, and Turtle are the three clans of Kanehsatà:ke. Clan membership is matrilineal and determines who you can marry, who your responsibilities are to, and your place in ceremony.",
          "The Turtle Clan carries the creation story — the earth was formed on Turtle's back. The Wolf Clan represents teachers and pathfinders. The Bear Clan holds healing knowledge.",
          "Source: Kontinónhstats Lesson 28; clan tradition."
        ],
        ped:"<strong>Tuck & Yang (2012) decolonization:</strong> Clan knowledge is not 'cultural background' — it is a living governance system. Learning clan names means entering a different understanding of community.",
        vocabIds:['cl01','cl02','cl03','ta02','ta03'],
        exercises:[
          {type:'mc',wid:'cl01',prompt:"What does Ohkwarí:yo mean?",sub:'',correct:'Bear Clan',options:['Bear Clan','Wolf Clan','Turtle Clan','Bird Clan'],cm:"Tho niioht! Ohkwarí:yo — Bear Clan.",wm:"That answer is incorrect — please try again."},
          {type:'match',wid:null,prompt:'Match the clans',sub:'',pairs:[{target:'Ohkwarí:yo',english:'Bear Clan',wids:['cl01']},{target:'Okwaho',english:'Wolf Clan',wids:['cl02']},{target:'Ahné:warak',english:'Turtle Clan',wids:['cl03']}],cm:"Niawenhkó:wa! Three clans — the organizational structure of Kanien'kehá:ka society.",wm:"That answer is incorrect — please try again."},
          {type:'mc',wid:'cl03',prompt:"The Turtle Clan (Ahné:warak) has a special significance in Haudenosaunee creation. What is it?",sub:'',correct:'The earth was formed on Turtle\'s back — this is "Turtle Island"',options:["The earth was formed on Turtle's back — this is 'Turtle Island'","Turtles are the fastest clan","The Turtle Clan was created last","Turtles represent war"],cm:"Io'nikonhraién:ta'ne! Turtle Island — the earth rests on the turtle's back in Haudenosaunee creation cosmology.",wm:"That answer is incorrect — please try again."},
          {type:'story',wid:'ta03',prompt:'Your name in context',sub:'',word:"Kanien'kehá:ka",meaning:'People of the Flint',storyPrompt:"Kanien'kehá:ka — People of the Flint — is the people's own name for themselves. 'Mohawk' is an Algonquin term adopted by English speakers. What does it mean to reclaim a self-name? What is the difference between being named by others and naming yourself? Take a moment with this."},
        ]
      },
      {
        id:'u4l4', title:'Lesson 14 — The Thanksgiving Address', icon:'🙏', sub:'Words that come before all else',
        intro:[
          "The <strong>Ohén:ton Karihwatéhkwen</strong> — the Thanksgiving Address, or 'Words Before All Else' — is the most important oral text in Kanien'kéha. It is spoken before every gathering, large or small.",
          "The Address moves through the natural world in a specific order, giving thanks to: the people, the earth, the waters, the fish, the plants, the food plants, the medicine herbs, the animals, the trees, the birds, the four winds, the Thunderers, the sun, the moon, the stars, the Enlightened Teachers, and the Creator.",
          "It closes with: <em>'Tho niioht' — That is all. We are of one mind.</em>",
          "Animated version by Kontinónhstats: youtube.com/watch?v=pqMomjdi-GQ | PDF with commentary: americanindian.si.edu"
        ],
        ped:"<strong>Freire (1970) critical literacy:</strong> The Thanksgiving Address is not background knowledge — it IS literacy in Kanien'kéha. Understanding its structure is understanding how the language organizes the world.",
        vocabIds:['ta01','ta02','nat02','nat03','v01','v03'],
        exercises:[
          {type:'mc',wid:'ta01',prompt:"What does 'Ohén:ton Karihwatéhkwen' mean literally?",sub:'',correct:"'The words that come before all else'",options:["'The words that come before all else'","'A prayer to the Creator'","'The Great Law of Peace'","'Thank you for the land'"],cm:"Io'nikonhraién:ta'ne! Ohén:ton = before/in front; Karihwatéhkwen = the words/what comes with them. Words that precede all else.",wm:"That answer is incorrect — please try again."},
          {type:'mc',wid:'ta02',prompt:"What does Onkwehón:we mean?",sub:'',correct:'Original people / Indigenous people',options:['Original people / Indigenous people','The Creator','The land','All women'],cm:"Tho niioht! Onkwehón:we — original/Indigenous people. The Address opens with thanks to the people.",wm:"That answer is incorrect — please try again."},
          {type:'mc',wid:'nat02',prompt:"The Thanksgiving Address gives thanks to the earth (Onhwén:tsia) first, before speaking of the people. What principle does this establish?",sub:'',correct:'The earth is a living relative, not a resource — it comes before human concerns',options:['The earth is a living relative, not a resource — it comes before human concerns','The environment is more important than people','It is just an old custom with no current meaning','Land ownership must be established before community'],cm:"Niawenhkó:wa! The earth is addressed as a living relative — not property. This worldview is encoded in the opening of every gathering.",wm:"That answer is incorrect — please try again."},
          {type:'audio',wid:'ta01',prompt:'Say the title of the Thanksgiving Address aloud',sub:'Record yourself, listen back, and self-assess',word:'Ohén:ton Karihwatéhkwen',meaning:'The Thanksgiving Address — Words Before All Else',hint:"Five syllables for the first word: o-HÉN-ton. Six for the second: ka-rih-wa-TÉH-kwen. Say it slowly first, then again with flow."},
          {type:'story',wid:'v03',prompt:'Closing a lesson with ceremony',sub:'',word:'Tho niioht',meaning:'That is all — it is so',storyPrompt:"Every gathering that opens with the Thanksgiving Address closes with 'Tho niioht' — that is all, we are of one mind. Endings matter as much as beginnings. As you finish this unit, write a short reflection: what have you carried from this learning? What do you want to carry forward?"},
        ]
      }
    ]
  }

];
