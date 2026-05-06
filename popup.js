document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM Elements
    const elements = {
        tabPortal: document.getElementById('tabPortal'),
        tabElearn: document.getElementById('tabElearn'),
        settingsPortal: document.getElementById('settingsPortal'),
        settingsElearn: document.getElementById('settingsElearn'),
        saveBtn: document.getElementById('saveBtn'),
        toggleExtBtn: document.getElementById('toggleExtBtn'),
        status: document.getElementById('status')
    };

    const inputs = {
        portalMssv: document.getElementById('portalMssv'),
        portalPassword: document.getElementById('portalPassword'),
        portalAutoLogin: document.getElementById('portalAutoLogin'),
        portalKeepAlive: document.getElementById('portalKeepAlive'),
        portalBlockAds: document.getElementById('portalBlockAds'),
        portalAutoMain: document.getElementById('portalAutoMain'),
        elearnMssv: document.getElementById('elearnMssv'),
        elearnPassword: document.getElementById('elearnPassword'),
        elearnAutoLogin: document.getElementById('elearnAutoLogin'),
        elearnKeepAlive: document.getElementById('elearnKeepAlive'),
        elearnAutoDashboard: document.getElementById('elearnAutoDashboard')
    };

    let currentTab = 'portal';
    let isPortalActive = true;
    let isElearnActive = true;

    function updateToggleButton() {
        if (currentTab === 'portal') {
            elements.toggleExtBtn.textContent = isPortalActive ? 'Portal: ON (Click to Pause)' : 'Portal: PAUSED (Click to Start)';
            elements.toggleExtBtn.className = isPortalActive ? 'btn-portal' : 'btn-dark';
        } else {
            elements.toggleExtBtn.textContent = isElearnActive ? 'E-Learn: ON (Click to Pause)' : 'E-Learn: PAUSED (Click to Start)';
            elements.toggleExtBtn.className = isElearnActive ? 'btn-elearn' : 'btn-dark';
        }
    }

    elements.tabPortal.addEventListener('click', () => {
        currentTab = 'portal';
        elements.tabPortal.classList.add('active');
        elements.tabElearn.classList.remove('active');
        elements.settingsPortal.classList.add('active');
        elements.settingsElearn.classList.remove('active');
        elements.saveBtn.className = 'btn-portal';
        updateToggleButton();
    });

    elements.tabElearn.addEventListener('click', () => {
        currentTab = 'elearn';
        elements.tabElearn.classList.add('active');
        elements.tabPortal.classList.remove('active');
        elements.settingsElearn.classList.add('active');
        elements.settingsPortal.classList.remove('active');
        elements.saveBtn.className = 'btn-elearn';
        updateToggleButton();
    });

    chrome.storage.local.get([
        'isPortalActive', 'isElearnActive', ...Object.keys(inputs)
    ], (data) => {
        isPortalActive = data.isPortalActive !== false;
        isElearnActive = data.isElearnActive !== false;
        updateToggleButton();

        for (const [key, element] of Object.entries(inputs)) {
            if (data[key] !== undefined) {
                if (element.type === 'checkbox') {
                    element.checked = data[key];
                } else {
                    element.value = data[key];
                }
            }
        }
    });

    elements.toggleExtBtn.addEventListener('click', () => {
        if (currentTab === 'portal') {
            isPortalActive = !isPortalActive;
            chrome.storage.local.set({ isPortalActive }, updateToggleButton);
        } else {
            isElearnActive = !isElearnActive;
            chrome.storage.local.set({ isElearnActive }, updateToggleButton);
        }
    });

    elements.saveBtn.addEventListener('click', () => {
        const dataToSave = {};
        for (const [key, element] of Object.entries(inputs)) {
            dataToSave[key] = element.type === 'checkbox' ? element.checked : element.value;
        }

        chrome.storage.local.set(dataToSave, () => {
            elements.status.style.display = 'block';
            setTimeout(() => elements.status.style.display = 'none', 2000);
        });
    });
});