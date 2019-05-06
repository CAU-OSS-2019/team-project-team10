function newPoint() {
    naver.maps.Event.addListener(map, 'click', function (e) {
        var marker = new naver.maps.Marker({
            position: e.coord,
            map: map,
            clickable: true,
            title: '출발지'
        });

        clickedMarker(marker);
        startList.push(marker);
        appendByMarker();
    });
}

function appendByMarker() {
    let text = `<li class='nav-item'>
    <a class='nav-link'>새 출발지 ${changeBtn()} ${delBtn()} </a></li>`;
    $('#addedPlace').append(text);
}

function setInfo(marker) {
    var inner = `
    <div class="iw_inner">
    <h3> ${marker.title}</h3>
    </div>`;

    var infowindow = new naver.maps.InfoWindow({
        content: inner,
        name: marker.position
    });

    infoList.push(infowindow);
    return infowindow;
}

function clickedMarker(marker) {
    naver.maps.Event.addListener(marker, "click", function () {
        var i = 0;
        var ninfo;
        for (i = 0; i < infoList.length; i++) {
            if (infoList[i].getMap()) {
                infoList[i].close();
                break;
            }
        }
        ninfo = setInfo(marker);
        if (i == infoList.length - 1) {
            ninfo.open(map, marker);
        }
        else if (infoList[i].name != ninfo.name) {
            ninfo.open(map, marker);
        }
        else {
            infoList.splice(i, 1);
        }
        i = 0;

    });
}

function btnController() {
    $('.delBtn').off().click(function () {
        var cle = $(this).closest('li');
        var i = cle.index();
        startList[i].setMap(null);
        for (var j = 0; j < infoList.length; j++) {
            if (startList[i].position == infoList[j].name) {
                infoList[j].close();
                infoList.splice(j, 1);
            }
        }
        startList.splice(i, 1);
        cle.remove();
    });

    $('.chnBtn').off().click(function () {
        var cle = $(this).closest('a');
        var i = $(this).closest('li').index();
        var input = prompt('이름을 입력해주세요');
        cle.text(input);
        cle.append(' ' + changeBtn() + ' ' + delBtn());
        startList[i].title = input;
        setInfo(startList[i]);
    });
}