function searchPlace(query){
    // template literal
    fetch(`https://naveropenapi.apigw.ntruss.com/map-place/v1/search?query=${query}&coordinate=127.1054328,37.3595963`, {
        headers: {
            "X-NCP-APIGW-API-KEY-ID":"sx4y6v49bc",
            "X-NCP-APIGW-API-KEY":"KyJQ1dl1gU6an8IalWdW428EmOYChrwzS30GEtVP"
        }
    }).then(function(res) {
        console.log(res);
        // if (res.ok) {
        //     alert("Perfect! Your settings are saved.");
        // } else if (res.status == 401) {
        //     alert("Oops! You are not authorized.");
        // }
    }, function(e) {
        alert("Error submitting form!");
    });
}