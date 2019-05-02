function newPoint(map,markerList){
    naver.maps.Event.addListener(map, 'click', function(e) {
        var marker = new naver.maps.Marker({
            position: e.coord,
            map: map,
            clickable: true,
            name: markerList.length,
            title: '새 출발지',
            visible : true
        });
        naver.maps.Event.addListener(marker, "click", function(e) {
            delPointByMarker(marker);
        });
        markerList.push(marker);
        appendBymarker(markerList);
        delPoint(markerList);
        changeName();
    });
}

function delPoint(markerList){
    var order;
    $('.delbtn').click(function(){
        order=$(this).attr('name');
        markerList[order].setMap(null);
        markerList[order].visible=false;
        $(document.getElementsByName(order)).remove();
    });

}

function appendBymarker(markerList){
    let text = `<li name ='${markerList.length-1}' class='nav-item'>
    <a class='nav-link'>
    <span data-feather='file-text'></span>새 출발지
    <button type="button" class='changebtn' name='${markerList.length-1}' style="height:auto;width:auto"
    onclick="">변경
    </button>
    <button type="button" class='delbtn' name='${markerList.length-1}' style="height:auto;width:auto"
    onclick="">삭제
    </button></a></li>`
    $('#addedPlace').append(text);
}

function delPointByMarker(marker){
    marker.setMap(null);
    marker.visible=false;
    $(document.getElementsByName(marker.name)).remove();
}

function changeName(){
    var order;
    $('.changebtn').click(function(){
        var par = $(this).parents('a');
        var cloneEle = par.children();
        par.text('이름 변경됨');
    });
}

function eMarkerList(markerList){
    var new_list=[];
    for(var i=0;i<markerList.length;i++){
        if(markerList[i].visible){
            new_list.push(markerList[i]);
        }
    }
   return new_list;
}