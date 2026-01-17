# Petri Force: Iterative Implementation Prompts

This document contains a series of step-by-step prompts designed to be used with an AI coding assistant. Execute these sequentially to build the **Petri Force** app.

---

## **Prompt 1: Project Setup & Aesthetic Foundation**
**Goal:** Initialize the project and establish the visual theme.

> "Initialize a new Next.js project (using App Router) with Tailwind CSS. Name it 'petri-force'.
> 
> **Design Language:**  
> Create a 'Theme' that feels **premium, mysterious, and calm** (playing on the name 'Petrichor'). 
> - **Backgrounds:** Deep charcoals/slate grays (Simulate a 'Dark Mode' by default).
> - **Accents:** Earthy teals, rain-slicked blues, and vibrant neon mint for interactions.
> - **Glassmorphism:** Use heavy glass effects for cards and overlays.
> - **Typography:** Use a clean, modern sans-serif font (e.g., Inter or Outfit).
> 
> **Task:**  
> 1. Set up the `layout.tsx` with these base styles.
> 2. Create a refined 'Coin Balance' component that sits at the top right of the screen. Display a dummy balance of 10,000 Coins. Make it look like a piece of high-tech jewelry (glass + glowing border).
> 3. Verify that the app runs and looks premium right from the start."

---

## **Prompt 2: Mobile Navigation & Shell**
**Goal:** Create the main app structure to support navigation.

> "Now, let's build the mobile-first navigation shell.
> 
> **Task:**  
> 1. Create a bottom navigation bar which is fixed at the bottom.
> 2. It should have 3 tabs with modern icons (use Lucid React icons):
>    - **Home:** (Dashboard of current month's haul)
>    - **Scan:** (The center prominent button for uploading screenshots)
>    - **Profile:** (Settings/History)
> 3. Implement the routing so clicking tabs switches views.
> 4. Ensure the styling matches our 'Petri Force' dark glass aesthetic. The bottom bar should blur the content behind it."

---

## **Prompt 3: The 'Scan' Mockup (Input Stage)**
**Goal:** detailed UI for the screenshot upload trigger.

> "Focus on the **'Scan'** tab logic. 
> 
> **Task:**  
> 1. Create a UI that encourages the user to 'Drop the Impulse'.
> 2. Add a large, pulsing drop zone/button to 'Upload Screenshot'.
> 3. For now, since we don't have the backend OCR connected yet, mock the process:
>    - When a file is uploaded (or a 'Simulate Scan' button is clicked), show a high-end scanning animation (lines scanning up and down, terminal text decoding).
>    - After 2 seconds, transition to a new route `/product/new` with pre-filled dummy data: 'Wireless Noise Canceling Headphones', Price: 2,500 Coins, Image: [Placeholder].
> 4. Make the animation feel incredibly satisfying—this is the 'magic' moment."

---

## **Prompt 4: The Mock Product Page (The Hook)**
**Goal:** Render the fake shopping page effectively.

> "Build the **Mock Product Page** (`/product/[id]`).
> 
> **Task:**  
> 1. This page should look like a high-fidelity e-commerce product page (resembling Amazon/Apple store), but styled in our 'Petri Force' dark theme.
> 2. Display: Large Product Image, Title, Price (in Coins), and a Description.
> 3. The most important element is the **'Buy with Coins'** button. It should be massive, glowing, and enticing.
> 4. Add a 'Saved for Later' button that is much less prominent (ghost button style)."

---

## **Prompt 5: Global State & Budget Logic**
**Goal:** Implement the coin system.

> "Let's wire up the logic.
> 
> **Task:**  
> 1. Create a global state store (using React Context or Zustand) to manage:
>    - `monthlyBudget`: 10,000 (constant for now).
>    - `currentSpend`: sum of all items in 'Month's Haul'.
>    - `haulItems`: Array of items purchased this month.
> 2. Update the 'Coin Balance' component to show `(monthlyBudget - currentSpend)`.
> 3. connect the 'Buy with Coins' button on the Product Page:
>    - **If (Price <= Remaining Balance):** Trigger a 'Success' confetti animation, deduct coins, add item to Haul, and redirect to Home.
>    - **If (Price > Remaining Balance):** Show a browser native alert for now saying 'Not enough coins!' (We will upgrade this next)."

---

## **Prompt 6: The "Trade-off" Mechanism (The Core Feature)**
**Goal:** Handle the case where the user is out of budget.

> "Refine the 'Not Enough Coins' flow.
> 
> **Task:**  
> 1. Instead of an alert, open a **'Trade-off Modal'**.
> 2. Text: 'You're out of Coins! To get this, you must sacrifice something else.'
> 3. Display the list of items currently in `haulItems`.
> 4. Allow the user to select an item to 'Return'.
> 5. **Logic:**
>    - If (ReturnedItemPrice + CurrentBalance >= NewItemPrice): Enable a 'Swap' button.
>    - On click 'Swap': Remove the old item, add the new item, update balance, and show the Success animation.
> 6. This is the crucial psychological step, make the UI clear and easy to understand."

---

## **Prompt 7: "Month's Haul" Dashboard**
**Goal:** View the results of the behavior.

> "Finally, polish the **Home (Dashboard)** tab.
> 
> **Task:**  
> 1. Display a beautiful timeline or grid of the 'Month's Haul'.
> 2. Show the total value of items 'Bought' vs 'Saved'.
> 3. Add a visual progress bar showing how much of the 10,000 coin budget is consumed. Color it Green (Low), Yellow (Medium), or Red (High usage).
> 4. Ensure the entire app feels cohesive and bug-free."
> 5. Make sure all the existing test pass and also implement test for the new features you have added and make sure that these new tests pass as well
