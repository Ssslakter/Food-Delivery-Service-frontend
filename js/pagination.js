export function UpdatePagination(pageData, selectionObj) {
    delete selectionObj.page;
    let curr = pageData.current
    $('#page-left').removeClass('disabled');
    $('#page-right').removeClass('disabled');
    if (curr == 1) {
        $('#page-left').addClass('disabled');
        ChangePageButtonState($(`#page-1`), selectionObj, curr, true)
        ChangePageButtonState($(`#page-2`), selectionObj, curr + 1, false)
        ChangePageButtonState($(`#page-3`), selectionObj, curr + 2, false)
    }
    else if (curr == pageData.count) {
        $('#page-right').addClass('disabled')
        ChangePageButtonState($(`#page-1`), selectionObj, curr - 2, false)
        ChangePageButtonState($(`#page-2`), selectionObj, curr - 1, false)
        ChangePageButtonState($(`#page-3`), selectionObj, curr, true)
    }
    else {
        for (let i = -1; i <= 1; i++) {
            ChangePageButtonState($(`#page-${i + 2}`), selectionObj, curr + i, i == 0)
        }
    }
    ChangePageButtonState($(`#page-left`), selectionObj, curr - 1, false)
    ChangePageButtonState($(`#page-right`), selectionObj, curr + 1, false)
    if (pageData.count < 3) {
        $('#page-3').addClass('disabled');
    }
    if (pageData.count < 2) {
        $('#page-right').addClass('disabled');
        $('#page-2').addClass('disabled');
    }
}

function ChangePageButtonState(element, selectionObj, number, isActive) {
    selectionObj.page = number;
    let new_href = $.param(selectionObj);
    var s = element.children(".page-link").text();
    if (s != ' « ' && s != ' » ') {
        element.children(".page-link").text(number)
    }
    element.children(".page-link").attr('href', "?" + new_href)
    if (isActive) {
        element.addClass('active')
    }
    else {
        element.removeClass('active')
    }

}

export function SetSelections(obj) {
    $("#dish-select").selectpicker("val", obj.categories)
    $("#sorting-select").selectpicker("val", obj.sorting || "NameAsc")
    $("#isVegetarian").prop('checked', obj.vegetarian === 'true')
}

export function SelectionToQuery() {
    let obj = { categories: $("#dish-select").selectpicker("val") }
    obj['sorting'] = $("#sorting-select").selectpicker("val")
    obj['vegetarian'] = $("#isVegetarian").prop('checked')
    let url = $.param(obj)
    return url.replaceAll("%5B%5D", '')
}

export function ParseQueryToObj(queryString) {
    if (queryString == "") return {};
    const pairs = queryString.substring(1).split('&');
    var array = pairs.map((el) => {
        const parts = el.split('=');
        return parts;
    });
    let obj = {
        categories: []
    }
    for (const pair of array) {
        if (pair[0] === 'categories') {
            obj[pair[0]].push(pair[1])
        }
        else {
            obj[pair[0]] = pair[1]
        }
    }
    return obj;
}