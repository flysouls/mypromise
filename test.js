const {EventBus, myPromise, Sort} = require('./tools');

const TEST = {
    myPromise:false,
    eventBus:false,
    sort:true,
}

/**
 *  test myPromise
 */
if(TEST.myPromise){
    // const myPromise = require('./promise.js');
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

/**
 *  test eventBus
 */
// const EventBus = require('./eventBus.js');
if(TEST.eventBus){
    const ev = new EventBus();
    ev.on('haha',function(a){console.log('hhaah')});
    ev.on('haha',function(a,b,c){console.log('hahha123',a,b,c)});
    ev.on('hehe',function(a,b,c){console.log('hehe123',a,b,c)})
    ev.emit('haha',1,2,3);
    ev.emit('hehe',1,2,3).off('hehe');
    ev.off('haha');
    ev.emit('haha');
    ev.emit('hehe');
}

if(TEST.sort){
    const mySort = new Sort();
    let arr = [5,4,7,8,9,6,3,1,4,5,7,9,6,3,1,4];
    console.log(mySort.quickSort(arr));
    console.log(mySort.mpSort(arr));
}