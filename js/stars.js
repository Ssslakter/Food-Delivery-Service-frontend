export async function DrawStarRating(block, rating) {
    var stars = block.find("ul img");
    console.log(await IfUserCanAddRating(block))
    if (await IfUserCanAddRating(block)) {
        stars.each(function (idx, el) {
            $(el).hover(() => ShowUserRating(stars, this), () => ShowDefaultRating(stars, rating))
            $(el).click(() => AddRating(block, idx + 1))
        })
    }
    ShowDefaultRating(stars, rating)
}

function AddRating(block, score) {

    PostAuth(`/dish/${block.data('id')}/rating?ratingScore=${score}`).then(async (response) => {
        if (response.ok) {
            $("#liveToast").find(".review-num").text(score)
            var toast = new bootstrap.Toast($("#liveToast")[0])
            toast.show()
        }
    })
}

async function IfUserCanAddRating(block) {
    let response = await GetAuth(`/dish/${block.data('id')}/rating/check`)
    if (response.ok) {
        let json = await response.json()
        return json
    }
    else {
        return false;
    }
}

function ShowUserRating(stars, hovered_element) {
    let got_border = false
    stars.each((index, star) => {
        if (!got_border) {
            $(star).attr('src', '/images/filled-star-review.svg');
        }
        else {
            $(star).attr('src', '/images/star-0.svg');
        }
        if ($(star).is(hovered_element)) {
            got_border = true
        }
    })
}

function ShowDefaultRating(stars, rating) {
    var full = Math.trunc(rating)
    var rest = rating - full
    stars.each(function (idx, el) {
        if (idx + 1 <= full) {
            $(el).attr('src', '/images/filled-star.svg');
        }
        else if (idx == full && full != 0) {
            if (rest <= 0.25) {
                $(el).attr('src', '/images/filled-star-25.svg');
            }
            else if (rest <= 0.5) {
                $(el).attr('src', '/images/filled-star-50.svg');
            }
            else if (rest <= 0.75) {
                $(el).attr('src', '/images/filled-star-75.svg');
            }
            else {
                $(el).attr('src', '/images/filled-star.svg');
            }

        }
        else {
            $(el).attr('src', '/images/star-0.svg');
        }
    })
}
