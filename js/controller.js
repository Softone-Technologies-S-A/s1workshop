const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const API_SERVER = "https://go.s1cloud.net";
const SERIAL_NUMBER = "10502479681120";
const TOKEN = "9J8pIbTHLLLI9JT4TLLoHKLIL4rtLrHvHLXQKNHJLK4";
const APPID = "703";

function getAllItems() {
    s1request("POST", "/s1services/list/item", {
        "appId": APPID,
        "filters": "",
        "token": TOKEN
    }, createItemsBrowser);
}

function createItemsBrowser(data) {
    const rows = data.rows;

    for (var row in rows) {
        var item = rows[row];
        var itemElement = document.createElement("div");
        var itemDataset = createItemDataset(data.fields, item);

        itemElement.classList.add("item");
        itemElement.onclick = addLine;
        itemElement.setAttribute("data-mtrl", itemDataset["ITEM.MTRL"]);
        itemElement.innerHTML = `<span class="item-label">${itemDataset['ITEM.NAME']} ${itemDataset['ITEM.CODE']}</span>`;
        document.getElementById("browser").appendChild(itemElement);
    }

}

function createItemDataset(fields, rows) {
    var dataset = {};

    for (var field in fields) {
        var fieldName = fields[field].name;

        dataset[fieldName] = rows[field];
    }
    sessionStorage.setItem(dataset["ITEM.MTRL"], JSON.stringify(dataset));

    return dataset;
}

function addLine(e) {
    const item = e.currentTarget;
    const itemData = JSON.parse(sessionStorage.getItem(item.dataset.mtrl));
    var lineElement = document.createElement("tr");

    lineElement.classList.add("line");
    lineElement.setAttribute("data-mtrl", itemData["ITEM.MTRL"]);
    lineElement.innerHTML = `<td class="line-cell-alphabetic">${itemData["ITEM.NAME"]}</td><td class="line-cell-numeric">${itemData["ITEM.PRICER"]}</td><td class="line-cell-numeric">${itemData["ITEM.VAT"].split('|')[1]}</td>`;
    document.getElementById("lines").appendChild(lineElement);
    calculateSum(itemData["ITEM.PRICER"]);
}

function calculateSum(newAmount) {
    var inputEl = document.getElementById("sum");
    var sum = Number(inputEl.value);

    inputEl.value = (sum + Number(newAmount)).toFixed(2);
}

function onCancelClick() {
    clearDocument();
}

function clearDocument() {
    document.getElementById("lines").innerHTML = "";
    document.getElementById("sum").value = "0.00";
}

function onPayClick() {
    var ITELINES = [],
        LINENUM = 1,
        lines = document.getElementById("lines").rows;

    for (var i = 0, line; line = lines[i]; i++) {
        if (line != "length") {
            ITELINES.push({
                LINENUM: LINENUM++,
                MTRL: line.dataset.mtrl,
                QTY1: 1,
            })
        }
    }

    document.getElementById("payBtn").innerHTML = '<i class="fa fa-spinner fa-spin"></i>Loading';
    s1request("POST", "/s1services/set/saldoc", {
        data: {
            SALDOC: [{
                PAYMENT: "100", // Μετρητοίς
                SERIES: "7071", // Απόδειξη Λιανικής Πώλησης
                TRDR: "54" // Πελάτης Λιανικής
            }],
            ITELINES: ITELINES
        },
        appId: APPID,
        token: TOKEN,
    }, payCallback);
}

function payCallback() {
    document.getElementById("payBtn").innerHTML = 'Pay';
    clearDocument();
}

function s1request(method, endpoint, body, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        /*
            readyState
 
            0: request not initialized
            1: server connection established
            2: request received
            3: processing request
            4: request finished and response is ready
 
            status 
 
            200: "OK"
            403: "Forbidden"
            404: "Not Found"
        */


        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);

            if (response.success) {
                callback(response);
            } else {
                //error handling
            }

        }
    };

    xhr.open(method, CORS_PROXY + API_SERVER + endpoint, true);

    xhr.setRequestHeader("s1code", SERIAL_NUMBER);
    xhr.send(JSON.stringify(body));
}