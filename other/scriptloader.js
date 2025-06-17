// ==UserScript==
// @name         ESIC Helper
// @version      1.0
// @description  Helper Script to Autofill ESIC
// @author       You
// @match        https://portal.esic.gov.in/*
// @grant        none
// @run-at       document-start

// ==/UserScript==

//https://portal.esic.gov.in/ESICInsurance1/ESICInsurancePortal/PortalHome.aspx?UserName=fbM/neDE/iUfbXRN+JUIwMXCcYuuHB1p&lupk=9gICyV9R1kCE1fPgkk1Bsg==&to=&ipaddress=TSjFwkfJoVxTZDLvjvyp8Q==
//https://portal.esic.gov.in/ESICInsurance1/Employee/EmployeeCounterFoilRegistration.aspx?emprMasterPk=5vmQrXZYNNo=&emprTmpPK=5vmQrXZYNNo=&subUnitCode=fbM/neDE/iUfbXRN+JUIwMXCcYuuHB1p&subunitMasterPk=5zIGbEqmIYI=&Flag=5vmQrXZYNNo=&emprCode=&Mobile=Ax3gKPhXP+YKD+L4Klc2BA==&Mobileseed=JUGm1Rbj4gM=&status=UNRF86AauDI=&aadhaarNo=&isdisable=yes
//https://portal.esic.gov.in/InsuranceGlobalWebV4/ESICInsurancePortal/

(function () {
    'use strict';

    const url = 'http://localhost:3001/public';

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${url}/assets/style.css`;

    link.onload = async () => {
        await import(`${url}/index.js`);
    };

    document.head.appendChild(link);
})();