/**
 * SDET LEARNING PLAYGROUND: LESSON 3 - STRING MANIPULATION, REGEX, AND JSON
 * ------------------------------------------------------------------------
 * Why this matters for SDETs:
 * UI tests scrape dirty strings (e.g., "$1,240.50 USD", "Invoice ID: #8423-1"). 
 * API tests return raw JSON payloads. As an SDET, you must be able to confidently 
 * clean, parse, and validate this data to run accurate assertions.
 */

// -------------------------------------------------------------
// SECTION 1: REGULAR EXPRESSIONS (REGEX) FOR CLEANING STRINGS
// -------------------------------------------------------------

/**
 * Regex is a search pattern used to match text.
 * Let's analyze the exact regex pattern Daniel wrote: /[^\d.,]/g
 * 
 * Line-by-line breakdown of /[^\d.,]/g :
 * 1.  / ... /  -> Encapsulates the regular expression in JS/TS.
 * 2.  [ ... ]  -> Represents a "character set" (match any character inside this group).
 * 3.  ^        -> Placed inside brackets, it means NEGATION (match anything EXCEPT what is in here).
 * 4.  \d       -> Matches any digit (0-9).
 * 5.  .        -> Matches a literal dot.
 * 6.  ,        -> Matches a literal comma.
 * 7.  g        -> Global flag. Matches ALL occurrences in the string, not just the first one.
 * 
 * Result: "Match every single character that is NOT a number, dot, or comma, and replace it with empty string."
 */

console.log('--- 1. REGEX STRING CLEANING ---');

function extractNumericString(dirtyString: string): string {
  // Let's replace anything that isn't a digit, dot, or comma with an empty string
  const cleaned = dirtyString.replace(/[^\d.,]/g, '');
  console.log(`Original: "${dirtyString}" -> Cleaned: "${cleaned}"`);
  return cleaned;
}

extractNumericString('"$1,240.50 USD"'); // Output: "1,240.50"
extractNumericString('"€99,99 EUR"');    // Output: "99,99"
extractNumericString('"ID: #99321"');      // Output: "99321"


// -------------------------------------------------------------
// SECTION 2: CLEANING PRICES DYNAMICALLY (DANIEL'S ALGORITHM)
// -------------------------------------------------------------
console.log('\n--- 2. THE DYNAMIC PRICE CLEANER (STUDY THIS LOGIC) ---');

/**
 * Here is Daniel's index-comparison algorithm, polished for strict production use.
 * Study the logic of how it decides whether the string represents a US or EU number format.
 */
function cleanPriceToNumber(rawPrice: string): number {
  // Step 1: Clean characters
  const cleaned = rawPrice.replace(/[^\d.,]/g, ''); // e.g. "1.240,50" or "1,240.50"

  // Step 2: Locate index of dividers
  const lastDot = cleaned.lastIndexOf('.');
  const lastComma = cleaned.lastIndexOf(',');

  let normalized: string;

  if (lastDot > lastComma) {
    // US Format: Commas are thousands, Dot is decimal. (e.g. "1,240.50")
    // Action: Remove all commas, keep the dot.
    normalized = cleaned.replace(/,/g, '');
  } else if (lastComma > lastDot) {
    // EU Format: Dots are thousands, Comma is decimal. (e.g. "1.240,50")
    // Action: Remove all dots, replace the comma with a dot.
    normalized = cleaned.replace(/\./g, '').replace(/,/g, '.');
  } else {
    // Plain number without double dividers: "99.99", "99,99" or "99"
    // Action: Just replace comma with dot if present, else keep as is.
    normalized = cleaned.replace(/,/g, '.');
  }

  // Step 3: Parse and safeguard NaN
  const result = parseFloat(normalized);
  return isNaN(result) ? 0 : result;
}

console.log('US Format ($1,240.50):', cleanPriceToNumber('$1,240.50 USD')); // 1240.5
console.log('EU Format (€1.240,50):', cleanPriceToNumber('€1.240,50'));     // 1240.5
console.log('Simple Format (99.99):', cleanPriceToNumber('99.99'));         // 99.99
console.log('Simple Comma (99,99):', cleanPriceToNumber('99,99'));          // 99.99


// -------------------------------------------------------------
// SECTION 3: COMMON STRING OPERATIONS (SPLIT & SLICE)
// -------------------------------------------------------------
console.log('\n--- 3. STRING SPLIT AND SLICE ---');

const invoiceText = 'Invoice_ID: #2026-X843_Pending';

// Split: Divides string into an array based on a separator
const parts = invoiceText.split('_');
console.log('Split Parts:', parts); 
// Output: [ 'Invoice', 'ID: #2026-X843', 'Pending' ]

// Slice: Extracts a section of a string without modifying it
const statusPart = parts[2]; // "Pending"
console.log('Sliced ID:', invoiceText.slice(13, 22)); 
// Output: "2026-X843"


// -------------------------------------------------------------
// SECTION 4: JSON PARSING AND NESTED API VALIDATIONS
// -------------------------------------------------------------
console.log('\n--- 4. JSON HANDLING & API VALIDATION ---');

/**
 * When writing API automation (e.g. REST Assured or Playwright request), 
 * the response payload is returned as a JSON string.
 */
const rawApiResponse = `{
  "status": "success",
  "data": {
    "order": {
      "id": 84210,
      "items": [
        {"name": "Laptop", "price": 999.99},
        {"name": "Mouse", "price": 25.00}
      ]
    }
  }
}`;

// Line-by-line Explanation:
// 1. JSON.parse() takes the string and turns it into a concrete, navigable JS Object.
const payload = JSON.parse(rawApiResponse);

// 2. Now you can safely navigate the nested properties to run assertions!
console.log('Order ID:', payload.data.order.id); // Output: 84210

// 3. We can combine our Array map/reduce methods to calculate order totals!
const orderTotal = payload.data.order.items
  .map((item: any) => item.price)
  .reduce((sum: number, price: number) => sum + price, 0);

console.log('Calculated API Order Total:', orderTotal); // Output: 1024.99
