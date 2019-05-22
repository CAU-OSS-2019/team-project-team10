function showLane (){
   // var sx = 126.93737555322481;
   // var sy = 37.55525165729346;
   // var ex = 126.88265238619182;
   // var ey = 37.481440035175375;
   
   for(var i=0;i<startPosition_x.length;i++){
    var startPoints = [{'position':{'x':startPosition_x[i]}},{'position':{'y':startPosition_y[i]}}]
   }


   // console.log(startList);
   // console.log("test button cliced");
   var middlePoint = [{'position':{'x':resultMiddlePoint[0]}},{'position':{'y':resultMiddlePoint[1]}}];
   // console.log(middlePoint);
   var ex = middlePoint.position.x;
   var ey = middlePoint.position.y;


    var promises = [];
     
    for(var i=0; i<(startPoints.length-1);i++){
        // console.log(i + startList[i].position);
      var sx = startPoints[i].position.x;
      var sy = startPoints[i].position.y;

       promises.push(new Promise(function(resolve, reject) {
         fetch(`http://165.194.35.214:26756/lane/?sx=${sx}&sy=${sy}&ex=${ex}&ey=${ey}`)
         .then(function(res){
            console.log(res);
            res.json().then(body => {
                // console.log("returned data :" + body);
                resolve(body);
               // callMapObjApiAJAX(JSON.parse(body)["result"]["path"][0].info.mapObj);
                })
            })
        }))
    }
    
    Promise.all(promises).then((results) => {
        // console.log("all resolved", results.length);
        for (var i=0; i < results.length; i++) {
          var pathArray = [];
          var jsonResult = JSON.parse(results[i]);
          // console.log(jsonResult.result.path[0]);
          for (var j=0; j<jsonResult.result.path[0].subPath.length; j++) {
            if(jsonResult.result.path[0].subPath[j].trafficType == 1) {
               pathArray.push(jsonResult.result.path[0].subPath[j].lane[0].name);
            } else if (jsonResult.result.path[0].subPath[j].trafficType == 2){
               pathArray.push(jsonResult.result.path[0].subPath[j].lane[0].busNo);
            }
          }
          // console.log(pathArray);
          console.log(JSON.parse(results[i])["result"]["path"][0].info.mapObj, pathArray, startList[i], startList[startList.length-1]);
          callMapObjApiAJAX(JSON.parse(results[i])["result"]["path"][0].info.mapObj, pathArray, startList[i], startList[startList.length-1]);
        }
    })}


function callMapObjApiAJAX(mapObj, pathArray, startPos, endPos){
      // console.log(mapObj);
      //ODsay apiKey 입력
      return new Promise((resolve, reject) => {
        fetch(`http://165.194.35.214:26756/lane/loadLane/?mapObj=${mapObj}`)
          .then(function(res){
          res.json().then(body=>{
            var resultJsonData = JSON.parse(body);
            // console.log(body);
            // console.log("Map data");
            // console.log(startPos, endPos);
            drawMapPolyLine(resultJsonData, pathArray, startPos, endPos);      // 노선그래픽데이터 지도위 표시
            // boundary 데이터가 있을경우, 해당 boundary로 지도이동
            if(resultJsonData.result.boundary){
                  var boundary = new daum.maps.LatLngBounds();
                  boundary.extend(new daum.maps.LatLng(resultJsonData.result.boundary.top, resultJsonData.result.boundary.left));
                  boundary.extend(new daum.maps.LatLng(resultJsonData.result.boundary.bottom, resultJsonData.result.boundary.right));
                  map.setBounds(boundary);
            }
         })
      })  
      })

   };
   
   
   // 노선그래픽 데이터를 이용하여 지도위 폴리라인 그려주는 함수
   function drawMapPolyLine(data, pathArray, startPos, endPos){
      var lineArray;
      // console.log(data);
      var strokeColorArr = ['#003499',`#003499`,`#37b42d`,`#fa5f2c`,`#3171d3`,`#893bb6`,`#9a4e0f`,`#606d00`,`#e71e6e`,`#bf9f1e`,`#FF0000`,`#FF0000`];
      for(var i = 0 ; i < data.result.lane.length; i++){
         // showPubInfo(data.result.lane[i].type, )
         var pubInfo = pathArray[i];
         lineArray = new Array();
         for(var j=0 ; j <data.result.lane[i].section.length; j++){

            // console.log(data.result.lane[i].section[j].graphPos.length/2);
            showPubInfo(pubInfo, data.result.lane[i].section[j].graphPos[parseInt(data.result.lane[i].section[j].graphPos.length/2)]);
            // console.log(data.result.lane[i].section[j].graphPos);
            // console.log(pubInfo);
            // console.log(pathArray);
            // console.log(startPos.position);
            console.log(i, j);

            for(var k=0 ; k < data.result.lane[i].section[j].graphPos.length; k++){
               lineArray.push(new daum.maps.LatLng(data.result.lane[i].section[j].graphPos[k].y, data.result.lane[i].section[j].graphPos[k].x));
             }
          }// console.log(lineArray);
               //지하철결과의 경우 노선에 따른 라인색상 지정하는 부분 (1,2호선의 경우만 예로 들음)
             
             if (i == 0){
                var walkPolylineArr = [new daum.maps.LatLng(startPos.position.y, startPos.position.x), lineArray[0]];
                var walkPolyline = new daum.maps.Polyline({
                   map:map,
                   path: walkPolylineArr,
                   strokeWeight:10
                })
             }
             // console.log(walkPolylineArr);

             if(i == data.result.lane.length-1) {
               var walkPolylineArr = [lineArray[lineArray.length-1], new daum.maps.LatLng(endPos.position.y, endPos.position.x)]
               var walkPolyline = new daum.maps.Polyline({
                   map:map,
                   path: walkPolylineArr,
                   strokeWeight:10
                })
             }
             // console.log(walkPolylineArr);
          
            var polyline = new daum.maps.Polyline({
               map:map,
               path: lineArray,
               strokeWeight: 3,
               strokeColor: strokeColorArr[data.result.lane[i].type],
            });
          }
        }
        

function showPubInfo(pubInfo, position) {
  console.log(pubInfo, position);
  var point = new daum.maps.Point(position.x, position.y); // 좌표
  var infowindow = new daum.maps.InfoWindow({ // 새로운 정보창
    name: point
   });

  infowindow.setContent(pubInfo);
  var marker = new daum.maps.Marker({ // 새로운 마커
      position: point,
      map: map,
      clickable: true,
      // icon: {
      //   url: '/img/bus.png',
      // },
  });

  infowindow.open(map, marker); // 정보창 열린 상태로 추가

  daum.maps.Event.addListener(marker, "click", function(e) { 
      if (infowindow.getMap()) {
          infowindow.close();
      } else {
          infowindow.open(map, marker);
      }
  });
}