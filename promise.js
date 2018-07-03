
class myPromise{
    constructor(fn){
        if (typeof fn !== 'function'){
            throw '参数应该是func';
        }
        this.fn = fn;
        try {fn()} catch (err) {
            this.err = err;
            this.catch(_rejected(err));
        }
    }

    _resolve(value) {
        setTimeout(this.fn.arguments[0](value))
    }
    _reject(value) {
        setTimeout(this.fn.arguments[1](value))
    }

    then(fulfilled, rejected){
        setTimeout(()=>{
            this._resolve(this.value);
            this._reject(this.err);
        })
    }
    catch(rejected){
        setTimeout(()=>{
            rejected(this.err);
        })
    }
}
module.exports = myPromise;