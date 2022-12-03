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

async function Put(url, data) {
    return Request(url, data, "PUT", false);
}

async function Get(url, data) {
    return Request(url, data, "GET", false);
}

function AddClickListeners(onClickFunc) {
    var all = $("a");
    for (const link of all) {
        link.addEventListener("click", onClickFunc);
    }
}

async function Request(url, data, type, isAuth) {
    let fullUrl = ApiURL + url;
    let hs = new Headers({
        'Content-Type': 'application/json'
    })
    if (isAuth) {
        hs["Authoriztion"] = GetToken()
    }
    console.log(fullUrl);
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