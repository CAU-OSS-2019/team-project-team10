function newAddedList(name) { // Members에 추가
    const text =
        `<li class='nav-item sidebar-heading d-flex justify-content-between align-items-center px-lg-3 mt-4 mb-1'>
            <a class='nav-link lead'>${name.trim()}</a>
            <div class="btn-group" role="group" aria-label="Member item">
                ${changeBtn()} ${delBtn()} 
            </div>
            </a>
        </li>`;
    $('#member').append(text);
    $(document).ready(function () { // 동적으로 생성된 버튼에 이벤트 추가
        btnController();
    });
}

function newPoint(name, address) {
    var geocoder = new daum.maps.services.Geocoder();

    geocoder.addressSearch(address, function (result, status) {

        if (status === daum.maps.services.Status.OK) {
            var point = new daum.maps.LatLng(result[0].y, result[0].x);

            var marker = new daum.maps.Marker({
                map: map,
                position: point,
                title: name
            });

            var infowindow = new daum.maps.InfoWindow({
                removable: true
            });

            var htmlAddresses = [];

            if (result[0].road_address) {
                htmlAddresses.push('[도로명 주소] ' + result[0].road_address.address_name);
            }

            if (result[0].address) {
                htmlAddresses.push('[지번 주소] ' + result[0].address.address_name);
            }

            infowindow.setContent([ // 정보창 내용 set
                '<div style="padding:10px;min-width:300px;line-height:150%;">',
                '<h4 class=' + name + ' style="margin-top:5px;">' + name + '</h4><br />',
                htmlAddresses.join('<br />'),
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

            infowindow.open(map, marker);
            startList.push(marker);
            infoList.push(infowindow); // 배열에 추가
            nameList.push(name);
            newAddedList(name);
            map.setCenter(point);
            startPosition_x.push(result[0].x);
            startPosition_y.push(result[0].y);
        } else {
            return alert('잘못된 주소 입니다.');
        }
    });

}

function newPointByClick(){
    var geocoder = new daum.maps.services.Geocoder();

    daum.maps.event.addListener(map, 'rightclick', function(mouseEvent) {

        var name = prompt('이름을 입력해주세요'); // 이름 입력받음

        geocoder.coord2Address(mouseEvent.latLng.getLng(), mouseEvent.latLng.getLat(), function(result, status) {
            if (status === daum.maps.services.Status.OK && name != null) {
                var marker = new daum.maps.Marker({
                    map: map,
                    position: mouseEvent.latLng,
                    title: name
                });
            
                var infowindow = new daum.maps.InfoWindow({
                    removable: true
                });
            
                var htmlAddresses = [];
            
                if (result[0].road_address) {
                    htmlAddresses.push('[도로명 주소] ' + result[0].road_address.address_name);
                }
            
                if (result[0].address) {
                    htmlAddresses.push('[지번 주소] ' + result[0].address.address_name);
                }
            
                infowindow.setContent([ // 정보창 내용 set
                    '<div style="padding:10px;min-width:300px;line-height:150%;">',
                    '<h4 class=' + name + ' style="margin-top:5px;">' + name + '</h4><br />',
                    htmlAddresses.join('<br />'),
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
            
                infowindow.open(map, marker);
                startList.push(marker);
                infoList.push(infowindow); // 배열에 추가
                nameList.push(name);
                newAddedList(name);
                map.setCenter(mouseEvent.latLng);
                console.log(startPosition_x);
                startPosition_x.push(String(mouseEvent.latLng.getLng()));
                startPosition_y.push(String(mouseEvent.latLng.getLat()));
            }
        });
    });

}

function searchDetailAddrFromCoords(coords, callback) {
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}
