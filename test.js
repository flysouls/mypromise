const myPromise = require('./promise.js');
// console.log(myPromise);
var xx = new myPromise(function (res,rej) {
    setTimeout(() => { console.log('1111111');res('2s') }, 2000)
}).then(function (value) {
    console.log(value) 
}, function (err) {
    console.log(err)
})