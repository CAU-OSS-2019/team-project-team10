
function findCenter(){
    var x_position = [];
    var y_position = [];

    var m = [0, 0];

     // 출발지 vertext들의 좌표를 모음
     for(var i = 0; i < addedPlace.length; i++){   
         x_position[i]=Number(addedPlace[i].x);
         y_position[i]=Number(addedPlace[i].y);
     }

     // 다각형의 무게중심을 구함
    for(var i = 0; i < addedPlace.length; i++){
        m[0] = m[0] + x_position[i];
        m[1] = m[1] + y_position[i];
    }

    m[0]/= addedPlace.length;
    m[1]/= addedPlace.length;

    console.log("중심위치 : x = " + m[0] + ", " + "y = " + m[1]);
}