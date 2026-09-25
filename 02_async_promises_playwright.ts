/**
 * SDET LEARNING PLAYGROUND: LESSON 2 - ASYNC, PROMISES, AND PLAYWRIGHT WAITS
 * ------------------------------------------------------------------------
 * Why this matters for SDETs:
 * Modern web apps load content dynamically. They fetch API data, transition pages, 
 * and render elements at different times. If your automation doesn't handle the 
 * asynchronous nature of JavaScript, your tests will be extremely "flaky" (passing 
 * locally, but failing randomly in CI/CD pipelines under load).
 */

// -------------------------------------------------------------
// SECTION 1: WHAT IS A PROMISE & ASYNC?
// -------------------------------------------------------------

/**
 * A Promise represents a value that is NOT ready yet, but will be ready in the future.
 * Think of it like a buzzer at a restaurant:
 * - You order food (call an async API).
 * - They hand you a buzzer (you get a Promise in a 'PENDING' state).
 * - When the food is ready, the buzzer flashes (the Promise is 'RESOLVED').
 * - If they run out of food, the buzzer turns red (the Promise is 'REJECTED').
 */

// Let's create a simulated API call that takes 1.5 seconds to return data.
function fetchUserData(userId: number): Promise<{ id: number; name: string }> {
  return new Promise((resolve, reject) => {
    console.log(`[API] Fetching data for user ${userId}... (Will take 1.5s)`);
    
    setTimeout(() => {
      if (userId > 0) {
        // Resolve means the operation succeeded! We send the data back.
        resolve({ id: userId, name: `User_${userId}` });
      } else {
        // Reject means it failed. We raise an error.
        reject(new Error('Invalid user ID requested!'));
      }
    }, 1500);
  });
}

// -------------------------------------------------------------
// SECTION 2: HOW TO RESOLVE PROMISES (async / await)
// -------------------------------------------------------------

console.log('--- STARTING ASYNC EXAMPLES ---');

async function runDemo() {
  console.log('\n[1] Starting synchronous execution block');

  /**
   * TRAP: If you don't await a function that returns a Promise, 
   * JavaScript will NOT wait for it. It returns the "Buzzer" (Promise object) and moves on!
   */
  const unawaitedPromise = fetchUserData(101);
  console.log('[Trap Check] Output without await:', unawaitedPromise);
  // Output will be: Promise { <pending> }

  /**
   * CORRECT: Using 'await' pauses execution inside the async function 
   * until the Promise resolves and extracts the actual value!
   */
  const userData = await fetchUserData(102); 
  console.log('[Correct Check] Output with await:', userData);
  // Output will be: { id: 102, name: 'User_102' }
}

// -------------------------------------------------------------
// SECTION 3: PLAYWRIGHT TRAPS - THE "FLAKY" INTERVIEW QUESTION
// -------------------------------------------------------------

/**
 * Below is a simulation of the classic Playwright automation bug.
 * Review this code-block. This mimics what happens inside Playwright.
 */

class MockPlaywrightPage {
  // A simulated locator method. 
  // IMPORTANT: Notice this method is SYNCHRONOUS. It doesn't use 'async' or return a Promise!
  // It simply registers the element path. It does NOT touch the DOM.
  locator(selector: string) {
    console.log(`[Playwright] Registered locator for: ${selector}`);
    return {
      // Immediate check. Checks DOM right this millisecond.
      isVisible: async () => {
        console.log(`[Playwright] Checking DOM for ${selector} RIGHT NOW...`);
        return false; // Pretend it hasn't finished rendering yet (takes 50ms)
      },
      // Web-First auto-waiting assertion simulation
      toBeVisible: async (timeoutMs: number = 5000) => {
        console.log(`[Playwright] Auto-polling DOM for ${selector} for up to ${timeoutMs}ms...`);
        // Under the hood, Playwright will repeatedly poll the DOM in a loop:
        // isVisible? No... sleep 100ms... isVisible? No... sleep 100ms... isVisible? YES!
        return true; 
      }
    };
  }
}

async function runPlaywrightSimulation() {
  console.log('\n--- PLAYWRIGHT SIMULATION START ---');
  const page = new MockPlaywrightPage();

  console.log('\n[Step 1] User clicks submit button. Success modal is triggered in the background...');
  
  // 1. Defining the locator is fully synchronous.
  // TRAP: Never write `await page.locator(...)` — it does nothing and is a code smell!
  const successAlert = page.locator('.alert-success'); 

  // 2. The Flaky Way (Instant check):
  console.log('\n[The Flaky Way] Checking visibility with raw isVisible():');
  const visible = await successAlert.isVisible(); 
  console.log(`Is visible? ${visible}`); 
  // Result: false (Failed!) because the modal hadn't finished its fade-in animation.

  // 3. The Web-First Way (Auto-waiting):
  console.log('\n[The Web-First Way] Checking visibility with expect().toBeVisible():');
  // Under the hood, this will poll until the element renders, passing safely!
  const assertionPasses = await successAlert.toBeVisible();
  console.log(`Did the auto-waiting assertion pass? ${assertionPasses}`);
  // Result: true (Success!)
}

// -------------------------------------------------------------
// SECTION 4: CONCURRENCY WITH Promise.all()
// -------------------------------------------------------------

/**
 * Why SDETs use it: 
 * If you need to make 3 separate database calls or API requests to prepare test data, 
 * doing them sequentially with:
 *   await query1;
 *   await query2;
 *   await query3;
 * takes (Time1 + Time2 + Time3). 
 * 
 * Using Promise.all() runs them concurrently in parallel, taking only the time of the SLOWEST query!
 */
async function runParallelDemo() {
  console.log('\n--- PARALLEL PROMISE DEMO ---');
  
  const startTime = Date.now();

  console.log('[Promise.all] Starting 3 API calls at the same time...');
  
  // This starts all three requests simultaneously!
  const [user1, user2, user3] = await Promise.all([
    fetchUserData(1),
    fetchUserData(2),
    fetchUserData(3)
  ]);

  const endTime = Date.now();
  console.log(`[Promise.all] Completed! Results:`, [user1, user2, user3]);
  console.log(`[Promise.all] Total Execution Time: ${((endTime - startTime) / 1000).toFixed(2)}s`);
  // Total time will be ~1.5s, NOT 4.5s!
}

// Helper to trigger the async execution flow
async function main() {
  await runDemo();
  await runPlaywrightSimulation();
  await runParallelDemo();
}

main().catch(console.error);
