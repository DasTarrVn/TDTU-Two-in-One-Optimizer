# TDTU Two-in-One Optimizer

An extension designed to automate the login process and prevent session timeouts (auto-logout) for both the TDTU Student Portal and E-Learning platforms. It features an intuitive UI with independent toggles for each system.

## Features
*   **Auto Login:** Automatically fills in credentials and logs you into the Portal and E-learning systems.
*   **Keep Alive:** Prevents auto-logout by maintaining the session in the background.
*   **Independent Controls:** Turn the extension on/off separately for the Portal and E-Learning.
*   **Smart Recognition:** Automatically detects login forms and handles "Already logged in" conflicts on Moodle.

---

## Installation Guide

As this extension is not currently hosted on the Chrome Web Store, manual installation via Developer Mode is required. Please follow the instructions below:

### Step 1: Download the Release

*   Navigate to the [Release page](https://github.com/YOUR_USERNAME/TDTU-All-in-One-Optimizer/releases). *(Remember to replace this link with your actual release link later)*
*   Under the **Assets** section, download the `TDTUOptimizer.zip` file to your local machine.

### Step 2: Extract the Archive

*   Right-click the downloaded `.zip` file and select **Extract All...** to unpack the contents.
*   Note the directory path of the extracted folder for later use.

### Step 3: Access Extension Management

*   Open a Chromium-based browser (e.g., Google Chrome, Microsoft Edge, or Brave).
*   Navigate to the extensions page by entering `chrome://extensions/` (for Chrome) or `edge://extensions/` (for Edge) into the address bar.

### Step 4: Enable Developer Mode

*   Locate the **Developer mode** toggle, typically found in the top right corner of the page, and switch it to the **ON** position.

### Step 5: Load the Unpacked Extension

*   Click the **Load unpacked** button that appears in the top left area.
*   A file dialog will open. Navigate to the folder you extracted in **Step 2** and select it. (Ensure the selected directory directly contains the `manifest.json` file).
*   Click **Select Folder**.
