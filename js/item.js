import { LoadNotFoundPage } from "./index.js";

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
            LoadNotFoundPage()
        }
    });
}