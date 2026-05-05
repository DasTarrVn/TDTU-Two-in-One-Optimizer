document.addEventListener('DOMContentLoaded', () => {
    const tabPortal = document.getElementById('tabPortal');
    const tabElearn = document.getElementById('tabElearn');
    const settingsPortal = document.getElementById('settingsPortal');
    const settingsElearn = document.getElementById('settingsElearn');
    const saveBtn = document.getElementById('saveBtn');
    const toggleExtBtn = document.getElementById('toggleExtBtn');

    let currentTab = 'portal';
    let isPortalActive = true;
    let isElearnActive = true;

    function updateToggleButton() {
        if (currentTab === 'portal') {
            if (isPortalActive) {
                toggleExtBtn.textContent = 'Portal: ON (Click to Pause)';
                toggleExtBtn.className = 'btn-portal';
            } else {
                toggleExtBtn.textContent = 'Portal: PAUSED (Click to Start)';
                toggleExtBtn.className = 'btn-dark';
            }
        } else {
            if (isElearnActive) {
                toggleExtBtn.textContent = 'E-Learn: ON (Click to Pause)';
                toggleExtBtn.className = 'btn-elearn';
            } else {
                toggleExtBtn.textContent = 'E-Learn: PAUSED (Click to Start)';
                toggleExtBtn.className = 'btn-dark';
            }
        }
    }

    tabPortal.addEventListener('click', () => {
        currentTab = 'portal';
        tabPortal.classList.add('active'); tabElearn.classList.remove('active');
        settingsPortal.classList.add('active'); settingsElearn.classList.remove('active');
        saveBtn.className = 'btn-portal';
        updateToggleButton();
    });

    tabElearn.addEventListener('click', () => {
        currentTab = 'elearn';
        tabElearn.classList.add('active'); tabPortal.classList.remove('active');
        settingsElearn.classList.add('active'); settingsPortal.classList.remove('active');
        saveBtn.className = 'btn-elearn';
        updateToggleButton();
    });

    chrome.storage.local.get([
        'isPortalActive', 'isElearnActive', 'portalMssv', 'portalPassword', 'portalAutoLogin',
        'portalAutoMain', 'portalBlockPopup', 'portalKeepAlive', 'elearnMssv',
        'elearnPassword', 'elearnAutoLogin', 'elearnAutoDashboard', 'elearnKeepAlive'
    ], (data) => {
        isPortalActive = data.isPortalActive !== false;
        isElearnActive = data.isElearnActive !== false;
        updateToggleButton();

        const fields = ['portalMssv', 'portalPassword', 'portalAutoLogin', 'portalAutoMain', 'portalBlockPopup', 'portalKeepAlive', 'elearnMssv', 'elearnPassword', 'elearnAutoLogin', 'elearnAutoDashboard', 'elearnKeepAlive'];
        fields.forEach(f => {
            const el = document.getElementById(f);
            if (el.type === 'checkbox') el.checked = data[f] !== undefined ? data[f] : false;
            else el.value = data[f] || '';
        });
    });

    toggleExtBtn.addEventListener('click', () => {
        if (currentTab === 'portal') {
            isPortalActive = !isPortalActive;
            chrome.storage.local.set({ isPortalActive }, updateToggleButton);
        } else {
            isElearnActive = !isElearnActive;
            chrome.storage.local.set({ isElearnActive }, updateToggleButton);
        }
    });

    saveBtn.addEventListener('click', () => {
        const settings = {};
        ['portalMssv', 'portalPassword', 'portalAutoLogin', 'portalAutoMain', 'portalBlockPopup', 'portalKeepAlive', 'elearnMssv', 'elearnPassword', 'elearnAutoLogin', 'elearnAutoDashboard', 'elearnKeepAlive'].forEach(f => {
            const el = document.getElementById(f);
            settings[f] = el.type === 'checkbox' ? el.checked : el.value;
        });
        chrome.storage.local.set(settings, () => {
            const status = document.getElementById('status');
            status.style.display = 'block';
            setTimeout(() => status.style.display = 'none', 2000);
        });
    });
});