function toLowerCase(str){
    var i = str.lastIndexOf(".");
    var res = str.substring(0,i) + str.substring(i,str.length).toLowerCase();
    return res;
}
console.log(toLowerCase("123.JPG"));