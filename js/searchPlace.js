function searchPlace(_keyword){
    return new Promise(function (resolve, reject) {
        fetch(`http://165.194.35.214:26656/?keyword=${_keyword}`)
            .then(function(res) {
                // Response as Promise
                res.json().then(body =>{
                    var placesData = JSON.parse(body).places;
                    console.log(placesData);
                    resolve(placesData);
                }).catch(err=>{
                    console.error(err);
                    reject("Error fetching.")
                });
            });
    })
}
