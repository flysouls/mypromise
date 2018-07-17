class EventBus {
    constructor(){
        this._event = {};
    }
    is(str,type){
        if(typeof str !== type){
            console.error(`eventType should be a ${type}`);
            return false
        }
        return true
    }
    on(type,fn){
        if(Array.isArray(type)){
            type.forEach(item=>{
                this.on(item,fn)
            })
        }
        if(!this.is(type,'string')) return;
        if(type in this._event){
            this._event[type].push(fn)
        } else {
            this._event[type] = [fn]
        }
        return this;
    }
    emit(type,...opt){
        if(!this.is(type,'string')) return;
        if(type in this._event && this._event[type]!==null){
            if(Array.isArray(this._event[type])){
                let i = this._event[type].length;
                while(i--){
                    this._event[type][i].apply(this,opt);
                }
            } else if (this.is(this._event[type], 'object')) {
                this._event[type].apply(this,opt);
            } else if (this.is(this._event[type], 'function')) {
                this._event[type].apply(this,opt);
            }
        } else {
            console.error(`there is no type of ${type} event was bind`);
        }
        return this
    }
    off(type, fn){
        if (!arguments.length) {
          this._event = {};
        }
        if(Array.isArray(type)){
            type.forEach(item=>{
                this.off(item, fn);
            })
        }
        if(!this.is(type,'string')) return;
        let cbs = this._event[type];
        if(!cbs) {
            console.error(`there is no type of ${type} event was bind`);
            return;
        }
        if(!fn){
            this._event[type] = null
        }
        let i = cbs.length;
        while(i--){
            if(cbs[i] === fn){
                cbs.splice(i, 1);
                break
            }
        }
        return this
    }
}
module.exports = EventBus;