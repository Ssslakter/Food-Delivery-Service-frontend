const ApiURL = "https://food-delivery.kreosoft.ru/api";


function ToJsObject(arr) {
    var values = {};
    $.each(arr, (i, field) => {
        values[field.name] = field.value;
        if (field.value == "") {
            values[field.name] = null
        }
    })
    return values;
}

async function Post(url, data) {
    return Request(url, data, "POST", false);
}

async function Get(url, data) {
    return Request(url, data, "GET", false);
}

async function GetAuth(url, data) {
    return Request(url, data, "GET", true);
}

async function PutAuth(url, data) {
    return Request(url, data, "PUT", true);
}

async function PostAuth(url, data) {
    return Request(url, data, "POST", true);
}

async function DeleteAuth(url, data) {
    return Request(url, data, "DELETE", true);
}


async function Request(url, data, type, isAuth) {
    let fullUrl = ApiURL + url;
    let hs = new Headers({
        'Content-Type': 'application/json'
    })
    if (isAuth) {
        hs.append("Authorization", `Bearer ${GetToken()}`)
    }
    var response = await fetch(fullUrl, {
        credentials: 'same-origin',
        method: type,
        body: JSON.stringify(data) || null,
        headers: hs
    });
    return response;
}

function GetToken() {
    return localStorage.getItem('userToken')
}

function SetToken(token) {
    return localStorage.setItem('userToken', token)
}


function ConvertDateTimeToString(date) {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(date - tzoffset)).toISOString().slice(0, -1);
    var timeArr = localISOTime.split(':')//drop seconds
    return `${timeArr[0]}:${timeArr[1]}`
}
