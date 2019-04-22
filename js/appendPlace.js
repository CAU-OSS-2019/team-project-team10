function appendPlace(idx, place) {
    alert(idx + " " + place);
    let text = "<li class='nav-item'><a class='nav-link' href='#'><span data-feather='file-text'></span>" + place + "</a></li>";

    $('#searchedPlace').append(text);
}