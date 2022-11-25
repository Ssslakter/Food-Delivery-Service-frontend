export function initMain() {
  //Load page consts
  LoadDishes();
}

function LoadDishes() {
  $("#dishes-list").empty();
  $("#dishes-list").load("/html/templates.html #card-template");
  Get("/dish").then((json) => {
    let template = $("#card-template");
    for (const dish of json.dishes) {
      let block = template.clone();
      console.log(dish.id);
      block.attr("data-id", dish.id);
      block.find(".dish-title").text(dish.name);
      block.find(".dish-category").text(`Категория блюда - ${dish.category}`);
      block.find(".dish-image").attr("src", dish.image);
      block.find(".dish-description").text(dish.description);
      block.find(".dish-price").text(`Цена - ${dish.price} р.`);
      block.removeClass("d-none");
      $("#dishes-list").append(block);
    }
  });
}
