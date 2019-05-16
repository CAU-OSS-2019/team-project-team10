function newAddedList(name) { // ADDED_PLACE에 추가
    let text = `<li class='nav-item'>
    <a class='nav-link'>${name} ${changeBtn()} ${delBtn()} </a></li>`;
    $('#addedPlace').append(text);
    $(document).ready(function(){ // 동적으로 생성된 버튼에 이벤트 추가
        btnController();
    });
} 

function newPoint(name,address) { // 마커와 정보창 추가
    naver.maps.Service.geocode({
        query: address
    }, function(status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
            return alert('Something Wrong!');
        }
        
        if (response.v2.meta.totalCount === 0) {
            return alert('잘못된 주소 입니다.');
        }

        var htmlAddresses = [],
            item = response.v2.addresses[0],
            point = new naver.maps.Point(item.x, item.y); // 좌표

            var infowindow = new naver.maps.InfoWindow({ // 새로운 정보창
                name: point
            });

        if (item.roadAddress) {
            htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
        }

        if (item.jibunAddress) {
            htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
        }

        if (item.englishAddress) {
            htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
        }

        infowindow.setContent([ // 정보창 내용 set
            '<div style="padding:10px;min-width:200px;line-height:150%;">',
            '<h4 class='+point+' style="margin-top:5px;">'+ name +'</h4><br />',
            htmlAddresses.join('<br />'),
            '</div>'
        ].join('\n'));

        var marker = new naver.maps.Marker({ // 새로운 마커
            position: point,
            map: map,
            clickable: true,
        });
    
        infowindow.open(map, marker); // 정보창 열린 상태로 추가

        naver.maps.Event.addListener(marker, "click", function(e) { 
            if (infowindow.getMap()) {
                infowindow.close();
            } else {
                infowindow.open(map, marker);
            }
        });
    
        startList.push(marker);
        infoList.push(infowindow); // 배열에 추가
        map.setCenter(point);
        newAddedList(name);
        startPosition_x.push(item.x);
        startPosition_y.push(item.y);
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
