function btnController() { 
    
    $('.addBtn').off().click(function () { // '새 위치 추가' 버튼을 눌렀을 때
        var name = prompt('이름을 입력해주세요'); // 이름 입력받음
        var address = prompt('주소를 입력해주세요'); // 위치 입력받음
        newPoint(name,address); // 새로운 출발지
    });

    $('.delBtn').off().click(function () { // '삭제' 버튼을 눌렀을 때,
        var cle = $(this).closest('li'); // HTML 내용을 제거하기 위함
        var i = cle.index();
        startList[i].setMap(null); // 맵에 있는 마커를 지움
        for (var j = 0; j < infoList.length; j++) { // 정보창 지우기 위함
            if (startList[i].position == infoList[j].name) { // 지워진 마커의 정보창이 맵에 존재 할 시
                infoList[j].close(); // 맵에서 정보창을 지움
                infoList.splice(j, 1); // 정보창을 배열에서 삭제
            }
        }
        startList.splice(i, 1); // 마커를 배열에서 삭제
        cle.remove(); // 왼쪽 ADDED_PLACE 에서 삭제
    });

    $('.chnBtn').off().click(function () { // '이름변경' 버튼을 눌렀을 때, (미완성)
        var cle = $(this).closest('a');
        var i = $(this).closest('li').index();
        var input = prompt('이름을 입력해주세요');
        cle.text(input);
        cle.append(' ' + changeBtn() + ' ' + delBtn());
        //정보창 수정하는거 추가로 해야함
    });

    $('.resBtn').off().click(function () { // '초기화' 버튼을 눌렀을 때
        for(var i=0;i<startList.length;i++){
            startList[i].setMap(null); // 맵의 마커 다 지움
        }
        for(var i=0;i<infoList.length;i++){
            infoList[i].close(); // 맵의 정보창 다 지움
        }
        $('.nav-item').remove(); // ADDED_PLACE 항목 다 지움
        startList=[]; // 배열 초기화
        infoList=[];
     });

}