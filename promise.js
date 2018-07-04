
class myPromise{
    constructor(fn){
        if (typeof fn !== 'function'){
            throw '参数应该是func';
        }
        this.fulfilled = undefined;
        this.rejected = undefined;
        try {
            fn(this._resolve,this._reject);
        } catch (err) {
            console.log(err)
            this.catch(err);
        }
    }
    static isFunc(fn){
        return typeof fn === 'function'
    }
    static _resolve(value){
        if (!this.fulfilled || !this.isFunc(this.fulfilled)){
            return function(value){}
        } else {
            return this.fulfilled(value)
        }
    }
    static _reject(value){
        if (!this.rejected || !this.isFunc(this.rejected)){
            return function(value){}
        } else {
            return this.rejected(value)
        }
    }
    then(fulfilled, rejected){
        this.fulfilled = fulfilled;
        this.rejected = rejected;
    }
    catch(rejected){
        this.rejected = rejected;
    }
}
module.exports = myPromise;