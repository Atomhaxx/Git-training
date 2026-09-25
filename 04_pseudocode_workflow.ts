/**
 * SDET LEARNING PLAYGROUND: LESSON 4 - THE "PSEUDOCODE FIRST" WORKFLOW
 * ------------------------------------------------------------------
 * Why this matters for SDETs:
 * When you sit in front of a live coding interviewer, they will give you a scenario.
 * If you start typing code immediately, your brain gets overwhelmed trying to solve:
 *   1. The business logic
 *   2. The TypeScript syntax
 *   3. The Playwright waiting rules
 * 
 * Instead, use the "Plan Bulk, Execute Atomic" workflow:
 * Step 1: Write down your thoughts in PLAIN ENGLISH comments.
 * Step 2: Fill in the code underneath, one line at a time.
 */

// -------------------------------------------------------------
// THE SCENARIO:
// "Verify that on our product inventory page, all ELECTRONICS products 
//  that are IN STOCK are sorted by price descending (highest to lowest)."
// -------------------------------------------------------------

// Let's mock a Playwright-like page object containing elements scraped from the DOM.
const mockPageElements = [
  { textContent: async () => 'Wireless Mouse - $29.99', isVisible: async () => true, category: 'electronics', inStock: true },
  { textContent: async () => 'Developer Hoodie - $49.99', isVisible: async () => true, category: 'clothing', inStock: true },
  { textContent: async () => 'Mechanical Keyboard - $89.99', isVisible: async () => true, category: 'electronics', inStock: false }, // OUT OF STOCK
  { textContent: async () => '4K Monitor - $349.99', isVisible: async () => true, category: 'electronics', inStock: true },
];

// Let's write the test logic using the Pseudocode First workflow.
async function verifyElectronicsSortedByPrice() {
  console.log('--- EXECUTING TEST WORKFLOW ---');

  // ===========================================================
  // STEP 1: WRITE THE PSEUDOCODE IN PLAIN ENGLISH COMMENTS
  // ===========================================================
  
  // // 1. Filter out elements that are not in the "electronics" category or are out of stock.
  // // 2. Extract the text content from each of those filtered elements.
  // // 3. Extract the clean numerical price from the text string using Regex.
  // // 4. Create a copy of the prices array and sort it descending (High to Low) to act as our "expected" order.
  // // 5. Assert/Compare the original prices array with the expected sorted array to confirm it matches!

  // ===========================================================
  // STEP 2: IMPLEMENT THE CODE BENEATH EACH COMMENT (LINE-BY-LINE)
  // ===========================================================

  console.log('\n[Executing Step 1] Filtering raw DOM elements...');
  // 1. Filter out elements that are not in the "electronics" category or are out of stock.
  const targetElements = mockPageElements.filter(element => {
    // Only keep if category is electronics AND inStock is true
    return element.category === 'electronics' && element.inStock === true;
  });

  console.log('\n[Executing Step 2] Extracting text content from elements...');
  // 2. Extract the text content from each of those filtered elements.
  // Note: Since textContent() is async and returns a promise, we map to an array of promises, 
  // then resolve them parallelly using Promise.all()!
  const textPromises = targetElements.map(element => element.textContent());
  const rawTexts = await Promise.all(textPromises);
  console.log('Raw Texts Scraped:', rawTexts);
  // Output: [ 'Wireless Mouse - $29.99', '4K Monitor - $349.99' ]

  console.log('\n[Executing Step 3] Extracting clean numerical prices using Regex...');
  // 3. Extract the clean numerical price from the text string using Regex.
  const prices = rawTexts.map(text => {
    // Find everything that is not a digit or dot and remove it
    const cleanedString = text.replace(/[^\d.]/g, '');
    const priceNum = parseFloat(cleanedString);
    return priceNum;
  });
  console.log('Parsed Prices:', prices);
  // Output: [ 29.99, 349.99 ]

  console.log('\n[Executing Step 4] Sorting prices descending to create our "Expected Order"...');
  // 4. Create a copy of the prices array and sort it descending (High to Low) to act as our "expected" order.
  const expectedPrices = [...prices].sort((a, b) => {
    // Sort descending (b - a)
    return b - a;
  });
  console.log('Original Prices (Scraped Order):', prices);
  console.log('Expected Prices (Sorted Order): ', expectedPrices);

  console.log('\n[Executing Step 5] Asserting the UI matches the expected sorting...');
  // 5. Assert/Compare the original prices array with the expected sorted array to confirm it matches!
  // In a real test, you'd write: expect(prices).toEqual(expectedPrices);
  // Let's write the comparison manually line-by-line:
  const isSortedCorrectly = prices.every((price, index) => {
    // Check if every price matches the corresponding price in the expected sorted array
    return price === expectedPrices[index];
  });

  if (isSortedCorrectly) {
    console.log('✅ TEST PASSED: Products are correctly sorted descending by price!');
  } else {
    console.log('❌ TEST FAILED: Products are NOT sorted descending by price.');
    console.log(`Scraped: [${prices.join(', ')}] | Expected: [${expectedPrices.join(', ')}]`);
  }
}

verifyElectronicsSortedByPrice().catch(console.error);
