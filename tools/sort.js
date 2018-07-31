class Sort {
    /**
     * 交换数组元素
     * @param {Array.<number>} arr 待交换数据
     * @param {number} left 下标1
     * @param {number} right 下标2
     */
    swap(arr, left, right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
    }
    /**
     * 类型转换
     * @param {string|number} val 
     */
    N(val) {
        return Number(val)
    }
    /**
     * 快速排序
     * @param {Array.<Number>} arr 待排序数组
     */
    quickSort(arr) {
        if (!Array.isArray(arr)) return;
        let sort = (arr, low, high) => {
            //只有1个元素或者错误数据
            if(low >= high) return;
            let temp = arr[low];
            let i = low, j = high;
            while(i < j){
                while(i<j && arr[j]>=temp){
                    j--
                }
                while(i<j && arr[i]<=temp){
                    i++
                }
                if (i<j) {
                    this.swap(arr,i,j);
                }
            }
            this.swap(arr,low,i);
            temp = arr[i];
            sort(arr,low,i-1);
            sort(arr,i+1,high);
        }
        sort(arr,0,arr.length-1);
        return arr;
    }
    /**
     * 冒泡排序
     * @param {Array.<Number>} arr 待排序数组
     */
    mpSort(arr){
        if (!Array.isArray(arr)) return;
        const sort = arr => {
            let isSort = false;
            //优化版..加入right记录无序数组边界，再往右是有序的，减少排序次数
            let right = arr.length-1;
            let index = 0;
            for(let i = 0; i < right; i++){
                // for(let j = i; j < arr.length; j++){
                //     if(arr[i]>arr[j]){
                //         this.swap(arr, i, j);
                //         isSort = true;
                //     }
                // }
                index++;
                if (arr[i] > arr[i+1]) {
                    this.swap(arr, i, i+1);
                    isSort = true;
                }
                if (i === right - 1){
                    if (isSort){
                        i = 0;
                        right--;
                    } else {
                        return arr;
                    }
                }
            }
            console.log(index);
        }
        sort(arr);
        return arr;
    }
    // error安抚安抚啊安抚浪费al..................................................................
    /**
     * 鸡尾酒排序
     * @param {Array} arr 待排序数组
     */
    jwjSort(arr){
        if (!Array.isArray(arr)) return;
        let isSort = false;
        let index = 0;
        //同冒泡排序 加入左右边界以优化减少循环次数
        let sort2right = (arr, left, right) => {
            index++;
            if (right == left) {
                isSort = true;
                return ;
            } 
            for(let i = left; i < right; i++){
                if (arr[i] > arr[i+1]){
                    this.swap(arr, i, i+1);
                }
            };
            sort2left(arr);
        }
        let sort2left = (arr, left, right) => {
            index++;
            if (right == left) {
                isSort = true;
                return ;
            } 
            for(let i = right; i > left; i--){
                if (arr[i-1] > arr[i]){
                    this.swap(arr, i-1, i);
                }
            };
            sort2right(arr);
        }
        while(!isSort){
            sort2right(arr);
        }
        console.log(index);
        return arr;
    }
    /**
     * 插入排序
     * @param {Array.<Number>} arr 待排序数组
     */
    insertSort(arr){
        if (!Array.isArray(arr)) return;
        let sort = arr => {
            //ol 为默认有序的长度
            let len = arr.length, ol = 1;
            for(let i = 1; i < len; i++){
                let temp = arr[i];
                for(let j = 0; j<ol; j++){
                    if(ol = len)return;
                    if (arr[j]>temp){
                        let pow = arr[j], low = j-1;
                        arr[j] = arr[low];
                        arr[low] = pow;
                    }else{
                        ol++;
                    }
                }
            }
        }
        sort(arr);
        return arr;
    }
    /**
     * 选择排序
     */
    choiceSort(){
        //
    }
    /**
     * 桶排序
     */
    choiceSort(){
        //
    }
}

module.exports = Sort;