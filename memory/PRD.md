# Crypto Wallet App - PRD

## Original Problem Statement
Build a crypto wallet app with:
- 10 hardcoded private keys for login
- Show USDT balance with USD conversion
- Receive deposit functionality
- Send functionality (only if balance exists)
- Pending transaction notices
- No database - localStorage only

## Architecture
- **Frontend**: React with Tailwind CSS
- **Backend**: Not used (all client-side)
- **Storage**: localStorage for session persistence
- **Styling**: Custom CSS with Poppins font

## User Personas
1. **Wallet User**: Enter private key to access wallet, view balances, send/receive crypto
2. **Admin**: Modify ADMIN_BALANCES object in code to set wallet balances

## Core Requirements (Static)
- Private key authentication (10 valid keys)
- Multi-token support (USDT, BTC, ETH, TRX, SOL)
- Real-time USD conversion
- Token-specific wallet addresses
- Bottom navigation (Assets, Transactions, Settings)

## What's Been Implemented (January 2026)
- [x] Login page with private key input only
- [x] Dashboard with total balance (Poppins font, no icon)
- [x] Token list with Trust Wallet icons (full circles)
- [x] USDT with TRON network badge
- [x] Mini charts for each token
- [x] Click token to view wallet address
- [x] Receive modal with random address
- [x] Send modal (enabled only with balance)
- [x] Transactions tab with pending indicator
- [x] Settings with private key display + logout
- [x] Admin balance control via ADMIN_BALANCES object

## Admin Balance Control
To add balance to a wallet, edit ADMIN_BALANCES in `/app/frontend/src/App.js`:
```javascript
const ADMIN_BALANCES = {
  "0x8e7d...": {
    usdt: 500,
    btc: 0.05,
    eth: 0.2,
    trx: 1000,
    sol: 5
  }
};
```

## Valid Private Keys for Login
1. 0x4c0883a69102937d6231471b5dbb6204fe512961708279f9d9bc5f2b1e0a1c3d
2. 0x7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d
3. 0x9f3a2e5b8c7d4f1a6e0b3c8d2f5a9e7b4c1d6f0a3b8e5c2d9f6a0b7e4c1d8f5a
4. 0x2b4c6d8e0f1a3b5c7d9e0f2a4b6c8d0e1f3a5b7c9d0e2f4a6b8c0d1e3f5a7b9c
5. 0x8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d (has balance)
6. 0x1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f2e
7. 0x5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b
8. 0xd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5
9. 0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d
10. 0xf0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1

## Prioritized Backlog
### P0 (Critical)
- None remaining

### P1 (High)
- Real blockchain integration
- QR code generation for receive addresses
- Transaction history storage

### P2 (Medium)
- Biometric authentication
- Multiple wallet support
- Price alerts

## Next Tasks
1. Add more tokens if needed
2. Implement real QR codes
3. Add price refresh functionality
