// ==UserScript==
// @name         ESIC Helper
// @version      1.0
// @description  Helper Script to Autofill ESIC
// @author       You
// @match        https://portal.esic.gov.in/*
// @grant        none
// @run-at       document-start

// ==/UserScript==

(function () {
    'use strict';

    const url = atob('aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL2tpc2hhbnNpbmdodmVybWEvRVNJQy1IZWxwZXJAbWFpbi9kaXN0');
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${url}/assets/style.css`;

    link.onload = async () => {
        await import(`${url}/index.js`);
    };

    document.head.appendChild(link);
})();