export function initCart() {
    $('.delete-button').click(function (e) {
        e.preventDefault();
        //get parent
        e.data('id')
    });
}

function LoadCartDishes() {
    $("#dishes-cart").empty();
    Get('/api/basket').then(async (response) => {
        if (response.ok) {
            let json = await response.json()
            let template = await $.get('/html/cartTemplate.html');
            for (const dish of json) {
                let block = $(template);
                FillCartInfo(block, dish)
                block.find(".dish-link").attr("href", `item/${dish.id}`)
                $("#dishes-list").append(block);
            }
        }
    });
    $("#dishes-cart").append(template);
}

function FillCartInfo(block, data) {
    block.attr("data-id", data.id);
    block.find(".dish-title").text(data.name);
    block.find("img").attr("src", data.image);
    block.find(".dish-price").text(`Цена - ${data.price} р.`);
    block.find(".total-price").text(data.totalPrice)
    block.find(".amount").text(data.amount)
}