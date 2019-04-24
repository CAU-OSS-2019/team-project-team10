function searchPlace(query){
    return new Promise(function (resolve, reject) {
        fetch(`http://165.194.35.214:13000`)
            .then(function(res) {
                // Response as Promise
                res.json().then(body =>{
                    var placesData = JSON.parse(body).places;
                    console.log(placesData);
                    resolve(placesData);
                }).catch(error=>{
                    console.error(error);
                    reject("Error fetching.")
                });
            });
    })
}