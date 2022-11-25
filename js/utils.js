const ApiURL = "https://food-delivery.kreosoft.ru/api";
var userToken = ""
var userEmail = ""

const endpoints = ["/login/", "/registration/", "/profile", "/item/", "/cart/", "/orders", "/order/", "/purchase"]

function ToJsObject(arr) {
    var values = {};
    $.each(arr, (i, field) => {
        values[field.name] = field.value;
    })
    return values;
}

async function Post(url, data) {
    let fullUrl = ApiURL + url;
    console.log(fullUrl);
    const response = await fetch(fullUrl, {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    });
    return await response.json();
}

async function Put(url, data) {
    let fullUrl = ApiURL + url;
    console.log(fullUrl);
    const response = await fetch(fullUrl, {
        credentials: 'same-origin',
        method: 'PUT',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    });
    return await response.json();
}

async function Get(url, data) {
    let fullUrl = ApiURL + url;
    console.log(fullUrl);
    const response = await fetch(fullUrl, {
        credentials: 'same-origin',
        method: 'GET',
        body: JSON.stringify(data) || null,
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    });
    return await response.json();
}

function AddClickListeners(onClickFunc) {
    var all = $("a");
    for (const link of all) {
        link.addEventListener("click", onClickFunc);
    }
}