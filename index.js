const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser');
const consts = require('./consts')
const port = consts.port
const fetchDataFromApi = require('./api/fetchAPI')
const { getAutoComplete, getBranchListByBankCode, getInfoByBranchAndBankCode } = require('./api/lib')
let fetchedData;

const initializeData = async () => {
    fetchedData = await fetchDataFromApi()
}
initializeData();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname + "/client/build")));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, live-chat-token')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/', 'index.html'))
})

//http://localhost:8080/apiBank/all
app.get('/apiBank/all', (req, res) => {
    res.send({ data: fetchedData })
})

//http://localhost:8080/apiBank/autocomplete?query=אגוד
app.get('/apiBank/autocomplete', (req, res) => {
    const { query } = req.query
    res.send({ data: getAutoComplete(fetchedData, query) })
})

//http://localhost:8080/apiBank/branchList?bankCode=52
app.get('/apiBank/branchList', (req, res) => {
    const { bankCode } = req.query
    if (parseInt(bankCode) > 0) {
        res.send({ data: getBranchListByBankCode(fetchedData, bankCode) })
    }
    else {
        res.send('Sorry invalid bank')
    }
})

//http://localhost:8080/apiBank/branchInfo?bankCode=52&&branchCode=176
app.get('/apiBank/branchInfo', (req, res) => {
    const { bankCode, branchCode } = req.query
    const info = getInfoByBranchAndBankCode(fetchedData, bankCode, branchCode)
    res.send({ data: info })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))








