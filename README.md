<img width="232" height="36" alt="{ECB6A52D-0ED3-4DF7-BDA4-A7A351C91F92}" src="https://github.com/user-attachments/assets/25f4cc11-f270-4693-9dca-17f73598b5a1" />

# TDTU Two-in-One Optimizer

An extension designed to automate the login process and prevent session timeouts (auto-logout) for both the TDTU Student Portal and E-Learning platforms. It features an intuitive UI with independent toggles for each system.

## Features

<p align="left">
  <img src="https://github.com/user-attachments/assets/61f702bc-3602-40de-b23a-7ed1c29ef429" width="350" alt="Portal UI">
  <img src="https://github.com/user-attachments/assets/79e5a13d-7256-45bc-825f-0ec5e86fa429" width="350" alt="Elearning UI">
</p>

* **Auto Login:** Automatically fills in credentials and logs you into the Portal and E-Learning systems.
* **Keep Alive:** Prevents auto-logout by continuously maintaining your session in the background.
* **Independent Controls:** Turn the extension on or off separately for the Portal and E-Learning platforms.
* **Smart Recognition:** Automatically detects login forms and resolves "Already logged in" conflicts on Moodle.

### New in Version 1.1

<img width="351" height="72" alt="3ui" src="https://github.com/user-attachments/assets/01cdc1a4-260a-4aba-99e6-54aa2ca0aa56" />

* **Popup Auto-Dismiss:** Automatically closes recurring popups (e.g., proverbs or announcements) immediately upon logging into the Portal.
* **Smart Portal Redirect:** Bypasses the default "Cổng thông tin sinh viên" landing page and navigates directly to the "Trang chủ" (Home) section of the Student Portal.

<img width="232" height="36" alt="4ui" src="https://github.com/user-attachments/assets/4dd1032c-362e-4f12-818e-4620286e427e" />

* **E-Learning Dashboard Priority:** Automatically redirects to the "Dashboard" instead of the default "Site home" upon login (executes once), helping you access your courses faster.

### Known Issues & Troubleshooting
* **Occasional Instability:** In certain network conditions or during sudden platform updates, automated actions may occasionally experience delays or fail to trigger. Manually refreshing the page usually resolves this.

---

## Installation Guide

Since this extension is not currently hosted on the Chrome Web Store, manual installation via Developer Mode is required. Please follow the instructions below:

### Step 1: Download the Release
* Navigate to the [Releases page](https://github.com/DasTarrVn/TDTU-Two-in-One-Optimizer/releases).
* Under the **Assets** section, download the `TDTUOptimizer.zip` file to your local machine.

### Step 2: Extract the Archive
* Right-click the downloaded `.zip` file and select **Extract All...** to unpack the contents.
* Note the directory path of the extracted folder for later use.

### Step 3: Access Extension Management
* Open a Chromium-based browser (e.g., Google Chrome, Microsoft Edge, Brave, or Opera).
* Navigate to the extensions page by entering `chrome://extensions/` (for Chrome/Brave) or `edge://extensions/` (for Edge) into the address bar.

### Step 4: Enable Developer Mode
* Locate the **Developer mode** toggle, typically found in the top-right corner of the page, and switch it to the **ON** position.

### Step 5: Load the Unpacked Extension
* Click the **Load unpacked** button that appears in the top-left area.
* A file dialog will open. Navigate to the folder you extracted in **Step 2** and select it. *(Ensure the selected directory directly contains the `manifest.json` file).*
* Click **Select Folder**.
