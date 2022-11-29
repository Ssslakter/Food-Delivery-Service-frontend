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
    var response = await fetch(fullUrl, {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    });
    return response;
}

async function Put(url, data) {
    let fullUrl = ApiURL + url;
    console.log(fullUrl);
    var response = await fetch(fullUrl, {
        credentials: 'same-origin',
        method: 'PUT',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    });
    return response;
}

async function Get(url, data) {
    let fullUrl = ApiURL + url;
    console.log(fullUrl);
    var response = await fetch(fullUrl, {
        credentials: 'same-origin',
        method: 'GET',
        body: JSON.stringify(data) || null,
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    });
    return response;
}

function AddClickListeners(onClickFunc) {
    var all = $("a");
    for (const link of all) {
        link.addEventListener("click", onClickFunc);
    }
}

function FillDishInfo(block, data) {
    block.attr("data-id", data.id);
    block.find(".dish-title").text(data.name);
    block.find(".dish-category").text(`Категория блюда - ${data.category}`);
    block.find(".dish-image").attr("src", data.image);
    block.find(".dish-description").text(data.description);
    block.find(".dish-vegetarian").text(data.vegetarian ? "Вегетарианское" : "Не вегетарианское")
    block.find(".dish-price").text(`Цена - ${data.price} р.`);
    block.removeClass("d-none");
}

