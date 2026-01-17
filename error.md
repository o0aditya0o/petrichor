# Project Errors

## 1. Context/Store in Server Component (CoinBalance)

### Error Log
```
⨯ TypeError: useSyncExternalStore only works in Client Components. Add the "use client" directive at the top of the file to use it. Read more: https://nextjs.org/docs/messages/react-client-hook-in-server-component
    at CoinBalance (src/components/CoinBalance.tsx:5:38)
      const remainingBalance = useStore((state) => state.getRemainingBalance());
                                      ^
```

### Analysis
**What happened:**  
The `CoinBalance` component attempts to use `useStore` (a custom hook wrapping Zustand). In Next.js App Router, all components are **Server Components** by default. Server Components cannot run React Hooks (like `useSyncExternalStore`, `useState`, `useEffect`) because they run on the server where these interactive React features don't exist.

**Root Cause:**  
Missing the `'use client'` directive at the top of `src/components/CoinBalance.tsx`.

**How to avoid in the future:**  
- Whenever introducing a Hook (state, effects, or external stores like Zustand) into a component, immediately mark that file with `'use client';` at the very top.
- run `npm run dev` more frequently when introducing stateful logic to catch these component boundary issues early.

### Fix Prompt
> "I am getting a 'useSyncExternalStore only works in Client Components' error in `src/components/CoinBalance.tsx`. Please fix this by converting the `CoinBalance` component into a Client Component."
