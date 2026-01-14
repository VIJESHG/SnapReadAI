# ⚡ SnapReadAI

**SnapReadAI** is a lightweight Chrome Extension that uses **Google’s Gemini AI** to instantly summarize web pages. It helps users quickly digest long articles by generating concise, customizable bullet-point summaries directly in the browser.

![SnapReadAI Banner](SnapReadAI.png)

---

## 🚀 Features

- **One-Click Summaries** – Instantly summarize the content of the active tab  
- **Secure Google Login** – Uses Google OAuth 2.0 (no API keys required)  
- **Customizable Output** – Choose how many bullet points you want (default: 3)  
- **Modern UI** – Clean, responsive interface with loading states  
- **Powered by Gemini** – Uses the fast `gemini-3-flash-preview` model  

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript  
- **Platform:** Chrome Extension (Manifest V3)  
- **AI Model:** Google Gemini (Generative Language API)  
- **Authentication:** Google OAuth2 (Chrome Identity API)

---

## ⚙️ Installation & Setup

### Prerequisites

1. Google Cloud account  
2. Google Chrome browser  

---

### Step 1: Clone the Repository

Download or clone this repository to your local machine.

---

### Step 2: Google Cloud Configuration

> To enable Google login and Gemini access, you must configure OAuth for your Chrome extension.

#### Get Your Extension ID

1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer Mode**
3. Click **Load unpacked** and select the project folder
4. Copy the generated **Extension ID**

---

#### Create Google Cloud Credentials

1. Go to https://console.cloud.google.com  
2. Create a new project named **SnapReadAI**
3. Enable **Google Generative Language API**
4. Go to **APIs & Services → OAuth consent screen**
   - User type: **External**
   - Fill required fields
   - Add your email under **Test users**
5. Go to **Credentials → Create Credentials → OAuth client ID**
   - Application type: **Chrome Extension**
   - Item ID: Paste your Extension ID
6. Copy the generated **Client ID**

---

### Step 3: Configure the Extension

1.  Open `manifest.json` in your code editor.
2.  Find the `oauth2` section.
3.  Replace `PASTE_YOUR_CLIENT_ID_HERE` with the Client ID you just created.

Example:
"oauth2": {
  "client_id": "YOUR_NEW_CLIENT_ID.apps.googleusercontent.com",
  "scopes": ["[https://www.googleapis.com/auth/generative-language.retriever](https://www.googleapis.com/auth/generative-language.retriever)"]
}

---

### Step 4: Load the Extension

1. Go to `chrome://extensions`
2. Click **Refresh (⟳)** on the SnapReadAI card  
3. (Optional) If you see any errors, click "Remove" and then "Load Unpacked" again to ensure a clean install. 

---

## 📖 How to Use

### Pin the Extension

- Click the **Puzzle (🧩)** icon in Chrome  
- Pin **SnapReadAI**

### Summarize a Page

1. Open any article or webpage  
2. Click the ⚡ **SnapReadAI** icon  
3. (Optional) Enter number of bullet points  
4. Click **Summarize Page**

### First-Time Login

- Google permission popup appears  
- Click **Allow**  
- Summary appears in seconds 🚀  

---

## 🧠 Future Enhancements

- Dark mode  
- Language selection  
- Summary tone control  
- Export summaries (PDF / Notion)

---

## 📄 License

MIT License © SnapReadAI
