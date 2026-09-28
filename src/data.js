// ============================================================
// ALL THE APP'S CONTENT LIVES IN THIS FILE.
// Edit the Amharic text below to change meals, reminders, or the
// read-only pages (prohibited foods, notices). Nothing else in the
// app needs to change for a plain text fix.
//
// IMPORTANT — how updates reach people who already opened the app:
// The very first time the app runs on a phone, everything below is
// copied into that phone's own storage so it can be ticked/edited.
// After that, every time the app loads it re-checks this file and
// quietly refreshes any meal/reminder/page THAT THE PERSON HAS NEVER
// PERSONALLY EDITED — so a typo fix you make here still reaches
// Tesnim's phone next time she opens the app, without touching her
// tick history. The moment she edits something herself ("save for
// every time"), that one item becomes hers — future edits here won't
// silently overwrite her own wording anymore (see main.js, "SEED SYNC").
// ============================================================

// Meal tasks per program weekday: 1=ሰኞ(Mon) ... 7=እሁድ(Sun).
// Each entry: id (must stay unique/stable — never reuse an old id for
// different content), name (bold title), desc (full text; "\n" starts
// a new line/section, "+" separates individual ingredients within a
// line — the app turns each "+"-separated item into its own bullet).
export const MEALS = {
1:[{id:'d1L',name:'ምሳ',desc:"የአበባ ጎመን + ½ የቡና ስኒ ድፍን ምስር + ብሮኮሊ + ፎሶሊያ\n½ የሻይ ማንኪያ እርድ + ¼ የሻይ ማንኪያ ኮረሪማ + ½ የሻይ ማንኪያ ቀረፋ + ½ ቀይ ሽንኩርት + 6 ፍሬ ነጭ ሽንኩርት + ½ ቀይ ቃሪያ + 2 የሾርባ ማንኪያ የወይራ ዘይት + ሚጥሚጣ + ½ የሻይ ማንኪያ ዳጣ\nከ 1 ሰአት በኋላ፡ አረንጓዴ ሻይ (በቀረፋ) + 5 ፍሬ እንጆሪ + ¼ ብርቱካን"},
   {id:'d1D',name:'ራት',desc:"ሰላጣ\n½ የተቀቀለ ካሮት + ½ የቡና ስኒ ድፍን ምስር + 3 ፍሬ እንጆሪ + ሰላጣ + 1 የሾርባ ማንኪያ ሰላጣ + ቀረፋ (1/2 የሻይ ማንኪያ) + ½ የሾርባ ማንኪያ የወይራ ዘይት\nከመኝታ በፊት፡ የዝንጅብል ሻይ + 25 የዱባ ፍሬ"}],
2:[{id:'d2B',name:'ቁርስ',desc:"3 ፍሬ እንጆሪ + ½ አቮካዶ + 1 የሾርባ ማንኪያ ተልባ + ¼ የሻይ ማንኪያ (ቀረፋ + እርድ) + ½ የሾርባ ማንኪያ የአፕል አቼቶ .... 1 ብርጭቆ ጁስ + 1 የተቀቀለ እንቁላል"},
   {id:'d2D',name:'እራት',desc:"½ የቡና ስኒ አሳ + ብሮኮሊ + (¼ ቀይ ስር + ½ ካሮት)\n¼ የሻይ ማንኪያ ኮረሪማ + ½ የሻይ ማንኪያ እርድ + ½ የሻይ ማንኪያ ቀረፋ + ½ ቀይ ሽንኩርት + 6 ፍሬ ነጭ ሽንኩርት + 1 የሾርባ ማንኪያ የወይራ ዘይት + ሚጥሚጣ\nከመኝታ በፊት፡ የዝንጅብል ሻይ + 25 የዱባ ፍሬ"}],
3:[{id:'d3L',name:'ምሳ',desc:"½ የቡና ስኒ አጃ ቅንጬ+ የሀበሻ ጎመን + 1 የተቀቀለ እንቁላል\n½ ካሮት + ኮረሪማ + እርድ + የጥብስ ቅጠል + ቀይ ሽንኩርት + ሚጥሚጣ + የወይራ ዘይት"},
   {id:'d3D',name:'ራት',desc:"½ የቡና ስኒ ሂብ + 1 አፕል + ½ የሾርባ ማንኪያ (አጃ + ተልባ) + ½ የሾርባ ማንኪያ የወይራ ዘይት .... 1 ብርጭቆ ጁስ\nከመኝታ በፊት፡ የዝንጅብል ሻይ + 25 የዱባ ፍሬ"}],
4:[{id:'d4L',name:'ምሳ',desc:"½ የቡና ስኒ አይብ + ½ የቡና ስኒ ስጋ + ብሮኮሊ\n½ ካሮት + ¼ የሻይ ማንኪያ ኮረሪማ + ½ የሻይ ማንኪያ እርድ + ½ የሻይ ማንኪያ ቀረፋ + ½ ቀይ ሽንኩርት + 6 ፍሬ ነጭ ሽንኩርት + 2 የሾርባ ማንኪያ የወይራ ዘይት + ሚጥሚጣ\nከ 1 ሰአት በኋላ ሞሪንጋ ሻይ (በቀረፋ) + ¼ ብርቱካን"},
   {id:'d4D',name:'ራት',desc:"ሾርባ\n1 የሾርባ ማንኪያ ድፍን (ምስር + ሽምብራ) + ½ የቡና ስኒ ነጭ አሳ + ½ ካሮት + ¼ ዝኩኒ\n¼ ቲማቲም + ¼ ቀይ ሽንኩርት + 3 ፍሬ ነጭ ሽንኩርት + የጥብስ ቅጠል + የሾርባ ቅጠል + ብሮኮሊ + 1 የሾርባ ማንኪያ ሰሊጥ + ½ የሻይ ማንኪያ (ቀረፋ+እርድ) + ½ የሾርባ ማንኪያ የወይራ ዘይት\nከ 3 ጉርሻ ያልበለጠ መመገብ\nከመኝታ በፊት፡ 25 የዱባ ፍሬ + የዝንጅብል ሻይ"}],
5:[{id:'d5L',name:'ምሳ',desc:"ሽሮ + 1 የቡና ስኒ ዱባ + የሀበሻ ጎመን\nየጥብስ ቅጠል + ኮረሪማ + ½ ራስ ቀይ ሽንኩርት + 6 ፍሬ ነጭ ሽንኩርት + ¼ ቲማቲም + ½ ቃሪያ + ½ የሻይ ማንኪያ (ቀረፋ + እርድ) + 1 የሾርባ ማንኪያ የወይራ ዘይት + ሚጥሚጣ\n........ በ ¼ ቀይ እንጀራ መመገብ .......\nከ 1 ሰአት በኋላ ሞሪንጋ ሻይ (በቀረፋ) + ¼ ብርቱካን"},
   {id:'d5D',name:'ራት',desc:"5 ፍሬ እንጆሪ + ½ አቮካዶ + 1 የሾርባ ማንኪያ (ለውዝ + የዱባ ፍሬ) + ½ የሻይ ማንኪያ (እርድ + ቀረፋ) + ሎሚ .... 1 ብርጭቆ ጁስ + የማንጎ ቅጠል ሻይ + 1 የተቀቀለ እንቁላል\nከመኝታ በፊት፡ የዝንጅብል ሻይ + 25 የዱባ ፍሬ"}],
6:[{id:'d6L',name:'ምሳ',desc:"½ የቡና ስኒ ስጋ + 1 የቡና ስኒ ዱባ + ብሮኮሊ\n½ የሻይ ማንኪያ እርድ + ¼ የሻይ ማንኪያ ኮረሪማ + ½ የሻይ ማንኪያ ቀረፋ + ½ ቀይ ሽንኩርት + 6 ፍሬ ነጭ ሽንኩርት + ½ ቀይ ቃሪያ + 1 የሾርባ ማንኪያ የወይራ ዘይት + ሚጥሚጣ + ½ የሻይማንኪያ ዳጣ\nከ 1 ሰአት በኋላ ሞቅሞቅ ሻይ (በቀረፋ) + ¼ ብርቱካን + 25 የዱባ ፍሬ"},
   {id:'d6D',name:'ራት',desc:"ሽሮ + ¼ የቡና ስኒ ድፍን ምስር + (ፎሶሊያ + ቆስጣ)\n½ የሻይ ማንኪያ እርድ + ¼ የሻይ ማንኪያ ኮረሪማ + ½ የሻይ ማንኪያ ቀረፋ + ½ ቀይ ሽንኩርት + 6 ፍሬ ነጭ ሽንኩርት + 1 የሾርባ ማንኪያ የወይራ ዘይት\n........ በ ¼ ቀይ እንጀራ (ቆጮ) መመገብ .......\nከመኝታ በፊት፡ የዝንጅብል ሻይ + 25 የዱባ ፍሬ"}],
7:[{id:'d7L',name:'ምሳ',desc:"½ የቡና ስኒ ነጭ አሳ + ½ የቡና ቡኒ ሩዝ + የሀበሻ ጎመን\nቀይ ሽንኩርት + እርድ + ቀረፋ + የወይራ ዘይት + ሚጥሚጣ\nአረንጓዴ ሻይ (በቀረፋ) + ½ ሙዝ + 5 ፍሬ እንጆሪ"},
   {id:'d7D',name:'ራት',desc:"ሰላጣ\n¼ ቀይ ስር + ½ የቡና ስኒ ቀይ ቦለቄ + ¼ ቀይ ሽንኩርት + 1 የሾርባ ማንኪያ ሰሊጥ + ½ የሾርባ ማንኪያ የአፕል አቼቶ + ½ የሾርባ ማንኪያ የወይራ ዘይት + ሚጥሚጣ\nከመኝታ በፊት፡ የዝንጅብል ሻይ + 25 የዱባ ፍሬ"}]
};

// Daily reminders — the same items repeat every day, regardless of weekday.
export const DAILY = [
{id:'r1',name:'ረሀብ ሲሰማ',desc:"ረሀብ ሲሰማ (በስፖርታዊ እንቅስቃሴ ጊዜ) የለውዝ ፣ ገብስ ፣ ባቄላ ፣ ሽምብራ፣ኑግ ፣ ሱፍ ፣ ... ከአንድ የቡና ስኒ ባልበለጠ ቆሎ በ15 ደቂቃ ውስጥ መመገብ"},
{id:'r2',name:'ውሃ',desc:"በቀን 1 ½ ሊትር ለብ ያለ ውሀ በምግብ ሰዓቶች መካከል እና በስፖርት ጊዜ ½ ሊትር መጠጣት (2 ሊትር)"},
{id:'r3',name:'የምግብ ዝግጅት',desc:"ሁሉም ምግቦች በውሀ መብሰል አለባቸው"},
{id:'r4',name:'ጨው',desc:"በጣም የተቀጠነ አዮዲን የተጨመረበት ጨው መጠቀም"},
{id:'r5',name:'የአካል ብቃት',desc:"በቀን ቢያንስ 60 ደቂቃ የአካል ብቃት እንቅስቃሴ ማድረግ"},
{id:'r6',name:'የፀሀይ ብርሀን',desc:"በቀን ቢያንስ ለ15 ደቂቃ የፀሀይ ብርሀን ማግኘት ያስፈልጋል"},
{id:'r7',name:'ቡና',desc:"በቀን 1 ስኒ ቡና በቀረፋ/ቅርንፉድ"},
{id:'r8',name:'ቺያ ሲድ',desc:"በቀን 1 የሾርባ ማንኪያ ቺያ ሲድ (ፈላ ባለ ውሀ ዘፍዝፎ ማሳደር) ጧት በባዶ ሆድ መውሰድ"}];

// Read-only PAGES — shown in the "ገፆች" row, never tickable, but each
// one has its own ✎ edit button in the app so the full text can be
// rewritten any time (title + body). "\n" in body = one bullet line.
// Add more objects here any time; a stable, never-reused id is required.
export const INFO_PAGES = [
  { id:'proh', title:'የተከለከሉ ምግቦች', body:
"ለስላሳ መጠጦች\nበርገር፣ ፒዛ፣ ፓስታ፣ መኮረኒ፣ ኬክ፣ ቸኮሌት እና ሌሎች ስኳር የተጨመረባቸው ምግቦች፣ ጣፋጭ እና ለስላሳ መጠጦች\nጮማ ስጋ፣ የተጠበሰ ስጋ፣ ክትፎ፣ የዶሮ ቆዳ፣ ልብ፣ ጨጓራ\nዶሮ ወጥ ወይም በዶሮ ወጥ መንገድ የተዘጋጀ የወጥ ምግቦች\nወተት፣ የወተት ቅቤ፣ የአትክልት ቅቤ (ስጋ፣ እርጎ...)፣ የሚረጭ ዘይት፣ የተደባለቀ የሱፍ ዘይት\nየታሸጉ ምግቦችና መጠጦች\nነጭ ዳቦ፣ ፓስታ፣ መኮረኒ፣ ነጭ ፋርኖ ዱቄት\nሌሎች ያልተገለፁ ከባድ ስኳር፣ ጨው፣ ኮሌስትሮልና ሌሎች የጤና ችግሮችን የሚያስከትሉ ሲሆን ስለሚቻል በስልክ ደውለው ማረጋገጥ ይኖርቦታል" },
  // Placeholder — write the real notes here (or edit them straight in
  // the app with ✎ once it's running; either way works).
  { id:'notice', title:'ማሳሰቢያ', body:
"እዚህ ላይ ማንኛውንም አጠቃላይ ማሳሰቢያ ወይም ልብ ሊባል የሚገባ ነጥብ ይጻፉ።\nይህን ጽሁፍ ለማርትዕ ከዚህ ገፅ ውስጥ ያለውን ✎ ይጫኑ፣ ወይም እዚህ src/data.js ውስጥ ቀጥታ ይቀይሩ።" },
];

export const WD = ['እሁድ','ሰኞ','ማክሰኞ','ረቡዕ','ሐሙስ','አርብ','ቅዳሜ']; // Sunday-first, matches JS Date.getDay()
