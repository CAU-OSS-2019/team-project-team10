var subMeet;// 이 장소에서 만날 수 있는지?
var meet;// 만나야하는 최종 장소 결정.
var searched = [];  // 첫번 째 시도에서 탐색이 되었는지?
var resultPlace = [];
var newCenter=[];

function wswm(){
    console.log(result);
    var center = findCenter(); // 사용자들의 중간 위치 반환.
    var a = wswm2(center);
    return a;
}

async function wswm2(cen){
    subMeet=true;
    meet=false;
    searched=[];
    result=[];
    resultPlace=[];
    console.log(cen);
    
    var coordinate = cen[0] + "," + cen[1];

    while(!meet){ //이 장소에서 최종적으로 만날 수 있는지?

        for(var i = 0; i < toDoList.length; i++){
            var plac= toDoList[i];
            await searchPlace(plac, coordinate, 1500).then(function (resolvedData){
                result.push(resolvedData.length);
            })

            console.log(result);
                if(result[i] == 0) {
                    subMeet = false; // 즉 하고싶은 리스트 중 검색 안되는것이 있다면 그 장소에서는 만나면 안됨.
                    searched.push(false);
                }
                else{
                    searched.push(true);
                }
            //listPlace(i, plac, coordinate);// center위치에서 toDoList에 있는 것들을 서치함.
        }

        // AND OR 옵션 적용
        subMeet = andOrApplied();
        
        if(subMeet){
            meet = true; // 결론적으로 현재 center에서 만나면 된다.
            return cen;
        }
        else{ //첫번 째 시도에서 구한 center에서 만날 수 없다면 center를 옮겨줘야 한다.
            while(!meet){
                meet=true;
                for(var i = 0; i < toDoList.length; i++){
                    result=[];
                    resultPlace=[];
                    console.log(result);
                    await searchPlace(toDoList[i], coordinate,10000).then(function (resolvedData){
                        result.push(resolvedData.length);
                    }) // center를 기준으로 점점 넓은 범위 탐색. meet이 true가 될 때 까지
                    console.log(result);
                    if(result[i] == 0){
                        meet = false;
                    }
                }
            }

            for(var i = 0 ; i < toDoList.length; i++){ // 범위를 넓혀가며 탐색 도중 찾고자 하는 장소를 다 찾았다면 발견된 장소에서 다시 서치를 한다.
                console.log(searched);
                if(!searched[i]){
                    await searchPlace(toDoList[i], coordinate,10000).then(function (resolvedData){
                        console.log(resolvedData[0]);
                        console.log(resolvedData[0].x);

                        newCenter.push(Number(resolvedData[0].y));
                        newCenter.push(Number(resolvedData[0].x));
                    });
            }
        }
            return wswm2(newCenter); // 이 방식을 재귀적으로 구현. 최종적으로 모든 list가 포함된 center값이 return 된다.
        }
    }
}
