const ApiURL = "https://food-delivery.kreosoft.ru/api";
var userToken = ""
var userEmail = ""


function ToJsObject(arr) {
    var values = {};
    $.each(arr, (i, field) => {
        values[field.name] = field.value;
    })
    return values;
}

async function Post(url, data) {
    const response = await fetch(url, {
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
    const response = await fetch(url, {
        credentials: 'same-origin',
        method: 'PUT',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    });
    return await response.json();
}

