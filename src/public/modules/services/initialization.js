import { Modal } from '../../assets/modals.js';

const waitForElement = (element) => {
    let counts = 0;
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            counts += 1;
            const node = document.querySelector(element)
            if (node) {
                clearInterval(interval);
                resolve(node);
            }
            if (counts >= 25)
                reject(`Could not load the ${element}`);
        }, 200);
    });
}

const getLower = (str) => {
    return str ? str.toLowerCase() : '';
}

const fillForm = () => {
    const recordId = [...document.getElementsByName('radio-check')].find(check => check.checked).Id;
    const record = window.parsedData.find(record => record.id === recordId);

    console.log(record);



    const fields = {
        name_text: document.getElementById('ctl00_HomePageContent_ctrlTextEmpName'),
        father_radio: document.getElementById('ctl00_HomePageContent_ctrlFatherOrHus_0'),
        husband_radio: document.getElementById('ctl00_HomePageContent_ctrlFatherOrHus_1'),
        fatherOrHusband_text: document.getElementById('ctl00_HomePageContent_ctrlTextFatherHusName'),
        dateOfBirth_text: document.getElementById('ctl00_HomePageContent_ctrlTxtIpDate'),
        maritalStatus_option: document.getElementById('ctl00_HomePageContent_ctrlRDMarried'),
        genderMale_radio: document.getElementById('ctl00_HomePageContent_ctrlRDMale_0'),
        genderFemale_radio: document.getElementById('ctl00_HomePageContent_ctrlRDMale_1'),
        genderTrans_radio: document.getElementById('ctl00_HomePageContent_ctrlRDMale_2'),
    }

    const constants = {
        maritalStatus: {
            unmarried: 1,
            married: 2,
            widow: 3,
            widower: 4
        },
        relation: {
            father: fields.father_radio,
            husband: fields.husband_radio
        },
        gender: {
            male: fields.genderMale_radio,
            female: fields.genderFemale_radio,
            transgender: fields.genderTrans_radio
        }
    }

    const relationField = constants.relation[getLower(record['RELATION'])];
    const maritalStatus = constants.maritalStatus[getLower(record['MARITAL STATUS'])];
    const genderField = constants.gender[getLower(record['GENDER M/F'])];

    fields.name_text.value = record['FULL NAME'];
    fields.dateOfBirth_text.value = '01/01/2026';
    relationField.checked = true;
    fields.fatherOrHusband_text.value = record['FATHER/HUSBAND NAME'];
    fields.maritalStatus_option.value = maritalStatus;
    genderField.checked = true;
}

const getFormattedDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

const getDate = (date) => {
    if (date && typeof date === 'number')
        return new Date((date - 25569) * 86400 * 1000);

    return date;
}

const parseFile = (file) => {
    const reader = new FileReader();

    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames.find(name => name.toLowerCase().includes('esic'));
        if (!sheetName) {
            showErrorMessage('ESIC sheet not found!');
            return;
        }

        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null });

        const excelData = [];
        const headers = jsonData[0];

        jsonData.slice(1).forEach(row => {
            const record = {
                Id: crypto.randomUUID()
            };

            row.forEach((column, index) => {
                if (headers[index]) {
                    const header = headers[index].trim().replace(/^\.+|\.+$/g, '').toUpperCase();
                    record[header] = column;
                }
            });

            excelData.push(record);
        });

        const targetRecords = excelData.filter(row => {
            const esicNumber = row['ESIC NO'];
            if (esicNumber && typeof esicNumber === 'string') {
                return esicNumber?.toLowerCase() === 'new';
            }
        });

        window.parsedData = targetRecords;

        console.log("Working...")

        const columnsToRender = targetRecords.map(record => ({
            Id: record.Id,
            Name: record['FULL NAME'],
            DOB: getFormattedDate(getDate(record['DOB'])),
            Site: record['SITE NAME']
        }));

        renderTable(columnsToRender);
    };

    reader.onerror = function () {
        showErrorMessage('error while reading file!');
    };

    reader.readAsArrayBuffer(file);
}

const showErrorMessage = (message) => {
    const messageContainer = document.getElementById('message');
    messageContainer.textContent = message;
    messageContainer.classList.add('show', 'error');
}

const showMessage = (message) => {
    const messageContainer = document.getElementById('message');
    messageContainer.textContent = message;
    messageContainer.classList.add('show', 'info');
}

const clearMessage = () => {
    const messageContainer = document.getElementById('message');
    messageContainer.classList.remove('show');
    messageContainer.textContent = '';
}

const renderTable = (data) => {
    const getCell = (text) => {
        const cell = document.createElement('td');
        cell.textContent = text;
        return cell;
    }

    const onCheck = ({ target }) => {
        const checks = [...document.getElementsByName('radio-check')];

        if (target.checked) {
            checks.forEach(checkBox => {
                if (checkBox !== target) checkBox.checked = false;
            });
        }

        document.getElementById('proceedBtn').disabled = !checks.some(check => check.checked);
    }

    clearTable();
    const tableBody = document.querySelector('#dataTable tbody');

    if (data.length === 0) {
        showErrorMessage("New ESIC not available!");
        return;
    }

    data.forEach(row => {
        const tableRow = document.createElement('tr');
        const selector = document.createElement('td');
        const chechBox = document.createElement('input');
        chechBox.type = 'checkbox';
        chechBox.name = 'radio-check'
        chechBox.value = row.Id;
        chechBox.addEventListener('change', onCheck);
        selector.appendChild(chechBox);
        tableRow.appendChild(selector);
        tableRow.appendChild(getCell(row.Name));
        tableRow.appendChild(getCell(row.DOB));
        tableRow.appendChild(getCell(row.Site));
        tableBody.append(tableRow);
    });

    document.querySelector('.data-table-container').style.display = 'block';
}

const clearTable = () => {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = null;
    document.querySelector('.data-table-container').style.display = 'none';
}

const closeModal = () => {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
}

const openModal = () => {
    const modal = document.getElementById('modal');
    modal.classList.add('active');

    const fileInput = document.getElementById('fileInput');
    fileInput.value = '';

    clearMessage();
    clearTable();
}

const validateFile = (file) => {
    const validExtensions = ['.xlsx', '.xls'];
    const validMimeTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
    ];

    const fileName = file.name.toLowerCase();
    const fileExtension = validExtensions.some(ext => fileName.endsWith(ext));
    const mimeTypeMatch = validMimeTypes.includes(file.type);

    const isValid = fileExtension || mimeTypeMatch;
    if (isValid) console.log('Valid excel file recieved...');
    return isValid;
}

const xlsLoader = {
    isReady: false,
    error: null,
    load: () => {
        if (xlsLoader.isReady === true) {
            console.log('Script already loaded');
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';

        script.onload = () => {
            console.log('SheetJS library loaded.');
            xlsLoader.isReady = true;
        };
        script.onerror = () => { xlsLoader.error = 'Failed to load Excel library.' };

        document.head.appendChild(script);
    }
}

const initializeModal = async () => {
    // Append modal node into DOM
    const modalNode = document.createElement('div');
    modalNode.innerHTML = Modal;
    document.body.append(modalNode);

    // Close modal when clicked outside.
    const modal = document.getElementById('modal');
    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

    // Close modal via close button click event
    const closeBtn = document.getElementById('cancelBtn');
    closeBtn.addEventListener('click', closeModal);

    // Load excel library
    xlsLoader.load();

    // Add handler for proceed button
    const proceedBtn = document.getElementById('proceedBtn');
    proceedBtn.addEventListener('click', fillForm);

    // Attach file input change handler
    fileInput.addEventListener('change', ({ target }) => {
        clearMessage();
        clearTable();
        const file = target.files[0];

        if (!file) {
            showErrorMessage('Please select an excel file.');
            return;
        }

        if (!xlsLoader.isReady) {
            showErrorMessage(xlsLoader.error ?? 'Excel library not loaded!');
            return;
        }

        const isValid = validateFile(file);
        isValid ? parseFile(file) : showErrorMessage('Invalid excel file selected!');
    });
}

export const executeScript = async () => {
    const urlSegments = window.location.href.split('/');

    if (urlSegments.some(segment => segment.includes('EmployeeCounterFoilRegistration'))) {
        waitForElement('#ctl00_lbluserName')
            .then(userId => {
                initializeModal();
                userId.style = 'color: darkgreen; font-weight: bold; cursor: pointer;';
                userId.addEventListener('click', openModal);
            });
    }
    else if (urlSegments.some(segment => segment.includes('PortalHome'))) {
        waitForElement('#div1_close')
            .then(element => {
                element.onclick = null;
                element.click();
            });
    }
}