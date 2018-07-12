if(false){
    
    const myPromise = require('./promise.js');
    // const myPromise = require('./promises.js');
    // console.log(myPromise);
    var xx = new myPromise(function (resolve, reject) {
        setTimeout(() => { 
            console.log('异步任务2秒后输出');
            resolve('success msg');
            // reject('error msg') 
        }, 2000)
    }).then(function (value) {
        console.log('then',value) 
    }).catch(err=>{console.log("0.0",err)})

}
const EventBus = require('./eventBus.js');
const ev = new EventBus();
ev.on('haha',function(a){console.log('hhaah')});
ev.on('haha',function(a,b,c){console.log('hahha123',a,b,c)});
ev.on('hehe',function(a,b,c){console.log('hehe123',a,b,c)})
ev.emit('haha',1,2,3);
ev.emit('hehe',1,2,3);
ev.off('haha');
ev.emit('haha');
ev.emit('hehe');