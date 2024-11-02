// ==UserScript==
// @name         Google Logout Confirm
// @namespace    http://tampermonkey.net/
// @author       Microdust
// @version      1.0
// @description  為 Google 登出鈕增加確認對話框，避免誤點導致帳號全部登出
// @include      *://*.google.*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const MSG = (() => {
        const userLanguage = navigator.language || navigator.userLanguage;
        switch (userLanguage) {
            case 'zh-TW':
                return '確定要登出嗎？';
            case 'zh-HK':
                return '確定要登出嗎？';
            case 'zh-CN':
                return '确定要登出吗？';
            default:
                return 'Are you sure you want to log out?';
        }
    })();

    window.addEventListener('load', function() {
        confirmLogout();
    });

    function confirmLogout() {
        const logoutElements = Array.from(document.getElementsByTagName('a')).filter(el => el.href.includes('Logout'));

        logoutElements.forEach(element => {
            let parent = element;

            while (parent && parent.tagName !== 'A') {
                parent = parent.parentElement;
            }

            if (parent && parent.tagName === 'A') {
                const clonedLink = parent.cloneNode(true);
                clonedLink.removeAttribute('href');

                clonedLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    if (confirm(MSG)) {
                        parent.click();
                    }
                });
                parent.parentElement.insertBefore(clonedLink, parent);
                parent.style.display = 'none';

            }
        });
    }
})();


