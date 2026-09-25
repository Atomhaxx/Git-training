/**
 * TESTACADEMY - MODUL 0: PROGRAMOZÁSI ALAPOK TYPESCRIPTBEN
 * ------------------------------------------------------------------------
 * Futtató parancs a terminálban:
 *   npx ts-node learning-playground/00_programming_basics.ts
 * ------------------------------------------------------------------------
 * 
 * KEDVES DANIEL!
 * Ez a fájl egyszerre egy futtatható kód és egy tanári "puska". 
 * Ha végigolvasod a kommenteket, pontosan látni fogod a metaforákat, 
 * amikkel a manuális tesztelőknek el tudod magyarázni a száraz fogalmakat.
 */

// ========================================================================
// 1. RÉSZ: VÁLTOZÓK (VARIABLES) - A DOBOZ METAFORA
// ========================================================================
/**
 * Hogyan magyarázd el a tesztelőknek:
 * "Képzeljétek el a változót úgy, mint egy fizikai DOBOZT. 
 * Ráírtok egy nevet (címkét), és beleraktok egy értéket. 
 * Később, ha a doboz nevére hivatkoztok, a benne lévő dolgot kapjátok meg."
 * 
 * Mi a különbség a két doboztípus között?
 * 1. CONST (Konstans / Állandó): Lezárt doboz. Amit egyszer beleraktál, soha többé nem cserélheted ki.
 * 2. LET (Változó): Nyitott doboz. Bármikor kiveheted a tartalmát, és belerakhatsz valami újat.
 */

function demoVariables() {
  console.log('\n=== 1. RÉSZ: VÁLTOZÓK ÉS DOBOZOK DEMÓ ===');

  // CONST - Lezárt doboz (Mindig ezt használjuk alapból, kivéve ha tudjuk, hogy változni fog)
  const websiteUrl: string = 'https://testacademy.hu';
  console.log(`websiteUrl doboz tartalma: ${websiteUrl}`);
  // websiteUrl = 'https://valami-mas.hu'; // <--- EZ HIBÁT ADNA! A const nem változtatható meg.

  // LET - Nyitott doboz (Aminek változhat az értéke, pl. számlálók, státuszok)
  let testAttempts: number = 1;
  console.log(`Kísérletek száma az elején: ${testAttempts}`);

  testAttempts = 2; // Kicseréljük a doboz tartalmát egy 2-es számra
  console.log(`Kísérletek száma a javítás után: ${testAttempts}`);
}


// ========================================================================
// 2. RÉSZ: ADATTÍPUSOK (DATA TYPES) - A CÍMKÉZÉS
// ========================================================================
/**
 * Hogyan magyarázd el a tesztelőknek:
 * "A dobozokra rá kell írnunk, hogy mi való beléjük. Ez a TÍPUS (Type). 
 * Ha a dobozra ráírjuk, hogy szám való bele, a TypeScript megvéd minket attól, 
 * hogy véletlenül szöveget rakjunk bele. Ezért biztonságosabb a TypeScript, mint a JavaScript!"
 * 
 * Az 5 legfontosabb adattípus a tesztelésben:
 * 1. String (Szöveg): Mindig macskakörömben van: 'Daniel' vagy "Daniel".
 * 2. Number (Szám): Egyszerű számok, tizedesek is: 99 vagy 99.99.
 * 3. Boolean (Logikai érték): Csak két értéke lehet: true (igaz) vagy false (hamis). 
 *    (Mint egy villanykapcsoló: fel van kapcsolva vagy le van kapcsolva).
 * 4. Array (Lista / Tömb): Több azonos dolog listája szögletes zárójelben: ['alma', 'körte'].
 * 5. Object (Objektum): Egy komplex dolog leírása kapcsos zárójelben, kulcs-érték párokkal.
 */

function demoDataTypes() {
  console.log('\n=== 2. RÉSZ: ADATTÍPUSOK DEMÓ ===');

  // 1. String (Szöveg)
  const testerName: string = 'Daniel';

  // 2. Number (Szám)
  const passRatePercentage: number = 98.5;

  // 3. Boolean (Logikai)
  const isPipelineGreen: boolean = true;

  // 4. Array (Tömb / Lista)
  // A string[] azt jelenti: "olyan lista, amiben csak szövegek vannak"
  const browserTypes: string[] = ['Chromium', 'Firefox', 'WebKit'];

  // 5. Object (Objektum)
  // Egy összetett tesztelő objektum leírása
  const userProfile: { name: string; age: number; isAdmin: boolean } = {
    name: 'Daniel',
    age: 32,
    isAdmin: true
  };

  console.log(`Név (string): ${testerName}`);
  console.log(`Sikerességi arány (number): ${passRatePercentage}%`);
  console.log(`Zöld a pipeline? (boolean): ${isPipelineGreen}`);
  console.log(`Böngészők listája (array): ${browserTypes.join(', ')}`);
  console.log(`Felhasználó neve az objektumból: ${userProfile.name}`);
}


// ========================================================================
// 3. RÉSZ: FÜGGVÉNYEK (FUNCTIONS) - A RECEPT METAFORA
// ========================================================================
/**
 * Hogyan magyarázd el a tesztelőknek:
 * "A függvény olyan, mint egy KONYHAI RECEPT.
 * Megadjuk a hozzávalókat (ezek a paraméterek a sima zárójelben `()`), 
 * a konyhában elvégezzük a lépéseket (ez a kód a kapcsos zárójelben `{ }`), 
 * és a végén felszolgáljuk az ételt (ez a `return` érték)."
 * 
 * Miért használjuk?
 * Hogy ne kelljen ugyanazt a kódblokkot 100-szor leírni. Csak meghívjuk a receptet!
 */

// Készítünk egy receptet, ami kiszámolja az áfa-s árat
function calculateGrossPrice(netPrice: number, taxRate: number = 0.27): number {
  // netPrice és taxRate a bejövő hozzávalók (paraméterek)
  // A zárójel utáni ": number" jelzi, hogy a végeredmény is egy szám lesz.
  
  const grossPrice = netPrice * (1 + taxRate);
  
  // Felszolgáljuk a kész ételt (visszaadjuk az értéket)
  return grossPrice;
}

function demoFunctions() {
  console.log('\n=== 3. RÉSZ: FÜGGVÉNYEK ÉS RECEPTEK DEMÓ ===');

  // Meghívjuk a receptet nettó 10.000 Ft-tal
  const tvGrossPrice = calculateGrossPrice(10000);
  console.log(`A TV bruttó ára (27% áfával): ${tvGrossPrice} Ft`);

  // Meghívjuk a receptet egy egyedi 5%-os áfával (pl. könyv)
  const bookGrossPrice = calculateGrossPrice(5000, 0.05);
  console.log(`A könyv bruttó ára (5% áfával): ${bookGrossPrice} Ft`);
}


// ========================================================================
// 4. RÉSZ: NYÍL FÜGGVÉNYEK (ARROW FUNCTIONS / =>) - A GYORSKAJA
// ========================================================================
/**
 * Hogyan magyarázd el a tesztelőknek:
 * "A nyíl (`=>`) nem varázslat. Ez csak egy 'gyorséttermi' rövidítés a hagyományos függvényre.
 * Elhagyjuk a 'function' szót, és helyette egy nyilat (`=>`) rakunk a zárójel és a kód közé.
 * Ha a kódunk csak 1 sorból áll, még a kapcsos zárójelet `{}` és a `return` szót is elhagyhatjuk!"
 */

function demoArrowFunctions() {
  console.log('\n=== 4. RÉSZ: NYÍL FÜGGVÉNYEK DEMÓ ===');

  // Hagyományos módszer:
  const doubleTraditional = function(x: number): number {
    return x * 2;
  };

  // Modern Nyíl módszer (Ugyanazt csinálja, de sokkal rövidebb!):
  const doubleArrow = (x: number): number => x * 2;

  console.log(`Duplázás hagyományosan (5 * 2): ${doubleTraditional(5)}`);
  console.log(`Duplázás nyíllal (5 * 2): ${doubleArrow(5)}`);

  // Hol találkozunk ezzel a tesztekben?
  // Playwrightban a tesztblokkok mindig így kezdődnek: test('név', async ({ page }) => { ... })
  // A "() => { ... }" jelenti azt, hogy: "Futtasd le a kapcsos zárójelen belüli tesztlépéseket."
}


// ========================================================================
// 5. RÉSZ: OSZTÁLYOK (CLASSES) ÉS METÓDUSOK (METHODS) - A TERVRAJZ METAFORA
// ========================================================================
/**
 * Hogyan magyarázd el a tesztelőknek:
 * "Az OSZTÁLY (Class) egy TERVRAJZ. Például egy autó tervrajza.
 * A tervrajz alapján legyárthatunk konkrét autókat (ezeket hívjuk példányoknak / instance).
 * Az osztályon belüli változókat TULAJDONSÁGOKNAK (Properties) hívjuk (pl. a kocsi színe).
 * Az osztályon belüli függvényeket pedig METÓDUSOKNAK (Methods) hívjuk (pl. beindít, dudál)."
 * 
 * Miért fontos ez a QA-ban?
 * A Page Object Model (POM) teljes egészében osztályokra épül!
 */

// A tervrajz (Class)
class LoginPage {
  // Tulajdonságok (Properties) - Dobozok az osztályon belül
  usernameInputSelector: string = '#username';
  passwordInputSelector: string = '#password';
  submitButtonSelector: string = '#submit-btn';

  // Konstruktor: Ez fut le legelőször, amikor létrehozzuk az oldalt
  constructor() {
    console.log('[POM] LoginPage tervrajz alapján az oldal betöltődött a memóriába.');
  }

  // Metódus (Method) - Egy funkció, amit az oldal meg tud csinálni
  // Figyeld meg: az osztályon belül nem kell kiírni a 'function' szót!
  login(username: string, password: string): void {
    // A 'void' azt jelenti, hogy ez a metódus nem ad vissza értéket (nincs return), csak végrehajt egy akciót.
    console.log(`[POM] Beírom a felhasználónevet a(z) "${this.usernameInputSelector}" mezőbe: ${username}`);
    console.log(`[POM] Beírom a jelszót a(z) "${this.passwordInputSelector}" mezőbe: *******`);
    console.log(`[POM] Rákattintok a gombra: "${this.submitButtonSelector}"`);
    console.log('[POM] Sikeresen bejelentkeztél!');
  }
}

function demoClassesAndMethods() {
  console.log('\n=== 5. RÉSZ: OSZTÁLYOK ÉS METÓDUSOK (POM) DEMÓ ===');

  // Létrehozunk egy konkrét oldalt a tervrajz (Class) alapján a 'new' kulcsszóval!
  const loginPageInstance = new LoginPage();

  // Használjuk az oldal metódusát!
  loginPageInstance.login('admin@testacademy.hu', 'SuperSecretPassword123');
}


// ========================================================================
// FŐ FUTTATÓ FÜGGVÉNY
// ========================================================================
async function main() {
  console.log('========================================================================');
  console.log('         TESTACADEMY TYPESCRIPT PROGRAMOZÁSI ALAPOK WORKSHOP           ');
  console.log('========================================================================');
  
  demoVariables();
  demoDataTypes();
  demoFunctions();
  demoArrowFunctions();
  demoClassesAndMethods();
  
  console.log('\n========================================================================');
  console.log('Szuper! Minden kód lefutott és lefordult hiba nélkül! 🎉');
  console.log('Ezt a fájlt nyugodtan használd oktatási mintaként.');
  console.log('========================================================================');
}

main().catch(console.error);
