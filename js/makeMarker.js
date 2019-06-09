function makeMarker(_resultPlace) {
    var imageIndex = 0;

    for (var i = 0; i < _resultPlace.length; i++) {
        for (var j = 0; j < _resultPlace[i].length; j++) {
            createMarker(_resultPlace[i][j], imageIndex);
        }

        if (imageIndex < 5) imageIndex++;
        else imageIndex = 0;
    }
}

async function createMarker(resultItem, imageIndex) {
    var name = resultItem.place_name;
    var point = new daum.maps.LatLng(resultItem.y, resultItem.x);
    var imageSrc = markerImageList[imageIndex];
    console.log(imageSrc);
    var imageSize = new daum.maps.Size(36, 41);
    var imageOption = {};
    var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption);

    var marker = new daum.maps.Marker({
        map: map,
        position: point,
        title: name,
        image: markerImage
    });

    var infowindow = new daum.maps.InfoWindow({
        removable: true
    });

    var htmlInfo = [];
    htmlInfo.push('[도로명 주소] ' + resultItem.road_address_name);
    htmlInfo.push('[지번 주소] ' + resultItem.address_name);
    htmlInfo.push('[전화 번호] ' + resultItem.phone);
    htmlInfo.push('[url] ' + resultItem.place_url);

    infowindow.setContent([ // 정보창 내용 set
        '<div style="padding:10px;min-width:300px;line-height:150%;">',
        '<h4 class=' + name + ' style="margin-top:5px;">' + name + '</h4><br />',
        htmlInfo.join('<br />'),
        '</div>'
    ].join('\n'));

    console.log(infowindow.getContent());
    daum.maps.event.addListener(marker, "click", function (e) {
        if (infowindow.getMap()) {
            infowindow.close();
        } else {
            infowindow.open(map, marker);
        }
    });

    markerList.push(marker);
    resultInfoList.push(infowindow);
    resultNameList.push(name);
    //newAddedList(name);
}