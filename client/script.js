import { getAutocomplete, getBranchInfo, getBranchList } from './api/lib.js';
const bankNameInput = document.getElementById('bankNameInput');
const branchCodeInput = document.getElementById('branchCodeInput');
const brachInfo = document.getElementById('branchInfo');
const autoComplete = document.getElementById('autoComplete');

const infoKeys = {
    Branch_Name: 'שם סניף',
    Bank_Name: 'שם בנק',
    Bank_Code: 'קוד בנק',
    Branch_Code: 'קוד סניף',
    Branch_Address: 'כתובת הסניף',
    City: 'עיר',
    Zip_Code: 'מיקוד',
    POB: 'ת.ד',
    Telephone: 'טלפון',
    Fax: 'פקס',
    Free_Tel: 'חיוג מקוצר',
    Handicap_Access: 'גישה לבעלי מוגבלות',
    day_closed: 'ימים סגורים',
    Branch_Type: 'סוג סניף',
    // X_Coordinate:'lat',
    // Y_Coordinate:'lan',
}

async function clickHandler() {
    const response = await getBranchInfo(13, branchCodeInput.value);
    let str = '';
    str = `<h3 class="h-bank-info">${response.data['Branch_Name']._text} (${response.data['Branch_Code']._text})</h3>`; 
    str = str + `<h4 class="h-bank-info">${response.data['Bank_Name']._text}</h4>`; 
    str = str + Object.keys(infoKeys).map(key => {
        if (key === 'Branch_Name'|| key ==='Branch_Code' || key ==='Bank_Name') {
            return ``        
        }
        else {
            return `<div><div class="h-field-bank-info" >${infoKeys[key]}</div>: ${response.data[key]._text}</div>`
        }
    }).join('')
brachInfo.outerHTML = `<div id="bankInfo" class="col-sm-8 bank-info">${str}</div>`;
}

function selectBranch() {
    alert('You clicked me');
}

let timeout = null;

function createAutoComplete (autocompleteArr) {
    return autocompleteArr.data.map (a => `<option id="autoComplete">auto auto hi hi</option>`).join('')  
}

const showDropdown = function (element) {
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('mousedown', true, true, window);
    element.dispatchEvent(event);
    element.autoFocus = true
};

showDropdown(bankNameInput);

async function getInput(e) {
    e.preventDefault()
    clearTimeout(timeout);
    timeout = setTimeout(async function () {
        console.log('Input Value:', e.target.value);
        const autocompleteArr = await getAutocomplete(e.target.value);
        console.log('autocompleteArr', autocompleteArr)
        console.log(createAutoComplete(autocompleteArr))
        bankNameInput.outerHTML = `<select id="bankNameInput">${createAutoComplete(autocompleteArr)}<select>`;
        const branchList = await getBranchList(13)
        console.log('branchList', branchList)
    }, 2000);
};

document.getElementById('btnSubmit').onclick = clickHandler;
document.getElementById('bankNameInput').onkeyup = getInput;
