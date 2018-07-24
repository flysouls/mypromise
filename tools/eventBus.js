class EventBus {
    constructor(){
        this._event = {};
    }
    /**
     * 类型判断
     * @param {any} str 待判断对象
     * @param {String} type 类型
     */
    is(str,type){
        if(typeof str !== type){
            console.error(`eventType should be a ${type}`);
            return false
        }
        return true
    }
    /**
     * 自定义事件绑定
     * @param {String} type 绑定事件类型
     * @param {Function} fn 事件
     */
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
    /**
     * 自定义事件触发
     * @param {string} type 自定义事件类型
     * @param {...Any} opt 参数
     */
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
    /**
     * 自定义事件解绑
     * @param {String} type 事件类型
     * @param {Function} fn 待解绑参数
     */
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