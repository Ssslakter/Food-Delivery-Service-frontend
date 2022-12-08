import { PageLoader } from "./loader.js";
import { FillCartInfo } from "./cart.js";

var default_delivery_minutes = 60

export function initMakeOrder() {
    AddDelivaryTimeValidation()
    AddProfileData()
    SetOrderTimeRestrictions()
    AddConfirmOrderListener()
    LoadOrderDishes()
}

function LoadOrderDishes() {
    $("#dishes-cart").empty();
    GetAuth('/basket').then(async (response) => {
        if (response.ok) {
            let totalPrices = 0
            let json = await response.json()
            let template = await $.get('/html/purchaseDishTemplate.html');
            for (const dish of json) {
                totalPrices += dish.totalPrice
                let block = $(template);
                FillCartInfo(block, dish)
                $("#dishes-cart").append(block);
            }
            $("#total-cart-price").text(`${totalPrices} ₽`)
        }
        else if (response.status == 401) {
            localStorage.clear();
            PageLoader.loadPage("/login");
        }
        else {
            PageLoader.loadPage("notFound");
        }
    }).then(() => {
        if ($(".list-group-item").length == 0) {
            $("#no-items").removeClass("d-none")
        }
    });
}


async function AddProfileData() {
    let response = await GetAuth('/account/profile')
    if (response.ok) {
        let json = await response.json()
        $("#address").val(json.address)
        $("#phone").val(json.phoneNumber)
        $("#email").val(json.email)
    }
    else if (response.status == 401) {
        localStorage.clear();
        PageLoader.loadPage("/login");
    }
    else {
        PageLoader.loadPage("notFound");
    }
}

function SetOrderTimeRestrictions() {
    $("#delivery-time").attr("min", ConvertDateTimeToString(Date.now()))
    $("#delivery-time").attr("value", ConvertDateTimeToString(new Date(Date.now() + default_delivery_minutes * 60000)))
}

function AddConfirmOrderListener() {
    $("#order-confirm").click(() => {
        var data = $('form').serializeArray();
        data = ToJsObject(data);
        if (!ValidateForm()) {
            return;
        }
        PostAuth("/order", data).then(async (resp) => {
            if (resp.ok) {
                PageLoader.loadPage("/orders");
            }
            else if (resp.status == 400) {
                $("#incorrect-order-time").removeClass("d-none")
            }
            else if (resp.status == 500) {
                $("#server-error").removeClass("d-none")
            }
            else {
                PageLoader.loadPage("/login");
            }

        })
    })
}


export function ValidateForm() {
    var form = $("form")
    form.addClass('was-validated')
    form.validate({
        errorPlacement: function (error, element) {
            if (element.attr("name") == "deliveryTime") {
                error.addClass('invalid-feedback');
                error.insertAfter(element);
            }
        },
        rules: {
            deliveryTime: {
                validateDelivery: true
            }
        }
    })
    return form.valid();
}

function AddDelivaryTimeValidation() {
    $.validator.addMethod("validateDelivery", function (value, element) {
        let timeForDelivery = new Date(value).getTime() - Math.round(Date.now() / 60000) * 60000
        if (value == "" || timeForDelivery >= default_delivery_minutes * 60000) {
            element.setCustomValidity("");
            return true;
        }
        element.setCustomValidity("Invalid field.");
        return false;
    }, "Доставка прибудет не раньше чем через 1 час");
}
