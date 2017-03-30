
var getURL = function(URL) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', URL, true);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject( new Error(req.statusText));
        };
        req.send();
    });
}
module.exports = {
    getURL:getURL
}

Promise.resolve(42).reject('boom').then((val)=>{console.log(val)}).catch((err)=>{console.log(err)});