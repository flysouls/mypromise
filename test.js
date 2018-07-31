const {EventBus, myPromise, Sort, Utils} = require('./tools');

const TEST = {
    myPromise: false,
    eventBus: false,
    sort: true,
    Utils: false,
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
    ev.on('handl',function(a){console.log('test_a')});
    ev.on('handl',function(a,b,c){console.log('test_a',a,b,c)});
    ev.on('handl_',function(a,b,c){console.log('test_b',a,b,c)})
    ev.emit('handl',1,2,3);
    ev.emit('handl_',1,2,3).off('handl_');
    ev.off('handl');
    ev.emit('handl');
    ev.emit('handl_');
}

if(TEST.sort){
    const mySort = new Sort();
    let arr = [5,4,7,8,9,6,3,1,4,2,5,7,9,6,3,1,4];
    console.log('元数组', arr);
    // console.log('快速排序', mySort.quickSort(arr));
    console.log('冒泡排序', mySort.mpSort(arr));
    // console.log('插入排序', mySort.insertSort(arr));
    // console.log('鸡尾酒排序', mySort.jwjSort(arr));
}

if (TEST.Utils){
    const myutils = new Utils();
    console.log(myutils.strTemplate('我是{name}，我来自{city}', {name:'张无忌',city:'光明顶'}));
    console.log(myutils.n2amount(456465446504.1234));
    let defn = myutils.debounce(function(i){console.log('100w次、防抖、延迟250ms',i)}, 250);
    let thfn = myutils.throttle(function(){
        console.log('100w次、节流、延迟300ms');
    }, 300);
    for(let i = 1; i <= 1000000; i++){
        defn(i);
        thfn(i);
    }
}