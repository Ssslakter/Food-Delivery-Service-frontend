export function initMain() {
  //Load page consts
  LoadDishes();
}

function LoadDishes() {
  $("#dishes-list").empty();
  $("#dishes-list").load("/html/templates.html #card-template");
  Get("/dish").then(async (response) => {
    if (response.ok) {
      let json = await response.json()
      let template = $("#card-template");
      for (const dish of json.dishes) {
        let block = template.clone();
        FillDishInfo(block, dish)
        block.find(".dish-link").attr("href", `item/${dish.id}`)
        $("#dishes-list").append(block);
      }
    }
  });
}
