# 🌐 Jio Next — Digital Life Reimagined

> A visually stunning, high-performance website concept celebrating **India's Standalone True 5G**, **JioAirFiber**, and **Cloud AI Ecosystem**. Built with modern glassmorphism, responsive micro-interactions, an interactive 5G speed test simulator, live plan explorer, and instant recharge checkout.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Port: 6969](https://img.shields.io/badge/Port-6969-brightgreen.svg)](#-running-on-port-6969)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Ready-cyan.svg)](https://no-name-69.github.io/jio/)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-purple.svg)](#-zero-dependency-server)

---

## ✨ Key Features & Visual Design

- 🚀 **Interactive 5G Speedometer Simulator**:
  - Live SVG & Canvas circular speedometer gauge with realistic needle deflection up to 1.5 Gbps.
  - Measures simulated ping latency (3ms), jitter, carrier-aggregated upload, and plots real-time bandwidth sparklines.
- 📱 **Dynamic Plan Explorer & Category Filtering**:
  - Filter across **True 5G Unlimited**, **JioAirFiber**, **JioFiber Broadband**, and **Global Roaming**.
  - Secondary tags: Trending, Bundled OTT (Netflix, Disney+ Hotstar, Prime Video), and Annual Validity.
- 💳 **Interactive Instant Recharge Modal**:
  - Direct recharge modal with 10-digit phone verification, coupon code engine (try `JIO5G`), price breakdown, and animated success toast.
- 🗺️ **Interactive 5G City Coverage Explorer**:
  - Search coverage across major Indian cities (Mumbai, New Delhi, Bengaluru, Hyderabad, Kolkata, Chennai, Pune, etc.) with active 5G band breakdown (`n28`, `n78`, `n258`).
- 🎨 **Aesthetic Glassmorphism & Canvas Visuals**:
  - Dynamic 5G mesh particle canvas in hero section responding to cursor hover.
  - Deep midnight tech palette with Jio Royal Blue (`#0056FB`), neon cyan (`#00E5FF`), and purple accents.
  - Interactive 3D tilt effects on cards with perspective depth.
- 🌓 **Theme Management**:
  - Seamless toggle between Dark Mode and Light Mode with `localStorage` persistence.
- 📱 **Fully Responsive**:
  - Optimized for mobile handsets, tablets, laptops, and ultra-wide screens.

---

## ⚡ Running on Port 6969

You can run this website on **port 6969** using whichever method you prefer:

### 📥 1. Git Pull & Clone
```bash
# Clone for the first time:
git clone https://github.com/NO-NAME-69/jio.git
cd jio

# Or pull the latest changes if already cloned:
git pull origin main
```

### 📦 2. Install Dependencies
```bash
npm install
```
*(Zero heavy third-party packages required — runs instantaneously!)*

### 🚀 3. Start the Server on Port 6969
```bash
# Option A: Via npm
npm start

# Option B: Via Node.js directly
node server.js

# Option C: Windows one-click batch launcher
.\run-6969.bat

# Option D: Via Python
python -m http.server 6969
```

Once started, open your browser at:
👉 **[http://localhost:6969](http://localhost:6969)**

---

## ☁️ Running Directly in GitHub (Codespaces)

You can also run and test the website directly inside GitHub without installing anything locally:

1. Open your repository: **[https://github.com/NO-NAME-69/jio](https://github.com/NO-NAME-69/jio)**
2. Press the **`.`** (period) key on your keyboard, or click **`<> Code` > `Codespaces` > `Create codespace on main`**.
3. In the terminal inside GitHub, type:
   ```bash
   git pull origin main
   npm install
   npm start
   ```
4. GitHub Codespaces will detect port `6969` and show a prompt: **"Your application running on port 6969 is available. Open in Browser"**.

---

## 📂 Project Structure

```
jio/
├── index.html                  # Main responsive web application
├── server.js                   # Lightweight zero-dependency static server (port 6969)
├── package.json                # Project manifest and npm scripts
├── run-6969.bat                # Windows one-click batch launcher
├── run-6969.ps1                # PowerShell launcher script
├── css/
│   └── style.css               # Design system, glassmorphism, animations & themes
├── js/
│   └── main.js                 # Speedometer simulator, plan filters, coverage & modal
├── .github/
│   └── workflows/
│       └── pages.yml           # Automated GitHub Pages CI/CD workflow
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

---

## 🚀 Deploying to GitHub Pages

To make the website live on GitHub Pages:
1. Go to your repository settings: [https://github.com/NO-NAME-69/jio/settings/pages](https://github.com/NO-NAME-69/jio/settings/pages)
2. Under **Build and deployment > Source**, select **GitHub Actions** (or **Deploy from a branch** -> `main` / `/ (root)`).
3. The site will be published at: `https://NO-NAME-69.github.io/jio/`

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

