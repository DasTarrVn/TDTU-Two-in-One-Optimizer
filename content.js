// content.js
const PORTAL_HOSTNAME = 'stdportal.tdtu.edu.vn';
const ELEARN_HOSTNAME = 'elearning.tdtu.edu.vn';

function triggerInputEvents(element, value) {
    if (element && value) {
        element.value = value;
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
    }
}

function handlePortal(data, currentUrl) {
    if (data.portalBlockAds) {
        // Use MutationObserver for better performance than setInterval
        const observer = new MutationObserver((mutations, obs) => {
            const adBtn = document.querySelector('.bootbox-close-button.close');
            if (adBtn) {
                adBtn.click();
                obs.disconnect(); // Disconnect after closing the ad
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });

        // Initial check in case it's already in the DOM
        const adBtn = document.querySelector('.bootbox-close-button.close');
        if (adBtn) adBtn.click();
    }

    if (data.portalAutoMain && window.location.pathname === '/' && window.location.search.toLowerCase().includes('token=')) {
        window.location.pathname = '/main';
        return;
    }

    const hasLoginForm = document.getElementById('txtUser') || document.getElementById('btnLogIn');

    if (hasLoginForm || currentUrl.includes('login')) {
        if (data.portalAutoLogin) {
            let attempts = 0;
            const maxAttempts = 33; // ~10 seconds at 300ms

            const attemptLogin = setInterval(() => {
                attempts++;
                const userField = document.getElementById('txtUser');
                const passField = document.getElementById('txtPass');
                const loginBtn = document.getElementById('btnLogIn');

                if (userField && passField && loginBtn) {
                    clearInterval(attemptLogin);
                    triggerInputEvents(userField, data.portalMssv);
                    triggerInputEvents(passField, data.portalPassword);
                    setTimeout(() => loginBtn.click(), 800);
                } else if (attempts >= maxAttempts) {
                    clearInterval(attemptLogin);
                }
            }, 300);
        }
    } else if (data.portalKeepAlive) {
        setInterval(() => fetch(window.location.href).catch(() => console.debug('Keep-alive fetch failed')), 600000);
    }
}

function handleElearning(data, currentUrl) {
    if (currentUrl.includes('login/index.php')) {
        if (document.body.innerText.toLowerCase().includes('already logged in')) {
            const altCancelBtn = document.querySelector('form[action*="elearning.tdtu.edu.vn"] button') ||
                Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.trim().toLowerCase() === 'cancel');
            if (altCancelBtn) {
                altCancelBtn.click();
                return;
            }
        }

        if (data.elearnAutoLogin) {
            let attempts = 0;
            const maxAttempts = 33; // ~10 seconds at 300ms

            const attemptLogin = setInterval(() => {
                attempts++;
                const userField = document.getElementById('username');
                const passField = document.getElementById('password');
                const loginBtn = document.getElementById('loginbtn');

                if (userField && passField && loginBtn) {
                    clearInterval(attemptLogin);
                    triggerInputEvents(userField, data.elearnMssv);
                    triggerInputEvents(passField, data.elearnPassword);
                    setTimeout(() => loginBtn.click(), 800);
                } else if (attempts >= maxAttempts) {
                    clearInterval(attemptLogin);
                }
            }, 300);
        }
    } else {
        if (data.elearnAutoLogin) {
            const isGuest = document.querySelector('.usermenu .login') ||
                document.body.innerText.toLowerCase().includes('you are currently using guest access') ||
                document.body.innerText.toLowerCase().includes('bạn đang sử dụng quyền khách');

            const loginLink = document.querySelector('a[href*="login/index.php"]');

            if (isGuest && loginLink) {
                window.location.href = loginLink.href;
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
            setInterval(() => fetch(window.location.href).catch(() => console.debug('Keep-alive fetch failed')), 600000);
        }
    }
}

chrome.storage.local.get([
    'isPortalActive', 'isElearnActive',
    'portalMssv', 'portalPassword', 'portalAutoLogin', 'portalKeepAlive', 'portalBlockAds', 'portalAutoMain',
    'elearnMssv', 'elearnPassword', 'elearnAutoLogin', 'elearnKeepAlive', 'elearnAutoDashboard'
], (data) => {
    const portalActive = data.isPortalActive !== false;
    const elearnActive = data.isElearnActive !== false;
    const currentUrl = window.location.href.toLowerCase();
    const hostname = window.location.hostname.toLowerCase();

    if (hostname.includes(PORTAL_HOSTNAME) && portalActive) {
        handlePortal(data, currentUrl);
    }

    if (hostname.includes(ELEARN_HOSTNAME) && elearnActive) {
        handleElearning(data, currentUrl);
    }
});