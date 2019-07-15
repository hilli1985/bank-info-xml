const getAutoComplete = (fetchedData, query) => {
    const bankNames = fetchedData.map(bank => bank.Bank_Name._text)
    const reducedBankNames = bankNames.reduce(function (acc, el, i, arr) {
        if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
    }, []);
    return (reducedBankNames.filter(bankName => bankName.includes(query))).map(bankName => { return { Bank_Name: bankName, Bank_Code: getBankIdByName(fetchedData , bankName) } })
}

const getBankIdByName = (fetchedData, bankName) => {
    return fetchedData.filter(bank => bank.Bank_Name._text === bankName)[0].Bank_Code._text
}

const getBranchListByBankCode = (fetchedData, bankCode) => {
    const branchList = fetchedData.filter(branch => branch['Bank_Code']._text === bankCode);
    return branchList.map(branch => branch['Branch_Code']._text);
}

const getInfoByBranchandBankCode = (fetchedData, bankCode, branchCode) => {
    const branchInfo = fetchedData.filter(branch => (branch['Bank_Code']._text === bankCode) && (branch['Branch_Code']._text === branchCode))[0];
    return branchInfo;
}

module.exports = { getAutoComplete, getBranchListByBankCode, getInfoByBranchandBankCode };