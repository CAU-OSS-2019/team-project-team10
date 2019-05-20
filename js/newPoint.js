function newAddedList(name) { // ADDED_PLACE에 추가
    let text = `<li class='nav-item'>
    <a class='nav-link'>${name} ${changeBtn()} ${delBtn()} </a></li>`;
    $('#addedPlace').append(text);
    $(document).ready(function(){ // 동적으로 생성된 버튼에 이벤트 추가
        btnController();
    });
} 

function newPoint(name,address){
    var geocoder = new daum.maps.services.Geocoder();

    geocoder.addressSearch(address, function(result, status) {

         if (status === daum.maps.services.Status.OK) {
            var point = new daum.maps.LatLng(result[0].y, result[0].x);

            var marker = new daum.maps.Marker({
                map: map,
                position: point,
                title: name
            });
    
            var infowindow = new daum.maps.InfoWindow({
                removable : true
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
                '<h4 class='+name+' style="margin-top:5px;">'+ name +'</h4><br />',
                htmlAddresses.join('<br />'),
                '</div>'
            ].join('\n'));

            console.log(infowindow.getContent());
            daum.maps.event.addListener(marker, "click", function(e) { 
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
        } 
        else{
            return alert('잘못된 주소 입니다.');
        }
    });    

}


/* function makeAddress(item) {
    if (!item) {
        return;
    }

    var name = item.name,
        region = item.region,
        land = item.land,
        isRoadAddress = name === 'roadaddr';

    var sido = '', sigugun = '', dongmyun = '', ri = '', rest = '';

    if (hasArea(region.area1)) {
        sido = region.area1.name;
    }

    if (hasArea(region.area2)) {
        sigugun = region.area2.name;
    }

    if (hasArea(region.area3)) {
        dongmyun = region.area3.name;
    }

    if (hasArea(region.area4)) {
        ri = region.area4.name;
    }

    if (land) {
        if (hasData(land.number1)) {
            if (hasData(land.type) && land.type === '2') {
                rest += '산';
            }

            rest += land.number1;

            if (hasData(land.number2)) {
                rest += ('-' + land.number2);
            }
        }

        if (isRoadAddress === true) {
            if (checkLastString(dongmyun, '면')) {
                ri = land.name;
            } else {
                dongmyun = land.name;
                ri = '';
            }

            if (hasAddition(land.addition0)) {
                rest += ' ' + land.addition0.value;
            }
        }
    }

    return [sido, sigugun, dongmyun, ri, rest].join(' ');
}

function hasArea(area) {
    return !!(area && area.name && area.name !== '');
}

function hasData(data) {
    return !!(data && data !== '');
}

function checkLastString (word, lastString) {
    return new RegExp(lastString + '$').test(word);
}

function hasAddition (addition) {
    return !!(addition && addition.value);
} */
