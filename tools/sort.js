class Sort {
    /**
     * 交换数组元素
     * @param {Array} arr 待交换数据
     * @param {number} left 下标1
     * @param {number} right 下标2
     */
    swap(arr, left, right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
    }
    /**
     * 类型转换
     * @param {any} val 
     */
    N(val) {
        return Number(val)
    }
    /**
     * 快速排序
     * @param {Array} arr 待排序数组
     */
    quickSort(arr) {
        if (!Array.isArray(arr)) {
            return
        }
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
     * @param {Array} arr
     */
    mpSort(arr){
        if (!Array.isArray(arr)) {
            return
        }
        const sort = arr => {
            let isSort = false;
            for(let i = 0; i < arr.length-1; i++){
                for(let j = i; j < arr.length; j++){
                    if(arr[i]>arr[j]){
                        this.swap(arr,i,j);
                        isSort = true;
                    }
                }
            }
            if(isSort){
                sort(arr);
            } else {
                return
            }
        }
        sort(arr);
    }
    /**
     * 
     */
}

module.exports = Sort;