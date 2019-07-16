
function apiCaller(url) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      method: "GET",
        url: url,
        success:function (data) {
          let response = data;
          resolve(response);
        },
        error: function (textStatus) {
          console.log(textStatus);
          reject(textStatus)
        } 
    });
});
}

export const getAutocomplete = async (query) => {
  let url = `http://localhost:8080/apiBank/autocomplete?query=${query}`;
  let response = await apiCaller(url);
  return response;
};

export const getBranchList = async (bankCode) => {
  let url = `http://localhost:8080/apiBank/branchList?bankCode=${bankCode}`;
  let response = await apiCaller(url);
  return response;
};

export const getBranchInfo = async (bankCode, branchCode) => {
  let url = `http://localhost:8080/apiBank/branchInfo?bankCode=${bankCode}&&branchCode=${branchCode}`;
  let response = await apiCaller(url);
  return response;
};




