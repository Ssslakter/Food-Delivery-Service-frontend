import { FillDishInfo } from "./item.js";
import { SetLinkListeners } from './loader.js';

export function initMain(queryString) {
  //Load page consts
  LoadDishes(queryString || '').then(
    SetLinkListeners
  );
}

async function LoadDishes(queryString) {
  $("#dishes-list").empty();
  $('.selectpicker').selectpicker();
  Get(`/dish/${queryString}`).then(async (response) => {
    if (response.ok) {
      let json = await response.json()
      UpdatePagination(json.pagination)
      let template = await $.get("/html/dishTemplate.html");
      for (const dish of json.dishes) {
        let block = $(template);
        FillDishInfo(block, dish)
        block.find(".dish-link").attr("href", `item/${dish.id}`)
        $("#dishes-list").append(block);
      }
    }
  });
}

function UpdatePagination(pageData) {
  let curr = pageData.current
  $('#page-left').removeClass('disabled');
  $('#page-right').removeClass('disabled');
  if (curr == 1) {
    $('#page-left').addClass('disabled');
    ChangePageButtonState($(`#page-1`), curr, true)
    ChangePageButtonState($(`#page-2`), curr + 1, false)
    ChangePageButtonState($(`#page-3`), curr + 2, false)
  }
  else if (curr == pageData.count) {
    $('#page-right').addClass('disabled')
    ChangePageButtonState($(`#page-1`), curr - 2, false)
    ChangePageButtonState($(`#page-2`), curr - 1, false)
    ChangePageButtonState($(`#page-3`), curr, true)
  }
  else {
    for (let i = -1; i <= 1; i++) {
      ChangePageButtonState($(`#page-${i + 2}`), curr + i, i == 0)
    }
  }
  ChangePageButtonState($(`#page-left`), curr - 1, false)
  ChangePageButtonState($(`#page-right`), curr + 1, false)
}

function ChangePageButtonState(element, number, isActive) {
  var s = element.children(".page-link").text();
  if (s != ' « ' && s != ' » ') {
    element.children(".page-link").text(number)
  }
  element.children(".page-link").attr('href', `?page=${number}`)
  if (isActive) {
    element.addClass('active')
  }
  else {
    element.removeClass('active')
  }

}