function makeMarker(posit, contentString, imageIndex){

    var imageSrc = markerImageList[imageIndex];
    var imageSize = new daum.maps.Size(36, 41);
    var imageOption = {};

    var markerImage = new daum.maps.MarkerImage(imageSrc,imageSize,imageOption);

    var marker = new daum.maps.Marker({
        position: posit,
        map: map,
        image: markerImage
    });

    var infowindow = new daum.maps.InfoWindow({
        content: contentString,
        removable: true
    });
    
    daum.maps.event.addListener(marker, "click", function(e) {
        if (infowindow.getMap()) {
            infowindow.close();
        } else {
            infowindow.open(map, marker);
        }
    });
    
    searchedInfoList.push(infowindow);
    markerList.push(marker);
    console.log(markerList.length);
}


