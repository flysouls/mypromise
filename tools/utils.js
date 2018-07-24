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
            el.setSelectionRange(index, index);
        }, 0)
    }
    /**
     *  从url数组依次加载图像
     *  @param {Array} arr url数组
     *  @param {Array} cb 下载完成回调
     */
    loadImage(){
        let done = false, allDone = false;
        return (arr, cb) => {
            if (!Array.isArray(arr) || !arr.length) return;
            arr = arr.filter(item => !! item);
            console.log('过滤后的url数组', arr);
            let download = (url,callback) => {
                if(!url){
                    allDone = true;
                    return ;
                }
                done = false;
                console.log('开始下载', url);
                let image = new Image();
                image.src = url;
                image.onload = image.error = (e) => {
                    if (e.type == 'load') {
                        done = true;
                        console.log('下载完成', url);
                    } else {
                        done = false;
                        console.log('下载失败', url);
                    }
                    cb && cb.call(image, url);
                    callback.call(image);
                }
            }
            let round = () => {
                setTimeout(()=>{
                    if (allDone) return;
                    download(arr.shift(), round);
                },17);
            };
            round();
        }
    }
}
