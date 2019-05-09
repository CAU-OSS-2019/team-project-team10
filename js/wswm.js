var subMeet = true; // 이 장소에서 만날 수 있는지?
var meet = false;   // 만나야하는 최종 장소 결정.
var searched = [];  // 첫번 째 시도에서 탐색이 되었는지?
var resultPlace = [];

var toDoList = ["삼겹살", "당구","쀍뛝뙑"]; // test 를 위한 임시 toDoList

function wswm(){
    console.log(result);
    var center = findCenter(); // 사용자들의 중간 위치 반환.
    //var center = [37.509218, 126.963359]; //test 를 위한 임시 center
    var a = wswm2(center);
    return a;
}

function wswm2(cen){
    console.log(cen);
    
    var coordinate = cen[0] + "," + cen[1];

    while(!meet){ //이 장소에서 최종적으로 만날 수 있는지?
        for(var i = 0; i < toDoList.length; i++){ // 할일 목록인 toDoList가 있다고 가정 예 ) toDoList = ["삼겹살", "노래방", "방탈출카페", "당구장"]
            var plac= toDoList[i];
            //searchPlace(plac, coordinate);
            //listPlace(i, plac, coordinate);// center위치에서 toDoList에 있는 것들을 서치함.
            console.log(result);
            if(result[i+1] == 0) {
                subMeet = false; // 즉 하고싶은 리스트 중 검색 안되는것이 있다면 그 장소에서는 만나면 안됨.
                searched[i] = false;
            }
            else{
                searched[i] = true;
            }
        }
        console.log("만날까말까~");
        if(subMeet){
            meet = true; // 결론적으로 현재 center에서 만나면 된다.
            return cen;
        }
        else{ //첫번 째 시도에서 구한 center에서 만날 수 없다면 center를 옮겨줘야 한다.
            while(!meet){
                subMeet=true;
                for(var i = 0; i < toDoList.length; i++){
                    searchPlace(toDoList[i], coordinate); // center를 기준으로 점점 넓은 범위 탐색. meet이 true가 될 때 까지
                    console.log(result);
                    if(result[i] == 0){
                        subMeet = false;
                    }
                }
            }

            for(var i = 0 ; i < toDoList.length; i++){ // 범위를 넓혀가며 탐색 도중 찾고자 하는 장소를 다 찾았다면 발견된 장소에서 다시 서치를 한다.
                if(!searched[i]){
                    searchPlace(toDoList[i], coordinatex);
                    newCenter.x = resultPlace[0].x;
                    newCenter.y = resultPlace[0].y;
                }
            }

            return wswm2(newCenter); // 이 방식을 재귀적으로 구현. 최종적으로 모든 list가 포함된 center값이 return 된다.
        }

    }
}