# AI Scam Message Analysis Tool (ScamSignal)

> **An original, privacy-first, evidence-based scam message analysis application built from scratch.**  
> Evaluates suspicious SMS texts, emails, WhatsApp messages, and direct chats using transparent heuristics, deep URL forensics, and an optional AI contextual reasoning layer.

---

## 📖 Table of Contents
1. [Project Overview & Purpose](#project-overview--purpose)
2. [Originality & Core Design Philosophy](#originality--core-design-philosophy)
3. [How the Detection Engine Works](#how-the-detection-engine-works)
   - [The 5 Deception Vectors & Mathematical Scoring](#the-5-deception-vectors--mathematical-scoring)
   - [Deep URL & Domain Forensics](#deep-url--domain-forensics)
   - [Dual-Engine: Heuristic vs. AI Assisted](#dual-engine-heuristic-vs-ai-assisted)
4. [User Interface & Visual Identity](#user-interface--visual-identity)
5. [Synthetic Test Cases & Scenarios](#synthetic-test-cases--scenarios)
6. [Incident Safety Playbook](#incident-safety-playbook)
7. [Installation & Getting Started](#installation--getting-started)
8. [Running Automated Tests](#running-automated-tests)
9. [Important Limitations & Ethical Disclaimer](#important-limitations--ethical-disclaimer)
10. [Future Improvement Roadmap](#future-improvement-roadmap)

---

## 🎯 Project Overview & Purpose

Cybercriminals rely heavily on social engineering, urgency manipulation, and deceptive URLs to deceive everyday people through text messages (smishing), email phishing, and chat scams. 

Most existing tools are either:
- **Opaque "black boxes"** that throw out an arbitrary score with zero explanation, or
- **Marketing landing pages** with fabricated claims ("99.9% AI accuracy").

**AI Scam Message Analysis Tool (ScamSignal)** solves this problem by providing an educational, evidence-based analysis workbench. When you paste a suspicious message:
1. It analyzes the text for specific manipulation techniques.
2. It breaks down the math behind the risk score (0 to 100).
3. It highlights the exact snippet that raised suspicion and explains *why* attackers use that trick.
4. It inspects embedded URLs for deceptive tricks (like hiding a fake domain inside a subdomain).
5. It gives you a prioritized, step-by-step safety checklist so you know what to do and what *not* to do.

---

## 💡 Originality & Core Design Philosophy

This project was built from scratch with an original design and custom logic:
- **No Cloned Templates**: Custom dark-slate aesthetic (`#0A0E17`), electric cyan sentry accents, and responsive layout.
- **100% Client-Side Privacy**: Messages you paste are processed right in your browser's memory. Private details (such as personal phone numbers) are never stored in a central database or transmitted across the wire without your explicit consent.
- **Honest Labeling**: The core engine is labeled honestly as a **Deterministic Cybersecurity Heuristic Engine**. If you choose to enable the AI layer, the app clearly explains whether it is running in simulated context mode or connected live to the Google Gemini API.
- **Verifiable Evidence**: Every warning card links directly to quotes extracted from your input.

---

## 🔬 How the Detection Engine Works

### The 5 Deception Vectors & Mathematical Scoring

The analysis engine evaluates messages across 5 core tactical categories, weighted based on cybersecurity severity:

| Category | Weight Share | Key Indicators Evaluated |
| :--- | :--- | :--- |
| **Financial Demands & Baits** | **25%** | Gift card requests (Apple, Google Play, Steam), Bitcoin ATM deposits, wire transfers, $1.99 micro-fee package redelivery traps, guaranteed high-yield investment claims. |
| **Urgency & Coercive Pressure** | **20%** | Short countdowns ("within 24 hours", "act now"), legal arrest intimidation, lawsuit/warrant threats, permanent account freeze ultimatums. |
| **Authority & Brand Impersonation** | **20%** | Banks (Chase, Wells Fargo, BofA), couriers (USPS, FedEx, UPS, DHL), government bodies (IRS, SSA), "Hi Mum" / distressed child phone scams. |
| **Malicious & Obscured Links** | **20%** | Disposable high-abuse TLDs, deceptive subdomain spoofing, URL shorteners, bare IP hostnames, unencrypted HTTP protocols. |
| **Credential Harvesting & 2FA** | **15%** | Direct 2FA/OTP code solicitation, fraudulent login redirection forms, Social Security number / PIN requests. |

#### Composite Calculation Formula
$$\text{Score} = \sum_{c \in \text{Categories}} (\text{Score}_c \times \text{Weight}_c)$$

*Critical Escalation Safeguard:* If any indicator categorized as **CRITICAL** (e.g., gift card demands, OTP theft, or fake arrest warrants) is confirmed, the system enforces a baseline risk score of at least **72/100**, ensuring high-danger threats are never diluted by silent categories.

#### Score Tiers
- **0 – 19 (SAFE / BENIGN)**: Routine notifications without manipulative patterns.
- **20 – 39 (LOW RISK)**: Minor flags; standard vigilance recommended.
- **40 – 69 (MODERATE RISK)**: Noticeable psychological pressure or suspicious claims. Caution advised.
- **70 – 100 (CRITICAL THREAT)**: High probability fraud attempt. Severe deception markers discovered.

---

### 🌐 Deep URL & Domain Forensics

Attackers frequently craft links that deceive the human eye. The embedded URL analyzer performs forensic checks on every link found:

1. **Deceptive Subdomain Spoofing**:  
   *Example:* `https://chase.com-verify.xyz/auth`  
   Human eyes notice "chase.com", but the actual registered root domain is `com-verify.xyz`. The tool flags this spoofing immediately.
2. **High-Abuse Top Level Domains (TLDs)**:  
   Flags domains ending in `.xyz`, `.top`, `.icu`, `.work`, `.click`, `.buzz`, `.rest`, `.country`, etc., which are common in mass-scale smishing.
3. **Bare IP Address Hostnames**:  
   Detects links using direct numeric IP addresses (e.g., `http://192.168.1.100/login`) instead of legitimate registered corporate domains.
4. **URL Shortener Masks**:  
   Flags services like `bit.ly`, `tinyurl.com`, `t.co` that conceal the actual destination.
5. **Insecure Transport (HTTP)**:  
   Flags unencrypted HTTP connections requesting sensitive credentials.

---

### 🤖 Dual-Engine: Heuristic vs. AI Assisted

- **Engine 1: Local Heuristic (Default)**:  
  100% deterministic, instant (< 5ms), offline-capable, and completely private. Ideal for quick risk assessments.
- **Engine 2: AI Contextual Reasoning (Optional)**:  
  When toggled, the application uses advanced language understanding to provide deep psychological profiling (e.g., explaining the cognitive bias targeted). It supports live Google Gemini API keys stored safely in your browser's local storage.

---

## 🎨 User Interface & Visual Identity

The interface was designed from the ground up for clarity, speed, and ease of demonstration:
- **Sentry Pulse Header**: Live status showing privacy protection and active engine mode.
- **Multi-Channel Switcher**: Quickly switch between SMS, Email, WhatsApp, and Direct Chat formats.
- **Interactive Radial Risk Meter**: Dynamic SVG gauge that shifts visually from Emerald Green (Safe) to Crimson Red (Critical).
- **Threat Factor Decomposition**: Side-by-side progress bars illustrating the exact weight share of each category.
- **Discovered Evidence Inspector**: Clean quote cards showing the matched snippet and plain-language explanation.
- **Incident Report Exporter**: Generate one-click Markdown (`.md`) or raw JSON incident reports ready to copy or download.

---

## 🧪 Synthetic Test Cases & Scenarios

The tool includes **8 original, pre-loaded synthetic test scenarios** so anyone can test and demonstrate the analyzer with a single click:

1. `[CRITICAL] Postal Delivery Address Failure (USPS smishing with $1.99 micro-fee trap and .xyz link)`
2. `[CRITICAL] Urgent Bank Account Suspension (Chase impersonation with deceptive subdomain)`
3. `[CRITICAL] Distressed Family Member ("Hi Mum" broken phone emergency wire transfer)`
4. `[CRITICAL] Guaranteed Daily Crypto Returns (Pig-butchering investment fraud with bit.ly link)`
5. `[MODERATE] Tech Support Renewal Billing Trap (Geek Squad invoice callback scam)`
6. `[MODERATE] Remote Video-Liker High Paying Job (Telegram task scam)`
7. `[SAFE] Authentic Dental Appointment Reminder (Clean baseline without threat patterns)`
8. `[SAFE] Authentic Shipping Notification (Routine UPS order tracking)`

---

## 🛡️ Incident Safety Playbook

Whenever a risk is detected, ScamSignal provides an interactive, prioritised action playbook:
- **Do Not Engage**: Never reply to smishing texts (replying confirms your phone number is active).
- **Link Quarantine**: What to do if you accidentally tapped a link (disconnect Wi-Fi, clear cache, run scan).
- **Account Lockdown**: How to act if a password or 2FA code was compromised.
- **Official Reporting Shortcuts**:
  - One-click copy for **7726** (the global cellular spam reporting code).
  - Direct link to the **FTC Fraud Reporting Portal** (`ReportFraud.ftc.gov`).

---

## 🚀 Installation & Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher; tested on v24)
- npm (v9 or higher)

### Step 1: Install Dependencies
\`\`\`bash
npm install
\`\`\`

### Step 2: Start the Development Server
\`\`\`bash
npm run dev
\`\`\`
The application will launch locally at `http://localhost:3000`. Open this URL in your web browser to start analyzing messages!

### Step 3: Build for Production
\`\`\`bash
npm run build
\`\`\`
This produces a static, production-optimized bundle in the `dist/` directory, suitable for deployment to GitHub Pages, Netlify, or Vercel.

---

## 🧪 Running Automated Tests

ScamSignal includes comprehensive unit tests verifying both individual rules and composite scoring logic:

\`\`\`bash
npm run test
\`\`\`

The test suite validates:
- Courier smishing samples reach `CRITICAL` risk status.
- Banking phishing samples trigger authority and subdomain warnings.
- "Hi Mum" emotional manipulation patterns are detected.
- Legitimate appointment reminders and shipping notices register as `SAFE` (avoiding false alarms).
- Bare IP hosts and deceptive subdomains are flagged accurately by the URL forensics engine.

---

## ⚠️ Important Limitations & Ethical Disclaimer

1. **Advisory Tool**: ScamSignal is designed as an educational decision-support aid. It cannot guarantee 100% detection of all emerging cyber threats.
2. **Evolving Attack Vectors**: Cybercriminals continually invent novel phrasing and bypass strategies. Absence of a warning flag does not guarantee complete safety.
3. **Independent Verification**: Always verify unexpected requests through known, verified phone numbers or direct navigation to official web portals.

---

## 🔮 Future Improvement Roadmap

- [ ] **Multi-Language Heuristics**: Expand rule definitions for Spanish, Korean, French, and German smishing patterns.
- [ ] **QR Code Image Scanner**: Allow users to upload or scan suspicious QR codes (quishing) from flyers and parking meters.
- [ ] **Email Header Analyzer**: Parse `.eml` files to inspect SPF, DKIM, and DMARC authentication records.
- [ ] **Community Threat Feed Integration**: Optional opt-in lookup against public fraud domain feeds (such as PhishTank or URLhaus).

---

*AI Scam Message Analysis Tool (ScamSignal) — Created as an original, transparent cybersecurity learning project.*
