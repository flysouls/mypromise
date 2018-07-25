class someQuestion {
    /**
     * 形如f(1)(2)(3) 返回6
     * @param {Number} x 
     */
    f(x){
        let xx = x, f = num => {
            xx+=num;
            return f
        }
        //改写f的valueOf或者toString;
        f.valueOf = () => {
            return xx;
        }
        return f;
    }
}