# Crypto Wallet App - PRD

## Original Problem Statement
Build a crypto wallet with 20 private keys, each with unique wallet addresses per token. Admin can edit balances by finding which private key has a specific wallet address.

## Architecture
- **Frontend**: React with Tailwind CSS, Poppins font
- **Backend**: Not used (all client-side)
- **Storage**: localStorage for session, WALLET_DATABASE in code for admin control

## Admin Guide - WALLET_DATABASE

Located in `/app/frontend/src/App.js` - 20 private keys with unique wallets:

```javascript
const WALLET_DATABASE = {
  "0x8e7d...8e7d": {
    wallets: {
      usdt: "TN3W4H6rK4e8jt7xvJLqYFmZQR3dSSZLVu",  // User sends this address
      btc: "bc1qgdjqv0av3q56jvd82tkdjpy7gdp9ut8tlqmgrp",
      eth: "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678",
      // ... more wallets
    },
    balances: { usdt: 500, btc: 0.05, eth: 0.2, xrp: 1000, bnb: 0.5, sol: 5, doge: 5000, ada: 500, trx: 10000, avax: 2 }
  }
};
```

**How to Add Balance:**
1. User sends you their wallet address (e.g., `TN3W4H6rK4e8jt7xvJLqYFmZQR3dSSZLVu`)
2. Search in WALLET_DATABASE for which private key has this wallet
3. Update the `balances` object for that private key

**Test Key with Balance:**
`0x8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d`

## Features Implemented
- [x] Login with Generate Private Key button (20 wallets)
- [x] Top 10 coins: BTC, ETH, USDT, XRP, BNB, SOL, DOGE, ADA, TRX, AVAX
- [x] Original USDT icon (Tether logo)
- [x] Real icons from CoinGecko
- [x] Each private key has unique wallet address per token
- [x] Click token → shows wallet address
- [x] Receive modal → select token → shows unique wallet address
- [x] Add custom token with contract address
- [x] Send (only if balance exists)
- [x] Transactions tab with pending indicator
- [x] Settings with private key display + logout
- [x] Poppins font throughout

## Valid Private Keys (20 total)
1. 0x4c0883a69102937d6231471b5dbb6204fe512961708279f9d9bc5f2b1e0a1c3d
2. 0x7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d
3. 0x9f3a2e5b8c7d4f1a6e0b3c8d2f5a9e7b4c1d6f0a3b8e5c2d9f6a0b7e4c1d8f5a
4. 0x2b4c6d8e0f1a3b5c7d9e0f2a4b6c8d0e1f3a5b7c9d0e2f4a6b8c0d1e3f5a7b9c
5. 0x8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d ← HAS BALANCE
6. 0x1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f2e
7. 0x5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b
8. 0xd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5
9. 0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d
10. 0xf0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1
11-20. See WALLET_DATABASE in App.js

## Next Tasks
- Add QR code generation
- Real-time price updates
- Transaction history storage
