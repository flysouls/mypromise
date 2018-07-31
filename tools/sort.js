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
        //index 记录循环次数
        let index = 0;
        const sort = arr => {
            let isSort = false;
            //优化版..加入right记录无序数组边界，再往右是有序的，减少排序次数
            let right = arr.length-1;
            for(let i = 0; i < right; i++){
                index++;
                if (arr[i] > arr[i+1]) {
                    this.swap(arr, i, i+1);
                    isSort = true;
                }
                if (i === right - 1){
                    if (isSort){
                        i = -1;
                        right -= 1;
                        isSort = false;
                    } else {
                        return ;
                    }
                }
            }
        }
        sort(arr);
        console.log("循环次数 %d",index);
        return arr;
    }
    // error安抚安抚啊安抚浪费al..................................................................
    /**
     * 鸡尾酒排序
     * @param {Array} arr 待排序数组
     */
    jwjSort(arr){
        if (!Array.isArray(arr)) return;
        let isSort = false, len = arr.length;
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
            sort2left(arr, 0, right-1);
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
            sort2right(arr, left+1, right);
        }
        while(!isSort){
            sort2right(arr, 0, len);
        }
        console.log("循环次数:%d",index);
        return arr;
    }
    /**
     * 插入排序
     * @param {Array.<Number>} arr 待排序数组
     */
    insertSort(arr){
        if (!Array.isArray(arr)) return;
        let sort = arr => {
            let len = arr.length;
            for(let i = 1; i < len; i++){
                for(let j = i; j > 0; j--){
                    if (arr[j] < arr[j-1]){
                        this.swap(arr, j, j-1);
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