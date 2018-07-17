/**
 * 申明状态常量
 */
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
/**
 * 判断参数是否为func
 */
const isFunc = fn => typeof fn === 'function';

class myPromise{
    constructor(fn){
        if (typeof fn !== 'function'){
            throw '参数应该是func';
        }
        this.fulfilledList = [];
        this.rejectedList = [];
        this.status = PENDING;
        try {
            fn(this._resolve.bind(this),this._reject.bind(this));
        } catch (err) {
            this._reject(err);
        }
    }
    then(fulfilled, rejected){
        if(this.status !== PENDING){
            return;
        }
        this.fulfilledList.push(fulfilled);
        this.rejectedList.push(rejected);
        return this;
    }
    catch(rejected){
        this.then(undefined, rejected);
    }
    _resolve(value){
        this.status = FULFILLED;
        if (!this.fulfilled || !isFunc(this.fulfilled)){
            return function(value){}
        } else {
            // return this.fulfilled(value)
            setTimeout(()=>{
                this.fulfilledList.forEach(item=>{
                    item(value)
                });this.fulfilledList = [];
            },0)
        }
    }
    _reject(value){
        this.status = REJECTED;
        if (!this.rejected || !isFunc(this.rejected)){
            return function(value){}
        } else {
            // return this.rejected(value)
            setTimeout(()=>{
                this.rejectedList.forEach(item=>{
                    item(value)
                });this.rejectedList = [];
            },0)
        }
    }
}
module.exports = myPromise;