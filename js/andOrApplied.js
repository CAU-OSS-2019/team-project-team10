function andOrApplied() {
    //의미 없는 AND, OR 제거
    if (toDoAndOrList.length == toDoList.length)
        toDoAndOrList.pop();

    //AND, OR 조건 추가
    var _subMeet = true;
    var andIndex = [];  //toDoAndOrList에서 AND의 index들을 담음
    var boolTemp = false;
    var andGroup = [];
    
    if (toDoList.length == 1) { //toDo가 하나만 있을 때
        _subMeet = searched[0];
    } else {
        for (var i = 0; i < toDoAndOrList.length; i++) {    //AND들을 기준으로 그룹을 나눔 - 그 그룹 내에는 OR만 존재, 모두 false 여야 false
            if (toDoAndOrList[i] == 0)
                andIndex.push(i);
        }

        if (andIndex.length == 0) { //전부 OR일 때
            for (var i = 0; i < searched.length; i++) {
                if (searched[i] == false)
                    _subMeet = false;                   
            }
            return _subMeet;
        }

        for (var i = 0; i < andIndex.length; i++) {
            if (andIndex[i] == 0) {   //첫번째 그룹
                andGroup[0] = searched[0];
            } else {   //중간 그룹들
                for (var j = andIndex[i - 1] + 1; j <= andIndex[i]; j++) {
                    if (searched[j] == true)
                        boolTemp = true;
                }
                andGroup[i] = boolTemp;
                boolTemp = false;
            }
        }

        for (var i = andIndex[andIndex.length - 1] + 1; i < searched.length; i++) { //마지막 그룹
            if (searched[i] == true)
                boolTemp = true;
        }
        andGroup[andIndex.length] = boolTemp;
        boolTemp = false;
        //최종 andGroup 판별 - AND로만 이루어져 모두 true 여야 subMeet이 true
        for (var i = 0; i < andGroup.length; i++) {
            if (andGroup[i] == false)
                _subMeet = false;
        }
    }

    console.log("subMeet : " + _subMeet);
    return _subMeet;
}