let obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4
}
// 深拷贝
Object.prototype.map = function(fn){
    let obj = this;
    let res = {};
    for(key in obj){
        // 去除继承对象map
        if(obj.hasOwnProperty(key)){
            item = fn(key, obj[key]);
            res[key] = item;
        }
    }
    return res;
}

let newobj = obj.map((i, value) => {
    return ++value;
})
console.log(obj);
console.log(newobj);