import { PageLoader } from "./loader.js";

export function initItem() {
    //Load page consts
    LoadDishInfo();
}

function LoadDishInfo() {
    console.log(location.pathname)
    let url = location.pathname.replace('/item/', '')
    Get(`/dish/${url}`).then(async (response) => {
        if (response.ok) {
            let json = await response.json();
            FillDishInfo($("#dish-page"), json);
        }
        else {
            PageLoader.loadPage("notFound")
        }
    });
}

export function FillDishInfo(block, data) {
    block.attr("data-id", data.id);
    block.find(".dish-title").text(data.name);
    block.find(".dish-category").text(`Категория блюда - ${data.category}`);
    block.find(".dish-image").attr("src", data.image);
    block.find(".dish-description").text(data.description);
    block.find(".dish-vegetarian").text(data.vegetarian ? "Вегетарианское" : "Не вегетарианское")
    block.find(".dish-price").text(`Цена - ${data.price} р.`);
    block.removeClass("d-none");
}