class utils {
    /**
     * 设置光标位置//暂未考虑ie兼容
     * @param {Element} el input元素
     * @param {Number} index 位置
     */
    setCursor(el, index) {
        let val = el.value,
            len = val.length;
        if (len < index) return;
        setTimeout(() => {
            el.focus();
            el.setSelectionRange(index, index);
        }, 0)
    }
    /**
     *  从url数组依次加载图像
     *  @param {Array} arr url数组
     *  @param {Array} cb 下载完成回调
     */
    loadImage() {
        let done = false,
            allDone = false;
        return (arr, cb) => {
            if (!Array.isArray(arr) || !arr.length) return;
            arr = arr.filter(item => !!item);
            console.log('过滤后的url数组', arr);
            let download = (url, callback) => {
                if (!url) {
                    allDone = true;
                    return;
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
                setTimeout(() => {
                    if (allDone) return;
                    download(arr.shift(), round);
                }, 17);
            };
            round();
        }
    }
    /**
     * 实现一个字符串模板
     * @param {String} str 模板（参数用{}包裹）
     * @param {Object} options 参数集合
     */
    strTemplate(str, options){
        //假定变量名使用a-zA-Z0-9_
        const reg = /{\w+}/g;
        const regs = /[{}]/g;
        if (!str || str.length <= 2) return str;
        if (!reg.exec(str)) return str;
        str = str.replace(reg, item => {
            item = item.replace(regs,'');
            item = options[item];
            return item;
        })
        return str;
    }
    /**
     * 浮点数加法运算
     * @param {Number} a 
     * @param {Number} b 
     */
    add(a, b){
        if (a|1 === a || b|1 ===b ){
            return a+b
        }
        let al = (''+a).split('.')[1].length, bl = (''+b).split('.')[1].length;
        let n = Math.pow(10, Math.max(al,bl));
        return (a*n+b*n)/n;
    }
    /**
     * 数字转货币格式
     * @param {Number|String} num 待转金额
     */
    n2amount(num){
        return {
            'number.toLocaleString':Number(num).toLocaleString(),
            // \B 非单词边界   \b 单词边界
            '使用于正数（int）': String(num).replace(/\B(?=(\d{3})+\b)/g, ','),
            // 不太懂
            '使用于正数（int & float）': String(num).replace(/(?=\B(?:\d{3})+\b)(\d{3}(?:\.\d+$)?)/g, ',$1'),
            
            '使用于正数（float）': String(num).replace(/(\d{1,3})(?=(?:\d{3})+\.)/g, '$1,')
        }
    }
    /**
     * 函数防抖（一定时间内多次触发。仅执行最后一次）
     * @param {Function} fn 防抖函数
     * @param {Number} delay 时间段
     */
    debounce(fn, delay){
        let timer = null;
        return function(){
            let that = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function(){
                fn.apply(that, args);
            }, delay)
        }
    }
    /**
     * 函数节流
     * @param {Function} fn 节流函数
     * @param {Number} delay 节流时间
     */
    throttle(fn, delay){
        var timer = null,
            delay = delay || 250,
            last;
        return function(){
            let that = this, 
                args = arguments,
                now = +new Date();
            if (last && now < last + delay){
                clearTimeout(timer);
                timer = setTimeout(function(){
                    last = now;
                    fn.apply(that, args);
                }, delay)
            } else {
                last = now;
                fn.apply(that, args);
            }
        }
    }

    /**
     * service.js
     */
    // var http = require('http');
    // var urllib = require('url');

    // var port = 3000;
    // var data = {'data':'world'};

    // http.createServer(function(req,res){
    //     var params = urllib.parse(req.url,true);
    //     if(params.query.callback){
    //         console.log(params.query.callback);
    //         //jsonp
    //         let {callback, ...other} = params.query;
    //         let others = {...data, ...other};
    //         var str = params.query.callback + '(' + JSON.stringify(others) + ')';
    //         res.end(str);
    //     } else {
    //         res.end();
    //     }
        
    // }).listen(port,function(){
    //     console.log('jsonp server is on');
    // });
    //jsonp 需要浏览器环境 
    jsonp(){
        if (!opt || !opt.url) return '参数无效';
        let url = opt.url,
        callback = opt.callback || null,
        data = opt.data || {};
        //生成id
        let getId = ()=>{
            let id = Math.random()*1000+1000;
            return id.toFixed();
        },
        //生成回调函数名
        fn = `jsonp${getId()}`,
        param = [];
        script = document.createElement('script'),
        //清理script以及回调函数的方法
        clear = () => {
            delete(window[fn])
            script.remove();
        }
        //参数添加回调函数名
        data['callback'] = fn;
        //处理参数
        for(let key in data) {
            param.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        }
        //处理url
        url = url.indexOf('?') > 0 ? url + '&' : url + '?';
        url += param.join('&');
        //回调
        window[fn] = (res) => {
            callback && callback(res)
            clear();
        }
        script.onerror = () => {
            callback && callback({err:'error'})
            clear();
        }
        script.src = url;
        script.type = 'text/javascript';
        document.body.appendChild(script);
    }
}
module.exports = utils;