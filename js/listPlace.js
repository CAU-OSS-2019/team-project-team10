var searchedPlaces = [];

function listPlace(idx, placeQuery) {
    searchPlace(placeQuery).then(function (resolvedData){
        $('#searchedPlace').empty();

        console.log(resolvedData);
        searchedPlaces = resolvedData;
        console.log(searchedPlaces);
        for(let i = 0; i < resolvedData.length; i++) {
            let text = `<li class='nav-item'><a class='nav-link' onclick="appendPlace(${i})"><span data-feather='file-text'></span>${searchedPlaces[i].name}</a></li>`;
            $('#searchedPlace').append(text);
        }
    }).catch(function (err) {
        console.error(err);
    })
}

function appendPlace(i){
    // 중복 검사 필요함
    console.log(i);
    console.log(searchedPlaces[i]);
    let text = `<li class='nav-item'><a class='nav-link' onclick="#"><span data-feather='file-text'></span>${searchedPlaces[i].name}</a></li>`;
    $('#addedPlace').append(text);
}