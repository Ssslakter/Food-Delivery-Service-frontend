import { PageLoader } from "./loader.js";

export function initOrders() {
    LoadOrders()
    $('.new-order').click(() => {
        PageLoader.loadPage('/purchase')
    })
}

function LoadOrders() {
    IfCartNotEmpty()
    $("#orders-list").empty();
    GetAuth('/order').then(async (response) => {
        if (response.ok) {
            let json = await response.json()
            let template = await $.get('/html/ordersTemplate.html');
            for (const dish of json) {
                let block = $(template);
                FillOrderInfo(block, dish)
                AddConfirmListener(block, dish.id)
                block.find(".order-time").attr("href", `/order/${dish.id}`)
                block.find(".order-time").click(async (e) => {
                    e.preventDefault();
                    var full = new URL(`${location.origin}/order/${dish.id}`);
                    PageLoader.loadPage(full.pathname, full.search);
                });
                $("#orders-list").append(block);
            }
        }
        else if (response.status == 401) {
            localStorage.clear();
            PageLoader.loadPage("/login");
        }
    }).then(() => {
        if ($(".list-group-item").length == 0) {
            $("#no-items").removeClass("d-none")
        }
    });
}

function IfCartNotEmpty() {
    GetAuth('/basket').then(async (response) => {
        if (response.ok) {
            let json = await response.json()
            if (json.length == 0) {
                $('#cart-block').addClass('d-none')
                console.log("empty busket")
            }
            else {
                $('#cart-block').removeClass('d-none')
            }
        }
    }
    )
}


function FillOrderInfo(block, data) {
    block.attr("data-id", data.id);
    var orderState, deliveryStr;
    if (data.status == 'InProcess') {
        block.find('.confirm-delivery').removeClass('d-none')
        orderState = 'В обработке'
        deliveryStr = new Date(data.deliveryTime)
        deliveryStr = `Доставки ожидается в ${deliveryStr.toLocaleTimeString().slice(0, -3)}`
    }
    else {
        block.find('.confirm-delivery').addClass('d-none')
        orderState = 'Доставлен'
        deliveryStr = new Date(data.deliveryTime)
        deliveryStr = `Доставлен: ${deliveryStr.toLocaleDateString()} ${deliveryStr.toLocaleTimeString()}`.slice(0, -3);
    }
    block.find('.order-status').text(`Статус заказа - ${orderState}`);
    let orderDate = new Date(data.orderTime)
    block.find('.order-time').text(`Заказ от ${orderDate.toLocaleDateString()}`);
    block.find('.delivery-time').text(deliveryStr);
    block.find('.order-cost').text(`${data.price} ₽`);
}


function AddConfirmListener(block, id) {
    block.find('.confirm-delivery').click(() => {
        PostAuth(`/order/${id}/status`).then(async (response) => {
            if (response.ok) {
                LoadOrders();
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