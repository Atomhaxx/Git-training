/**
 * SDET LEARNING PLAYGROUND: LESSON 1 - ARRAYS AND OBJECTS IN TS/JS
 * -------------------------------------------------------------
 * Why this matters for SDETs: 
 * UIs and APIs return lists of data (lists of prices, list of user rows, list of api elements). 
 * If you write standard old-school 'for' loops every time you want to check a condition, 
 * your code becomes long, hard to read, and error-prone. Modern JS/TS array methods 
 * solve these issues in 1-2 lines of clean code.
 */

// -------------------------------------------------------------
// SECTION 1: THE DATA MODEL
// -------------------------------------------------------------

// Let's define the interface (schema) for our dynamic UI/API data.
interface Product {
  id: number;
  name: string;
  price: number;
  category: 'electronics' | 'clothing' | 'books';
  inStock: boolean;
  rating: number;
}

// Imagine this is the data scraped from an e-commerce website UI or returned from GET /api/products
const productsList: Product[] = [
  { id: 1, name: 'Wireless Mouse', price: 29.99, category: 'electronics', inStock: true, rating: 4.5 },
  { id: 2, name: 'Developer Hoodie', price: 49.99, category: 'clothing', inStock: true, rating: 4.8 },
  { id: 3, name: 'HTML5 for Dummies Book', price: 19.99, category: 'books', inStock: false, rating: 3.2 },
  { id: 4, name: '4K Monitor', price: 349.99, category: 'electronics', inStock: true, rating: 4.7 },
  { id: 5, name: 'Mechanical Keyboard', price: 89.99, category: 'electronics', inStock: false, rating: 4.6 },
  { id: 6, name: 'Clean Code Book', price: 35.00, category: 'books', inStock: true, rating: 4.9 },
];

// -------------------------------------------------------------
// SECTION 2: THE ARRAY METHODS EXPLAINED LINE-BY-LINE
// -------------------------------------------------------------

/**
 * METHOD 1: .filter()
 * What it does: Creates a NEW array containing only elements that match a condition.
 * Trap: You MUST return a boolean (true to keep it, false to discard it).
 */
console.log('--- 1. FILTERING PRODUCTS IN STOCK ---');

// Code:
const inStockProducts = productsList.filter((product: Product) => {
  // Line-by-line Explanation:
  // 1. filter() loops through every single 'product' inside productsList.
  // 2. We return a boolean expression. If product.inStock is true, this product goes into the new array.
  return product.inStock === true; 
});

console.log(inStockProducts.map(p => p.name)); 
// Output: [ 'Wireless Mouse', 'Developer Hoodie', '4K Monitor', 'Clean Code Book' ]


/**
 * METHOD 2: .map()
 * What it does: Loops over an array and transforms EVERY item into something new, returning a new array.
 * Why SDETs use it: Extracting string values from complex DOM elements or JSON payloads.
 */
console.log('\n--- 2. EXTRACTING ONLY NAMES ---');

// Code:
const productNames = productsList.map((product: Product) => {
  // Line-by-line Explanation:
  // 1. map() takes each product object.
  // 2. Instead of returning the whole object, we return just the product.name (string).
  // 3. The final result is a clean array of strings.
  return product.name;
});

console.log(productNames);
// Output: [ 'Wireless Mouse', 'Developer Hoodie', 'HTML5 for Dummies Book', ... ]


/**
 * METHOD 3: .find()
 * What it does: Searches the array and returns the FIRST item that matches a condition.
 * Trap: If no item matches, it returns undefined.
 */
console.log('\n--- 3. FINDING A SPECIFIC ITEM ---');

// Code:
const monitor = productsList.find((product: Product) => {
  // Line-by-line Explanation:
  // 1. find() evaluates each product one by one.
  // 2. The moment it hits an item where product.id is exactly 4, it returns that item and STOPS looping.
  return product.id === 4;
});

console.log(monitor);
// Output: { id: 4, name: '4K Monitor', price: 349.99, ... }


/**
 * METHOD 4: .some() and .every()
 * What they do: 
 *   - .some() checks if AT LEAST ONE item matches a condition (returns boolean).
 *   - .every() checks if ALL items match a condition (returns boolean).
 * Why SDETs use it: Extremely powerful for instant UI assertions!
 */
console.log('\n--- 4. ASSERTIONS WITH SOME AND EVERY ---');

// Code (checking if any item is out of stock):
const hasOutOfStockItems = productsList.some((product: Product) => {
  return product.inStock === false; 
});
console.log(`Are there out of stock items? ${hasOutOfStockItems}`); // Output: true

// Code (verifying if all items have a rating higher than 3.0):
const allHighlyRated = productsList.every((product: Product) => {
  return product.rating > 3.0;
});
console.log(`Are all items rated > 3.0? ${allHighlyRated}`); // Output: true


/**
 * METHOD 5: .sort()
 * What it does: Sorts items in place based on a comparator function.
 * Trap: .sort() MUTATES the original array. If you want to keep the original array safe, 
 * use the spread operator [...array].sort() to create a shallow copy first!
 */
console.log('\n--- 5. SORTING PRICES LOW TO HIGH ---');

// Code:
const sortedProducts = [...productsList].sort((a: Product, b: Product) => {
  // Line-by-line Explanation:
  // 1. We copy the array with [...productsList] so we don't break the original order.
  // 2. We pass a comparator function with two items: 'a' and 'b'.
  // 3. Returning (a.price - b.price) sorts ASCENDING (low to high).
  //    - If positive, 'b' is placed before 'a'.
  //    - If negative, 'a' is placed before 'b'.
  //    - If zero, their order remains unchanged.
  // Tip: To sort DESCENDING (high to low), return (b.price - a.price).
  return a.price - b.price;
});

console.log(sortedProducts.map(p => `${p.name}: $${p.price}`));


/**
 * METHOD 6: .reduce()
 * What it does: Accumulates all values in an array into a single result (e.g., a total sum).
 * Why SDETs use it: Verifying cart totals on UI checkouts vs expected mathematical totals.
 */
console.log('\n--- 6. CALCULATING TOTAL VALUE WITH REDUCE ---');

// Code:
const totalCartValue = productsList.reduce(
  (accumulator: number, currentProduct: Product) => {
    // Line-by-line Explanation:
    // 1. accumulator is our running total.
    // 2. currentProduct is the active item in the loop.
    // 3. We return the new running total: accumulator + currentProduct.price.
    return accumulator + currentProduct.price;
  }, 
  0 // <--- CRITICAL: This '0' is the starting value for the accumulator!
);

console.log(`Total Inventory Value: $${totalCartValue.toFixed(2)}`); // Output: $584.95

// -------------------------------------------------------------
// PRACTICE INTERVIEW EXERCISE FOR DANIEL
// -------------------------------------------------------------
/**
 * Challenge: Write a single pipeline that:
 * 1. Filters only 'electronics' category.
 * 2. Filters only items that are inStock.
 * 3. Maps them to get their prices.
 * 4. Sums the total price.
 */
const totalElectronicsInStock = productsList
  .filter(p => p.category === 'electronics' && p.inStock) // Gets Wireless Mouse and 4K Monitor
  .map(p => p.price)                                       // Gets array: [29.99, 349.99]
  .reduce((sum, price) => sum + price, 0);                 // Sums them: 379.98

console.log(`\nPractice Exercise result: $${totalElectronicsInStock}`);
