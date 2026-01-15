import { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { 
  Wallet, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Copy, 
  Check,
  Clock,
  X,
  LogOut,
  TrendingUp,
  TrendingDown,
  LayoutGrid,
  Receipt,
  Settings,
  Eye,
  EyeOff
} from "lucide-react";

// ============================================
// ADMIN SECTION - ADD BALANCES HERE
// ============================================
// To add balance to a wallet, add entries below:
// Format: "private_key": { usdt: amount, btc: amount, eth: amount, trx: amount, sol: amount }
const ADMIN_BALANCES = {
  "0x4c0883a69102937d6231471b5dbb6204fe512961708279f9d9bc5f2b1e0a1c3d": {
    usdt: 0,
    btc: 0,
    eth: 0,
    trx: 0,
    sol: 0
  },
  "0x7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d": {
    usdt: 0,
    btc: 0,
    eth: 0,
    trx: 0,
    sol: 0
  },
  "0x9f3a2e5b8c7d4f1a6e0b3c8d2f5a9e7b4c1d6f0a3b8e5c2d9f6a0b7e4c1d8f5a": {
    usdt: 0,
    btc: 0,
    eth: 0,
    trx: 0,
    sol: 0
  },
  "0x2b4c6d8e0f1a3b5c7d9e0f2a4b6c8d0e1f3a5b7c9d0e2f4a6b8c0d1e3f5a7b9c": {
    usdt: 0,
    btc: 0,
    eth: 0,
    trx: 0,
    sol: 0
  },
  "0x8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d": {
    usdt: 500,
    btc: 0.05,
    eth: 0.2,
    trx: 1000,
    sol: 5
  },
  "0x1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f2e": {
    usdt: 0,
    btc: 0,
    eth: 0,
    trx: 0,
    sol: 0
  },
  "0x5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b": {
    usdt: 0,
    btc: 0,
    eth: 0,
    trx: 0,
    sol: 0
  },
  "0xd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5": {
    usdt: 0,
    btc: 0,
    eth: 0,
    trx: 0,
    sol: 0
  },
  "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d": {
    usdt: 0,
    btc: 0,
    eth: 0,
    trx: 0,
    sol: 0
  },
  "0xf0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1": {
    usdt: 0,
    btc: 0,
    eth: 0,
    trx: 0,
    sol: 0
  }
};
// ============================================

// Valid Private Keys (same keys as in ADMIN_BALANCES)
const VALID_PRIVATE_KEYS = Object.keys(ADMIN_BALANCES);

// Token data with real icons and current prices
const TOKENS = [
  { 
    id: "usdt", 
    name: "Tether USD", 
    symbol: "USDT", 
    price: 1.00, 
    change: -0.01,
    icon: "https://assets-cdn.trustwallet.com/blockchains/tron/assets/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t/logo.png",
    color: "#26A17B",
    chartData: [1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
    network: "TRC20"
  },
  { 
    id: "btc", 
    name: "Bitcoin", 
    symbol: "BTC", 
    price: 43250.80, 
    change: 2.45,
    icon: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    color: "#F7931A",
    chartData: [42100, 42500, 41800, 43000, 43500, 42800, 43250],
    network: "Bitcoin"
  },
  { 
    id: "eth", 
    name: "Ethereum", 
    symbol: "ETH", 
    price: 2580.40, 
    change: 1.82,
    icon: "https://assets-cdn.trustwallet.com/blockchains/ethereum/info/logo.png",
    color: "#627EEA",
    chartData: [2450, 2520, 2480, 2550, 2600, 2560, 2580],
    network: "ERC20"
  },
  { 
    id: "trx", 
    name: "TRON", 
    symbol: "TRX", 
    price: 0.1045, 
    change: -0.85,
    icon: "https://assets-cdn.trustwallet.com/blockchains/tron/info/logo.png",
    color: "#FF0013",
    chartData: [0.105, 0.104, 0.106, 0.103, 0.105, 0.104, 0.1045],
    network: "TRC20"
  },
  { 
    id: "sol", 
    name: "Solana", 
    symbol: "SOL", 
    price: 98.75, 
    change: 4.12,
    icon: "https://assets-cdn.trustwallet.com/blockchains/solana/info/logo.png",
    color: "#9945FF",
    chartData: [92, 94, 95, 96, 97, 99, 98.75],
    network: "Solana"
  }
];

// Generate random wallet address for receiving
const generateRandomAddress = () => {
  const chars = '0123456789abcdef';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
};

// Mini Chart Component
const MiniChart = ({ data, color, isPositive }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="80" height="32" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={isPositive ? "#00FF94" : "#FF0055"}
        strokeWidth="3"
        points={points}
      />
    </svg>
  );
};

// Login Page Component
const LoginPage = ({ onLogin }) => {
  const [privateKey, setPrivateKey] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const trimmedKey = privateKey.trim().toLowerCase();
    if (VALID_PRIVATE_KEYS.map(k => k.toLowerCase()).includes(trimmedKey)) {
      const matchedKey = VALID_PRIVATE_KEYS.find(k => k.toLowerCase() === trimmedKey);
      onLogin(matchedKey);
      toast.success("Wallet connected!");
    } else {
      setError("Invalid private key. Please check and try again.");
      toast.error("Invalid private key");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-page" data-testid="login-page">
      <div className="login-logo">
        <Wallet size={40} color="#000000" />
      </div>
      
      <h1 className="text-3xl font-bold text-center mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
        Crypto Wallet
      </h1>
      <p className="text-center text-[#A1A1AA] mb-8">
        Enter your private key to access your wallet
      </p>

      <div className="space-y-4">
        <div>
          <input
            type="password"
            value={privateKey}
            onChange={(e) => {
              setPrivateKey(e.target.value);
              setError("");
            }}
            onKeyPress={handleKeyPress}
            placeholder="Enter your private key (0x...)"
            className="wallet-input"
            data-testid="private-key-input"
          />
          {error && (
            <p className="text-[#FF0055] text-sm mt-2">{error}</p>
          )}
        </div>

        <button 
          onClick={handleLogin}
          disabled={!privateKey}
          className="primary-btn w-full"
          data-testid="login-btn"
        >
          Access Wallet
        </button>
      </div>

      <p className="text-center text-[#52525B] text-sm mt-8">
        Keep your private key secure. Never share it with anyone.
      </p>
    </div>
  );
};

// Main Wallet Dashboard
const WalletDashboard = ({ privateKey, onLogout }) => {
  const [balances, setBalances] = useState({
    usdt: 0,
    btc: 0,
    eth: 0,
    trx: 0,
    sol: 0
  });
  const [activeTab, setActiveTab] = useState("assets");
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);

  // Load balances from ADMIN_BALANCES
  useEffect(() => {
    if (ADMIN_BALANCES[privateKey]) {
      setBalances(ADMIN_BALANCES[privateKey]);
    }
  }, [privateKey]);

  // Calculate total USD value
  const totalUSD = TOKENS.reduce((sum, token) => {
    return sum + (balances[token.id] || 0) * token.price;
  }, 0);

  // Check if wallet has any balance
  const hasBalance = totalUSD > 0;

  // Get tokens with balance
  const tokensWithBalance = TOKENS.filter(token => balances[token.id] > 0);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      toast.success("Copied to clipboard!");
    }
  };

  const handleTokenClick = (token) => {
    setSelectedToken(token);
    setShowTokenModal(true);
  };

  return (
    <div className="wallet-app" data-testid="wallet-dashboard">
      <Toaster position="top-center" theme="dark" />
      
      {/* Header */}
      <div className="flex items-center justify-center p-4 border-b border-[#1a1a1a]">
        <h1 className="text-lg font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
          YOUR WALLET
        </h1>
      </div>

      {/* Tab Content */}
      <div className="page-content">
        {activeTab === "assets" && (
          <>
            {/* Balance Display - No icon, just balance */}
            <div className="text-center py-10 px-4 bg-gradient-to-b from-[#0a1a0f] to-[#050505]">
              <div className="text-[#A1A1AA] text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Total Balance</div>
              <div className="balance-display text-white" data-testid="total-balance" style={{ fontFamily: 'Poppins, sans-serif' }}>
                ${totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-6 py-6 border-b border-[#1a1a1a]">
              <div className="flex flex-col items-center gap-2">
                <button 
                  className="action-btn"
                  onClick={() => setShowReceiveModal(true)}
                  data-testid="receive-btn"
                >
                  <ArrowDownLeft size={24} color="#FFFFFF" />
                </button>
                <span className="text-sm text-[#A1A1AA]">Receive</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button 
                  className={`action-btn ${!hasBalance ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => hasBalance && setShowSendModal(true)}
                  disabled={!hasBalance}
                  data-testid="send-btn"
                >
                  <ArrowUpRight size={24} color="#FFFFFF" />
                </button>
                <span className="text-sm text-[#A1A1AA]">Send</span>
              </div>
            </div>

            {/* Token List */}
            <div className="token-list" data-testid="token-list">
              {TOKENS.map((token) => (
                <div 
                  key={token.id} 
                  className="token-item cursor-pointer"
                  onClick={() => handleTokenClick(token)}
                  data-testid={`token-${token.id}`}
                >
                  <div className="token-icon">
                    <img src={token.icon} alt={token.name} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>{token.name}</div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-[#A1A1AA]">
                        ${token.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: token.price < 1 ? 4 : 2 })}
                      </span>
                      <span className={`flex items-center gap-1 ${token.change >= 0 ? "price-up" : "price-down"}`}>
                        {token.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {token.change >= 0 ? "+" : ""}{token.change}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <MiniChart data={token.chartData} color={token.color} isPositive={token.change >= 0} />
                    <div className="text-right">
                      <div className="font-medium text-white" data-testid={`balance-${token.id}`}>
                        {(balances[token.id] || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 })} {token.symbol}
                      </div>
                      <div className="text-sm text-[#A1A1AA]">
                        ${((balances[token.id] || 0) * token.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "transactions" && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Transactions
            </h2>
            {hasBalance ? (
              <div className="space-y-4">
                <div className="pending-transaction">
                  <div className="flex items-center gap-3">
                    <div className="pending-dot-large" />
                    <div>
                      <div className="font-medium text-[#FFD600]">Transaction Pending</div>
                      <div className="text-sm text-[#A1A1AA]">
                        Please wait until confirmed...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <Receipt size={48} color="#3F3F46" />
                <p className="text-[#A1A1AA] mt-4">No transactions yet</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Settings
            </h2>
            
            <div className="space-y-4">
              {/* Private Key Section */}
              <div className="settings-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#A1A1AA]">Your Private Key</span>
                  <button 
                    onClick={() => setShowPrivateKey(!showPrivateKey)}
                    className="text-[#00FF94] text-sm flex items-center gap-1"
                    data-testid="toggle-key-visibility"
                  >
                    {showPrivateKey ? <EyeOff size={16} /> : <Eye size={16} />}
                    {showPrivateKey ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="private-key-display" data-testid="settings-private-key">
                  {showPrivateKey ? privateKey : "••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"}
                </div>
                <button 
                  onClick={() => copyToClipboard(privateKey)}
                  className="copy-btn w-full justify-center mt-3"
                  data-testid="copy-private-key"
                >
                  <Copy size={16} />
                  Copy Private Key
                </button>
              </div>

              {/* Logout Button */}
              <button 
                onClick={onLogout}
                className="logout-btn w-full"
                data-testid="logout-btn"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div 
          className={`nav-item ${activeTab === 'assets' ? 'active' : ''}`}
          onClick={() => setActiveTab('assets')}
          data-testid="nav-assets"
        >
          <LayoutGrid size={24} />
          <span className="text-xs">Assets</span>
        </div>
        <div 
          className={`nav-item ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
          data-testid="nav-transactions"
        >
          <Receipt size={24} />
          <span className="text-xs">Transactions</span>
          {hasBalance && <div className="nav-badge" />}
        </div>
        <div 
          className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
          data-testid="nav-settings"
        >
          <Settings size={24} />
          <span className="text-xs">Settings</span>
        </div>
      </div>

      {/* Receive Modal */}
      {showReceiveModal && (
        <ReceiveModal 
          address={receiveAddress}
          onClose={() => setShowReceiveModal(false)}
          copyToClipboard={copyToClipboard}
        />
      )}

      {/* Send Modal */}
      {showSendModal && (
        <SendModal 
          balances={balances}
          tokens={TOKENS}
          onClose={() => setShowSendModal(false)}
        />
      )}
    </div>
  );
};

// Receive Modal
const ReceiveModal = ({ address, onClose, copyToClipboard }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyToClipboard(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose} data-testid="receive-modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-[#27272A]">
          <h2 className="text-xl font-bold" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Receive
          </h2>
          <button onClick={onClose} className="p-2" data-testid="close-receive-modal">
            <X size={24} color="#A1A1AA" />
          </button>
        </div>

        <div className="p-6">
          {/* QR Code Placeholder */}
          <div className="qr-container mb-6">
            <div className="qr-code">
              {/* Simple QR-like pattern */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect x="10" y="10" width="25" height="25" fill="#000"/>
                <rect x="65" y="10" width="25" height="25" fill="#000"/>
                <rect x="10" y="65" width="25" height="25" fill="#000"/>
                <rect x="15" y="15" width="15" height="15" fill="#fff"/>
                <rect x="70" y="15" width="15" height="15" fill="#fff"/>
                <rect x="15" y="70" width="15" height="15" fill="#fff"/>
                <rect x="18" y="18" width="9" height="9" fill="#000"/>
                <rect x="73" y="18" width="9" height="9" fill="#000"/>
                <rect x="18" y="73" width="9" height="9" fill="#000"/>
                <rect x="40" y="10" width="5" height="5" fill="#000"/>
                <rect x="50" y="10" width="5" height="5" fill="#000"/>
                <rect x="40" y="20" width="5" height="5" fill="#000"/>
                <rect x="45" y="25" width="5" height="5" fill="#000"/>
                <rect x="40" y="40" width="20" height="20" fill="#000"/>
                <rect x="45" y="45" width="10" height="10" fill="#fff"/>
                <rect x="48" y="48" width="4" height="4" fill="#000"/>
                <rect x="65" y="40" width="5" height="5" fill="#000"/>
                <rect x="75" y="45" width="5" height="5" fill="#000"/>
                <rect x="85" y="40" width="5" height="5" fill="#000"/>
                <rect x="10" y="45" width="5" height="5" fill="#000"/>
                <rect x="20" y="50" width="5" height="5" fill="#000"/>
                <rect x="65" y="65" width="25" height="25" fill="#000"/>
                <rect x="70" y="70" width="15" height="15" fill="#fff"/>
                <rect x="73" y="73" width="9" height="9" fill="#000"/>
              </svg>
            </div>
          </div>

          <div className="text-center mb-4">
            <div className="text-sm text-[#A1A1AA] mb-2">Your Receive Address</div>
            <div className="private-key-display text-center" data-testid="wallet-address">
              {address}
            </div>
          </div>

          <button 
            onClick={handleCopy}
            className="copy-btn w-full justify-center"
            data-testid="copy-address-btn"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied!" : "Copy Address"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Send Modal
const SendModal = ({ balances, tokens, onClose }) => {
  const [amount, setAmount] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [selectedTokenId, setSelectedTokenId] = useState("usdt");

  // Get only tokens with balance
  const availableTokens = tokens.filter(t => balances[t.id] > 0);
  const selectedToken = tokens.find(t => t.id === selectedTokenId);
  const maxAmount = balances[selectedTokenId] || 0;

  const handleSend = () => {
    if (!amount || !toAddress) {
      toast.error("Please fill all fields");
      return;
    }
    if (parseFloat(amount) > maxAmount) {
      toast.error("Insufficient balance");
      return;
    }
    toast.info("Transaction submitted - pending confirmation");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} data-testid="send-modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-[#27272A]">
          <h2 className="text-xl font-bold" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Send
          </h2>
          <button onClick={onClose} className="p-2" data-testid="close-send-modal">
            <X size={24} color="#A1A1AA" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm text-[#A1A1AA] mb-2 block">Select Token</label>
            <div className="token-select-grid">
              {availableTokens.map(token => (
                <button
                  key={token.id}
                  className={`token-select-btn ${selectedTokenId === token.id ? 'active' : ''}`}
                  onClick={() => setSelectedTokenId(token.id)}
                >
                  <img src={token.icon} alt={token.symbol} className="w-6 h-6" />
                  <span>{token.symbol}</span>
                </button>
              ))}
            </div>
            <div className="text-sm text-[#A1A1AA] mt-2">
              Available: {maxAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 })} {selectedToken?.symbol}
            </div>
          </div>

          <div>
            <label className="text-sm text-[#A1A1AA] mb-2 block">Recipient Address</label>
            <input
              type="text"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              placeholder="Enter wallet address (0x...)"
              className="wallet-input"
              data-testid="send-address-input"
            />
          </div>

          <div>
            <label className="text-sm text-[#A1A1AA] mb-2 block">Amount</label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="wallet-input pr-20"
                data-testid="send-amount-input"
              />
              <button 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00FF94] text-sm font-medium"
                onClick={() => setAmount(maxAmount.toString())}
              >
                MAX
              </button>
            </div>
            {amount && selectedToken && (
              <div className="text-sm text-[#A1A1AA] mt-2">
                ≈ ${(parseFloat(amount || 0) * selectedToken.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
              </div>
            )}
          </div>

          <button 
            className="primary-btn w-full"
            disabled={!amount || !toAddress}
            onClick={handleSend}
            data-testid="confirm-send-btn"
          >
            Send {selectedToken?.symbol}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [privateKey, setPrivateKey] = useState(null);

  // Check for existing session
  useEffect(() => {
    const storedKey = localStorage.getItem('current_wallet_key');
    if (storedKey && VALID_PRIVATE_KEYS.includes(storedKey)) {
      setPrivateKey(storedKey);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (key) => {
    setPrivateKey(key);
    setIsLoggedIn(true);
    localStorage.setItem('current_wallet_key', key);
  };

  const handleLogout = () => {
    setPrivateKey(null);
    setIsLoggedIn(false);
    localStorage.removeItem('current_wallet_key');
    toast.success("Logged out successfully");
  };

  return (
    <div className="App">
      <Toaster position="top-center" theme="dark" richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            isLoggedIn ? (
              <WalletDashboard 
                privateKey={privateKey} 
                onLogout={handleLogout}
              />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
