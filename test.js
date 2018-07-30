const {EventBus, myPromise, Sort, Utils} = require('./tools');

const TEST = {
    myPromise: false,
    eventBus: false,
    sort: false,
    Utils: true,
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
    console.log('元数组', arr);
    console.log('快速排序', mySort.quickSort(arr));
    console.log('冒泡排序', mySort.mpSort(arr));
    console.log('插入排序', mySort.insertSort(arr));
}

if (TEST.Utils){
    const myutils = new Utils();
    // console.log(myutils.strTemplate('我是{name}，我来自{city}', {name:'张无忌',city:'光明顶'}));
    // console.log(myutils.n2amount(456465446504.1234));
    let defn = myutils.debounce(function(i){console.log('100w次、防抖、延迟250ms',i)}, 250);
    let thfn = myutils.throttle(function(i){console.log('100w次、节流、延迟200ms',i)}, 200);
    for(let i = 1; i <= 1000000; i++){
        defn(i);
        thfn(i);
    }
}