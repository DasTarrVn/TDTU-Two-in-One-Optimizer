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
        tabPortal.classList.add('active');
        tabElearn.classList.remove('active');
        settingsPortal.classList.add('active');
        settingsElearn.classList.remove('active');
        saveBtn.className = 'btn-portal';
        updateToggleButton();
    });

    tabElearn.addEventListener('click', () => {
        currentTab = 'elearn';
        tabElearn.classList.add('active');
        tabPortal.classList.remove('active');
        settingsElearn.classList.add('active');
        settingsPortal.classList.remove('active');
        saveBtn.className = 'btn-elearn';
        updateToggleButton();
    });

    chrome.storage.local.get([
        'isPortalActive', 'isElearnActive',
        'portalMssv', 'portalPassword', 'portalAutoLogin', 'portalKeepAlive',
        'elearnMssv', 'elearnPassword', 'elearnAutoLogin', 'elearnKeepAlive'
    ], (data) => {
        isPortalActive = data.isPortalActive !== false;
        isElearnActive = data.isElearnActive !== false;
        updateToggleButton();

        if (data.portalMssv) document.getElementById('portalMssv').value = data.portalMssv;
        if (data.portalPassword) document.getElementById('portalPassword').value = data.portalPassword;
        if (data.portalAutoLogin !== undefined) document.getElementById('portalAutoLogin').checked = data.portalAutoLogin;
        if (data.portalKeepAlive !== undefined) document.getElementById('portalKeepAlive').checked = data.portalKeepAlive;

        if (data.elearnMssv) document.getElementById('elearnMssv').value = data.elearnMssv;
        if (data.elearnPassword) document.getElementById('elearnPassword').value = data.elearnPassword;
        if (data.elearnAutoLogin !== undefined) document.getElementById('elearnAutoLogin').checked = data.elearnAutoLogin;
        if (data.elearnKeepAlive !== undefined) document.getElementById('elearnKeepAlive').checked = data.elearnKeepAlive;
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

    document.getElementById('saveBtn').addEventListener('click', () => {
        const portalMssv = document.getElementById('portalMssv').value;
        const portalPassword = document.getElementById('portalPassword').value;
        const portalAutoLogin = document.getElementById('portalAutoLogin').checked;
        const portalKeepAlive = document.getElementById('portalKeepAlive').checked;

        const elearnMssv = document.getElementById('elearnMssv').value;
        const elearnPassword = document.getElementById('elearnPassword').value;
        const elearnAutoLogin = document.getElementById('elearnAutoLogin').checked;
        const elearnKeepAlive = document.getElementById('elearnKeepAlive').checked;

        chrome.storage.local.set({
            portalMssv, portalPassword, portalAutoLogin, portalKeepAlive,
            elearnMssv, elearnPassword, elearnAutoLogin, elearnKeepAlive
        }, () => {
            const status = document.getElementById('status');
            status.style.display = 'block';
            setTimeout(() => status.style.display = 'none', 2000);
        });
    });
});