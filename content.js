chrome.storage.local.get([
    'isPortalActive', 'isElearnActive', 'portalMssv', 'portalPassword', 'portalAutoLogin',
    'portalAutoMain', 'portalBlockPopup', 'portalKeepAlive', 'elearnMssv',
    'elearnPassword', 'elearnAutoLogin', 'elearnAutoDashboard', 'elearnKeepAlive'
], (data) => {
    const currentUrl = window.location.href;
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;

    if (hostname.includes('stdportal.tdtu.edu.vn') && data.isPortalActive !== false) {
        if (data.portalBlockPopup) {
            const style = document.createElement('style');
            style.innerHTML = '.modal-backdrop, .bootbox.modal { display: none !important; opacity: 0 !important; }';
            document.head.appendChild(style);
            const killPopup = setInterval(() => {
                const closeBtn = document.querySelector('.bootbox-close-button');
                if (closeBtn) {
                    closeBtn.click();
                    document.body.classList.remove('modal-open');
                    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
                }
            }, 300);
            setTimeout(() => clearInterval(killPopup), 5000);
        }
        if (data.portalAutoMain && pathname === '/') {
            window.location.href = window.location.origin + '/main' + window.location.search;
            return;
        }
        const hasLogin = document.getElementById('txtUser') || document.getElementById('btnLogIn');
        if (data.portalAutoLogin && (hasLogin || currentUrl.toLowerCase().includes('login'))) {
            const timer = setInterval(() => {
                const u = document.getElementById('txtUser'), p = document.getElementById('txtPass'), b = document.getElementById('btnLogIn');
                if (u && p && b) {
                    clearInterval(timer);
                    u.value = data.portalMssv || ''; p.value = data.portalPassword || '';
                    ['input', 'change'].forEach(ev => {
                        u.dispatchEvent(new Event(ev, { bubbles: true }));
                        p.dispatchEvent(new Event(ev, { bubbles: true }));
                    });
                    setTimeout(() => b.click(), 800);
                }
            }, 300);
            setTimeout(() => clearInterval(timer), 10000);
        }
    }

    if (hostname.includes('elearning.tdtu.edu.vn') && data.isElearnActive !== false) {
        if (data.elearnAutoDashboard) {
            const isAtSiteHome = (pathname === '/course/' || pathname === '/course/index.php') && (window.location.search === '' || window.location.search === '?redirect=0');
            if (isAtSiteHome) {
                window.location.href = 'https://elearning.tdtu.edu.vn/my/';
                return;
            }
        }
        if (currentUrl.includes('login/index.php')) {
            if (document.body.innerText.toLowerCase().includes('already logged in')) {
                document.querySelectorAll('button').forEach(btn => {
                    if (btn.textContent.trim().toLowerCase() === 'cancel') btn.click();
                });
            }
            if (data.elearnAutoLogin) {
                const timer = setInterval(() => {
                    const u = document.getElementById('username'), p = document.getElementById('password'), b = document.getElementById('loginbtn');
                    if (u && p && b) {
                        clearInterval(timer);
                        u.value = data.elearnMssv || ''; u.dispatchEvent(new Event('input', { bubbles: true }));
                        p.value = data.elearnPassword || ''; p.dispatchEvent(new Event('input', { bubbles: true }));
                        setTimeout(() => b.click(), 800);
                    }
                }, 300);
                setTimeout(() => clearInterval(timer), 10000);
            }
        } else {
            if (data.elearnAutoLogin && (document.body.innerText.includes('Guest') || document.body.innerText.includes('Bạn chưa đăng nhập'))) {
                window.location.href = 'https://elearning.tdtu.edu.vn/login/index.php';
            }
        }
    }
});