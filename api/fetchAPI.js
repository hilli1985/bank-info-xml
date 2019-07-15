const convert = require('xml-js');
const axios = require('axios')
const consts = require('../consts')

const fetchDatafromApi = async () => {
  try {
    const { data } = await axios.get(consts.url)
    const bankData = convert.xml2json(data, { compact: true, spaces: 4 });
    const json = JSON.parse(bankData)
    return json["BRANCHES"]["BRANCH"];
  } catch (error) {
    console.log('cannot get xml')
  }
}

module.exports = fetchDatafromApi;