// ==UserScript==
// @name         ESIC Helper
// @version      1.0
// @description  Helper Script to Autofill ESIC
// @author       You
// @match        https://portal.esic.gov.in/ESICInsurance1/*
// @grant        none
// @run-at       document-start

// ==/UserScript==

//https://portal.esic.gov.in/ESICInsurance1/ESICInsurancePortal/PortalHome.aspx?UserName=fbM/neDE/iUfbXRN+JUIwMXCcYuuHB1p&lupk=9gICyV9R1kCE1fPgkk1Bsg==&to=&ipaddress=TSjFwkfJoVxTZDLvjvyp8Q==
//https://portal.esic.gov.in/ESICInsurance1/Employee/EmployeeCounterFoilRegistration.aspx?emprMasterPk=5vmQrXZYNNo=&emprTmpPK=5vmQrXZYNNo=&subUnitCode=fbM/neDE/iUfbXRN+JUIwMXCcYuuHB1p&subunitMasterPk=5zIGbEqmIYI=&Flag=5vmQrXZYNNo=&emprCode=&Mobile=Ax3gKPhXP+YKD+L4Klc2BA==&Mobileseed=JUGm1Rbj4gM=&status=UNRF86AauDI=&aadhaarNo=&isdisable=yes

window.addEventListener('load', async () => {
    const url = 'https://cdn.jsdelivr.net/gh/kishansinghverma/Emandi-Script@main/dist';
    // const url = 'http://localhost:3001/public';

    $('<link>').attr('rel', 'stylesheet').attr('href', `${url}/assets/style.css`)
        .on('load', async () => { await import(`${url}/index.js`) })
        .appendTo(document.head);
});
