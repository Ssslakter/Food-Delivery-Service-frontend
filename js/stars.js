export function DrawStarRating(block, rating) {
    var full = Math.trunc(rating)
    var rest = rating - full

    var stars = block.find("ul img");
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