class utils{
    /**
     * 设置光标位置//暂未考虑ie兼容
     * @param {Element} el input元素
     * @param {Number} index 位置
     */
    setCursor(el, index){
        let val = el.value, len = val.length;
        if (len < index) return ;
        setTimeout(()=>{
            el.focus();
            el.setSelectionRange(index, index) 
        },0)
    }
}