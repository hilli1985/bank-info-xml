import { getAutocomplete, getBranchInfo, getBranchList } from './api/lib.js';
import { infoKeys } from './consts.js';

// variables
const bankNameInput = document.getElementById('bank-name-input');
const branchCodeInput = document.getElementById('branch-code-input');
const brachInfo = document.getElementById('branch-info');
const autocompleteResults = document.getElementById('autocomplete-results');
const searchBtn = document.getElementById('btn-submit');

let timeout = null;
let banksToShow = [];
let currentBankCode = 0;

async function selectBankCode(bankCode) {
    const branchList = await getBranchList(bankCode);
    currentBankCode = bankCode;
    bankNameInput.value = banksToShow.filter(p => p['Bank_Code'] == bankCode)[0]['Bank_Name'];
    autocompleteResults.innerHTML = '';
    let res = renderBranches(branchList.data);
    branchCodeInput.innerHTML = `<select class="select-branch" id="select-branch-id"><option>בחר סניף רצוי מהרשימה</option>${res}</select>`;
}

function renderBranches(branchList) {
    return branchList.map(o => `<option value="${o}">${o}</option>`).join('');
}

async function renderAutoComplete(e) {
    let input_val = e.target.value; // updates the variable on each ocurrence
    if (input_val.length > 0) {
        let autocompleteResults = document.getElementById("autocomplete-results");
        autocompleteResults.innerHTML = '';
        autocompleteResults.innerHTML = banksToShow.map(b => {
            let code = b['Bank_Code'];
            let name = b['Bank_Name'];
            return `<li class="list-element" onclick="selectBankCode( ${code} )" > ${name}</li>`;
        }).join('')
        autocompleteResults.style.display = 'block';
    } else {
        banksToShow = [];
        autocompleteResults.innerHTML = '';
    }
}

// search btn clicked
async function clickHandler() {
    const e = document.getElementById("select-branch-id");
    const currentBranchCode = e.options[e.selectedIndex].value;
    const response = await getBranchInfo(currentBankCode, currentBranchCode);
    let str = '';
    str = `<h3 class="h-bank-info">${response.data['Branch_Name']._text} (${response.data['Branch_Code']._text})</h3>`;
    str = str + `<h4 class="h-bank-info">${response.data['Bank_Name']._text}</h4>`;
    str = str + Object.keys(infoKeys).map(key => {
        if (key === 'Branch_Name' || key === 'Branch_Code' || key === 'Bank_Name') {
            return ``
        }
        else {
            let field = response.data[key]._text ? response.data[key]._text : 'אין נתונים בנושא זה'
            return `<div><div class="h-field-bank-info" >${infoKeys[key]}</div>: ${field}</div>`
        }
    }).join('')
    brachInfo.innerHTML = `<div id="branch-info" class="bank-info">${str}</div>`;
}

async function debounceAutoComlete(e) {
    e.preventDefault()
    clearTimeout(timeout);
    let autocompleteArr = [];
    timeout = setTimeout(async function () {
        autocompleteArr = await getAutocomplete(e.target.value);
        banksToShow = autocompleteArr.data;
        renderAutoComplete(e);
    }, 1000);
};

// events
bankNameInput.onkeyup = async function (e) {
    await debounceAutoComlete(e);
}
searchBtn.onclick = clickHandler;

window.selectBankCode = selectBankCode;
