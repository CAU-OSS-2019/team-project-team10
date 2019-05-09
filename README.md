# WhereShallWeMeet

Multi Location based gathering place recommendation service.

## Protocol

NodeJs Express : 165.194.35.214:26656

## History

Before commit : f1525a3ba4daf517173fdaaf2c45b056117f8add

*NaverAPIServer* <-> Client <-> Browser

- It ocurres CORS policy issues.
- It forces every single developers to contribute have to
  create their own NaverAPI.

*NaverAPIServer* <-> NodeJsExpress <-> Client <-> Browser

- It resolves CORS policy issues.
- Only NodeJsExpress needs to authenticate with *NaverAPIServer*

Before commit : 30cb8ef1d00073be76937085d0c0a88fa8bfe685

Using FelixSeol repository.
Replace to CAU-OSS-2019/team-project-team10

## Tutorial

### How to use Naver Maps API

- js/searchPlace.js

```JavaScript
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
```
