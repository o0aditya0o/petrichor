# Product Specification: Petri Force (Project Petrichor)

## 1. Vision & Core Value
**Petri Force** is an anti-impulse buying tool that gamifies the experience of "not buying right now." By replacing the immediate satisfaction of real e-commerce checkout with a high-fidelity **Mock Purchase** experience, the app satisfies the user's psychological need to "buy" while enforcing financial discipline. It acts as a buffer layer where impulsive desires battle against a strict, gamified monthly budget ("Coins").

## 2. Core User Flow

### Step 1: The Trigger (Screenshot)
- User browses any shopping app (Amazon, Flipkart, Myntra, etc.).
- Finds an impulsive buy item.
- **Action:** Takes a screenshot of the product page.
- **Action:** Uploads the screenshot to Petri Force.

### Step 2: The "Magic" Rendering
- Petri Force analyzes the screenshot to extract:
    - Product Image
    - Product Name
    - Price
- **Action:** App generates a **Mock Product Page** within Petri Force that looks and feels like a real shopping interface.

### Step 3: The Mock Purchase
- User clicks "Buy Now" in Petri Force.
- **Budget Check:**
    - **Scenario A (Enough Coins):**
        - The "transaction" succeeds.
        - Animation mimics a successful payment/order confirmation.
        - Item is added to the **"Month's Haul"** list.
        - Cost is deducted from the monthly Coin balance.
    - **Scenario B (Insufficient Coins):**
        - The purchase is blocked.
        - User receives a nudge: "Not enough coins."
        - **Decision:** User must go to their "Month's Haul" list and remove (return) a previously saved item to free up coins for the new one.

### Step 4: Monthly Calibration
- At the end of the month, the user reviews the "Month's Haul".
- This list represents the curated, budget-compliant set of items the user *can* actually buy if they still want them.

## 3. Key Concepts
- **Monthly Disposable Budget:** A fixed amount (e.g., 10,000 Coins) resets or rolls over each month.
- **The Trade-off Mechanism:** Forces users to prioritize. To buy a new impulsive item when over budget, they *must* sacrifice a previous one.
