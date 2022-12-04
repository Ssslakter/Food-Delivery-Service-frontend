import { PageLoader } from "./loader.js";

export function initCart() {
    LoadCartDishes()

}

function LoadCartDishes() {
    $("#dishes-cart").empty();
    GetAuth('/basket').then(async (response) => {
        if (response.ok) {
            let json = await response.json()
            let template = await $.get('/html/cartTemplate.html');
            for (const dish of json) {
                let block = $(template);
                FillCartInfo(block, dish)
                $("#dishes-cart").append(block);
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

function FillCartInfo(block, data) {
    block.attr("data-id", data.id);
    block.find(".dish-title").text(data.name);
    block.find("img").attr("src", data.image);
    block.find(".dish-price").text(`Цена - ${data.price} р.`);
    block.find(".total-price").text(data.totalPrice)
    block.find(".amount").text(data.amount)
    if (data.amount == 1) {
        block.find(".minus-button").prop('disabled', true);
    }
    block.find(".delete-button").click(() => {
        DeleteAuth(`/basket/dish/${data.id}?increase=false`).then((response) => {
            if (response.ok) {
                block.remove()
                if ($(".list-group-item").length == 0) {
                    $("#no-items").removeClass("d-none")
                }
            }
            else if (response.status == 401) {
                localStorage.clear();
                PageLoader.loadPage("/login");
            }
        })
    })
    block.find(".plus-button").click(() => {
        AddToCart(block, data.id)
    })
    block.find(".minus-button").click(() => RemoveFromCart(block, data.id))
}

function RemoveFromCart(block, id) {
    DeleteAuth(`/basket/dish/${id}?increase=true`).then((response) => {
        if (response.ok) {
            let amount = block.find(".amount")
            amount.text(amount.text() - 1)
            if (amount.text() == 1) {
                block.find(".minus-button").prop('disabled', true);
            }
        }
        else if (response.status == 401) {
            localStorage.clear();
            PageLoader.loadPage("/login");
        }
    })
}

export function AddToCart(block, id) {
    return PostAuth(`/basket/dish/${id}`).then((async (response) => {
        if (response.ok) {
            let amount = block.find(".amount")
            amount.text(parseInt(amount.text()) + 1)
            return true
        }
        else if (response.status == 401) {
            localStorage.clear();
            PageLoader.loadPage("/login");
        }
        return false
    }))
}