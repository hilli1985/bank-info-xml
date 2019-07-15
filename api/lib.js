const getAutoComplete = (fetchedData, query) => {
  const bankNames = fetchedData.map(bank => bank.Bank_Name._text);
  // remove duplicates
  const uniqueBankNames = Array.from(new Set(bankNames));
  return uniqueBankNames
    .filter(bankName => bankName.includes(query))
    .map(bankName => ({
      Bank_Name: bankName,
      Bank_Code: getBankIdByName(fetchedData, bankName)
    }));
};

const getBankIdByName = (fetchedData, bankName) => {
  return fetchedData.filter(bank => bank.Bank_Name._text === bankName)[0]
    .Bank_Code._text;
};

const getBranchListByBankCode = (fetchedData, bankCode) => {
  const branchList = fetchedData.filter(
    branch => branch['Bank_Code']._text === bankCode
  );
  return branchList.map(branch => branch['Branch_Code']._text);
};

const getInfoByBranchAndBankCode = (fetchedData, bankCode, branchCode) => {
  const branchInfo = fetchedData.filter(
    branch =>
      branch['Bank_Code']._text === bankCode &&
      branch['Branch_Code']._text === branchCode
  )[0];
  return branchInfo;
};

module.exports = {
  getAutoComplete,
  getBranchListByBankCode,
  getInfoByBranchAndBankCode
};
