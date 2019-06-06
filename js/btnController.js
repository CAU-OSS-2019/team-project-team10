function btnController() {

    $('.addBtn').off().click(function () { // '새 위치 추가' 버튼을 눌렀을 때
        var name = prompt('이름을 입력해주세요'); // 이름 입력받음
        var address = prompt('주소를 입력해주세요'); // 위치 입력받음
        newPoint(name, address); // 새로운 출발지
    });

    $('.delBtn').off().click(function () { // '삭제' 버튼을 눌렀을 때,
        var cle = $(this).closest('li'); // HTML 내용을 제거하기 위함
        var i = cle.index();
        startList[i].setMap(null); // 맵에 있는 마커를 지움
        infoList[i].close(); // 맵에 있는 정보창 지움
        infoList.splice(i, 1);
        startList.splice(i, 1); // 마커를 배열에서 삭제
        nameList.splice(i, 1);
        cle.remove(); // 왼쪽 ADDED_PLACE 에서 삭제
    });

    $('.chnBtn').off().click(function () { // '이름변경' 버튼을 눌렀을 때
        // var cle = $(this).closest('a');
        // var i = $(this).closest('li').index();
        var liTag = $(this).closest('li');
        var i = liTag.index();
        var aTag = liTag.find("a");

        var input = prompt('이름을 입력해주세요');
        aTag.text(input);
        aTag.append('</a>');
        $('.' + nameList[i]).text(input);
        nameList[i].replace(nameList[i], input);
        $(document).ready(function () { // 동적으로 생성된 버튼에 이벤트 추가
            btnController();
        });
    });

    $('.resBtn').off().click(function () { // '초기화' 버튼을 눌렀을 때
        for (var i = 0; i < startList.length; i++) {
            startList[i].setMap(null); // 맵의 마커 다 지움
            infoList[i].close(); // 맵의 정보창 다 지움
        }

        $('.nav-item').remove(); // ADDED_PLACE 항목 다 지움
        startList = []; // 배열 초기화
        infoList = [];
        nameList = [];
        startPosition_x = [];
        startPosition_y = [];     
    });

    $('.tdResBtn').off().click(function () { // '초기화' 버튼을 눌렀을 때
        toDoList = [];
        toDoAndOrList = [];
        $('.nav-itemToDo').remove();

        for (var j = 0; j < markerList.length; j++) {
            markerList[j].setMap(null);
            resultInfoList[j].close();
        }

        result = [];
        markerList = [];
        resultInfoList = [];
        imageIndex = 0;
    });

}