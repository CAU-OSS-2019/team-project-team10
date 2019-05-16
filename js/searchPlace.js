var imageIndex = 0;
var searchedPlaces = [];
var addedPlace = [];

function searchPlace(_keyword, _coordinate) {
    console.log("searchplace _coordinate : ", _coordinate);
    return new Promise(function (resolve, reject) {
        fetch(`http://165.194.35.214:26756/?keyword=${_keyword}&coordinate=${_coordinate}`)
            .then(function (res) {
                // Response as Promise
                res.json().then(body => {
                    var placesData = JSON.parse(body).places;
                    console.log(placesData);
                    resolve(placesData);

                    for(var i=0; i<placesData.length; i++) {
                        var posit = new naver.maps.LatLng(placesData[i].y, placesData[i].x);
                        var contentString = [                                    
                            '<div class="iw_inner">',
                            '<h3>'+ placesData[i].name +'</h3>',
                            '<p>' + placesData[i].jibun_address + ' | '+ placesData[i].road_address +'<br />',
                            placesData[i].phone_number + '<br />' + '</p>',                               
                            '</div>'
                        ].join('');
                            
                        makeMarker(posit, contentString, imageIndex);                            
                    }
                    if (imageIndex < 5) imageIndex++;
                    else imageIndex=0;

                }).catch(err => {
                    console.error(err);
                    reject("Error fetching.")
                });
            });
    })
}

function listPlace(_idx, _placeQuery, _coordinate) {
    console.log("listplace _coordinate : ", _coordinate);
    searchPlace(_placeQuery, _coordinate).then(function (resolvedData) {
        $('#searchedPlace').empty();

        console.log(resolvedData);
        searchedPlaces = resolvedData;
        console.log(searchedPlaces);
        for (let i = 0; i < resolvedData.length; i++) {
            let text = `<li class='nav-item'><a class='nav-link' onclick="appendPlace(${i})"><span data-feather='file-text'></span>${searchedPlaces[i].name}</a></li>`;
            $('#searchedPlace').append(text);
        }
    }).catch(function (err) {
        console.error(err);
    })
}

function appendPlace(i) {
    // 중복 검사 필요함
    let text = `<li class='nav-item'><a class='nav-link' onclick="#"><span data-feather='file-text'></span>${searchedPlaces[i].name}</a></li>`;
    $('#addedPlace').append(text);

    addedPlace.push(searchedPlaces[i]);
}
