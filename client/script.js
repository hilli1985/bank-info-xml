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

// variables
let input = document.getElementById('input');
// let people = ['john doe', 'maria', 'paul', 'george', 'jimmy'];
let people = [];


async function myFunc(code) {
    console.log(code)
    const branchList = await getBranchList(code)
    console.log('branchList', branchList)
    console.log('people', people)
    let name = people.filter (p => p['Bank_Code'] == code)[0]['Bank_Name']
    input.value = (name);
}

const li = document.createElement('li');
li.innerText = "client";
li.id = "key";
li.className = "client-class";
li.setAttribute("onclick", "valid;");


// events
input.onkeyup = async function (e) {
    console.log('onkeyup', e.target.value);
    await getInput(e)
}

async function updateUI(e) {
    let input_val = e.target.value; // updates the variable on each ocurrence
    if (input_val.length === 0) {
        let autocomplete_results = document.getElementById("autocomplete-results");
        autocomplete_results.innerHTML = '';
    }
    else if (input_val.length > 0) {
        let people_to_show = [];

        let autocomplete_results = document.getElementById("autocomplete-results");
        autocomplete_results.innerHTML = '';
        people_to_show = people;

        for (let i = 0; i < people_to_show.length; i++) {
            let code = people_to_show[i]['Bank_Code'];
            let name = people_to_show[i]['Bank_Name'];
            autocomplete_results.innerHTML += `<li class="list-element" onclick="myFunc( ${code} )" > ${name}</li>`;
        }
        autocomplete_results.style.display = 'block';
    } else {
        people_to_show = [];
        autocomplete_results.innerHTML = '';
    }
}

async function clickHandler() {
    const response = await getBranchInfo(46, branchCodeInput.value);
    let str = '';
    str = `<h3 class="h-bank-info">${response.data['Branch_Name']._text} (${response.data['Branch_Code']._text})</h3>`;
    str = str + `<h4 class="h-bank-info">${response.data['Bank_Name']._text}</h4>`;
    str = str + Object.keys(infoKeys).map(key => {
        if (key === 'Branch_Name' || key === 'Branch_Code' || key === 'Bank_Name') {
            return ``
        }
        else {
            return `<div><div class="h-field-bank-info" >${infoKeys[key]}</div>: ${response.data[key]._text}</div>`
        }
    }).join('')
    brachInfo.outerHTML = `<div id="bankInfo" class="col-sm-8 bank-info">${str}</div>`;
}



let timeout = null;


async function getInput(e) {
    e.preventDefault()
    clearTimeout(timeout);
    let autocompleteArr = [];
    timeout = setTimeout(async function () {
        console.log('Input Value:', e.target.value);
        autocompleteArr = await getAutocomplete(e.target.value);
        people = autocompleteArr.data;
        updateUI(e)
    }, 1000);
};

document.getElementById('btnSubmit').onclick = clickHandler;
// document.getElementById('input').onkeyup = getInput;
window.myFunc = myFunc