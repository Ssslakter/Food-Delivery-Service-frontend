import { FillDishInfo } from "./item.js";
import { AddToCart } from "./cart.js";
import { PageLoader } from './loader.js';
import { DrawStarRating } from "./stars.js";
import { SetSelections, UpdatePagination, SelectionToQuery, ParseQueryToObj } from "./pagination.js";

export async function initMain(queryString) {

  //Load page consts
  LoadDishes(queryString || '');
  AddSelectionButtonListener()
  AddPaginationListener()
}

async function LoadDishes(queryString) {
  $("#dishes-list").empty();
  $('.selectpicker').selectpicker();
  let obj = ParseQueryToObj(queryString);
  SetSelections(obj);
  Get(`/dish/${queryString}`).then(async (response) => {
    if (response.ok) {
      let json = await response.json()
      UpdatePagination(json.pagination, obj)
      let template = await $.get("/html/dishTemplate.html");
      for (const dish of json.dishes) {
        let block = $(template);
        FillDishInfo(block, dish);
        DrawStarRating(block, dish.rating || 0)
        block.find(".dish-link").attr("href", `/item/${dish.id}`)
        block.find(".dish-link").click(async (e) => {
          e.preventDefault();
          var full = new URL(`${location.origin}/item/${dish.id}`);
          PageLoader.loadPage(full.pathname, full.search);
        });
        block.find(".to-cart-button").click(() => { AddFirstDish(block, dish.id) })
        block.find(".plus-button").click(() => { AddToCart(block, dish.id) })
        block.find(".minus-button").click(() => { RemoveFromCart(block, dish.id) })
        $("#dishes-list").append(block);
      }
      AddCartInfo()
    }
    else {
      PageLoader.loadPage("page-not-found", "");
    }
  });
}

function AddSelectionButtonListener() {
  $("#apply").click(
    () => {
      let query = SelectionToQuery()
      PageLoader.loadPage("/", "?" + query);
    }
  )
}

function AddPaginationListener() {
  $('.page-link').click(async (e) => {
    e.preventDefault();
    var url = await $(e.target).attr("href");
    var full = new URL(location.origin + url);
    PageLoader.loadPage(full.pathname, full.search);
  });
}

function AddCartInfo() {
  GetAuth('/basket').then(async (response) => {
    if (response.ok) {
      let json = await response.json()
      for (const dish of json) {
        let block = $(`[data-id='${dish.id}']`)
        if (block != null) {
          block.find(".btn-group").removeClass("d-none")
          block.find(".to-cart-button").addClass("d-none")
          block.find(".amount").text(dish.amount);
        }
      }
    }
  })
}

async function AddFirstDish(block, id) {
  let ok = await AddToCart(block, id)
  if (ok) {
    block.find(".btn-group").removeClass("d-none")
    block.find(".to-cart-button").addClass("d-none")
    block.find(".amount").text(1);
  }
}

function RemoveFromCart(block, id) {
  DeleteAuth(`/basket/dish/${id}?increase=true`).then((response) => {
    if (response.ok) {
      let amount = block.find(".amount")
      amount.text(amount.text() - 1)
      if (amount.text() == 0) {
        block.find(".btn-group").addClass("d-none")
        block.find(".to-cart-button").removeClass("d-none")
        block.find(".amount").text(dish.amount);
      }
    }
    else if (response.status == 401) {
      localStorage.clear();
      PageLoader.loadPage("/login");
    }
  })
}