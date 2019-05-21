function makeMarker(posit, contentString, imageIndex){
    var marker = new naver.maps.Marker({
        position: posit,
        map: map,
        icon: markerImageList[imageIndex]
    });
                    
    var infowindow = new naver.maps.InfoWindow({
        content: contentString
    });
    
    naver.maps.Event.addListener(marker, "click", function(e) {
        if (infowindow.getMap()) {
            infowindow.close();
        } else {
            infowindow.open(map, marker);
        }
    });
    
    markerList.push(marker);
}


