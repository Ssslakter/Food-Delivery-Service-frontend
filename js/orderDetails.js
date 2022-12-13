import { PageLoader } from "./loader.js";
import { FillCartInfo } from "./cart.js";
export function initDetails() {
    //Load page consts
    LoadOrderDetails();
}

function LoadOrderDetails() {
    $("#details-page").empty();
    GetAuth(location.pathname).then(async (response) => {
        if (response.ok) {
            let json = await response.json();
            let template = await $.get("/html/orderDetailsTemplate.html");
            let block = $(template)
            AddConfirmListener(block, json.id)
            FillDetailsInfo(block, json);
            FillListInfo(block.find('ul'), json.dishes)
            $("#details-page").append(block);
        }
        else if (response.status == 401) {
            PageLoader.loadPage('/login')
        }
        else {
            PageLoader.loadPage("notFound")
        }
    });
}

async function FillListInfo(list, data) {
    let template = await $.get("/html/purchaseDishTemplate.html");
    for (const dish of data) {
        let block = $(template);
        FillCartInfo(block, dish)
        list.append(block);
    }
}

function FillDetailsInfo(block, data) {
    if (data.status == 'InProcess') {
        block.find('.confirm-delivery').removeClass('d-none')
        var orderState = 'В обработке'
    }
    else {
        block.find('.confirm-delivery').addClass('d-none')
        var orderState = 'Доставлен'
    }
    block.find('.order-title').text(data.id.slice(-4))
    block.attr("data-id", data.id);
    block.find(".order-time").text(ToDateString(data.orderTime));
    block.find(".delivery-time").text(ToDateString(data.deliveryTime));
    block.find(".address").text(data.address);
    block.find(".order-status").text(orderState);
    block.find(".order-price").text(`${data.price} ₽`);
}

function ToDateString(date) {
    let dateStr = new Date(date)
    return `${dateStr.toLocaleDateString()} ${dateStr.toLocaleTimeString()}`.slice(0, -3);
}

function AddConfirmListener(block, id) {
    block.find('.confirm-delivery').click(() => {
        PostAuth(`/order/${id}/status`).then(async (response) => {
            if (response.ok) {
                LoadOrderDetails()
                var toast = new bootstrap.Toast($("#liveToast")[0])
                toast.show()
            }
            else if (response.status == 401) {
                localStorage.clear();
                PageLoader.loadPage("/login");
            }
        }
        )
    })
}