chrome.storage.local.get([
    'isPortalActive', 'isElearnActive',
    'portalMssv', 'portalPassword', 'portalAutoLogin', 'portalKeepAlive', 'portalBlockAds', 'portalAutoMain',
    'elearnMssv', 'elearnPassword', 'elearnAutoLogin', 'elearnKeepAlive', 'elearnAutoDashboard'
], (data) => {
    const portalActive = data.isPortalActive !== false;
    const elearnActive = data.isElearnActive !== false;
    const currentUrl = window.location.href.toLowerCase();
    const hostname = window.location.hostname.toLowerCase();

    if (hostname.includes('stdportal.tdtu.edu.vn') && portalActive) {
        if (data.portalBlockAds) {
            setInterval(() => {
                const adBtn = document.querySelector('.bootbox-close-button.close');
                if (adBtn) adBtn.click();
            }, 500);
        }

        if (data.portalAutoMain && window.location.pathname === '/' && window.location.search.toLowerCase().includes('token=')) {
            window.location.pathname = '/main';
            return;
        }

        const hasLoginForm = document.getElementById('txtUser') || document.getElementById('btnLogIn');

        if (hasLoginForm || currentUrl.includes('login')) {
            if (data.portalAutoLogin) {
                const attemptLogin = setInterval(() => {
                    const userField = document.getElementById('txtUser');
                    const passField = document.getElementById('txtPass');
                    const loginBtn = document.getElementById('btnLogIn');

                    if (userField && passField && loginBtn) {
                        clearInterval(attemptLogin);
                        if (data.portalMssv) {
                            userField.value = data.portalMssv;
                            userField.dispatchEvent(new Event('input', { bubbles: true }));
                            userField.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                        if (data.portalPassword) {
                            passField.value = data.portalPassword;
                            passField.dispatchEvent(new Event('input', { bubbles: true }));
                            passField.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                        setTimeout(() => loginBtn.click(), 800);
                    }
                }, 300);
                setTimeout(() => clearInterval(attemptLogin), 10000);
            }
        } else if (data.portalKeepAlive) {
            setInterval(() => fetch(window.location.href).catch(() => { }), 600000);
        }
    }

    if (hostname.includes('elearning.tdtu.edu.vn') && elearnActive) {
        if (currentUrl.includes('login/index.php')) {
            if (document.body.innerText.toLowerCase().includes('already logged in')) {
                const cancelBtns = document.querySelectorAll('button');
                for (let btn of cancelBtns) {
                    if (btn.textContent.trim().toLowerCase() === 'cancel') {
                        btn.click();
                        return;
                    }
                }
                const altCancelBtn = document.querySelector('form[action*="elearning.tdtu.edu.vn"] button');
                if (altCancelBtn) {
                    altCancelBtn.click();
                    return;
                }
            }

            if (data.elearnAutoLogin) {
                const attemptLogin = setInterval(() => {
                    const userField = document.getElementById('username');
                    const passField = document.getElementById('password');
                    const loginBtn = document.getElementById('loginbtn');

                    if (userField && passField && loginBtn) {
                        clearInterval(attemptLogin);
                        if (data.elearnMssv) {
                            userField.value = data.elearnMssv;
                            userField.dispatchEvent(new Event('input', { bubbles: true }));
                            userField.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                        if (data.elearnPassword) {
                            passField.value = data.elearnPassword;
                            passField.dispatchEvent(new Event('input', { bubbles: true }));
                            passField.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                        setTimeout(() => loginBtn.click(), 800);
                    }
                }, 300);
                setTimeout(() => clearInterval(attemptLogin), 10000);
            }
        } else {
            if (data.elearnAutoLogin) {
                const bodyText = document.body.innerText.toLowerCase();
                const isGuest = bodyText.includes('guest') || bodyText.includes('you are currently using guest access') || bodyText.includes('bạn đang sử dụng quyền khách');
                const hasLoginLink = document.querySelector('a[href*="login/index.php"]');

                if (isGuest && hasLoginLink) {
                    window.location.href = 'https://elearning.tdtu.edu.vn/login/index.php';
                    return;
                }

                if (!isGuest && data.elearnAutoDashboard) {
                    const urlObj = new URL(window.location.href);
                    const path = urlObj.pathname.toLowerCase();
                    const search = urlObj.search.toLowerCase();

                    if ((path === '/course/' || path === '/course' || path === '/' || path === '/course/index.php') && !search.includes('redirect=0')) {
                        window.location.href = 'https://elearning.tdtu.edu.vn/my/';
                        return;
                    }
                }
            }

            if (data.elearnKeepAlive) {
                setInterval(() => fetch(window.location.href).catch(() => { }), 600000);
            }
        }
    }
});