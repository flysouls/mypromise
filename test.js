const myPromise = require('./promise.js');
// const myPromise = require('./promises.js');
// console.log(myPromise);
var xx = new myPromise(function (resolve, reject) {
    setTimeout(() => { console.log('异步任务2秒后输出');resolve('2s') }, 2000)
}).then(function (value) {
    console.log('then',value) 
}, function (err) {
    console.log('err',err)
})