class EventBus {
    constructor(){
        this._event = {};
    }
    is(str,type){
        if(typeof str !== type){
            console.error(`eventType should be a ${type}`);
        }
    }
    on(type,fn){
        this.is(type,'string');
        if(type in this._event){
            this._event[type].push(fn)
        } else {
            this._event[type] = [fn]
        }
    }
    emit(type,...opt){
        this.is(type,'string');
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
    }
    off(type){
        this.is(type,'string');
        if(type in this._event){
            this._event[type] = null
        }
    }
}
module.exports = EventBus;