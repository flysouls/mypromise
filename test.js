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
    let arr2json = arr => JSON.stringify(arr);
    let json2arr = str => JSON.parse(str);
    let arr = [5,4,7,8,9,6,3,1,4,2,5,7,9,6,3,1,4];
    let json = arr2json(arr);json2arr(json)
    console.log('快速排序', mySort.quickSort(json2arr(json)));
    console.log('冒泡排序', mySort.mpSort(json2arr(json)));
    console.log('插入排序', mySort.insertSort(json2arr(json)));
    console.log('鸡尾酒排序', mySort.jwjSort(json2arr(json)));
    console.log('原数组为', json2arr(json));
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