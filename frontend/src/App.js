import { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { 
  Wallet, 
  Grid3X3, 
  Settings, 
  ArrowDownLeft, 
  QrCode, 
  ArrowUpRight, 
  Search, 
  Copy, 
  Check,
  Plus,
  AlertCircle,
  Clock,
  X,
  RefreshCw
} from "lucide-react";

// 10 Hardcoded Private Keys
const PRIVATE_KEYS = [
  "0x4c0883a69102937d6231471b5dbb6204fe512961708279f9d9bc5f2b1e0a1c3d",
  "0x7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d",
  "0x9f3a2e5b8c7d4f1a6e0b3c8d2f5a9e7b4c1d6f0a3b8e5c2d9f6a0b7e4c1d8f5a",
  "0x2b4c6d8e0f1a3b5c7d9e0f2a4b6c8d0e1f3a5b7c9d0e2f4a6b8c0d1e3f5a7b9c",
  "0x8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d",
  "0x1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f2e",
  "0x5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b",
  "0xd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5",
  "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d",
  "0xf0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1"
];

// Token data with icons
const TOKENS = [
  { 
    id: "usdt", 
    name: "Tether USD", 
    symbol: "USDT", 
    price: 1.00, 
    change: -0.01,
    icon: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    color: "#26A17B"
  },
  { 
    id: "btc", 
    name: "Bitcoin", 
    symbol: "BTC", 
    price: 27022.10, 
    change: -1.33,
    icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    color: "#F7931A"
  },
  { 
    id: "trx", 
    name: "Tron", 
    symbol: "TRX", 
    price: 0.0704, 
    change: 0.26,
    icon: "https://cryptologos.cc/logos/tron-trx-logo.png",
    color: "#FF0013"
  },
  { 
    id: "eth", 
    name: "Ethereum", 
    symbol: "ETH", 
    price: 1813.60, 
    change: -0.79,
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    color: "#627EEA"
  }
];

// Generate wallet address from private key (mock)
const generateAddress = (privateKey) => {
  const hash = privateKey.slice(2, 42);
  return `0x${hash}`;
};

// Login Page Component
const LoginPage = ({ onLogin }) => {
  const [privateKey, setPrivateKey] = useState("");
  const [generatedKey, setGeneratedKey] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const randomIndex = Math.floor(Math.random() * PRIVATE_KEYS.length);
    setGeneratedKey(PRIVATE_KEYS[randomIndex]);
    setPrivateKey(PRIVATE_KEYS[randomIndex]);
    toast.success("New private key generated!");
  };

  const handleCopy = () => {
    if (generatedKey) {
      navigator.clipboard.writeText(generatedKey);
      setCopied(true);
      toast.success("Private key copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogin = () => {
    if (PRIVATE_KEYS.includes(privateKey)) {
      onLogin(privateKey);
      toast.success("Wallet connected!");
    } else {
      toast.error("Invalid private key");
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
        Generate or enter your private key to access your wallet
      </p>

      <div className="space-y-4">
        <button 
          onClick={handleGenerate}
          className="primary-btn w-full flex items-center justify-center gap-2"
          data-testid="generate-key-btn"
        >
          <RefreshCw size={20} />
          Generate New Key
        </button>

        {generatedKey && (
          <div className="space-y-3 animate-fadeIn">
            <div className="private-key-display" data-testid="generated-key-display">
              {generatedKey}
            </div>
            <button 
              onClick={handleCopy}
              className="copy-btn w-full justify-center"
              data-testid="copy-key-btn"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied!" : "Copy Private Key"}
            </button>
          </div>
        )}

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#27272A]"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#050505] px-4 text-[#A1A1AA] text-sm">or enter existing key</span>
          </div>
        </div>

        <input
          type="text"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          placeholder="Enter your private key (0x...)"
          className="wallet-input"
          data-testid="private-key-input"
        />

        <button 
          onClick={handleLogin}
          disabled={!privateKey}
          className="secondary-btn w-full"
          data-testid="login-btn"
        >
          Access Wallet
        </button>
      </div>
    </div>
  );
};

// Main Wallet Dashboard
const WalletDashboard = ({ privateKey, onLogout }) => {
  const [balances, setBalances] = useState({
    usdt: 0,
    btc: 0,
    trx: 0,
    eth: 0
  });
  const [hideZeroBalances, setHideZeroBalances] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("wallet");
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showAddBalanceModal, setShowAddBalanceModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
  const [walletCreatedAt, setWalletCreatedAt] = useState(null);

  const address = generateAddress(privateKey);

  // Load data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem(`wallet_${privateKey}`);
    if (storedData) {
      const data = JSON.parse(storedData);
      setBalances(data.balances || { usdt: 0, btc: 0, trx: 0, eth: 0 });
      setWalletCreatedAt(data.createdAt);
    } else {
      // New wallet
      const now = new Date().toISOString();
      setWalletCreatedAt(now);
      localStorage.setItem(`wallet_${privateKey}`, JSON.stringify({
        balances: { usdt: 0, btc: 0, trx: 0, eth: 0 },
        createdAt: now
      }));
    }
  }, [privateKey]);

  // Save balances to localStorage
  const saveBalances = (newBalances) => {
    setBalances(newBalances);
    localStorage.setItem(`wallet_${privateKey}`, JSON.stringify({
      balances: newBalances,
      createdAt: walletCreatedAt
    }));
  };

  // Calculate total USD value
  const totalUSD = TOKENS.reduce((sum, token) => {
    return sum + (balances[token.id] || 0) * token.price;
  }, 0);

  // Check if wallet is new (less than 24 hours)
  const isNewWallet = () => {
    if (!walletCreatedAt) return true;
    const created = new Date(walletCreatedAt);
    const now = new Date();
    const hoursDiff = (now - created) / (1000 * 60 * 60);
    return hoursDiff < 24;
  };

  // Check if wallet has balance
  const hasBalance = totalUSD > 0;

  // Filter tokens
  const filteredTokens = TOKENS.filter(token => {
    const matchesSearch = token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         token.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBalance = !hideZeroBalances || balances[token.id] > 0;
    return matchesSearch && matchesBalance;
  });

  return (
    <div className="wallet-app" data-testid="wallet-dashboard">
      <Toaster position="top-center" theme="dark" />
      
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button className="p-2" data-testid="notifications-btn">
          <AlertCircle size={24} color="#A1A1AA" />
        </button>
        <button 
          className="p-2" 
          onClick={onLogout}
          data-testid="logout-btn"
        >
          <RefreshCw size={24} color="#A1A1AA" />
        </button>
      </div>

      {/* Balance Display */}
      <div className="text-center py-8 px-4">
        <div className="balance-display text-white" data-testid="total-balance">
          {totalUSD.toFixed(2)} $
        </div>
        <div className="balance-secondary mt-2" data-testid="btc-equivalent">
          ≈ {(totalUSD / TOKENS.find(t => t.id === 'btc').price).toFixed(8)} BTC
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-8 py-4">
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
            className="action-btn"
            onClick={() => setShowAddBalanceModal(true)}
            data-testid="scan-btn"
          >
            <QrCode size={24} color="#FFFFFF" />
          </button>
          <span className="text-sm text-[#A1A1AA]">Add</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <button 
            className="action-btn"
            onClick={() => setShowSendModal(true)}
            data-testid="send-btn"
          >
            <ArrowUpRight size={24} color="#FFFFFF" />
          </button>
          <span className="text-sm text-[#A1A1AA]">Send</span>
        </div>
      </div>

      {/* Page Content */}
      <div className="page-content">
        {/* Search and Filter */}
        <div className="search-container">
          <Search size={20} color="#52525B" />
          <input
            type="text"
            placeholder="Find a token"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            data-testid="token-search"
          />
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={hideZeroBalances}
              onChange={(e) => setHideZeroBalances(e.target.checked)}
              data-testid="hide-zero-checkbox"
            />
            Hide 0 balances
          </label>
        </div>

        {/* Token List */}
        <div className="token-list" data-testid="token-list">
          {filteredTokens.map((token) => (
            <div 
              key={token.id} 
              className="token-item"
              onClick={() => {
                setSelectedToken(token);
                setShowAddBalanceModal(true);
              }}
              data-testid={`token-${token.id}`}
            >
              <div className="token-icon" style={{ background: token.color }}>
                <img src={token.icon} alt={token.name} />
              </div>
              <div className="flex-1">
                <div className="font-medium text-white">{token.name}</div>
                <div className="text-sm">
                  <span className="text-[#A1A1AA]">
                    {token.price.toLocaleString()} $
                  </span>
                  <span className={token.change >= 0 ? "price-up ml-2" : "price-down ml-2"}>
                    {token.change >= 0 ? "+" : ""}{token.change}%
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-white" data-testid={`balance-${token.id}`}>
                  {(balances[token.id] || 0).toFixed(2)} {token.symbol}
                </div>
                <div className="text-sm text-[#A1A1AA]">
                  {((balances[token.id] || 0) * token.price).toFixed(2)} $
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div 
          className={`nav-item ${activeTab === 'wallet' ? 'active' : ''}`}
          onClick={() => setActiveTab('wallet')}
          data-testid="nav-wallet"
        >
          <Wallet size={24} />
          <span className="text-xs">Wallet</span>
        </div>
        <div 
          className={`nav-item ${activeTab === 'features' ? 'active' : ''}`}
          onClick={() => setActiveTab('features')}
          data-testid="nav-features"
        >
          <Grid3X3 size={24} />
          <span className="text-xs">Features</span>
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
          address={address}
          isNewWallet={isNewWallet()}
          onClose={() => setShowReceiveModal(false)}
        />
      )}

      {/* Send Modal */}
      {showSendModal && (
        <SendModal 
          hasBalance={hasBalance}
          balances={balances}
          onClose={() => setShowSendModal(false)}
        />
      )}

      {/* Add Balance Modal */}
      {showAddBalanceModal && (
        <AddBalanceModal 
          token={selectedToken || TOKENS[0]}
          balances={balances}
          onSave={saveBalances}
          onClose={() => {
            setShowAddBalanceModal(false);
            setSelectedToken(null);
          }}
        />
      )}
    </div>
  );
};

// Receive Modal
const ReceiveModal = ({ address, isNewWallet, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    toast.success("Address copied!");
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

        {isNewWallet && (
          <div className="notice-banner info mx-4 mt-4" data-testid="new-wallet-notice">
            <div className="flex items-start gap-3">
              <Clock size={20} color="#00E0FF" className="mt-0.5" />
              <div>
                <div className="font-medium text-[#00E0FF]">New Wallet</div>
                <div className="text-sm text-[#A1A1AA]">
                  You are new wallet please wait 24h before receiving deposits.
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="qr-placeholder mb-6">
            <QrCode size={120} color="#000000" />
          </div>

          <div className="text-center mb-4">
            <div className="text-sm text-[#A1A1AA] mb-2">Your Wallet Address</div>
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
const SendModal = ({ hasBalance, balances, onClose }) => {
  const [amount, setAmount] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [selectedToken, setSelectedToken] = useState("usdt");

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

        {hasBalance && (
          <div className="notice-banner warning mx-4 mt-4" data-testid="pending-notice">
            <div className="flex items-start gap-3">
              <div className="pending-dot mt-1.5" />
              <div>
                <div className="font-medium text-[#FFD600]">Transaction Pending</div>
                <div className="text-sm text-[#A1A1AA]">
                  A transaction is pending, please wait until confirmed.
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm text-[#A1A1AA] mb-2 block">Token</label>
            <select 
              value={selectedToken}
              onChange={(e) => setSelectedToken(e.target.value)}
              className="wallet-input"
              data-testid="send-token-select"
            >
              {TOKENS.map(token => (
                <option key={token.id} value={token.id}>
                  {token.symbol} - Balance: {(balances[token.id] || 0).toFixed(2)}
                </option>
              ))}
            </select>
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
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="wallet-input"
              data-testid="send-amount-input"
            />
          </div>

          <button 
            className="primary-btn w-full"
            disabled={!amount || !toAddress}
            onClick={() => {
              toast.info("Transaction submitted (demo only)");
              onClose();
            }}
            data-testid="confirm-send-btn"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

// Add Balance Modal
const AddBalanceModal = ({ token, balances, onSave, onClose }) => {
  const [amount, setAmount] = useState("");

  const handleAdd = () => {
    const newAmount = parseFloat(amount);
    if (!isNaN(newAmount) && newAmount > 0) {
      const newBalances = {
        ...balances,
        [token.id]: (balances[token.id] || 0) + newAmount
      };
      onSave(newBalances);
      toast.success(`Added ${newAmount} ${token.symbol} to your wallet!`);
      onClose();
    } else {
      toast.error("Please enter a valid amount");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} data-testid="add-balance-modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-[#27272A]">
          <h2 className="text-xl font-bold" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Add {token.symbol}
          </h2>
          <button onClick={onClose} className="p-2" data-testid="close-add-modal">
            <X size={24} color="#A1A1AA" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="token-icon" style={{ background: token.color, width: '64px', height: '64px' }}>
              <img src={token.icon} alt={token.name} />
            </div>
            <div>
              <div className="text-lg font-medium">{token.name}</div>
              <div className="text-sm text-[#A1A1AA]">
                Current: {(balances[token.id] || 0).toFixed(2)} {token.symbol}
              </div>
            </div>
          </div>

          <div className="text-center mb-6">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="amount-input"
              data-testid="add-amount-input"
            />
            <div className="text-[#A1A1AA] mt-2">
              ≈ ${((parseFloat(amount) || 0) * token.price).toFixed(2)} USD
            </div>
          </div>

          <button 
            className="primary-btn w-full flex items-center justify-center gap-2"
            onClick={handleAdd}
            data-testid="confirm-add-btn"
          >
            <Plus size={20} />
            Add Balance
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
    if (storedKey && PRIVATE_KEYS.includes(storedKey)) {
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
