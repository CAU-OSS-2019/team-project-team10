function newPoint() {
    naver.maps.Event.addListener(map, 'click', function (e) {
        var marker = new naver.maps.Marker({
            position: e.coord,
            map: map,
            clickable: true,
            title: '출발지'
        });

        clickedMarker(marker); // 정보창 띄우기 위한 함수
        startList.push(marker); // index.html에 선언된 startList에 마커 푸쉬
        appendByMarker(); // addedPlace에 '새 출발지' 띄움
    });
}

function appendByMarker() { // addedPlace에 '새 출발지' 띄움
    let text = `<li class='nav-item'>
    <a class='nav-link'>새 출발지 ${changeBtn()} ${delBtn()} </a></li>`;
    $('#addedPlace').append(text);
} 

function setInfo(marker) { // 정보창 생성하고 내용 집어넣는 함수
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

function clickedMarker(marker) { // 마커 클릭했을 시 정보창 보여주고, 지워주는 함수
    naver.maps.Event.addListener(marker, "click", function () {
        var temp = 0;
        var ninfo;

        for (var i = 0; i < infoList.length; i++) {
            if (infoList[i].getMap()) {
                infoList[i].close();
                temp = infoList[i].name;
                infoList.splice(i, 1);
                break;
            }
        }
        ninfo = setInfo(marker);

        if (temp == ninfo.name) {
            infoList.pop();
        }
        else {
            ninfo.open(map, marker);
        }

        temp = 0;

    });
}

function btnController() { // 버튼의 동작 관리하는 함수
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

    $('.resBtn').off().click(function () {
        for(var i=0;i<startList.length;i++){
            startList[i].setMap(null);
        }
        for(var i=0;i<infoList.length;i++){
            infoList[i].close();
        }
        $('.nav-item').remove();
        startList=[];
        infoList=[];
     });

     $('.addBtn').off().click(function () {
     });
}